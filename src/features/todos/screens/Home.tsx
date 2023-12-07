import LogoHorizontal from '@components/LogoHorizontal';
import {useDispatch, useStore} from '@providers/StoreContext.provider';
import {useAppTheme} from '@providers/theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GeneralStackParamList} from '@screens/index';
import {FC, useEffect} from 'react';
import {DeviceEventEmitter, ScrollView, StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import EmptyList from '../components/EmptyList';
import TodoCard from '../components/TodoCard';
import TodoRedux from '../models/TodoRedux';
import TodoInterface from '../models/interfaces/Todo.interface';

const HomeScreen: FC<NativeStackScreenProps<GeneralStackParamList, 'Home'>> = ({
  navigation,
}) => {
  const theme = useAppTheme();
  const dispatch = useDispatch();
  const {list} = useStore('todos') as TodoRedux;

  useEffect(() => {
    function handler({todo, index}: {todo: TodoInterface; index: number}) {
      if (list) {
        const newList = [...list];
        newList[index] = todo;
        dispatch({
          type: 'todos/setTodos',
          payload: newList,
        });
      }
    }
    function deleteHandler(index: number) {
      const newList = [...list];
      newList.splice(index, 1);
      dispatch({
        type: 'todos/setTodos',
        payload: newList,
      });
    }
    DeviceEventEmitter.addListener('updateTodo', handler);
    DeviceEventEmitter.addListener('deleteTodo', deleteHandler);
    return () => {
      DeviceEventEmitter.removeAllListeners('updateTodo');
      DeviceEventEmitter.removeAllListeners('deleteTodo');
    };
  }, [list]);

  const onPressCard = (index: number) => {
    navigation.push('TodoDetail', {
      todo: list[index],
      index,
    });
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.logo}>
        <LogoHorizontal />
      </View>
      {list.length > 0 ? (
        <>
          <ScrollView
            style={{backgroundColor: theme.colors.background}}
            contentContainerStyle={styles.contentContainer}>
            {list.map((e, i) => (
              <TodoCard
                key={`todo-${i}`}
                onPress={() => onPressCard(i)}
                {...e}
              />
            ))}
          </ScrollView>
          {
            <IconButton
              icon={'plus'}
              containerColor={theme.colors.text}
              iconColor={theme.colors.background}
              size={42}
              onPress={() => navigation.push('TodoDetail')}
              style={styles.btnAdd}
            />
          }
        </>
      ) : (
        <EmptyList />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    padding: 8,
    marginHorizontal: 24,
  },
  contentContainer: {
    padding: 16,
    gap: 10,
  },
  btnAdd: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});
