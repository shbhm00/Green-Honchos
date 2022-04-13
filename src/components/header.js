import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {cart, back} from '../assests';
import {vh, vw, normalize} from '../utils/dimension';
const screenWidth = Dimensions.get('window').width;
export default function Header({navigation, onPress}) {
  return (
    <SafeAreaView style={styles.headingContainer}>
      <TouchableOpacity onPress={onPress}>
        <Image source={back} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.heading}>Ketch</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Image source={cart} style={styles.cartIcon} />
        <View style={styles.floatingCount}>
          <Text style={styles.floatingText}>1</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    flexDirection: 'row',
    alignItems: 'center',
    height: vh(90),
  },
  heading: {
    fontSize: vw(25),
    fontWeight: '500',
    marginLeft: vw(20),
    textTransform: 'uppercase',
  },
  backIcon: {
    height: vh(25),
    width: vw(25),
    marginLeft: vw(10),
  },
  cartIcon: {
    height: vw(25),
    width: vw(25),
    marginLeft: screenWidth - vw(200),
  },
  floatingCount: {
    height: vw(15),
    width: vw(15),
    borderRadius: vw(7.5),
    backgroundColor: 'black',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: -8,
    top: -10,
  },
});
