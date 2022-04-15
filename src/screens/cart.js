import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import React from 'react';
import {vh, vw, normalize} from '../utils/dimension';
import Header from '../components/header';
import {useDispatch, useSelector} from 'react-redux';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default function Cart({navigation}) {
  const selecter = useSelector(state => state);
  const [cartData, setCartData] = React.useState({});
  const getCart = async () => {
    try {
      const response = await fetch(
        'https://ketchcart-pim.greenhonchos.com/api/v1/cart/get-cart',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cart_id: selecter.CartReducer.cart_id,
            cart_session: selecter.CartReducer.cart_session,
          }),
        },
      );
      const json = await response.json();
      console.log('json', json);
      setCartData(json.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  React.useEffect(() => {
    getCart();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header onPress={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.notificationMsg}>
          <Text style={styles.notificationMsgText}>{cartData.notifiy_msg}</Text>
        </View>
        <Text style={styles.shoppingCartText}>Shopping Cart</Text>
        <View style={styles.cartContainer}></View>
        <View style={styles.cartDisAndSummary}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationMsg: {
    height: vh(50),
    width: '100%',
    backgroundColor: '#33691e',
  },
  notificationMsgText: {
    textAlign: 'center',
    color: 'white',
    fontSize: vw(14),
    fontWeight: '600',
    marginTop: vh(5),
    marginHorizontal: vw(5),
  },
  shoppingCartText: {
    fontSize: vw(25),
    fontWeight: '500',
    textAlign: 'center',
    marginTop: vh(30),
  },
  cartContainer: {
    borderWidth: 1,
    marginHorizontal: vw(10),
    marginVertical: vh(20),
    height: screenHeight / 2,
  },
  cartDisAndSummary: {
    borderWidth: 1,
    height: screenHeight / 2,
    marginHorizontal: vw(10),
  },
});
