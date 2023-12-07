import {useAppTheme} from '@providers/theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GeneralStackParamList} from '@screens/index';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {customText} from 'react-native-paper';
import Logo from '../../../components/Logo';
import Button from '@components/Button';
import Storage from '@utils/async-storage';
import StoreConstants from '@constants/store';

const Text = customText<'light'>();

const OnboardingScreen: FC<
  NativeStackScreenProps<GeneralStackParamList, 'Onboarding'>
> = ({navigation}) => {
  const theme = useAppTheme();

  const onPressNext = () => {
    Storage.setItem(StoreConstants.ONBOARDING, false);
    navigation.push('Home');
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
        <Logo />
        <Text
          variant="light"
          style={[styles.motto, {color: theme.colors.caption}]}>
          Write what you need to do.
        </Text>
        <Text
          variant="light"
          style={[styles.motto, {marginTop: 0, color: theme.colors.caption}]}>
          Everyday.
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Button
          style={{width: 'auto', alignSelf: 'center'}}
          contentStyle={styles.btnNext}
          buttonColor="white"
          textColor="black"
          onPress={onPressNext}>
          Let's go
        </Button>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  motto: {
    marginTop: 18,
    fontSize: 18,
    textAlign: 'center',
  },
  btnNext: {
    paddingHorizontal: 48,
    paddingVertical: 8,
  },
});
