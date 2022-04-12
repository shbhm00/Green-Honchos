import React, {useState} from 'react';
import {Button, Text, View, Dimensions, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
function ModalTester({
  isVisible,
  onClose,
  children,
  animationInType,
  animationOutType,
  backdropOpacity,
}) {
  return (
    // <View style={{flex: 1, backgroundColor: 'yellow'}}>

    <Modal
      isVisible={isVisible}
      deviceWidth={ScreenWidth}
      style={{margin: 0}}
      useNativeDriver={true}
      backdropColor="rgba(0, 0, 0, 0.1)"
      backdropOpacity={backdropOpacity}
      animationInTiming={500}
      animationOutTiming={500}
      animationIn={animationInType}
      animationOut={animationOutType}
      onBackdropPress={() => onClose(false)}>
      {children}
    </Modal>
    // </View>
  );
}

export default ModalTester;
