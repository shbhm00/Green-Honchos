import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {cart, back} from '../assests';
import {vh, vw} from '../utils/dimension';
import {useSelector} from 'react-redux';
const screenWidth = Dimensions.get('window').width;
export default function Header({onPress, cartButtonPress, floatingText}) {
  const selector = useSelector(state => state.Reducer.data);
  const getcartCout = () => {
    if (selector.products && selector.products.length > 0)
      return selector.products.length;
    else return 0;
  };
  useEffect(() => {
    getcartCout();
  }, [selector]);
  return (
    <SafeAreaView style={styles.headingContainer}>
      <TouchableOpacity onPress={onPress}>
        <Image source={back} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.heading}>Ketch</Text>
      <TouchableOpacity onPress={cartButtonPress}>
        <Image source={cart} style={styles.cartIcon} />
        <View style={styles.floatingCount}>
          {selector.products && selector.products.length > 0}
          <Text style={styles.floatingText}>{getcartCout()}</Text>
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
  floatingText: {
    color: 'white',
    fontSize: vw(10),
  },
});
