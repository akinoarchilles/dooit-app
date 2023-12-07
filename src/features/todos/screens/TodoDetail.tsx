import CheckboxStatusEnum from '@@@/src/models/interfaces/enum/CheckboxStatus.enum';
import DataConstants from '@constants/data';
import {useDispatch, useStore} from '@providers/StoreContext.provider';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GeneralStackParamList} from '@screens/index';
import {isEmpty} from '@utils/checker';
import {FC, useCallback, useEffect, useState} from 'react';
import {
  Alert,
  DeviceEventEmitter,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {IconButton, customText} from 'react-native-paper';
import Label from '../components/Label';
import TodoItem from '../components/TodoItem';
import TodoRedux from '../models/TodoRedux';
import TodoInterface from '../models/interfaces/Todo.interface';
import TodoLabelEnum from '../models/interfaces/enum/TodoLabel.enum';
import {generateRandomColor} from '@utils/color';
import {useAppTheme} from '@providers/theme';

const Text = customText<'regular'>();

export type TodoDetailScreenProps = {
  todo?: TodoInterface;
  index: number;
};

const TodoDetailScreen: FC<
  NativeStackScreenProps<GeneralStackParamList, 'TodoDetail'>
> = ({navigation, route}) => {
  const {todo: todoProps, index} = route.params || {
    index: 0,
  };
  const theme = useAppTheme();

  const {list} = useStore('todos') as TodoRedux;
  const [todo, setTodo] = useState<TodoInterface>(
    todoProps || {
      label: [],
      list: [],
      title: '',
      color: generateRandomColor(),
    },
  );

  useEffect(() => {
    function deleteItem() {
      if (!isEmpty(todo)) {
        Alert.alert('Delete', 'Are you sure to delete this item?', [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              DeviceEventEmitter.emit('deleteTodo', index);
              navigation.goBack();
            },
          },
        ]);
      }
    }
    function onBack() {
      DeviceEventEmitter.emit('updateTodo', {
        todo: !isEmpty(todo) ? todo : undefined,
        index: index,
      });
      navigation.goBack();
    }
    if (!isEmpty(todo) && typeof index === 'number') {
      navigation.setOptions({
        headerLeft: props => (
          <IconButton
            icon={'arrow-left'}
            {...props}
            style={{margin: 0, marginLeft: -8}}
            onPress={onBack}
          />
        ),
        headerRight: props => (
          <IconButton
            icon={'trash-can'}
            {...props}
            style={{margin: 0}}
            onPress={deleteItem}
          />
        ),
      });
    }
  }, [todo, index, list]);

  const onCheckboxPress = useCallback(
    (index: number, value: CheckboxStatusEnum) => {
      const newTodo = {...todo};
      newTodo.list[index] = newTodo.list[index] || {};
      newTodo.list[index].done =
        value === CheckboxStatusEnum.CHECKED ? true : false;
      setTodo(newTodo);
    },
    [todo],
  );

  const onChangeText = useCallback(
    (index: number, value: string) => {
      const newTodo = {...todo};
      newTodo.list[index] = newTodo.list[index] || {};
      newTodo.list[index].content = value;
      setTodo(newTodo);
    },
    [todo],
  );

  const onPressLabel = useCallback(
    (index: number, value: TodoLabelEnum) => {
      const newTodo = {...todo};
      const existed = newTodo.label.findIndex(e => e === value);
      if (existed > -1) newTodo.label.splice(existed, 1);
      else newTodo.label[index] = value;
      newTodo.label = newTodo.label.filter(e => e !== undefined);
      setTodo(newTodo);
    },
    [todo],
  );

  const onChangeTitle = useCallback(
    (value: string) =>
      setTodo({
        ...todo,
        title: value,
      }),
    [todo],
  );

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.content}>
        <TextInput
          placeholder="Title"
          value={todo.title}
          style={styles.titleInput}
          onChangeText={(value: string) => onChangeTitle(value)}></TextInput>
        <ScrollView showsVerticalScrollIndicator={false}>
          {todo &&
            todo.list.map((e, i) => (
              <TodoItem
                index={i}
                key={`todo-${index}-${i}`}
                content={e.content}
                done={e.done}
                onCheckboxPress={(_: number, value: CheckboxStatusEnum) =>
                  onCheckboxPress(i, value)
                }
                onChangeText={(value: string) => onChangeText(i, value)}
              />
            ))}
          <TodoItem
            isNew
            index={todo.list.length}
            content=""
            done={false}
            onCheckboxPress={(_: number, value: CheckboxStatusEnum) =>
              onCheckboxPress(todo.list.length, value)
            }
            onChangeText={(value: string) =>
              onChangeText(todo.list.length, value)
            }
          />
        </ScrollView>
      </View>
      <View style={styles.labelContent}>
        <Text style={styles.labelTitle}>Choose a label</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.labelRow}
          contentContainerStyle={styles.contentRow}>
          {DataConstants.TODO_LABELS.map((e, i) => (
            <Label
              key={`${index}-${e}-${i}`}
              index={i}
              active={todo.label.includes(e)}
              label={e}
              onPress={onPressLabel}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default TodoDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 9,
    padding: 18,
  },
  labelContent: {
    borderTopWidth: 0.5,
    flex: 1.5,
    margin: 24,
    paddingVertical: 18,
  },
  labelTitle: {
    fontSize: 20,
  },
  labelRow: {
    marginTop: 18,
  },
  contentRow: {gap: 8},
  titleInput: {
    fontSize: 24,
    fontWeight: '600',
  },
});
