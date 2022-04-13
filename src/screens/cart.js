import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {vh, vw, normalize} from '../utils/dimension';
import Header from '../components/header';
const screenWidth = Dimensions.get('window').width;
export default function Cart({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header onPress={() => navigation.goBack()} />
      <View>
        <Text>Hello</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
