import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface RowProps {
  children: JSX.Element[] | React.ReactNode;
  style: ViewStyle[] | ViewStyle;
  align: 'top' | 'center' | 'bottom';
}

export default function Row({ children, align, style }: Partial<RowProps>) {
  return (
    <View
      style={[
        propStyle.row,
        {
          alignItems:
            align === 'top'
              ? 'flex-start'
              : align === 'center'
              ? 'center'
              : align === 'bottom'
              ? 'flex-end'
              : 'center',
        },
        style,
      ]}>
      {children}
    </View>
  );
}

const propStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
