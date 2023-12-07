import {useAppTheme} from '@providers/theme';
import Props from 'react-native-paper/lib/typescript/components/Button/Button';
import {Button as PaperButton} from 'react-native-paper';

type ButtonProps = React.ComponentProps<typeof Props>;

export default function Button(props: ButtonProps) {
  const theme = useAppTheme();
  return (
    <PaperButton
      theme={{roundness: 10}}
      textColor={theme.colors.background}
      buttonColor={theme.colors.text}
      {...props}
    />
  );
}
