import {View, Text} from 'react-native';
import React, {Children} from 'react';

export default function BaseLayout({children}) {
  return <View style={{flex: 1, marginHorizontal: 20}}>{children}</View>;
}
