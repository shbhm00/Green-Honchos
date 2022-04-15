import React from 'react';
import {Dimensions} from 'react-native';
import Modal from 'react-native-modal';
const ScreenWidth = Dimensions.get('window').width;
function ModalTester({
  isVisible,
  onClose,
  children,
  animationInType,
  animationOutType,
  backdropOpacity,
  animationInTime,
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
      animationInTiming={animationInTime || 500}
      animationOutTiming={250}
      animationIn={animationInType}
      animationOut={animationOutType}
      onBackdropPress={() => onClose(false)}>
      {children}
    </Modal>
    // </View>
  );
}

export default ModalTester;
