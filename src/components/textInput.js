import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

export default function Input({placeholder, onChangeText, value, onFocus}) {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        style={styles.inputContainer}
        autoCapitalize={false}
        onFocus={() => onFocus()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: '#e9eeff',
    borderRadius: 5,
    backgroundColor: '#f9faff',
    padding: 15,
    marginVertical: 10,
  },
});
