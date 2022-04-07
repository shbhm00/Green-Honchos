import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {checkedIcon, uncheckedIcon} from '../assests';
import {vh, vw, normalize} from '../utils/dimension';
export default function ToggleCheckBox({checked, onPress}) {
  return (
    <View style={{marginRight: vw(15)}}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={checked ? checkedIcon : uncheckedIcon}
          style={{height: vh(20), width: vw(20)}}
        />
      </TouchableOpacity>
    </View>
  );
}
