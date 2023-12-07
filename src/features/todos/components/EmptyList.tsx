import Button from '@components/Button';
import EmptyListImage from '@components/EmptyListImage';
import DeviceContants from '@constants/device';
import {useAppTheme} from '@providers/theme';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GeneralStackParamList} from '@screens/index';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {customText} from 'react-native-paper';

const Text = customText<'bold'>();

const EmptyList: FC<any> = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<GeneralStackParamList>>();
  const theme = useAppTheme();

  const onPressNew = () => {
    navigation.push('TodoDetail');
  };

  return (
    <>
      <EmptyListImage
        height={DeviceContants.screenHeight / 2}
        width={DeviceContants.screenWidth}
        viewBox={`0 0 ${DeviceContants.screenHeight / 2} ${
          DeviceContants.screenWidth / 3
        }`}
      />
      <View style={styles.container}>
        <Text variant="bold" style={styles.caption}>
          Create your first to-do list...
        </Text>
        <Button icon={'plus'} contentStyle={{padding: 8}} onPress={onPressNew}>
          New List
        </Button>
      </View>
    </>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  caption: {
    marginBottom: 12,
  },
});
