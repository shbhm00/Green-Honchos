import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {vh, vw, normalize} from '../utils/dimension';
import Header from '../components/header';
import {useDispatch, useSelector} from 'react-redux';
const screenWidth = Dimensions.get('window').width;
export default function Cart({navigation}) {
  const selecter = useSelector(state => state);
  console.log('selecter', selecter.Reducer.data);
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
      console.log('Cart json', json);
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
      <View>
        <Text>Hello</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
