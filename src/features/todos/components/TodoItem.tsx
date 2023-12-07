import CheckboxStatusEnum from '@@@/src/models/interfaces/enum/CheckboxStatus.enum';
import Row from '@components/Row';
import {useAppTheme} from '@providers/theme';
import {FC} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {Checkbox, IconButton} from 'react-native-paper';

type TodoItemProps = {
  isNew?: boolean;
  index: number;
  content: string;
  done: boolean;
  onCheckboxPress: (index: number, value: CheckboxStatusEnum) => void;
  onChangeText: (value: string) => void;
};

const TodoItem: FC<TodoItemProps> = props => {
  const theme = useAppTheme();
  const {isNew, index, content, done, onCheckboxPress, onChangeText} = props;

  return (
    <Row align="center">
      {isNew ? (
        <IconButton icon={'plus'} style={{margin: 0, marginRight: -4}} />
      ) : (
        <View style={{transform: [{scale: 1.5}]}}>
          <Checkbox.Android
            status={done ? 'checked' : 'unchecked'}
            color={theme.colors.text}
            onPress={() =>
              onCheckboxPress(
                index,
                done
                  ? CheckboxStatusEnum.UNCHECKED
                  : CheckboxStatusEnum.CHECKED,
              )
            }></Checkbox.Android>
        </View>
      )}
      <TextInput
        placeholder="To-do"
        value={content}
        onChangeText={onChangeText}
        autoFocus={isNew ? false : true}></TextInput>
    </Row>
  );
};

export default TodoItem;

const styles = StyleSheet.create({});
