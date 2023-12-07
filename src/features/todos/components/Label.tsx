import {useAppTheme} from '@providers/theme';
import {FC} from 'react';
import {StyleSheet} from 'react-native';
import TodoLabelEnum from '../models/interfaces/enum/TodoLabel.enum';
import Button from '@components/Button';

type LabelProps = {
  onPress?: (index: number, e: TodoLabelEnum) => void;
  active: boolean;
  label: TodoLabelEnum;
  index: number;
};

const Label: FC<LabelProps> = props => {
  const theme = useAppTheme();
  const {onPress, active, label, index} = props;
  return (
    <Button
      onPress={() => onPress && onPress(index, label)}
      labelStyle={styles.btnLabel}
      buttonColor={
        active ? theme.colors.text : theme.colors.secondaryContainer
      }>
      {label}
    </Button>
  );
};

export default Label;

const styles = StyleSheet.create({
  btnLabel: {fontSize: 12, marginHorizontal: 20, margin: 0, padding: 0},
});
