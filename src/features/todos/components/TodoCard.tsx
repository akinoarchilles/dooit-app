import {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, customText} from 'react-native-paper';
import TodoInterface from '../models/interfaces/Todo.interface';
import {generateRandomColor} from '@utils/color';
import Row from '@components/Row';
import Label from './Label';

const Text = customText<'regular'>();

type TodoCardProps = TodoInterface & {
  onPress: () => void;
};

const TodoCard: FC<TodoCardProps> = props => {
  const {title, label, color, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, {backgroundColor: color}]}>
      <Text variant="regular" style={styles.title}>
        {title}
      </Text>
      <Row style={styles.container}>
        {label.map((e, i) => (
          <Label index={i} active={true} label={e} />
        ))}
      </Row>
    </TouchableOpacity>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    gap: 8,
  },
  card: {
    padding: 24,
    minHeight: 86,
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
  },
});
