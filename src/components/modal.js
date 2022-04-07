import React, {useState} from 'react';
import {Button, Text, View, Dimensions, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
function ModalTester({isVisible, onClose, children}) {
  return (
    // <View style={{flex: 1, backgroundColor: 'yellow'}}>

    <Modal
      isVisible={isVisible}
      deviceWidth={ScreenWidth}
      style={{margin: 0}}
      animationIn="slideInUp"
      animationOut={'slideOutDown'}
      onBackdropPress={() => onClose(false)}>
      {children}
    </Modal>
    // </View>
  );
}

export default ModalTester;
