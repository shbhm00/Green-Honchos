import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {vh, vw} from '../utils/dimension';
import Header from '../components/header';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../actions/actions';
const screenHeight = Dimensions.get('window').height;
export default function Cart({navigation}) {
  const selecter = useSelector(state => state);
  const dispatch = useDispatch();
  const [cartData, setCartData] = React.useState(selecter.Reducer.data);
  const [productId, setProductId] = React.useState('');
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
      if (json.success) {
        setCartData(json.data);
        dispatch(addToCart(json.data));
      }

      console.log('cartData', cartData);
    } catch (error) {
      console.log('error', error);
    }
  };
  const removeCart = async () => {
    // console.log('pro_id', pro_id);
    try {
      const response = await fetch(
        'https://ketchcart-pim.greenhonchos.com/api/v1/product/remove-product',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cart_id: selecter.CartReducer.cart_id,
            cart_session: selecter.CartReducer.cart_session,
            product_id: productId,
          }),
        },
      );
      const json = await response.json();
      if (json.success) {
        if (json.success) {
          setCartData(json.data);
          dispatch(addToCart(json.data));
        }
        alert(json.message);
      }
      console.log('json', json);
    } catch (error) {
      console.log('error', error);
    }
  };
  React.useEffect(() => {
    getCart();
  }, []);
  React.useEffect(() => {
    removeCart();
  }, [productId]);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header onPress={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.notificationMsg}>
          {cartData && cartData.length > 0 ? (
            <Text style={styles.notificationMsgText}>
              {cartData.notifiy_msg}
            </Text>
          ) : null}
        </View>
        <Text style={styles.shoppingCartText}>Shopping Cart</Text>
        <View>
          {cartData &&
            cartData.products.map((item, index) => {
              return (
                <View style={styles.cartContainer} key={index}>
                  <View style={styles.cartItemUpperContainer}>
                    <View style={styles.cartItem}>
                      <Image
                        source={{uri: item.image}}
                        style={styles.cartItemImage}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.sizePriceContainer}>
                      <Text style={styles.cartItemName}>{item.name}</Text>
                      <TouchableOpacity style={styles.sizeButton}>
                        <Text style={styles.selectSize}>size: {item.size}</Text>
                      </TouchableOpacity>
                      <View style={styles.removeButtonContainer}>
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => setProductId(item.id_product)}>
                          <Text>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={styles.cartItemLowerContainer}>
                    <View style={styles.cartItemPriceContainer}>
                      <View style={styles.headingContainer}>
                        <Text style={styles.cartItemheading}>Price :</Text>
                        <Text style={styles.cartItemPrice}>
                          Rs. {item.price}
                        </Text>
                      </View>
                      <View style={styles.headingContainer}>
                        <Text style={styles.cartItemheading}>Qty :</Text>
                        <Text style={styles.qty}>{item.qty}</Text>
                      </View>
                      <View style={styles.headingContainer}>
                        <Text style={styles.cartItemheading}>Discount :</Text>
                        <Text style={styles.discount}>
                          Rs. {item.price - item.selling_price}
                        </Text>
                      </View>
                      <View style={styles.headingContainer}>
                        <Text style={styles.cartItemheading}>Subtotal :</Text>
                        <Text style={styles.subtotal}>
                          <Text style={styles.cartItemPriceLineThrough}>
                            Rs. {item.price}
                          </Text>
                          {'  '}
                          Rs. {item.selling_price}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
        {cartData && cartData.products.length > 0 ? (
          <View style={styles.cartDisAndSummary}>
            <Text style={styles.discountHeading}>Discount</Text>
            <View style={styles.cartDiscountContainer}>
              <Text style={styles.cartDiscount}>Coupons</Text>
              <TouchableOpacity style={styles.cartDiscountButton}>
                <Text style={styles.cartDiscountText}>Add Coupon</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cartSummaryContainer}>
              <View style={styles.cartSummary}>
                <Text style={styles.cartSummaryText}>Subtotal :</Text>
                <Text style={styles.cartSummaryText}>
                  Rs. {cartData.order_subtotal}
                </Text>
              </View>
              <View style={styles.cartSummary}>
                <Text style={styles.cartSummaryText}>Order Total :</Text>
                <Text style={styles.cartSummaryPricetotal}>
                  Rs. {cartData.order_subtotal}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.cartDisAndSummary}>
            <Text>ADD PRODUCT</Text>
          </View>
        )}
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
    marginBottom: vh(20),
  },
  cartContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: vw(10),
    marginVertical: vh(10),
    height: screenHeight / 2 - vh(100),
  },
  cartDisAndSummary: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: vw(10),
    padding: vw(10),
    paddingBottom: vh(20),
  },
  cartItemImage: {
    height: '100%',
    width: '100%',
  },
  cartItem: {
    height: vh(150),
    width: vw(120),
    marginTop: vh(5),
    marginHorizontal: vw(5),
  },
  cartItemUpperContainer: {
    flexDirection: 'row',
  },
  cartItemName: {
    fontSize: vw(12),
    fontWeight: '500',
    marginTop: vh(5),

    letterSpacing: 0.3,
  },
  sizePriceContainer: {
    marginHorizontal: vw(10),
  },
  sizeButton: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: vw(5),
    width: vw(60),
    borderRadius: vw(5),
    marginTop: vh(5),
  },
  selectSize: {
    fontSize: vw(12),
    fontWeight: '500',
    color: '#000',
    textTransform: 'capitalize',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vh(5),
    height: vh(30),
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: vw(10),
  },
  cartItemheading: {
    fontSize: vw(12),
    fontWeight: '500',
  },
  cartItemPrice: {
    fontSize: vw(13),
    fontWeight: '400',
  },
  cartItemPriceLineThrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
    color: 'rgba(0,0,0,0.5)',
  },
  subtotal: {
    fontSize: vw(13),
    fontWeight: '400',
  },
  cartSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: vh(50),
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.3)',
  },
  discountHeading: {
    fontSize: vw(20),
    fontWeight: '500',
    marginTop: vh(10),
    marginBottom: vh(10),
    textTransform: 'uppercase',
  },
  cartDiscountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: vh(60),
  },
  cartDiscountButton: {
    padding: vw(5),
    width: vw(100),
    borderRadius: vw(5),
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartDiscountText: {
    fontSize: vw(13),
    textTransform: 'uppercase',
  },
  cartSummaryPricetotal: {
    fontSize: vw(13),
    fontWeight: '500',
  },
  cartSummaryText: {
    fontSize: vw(13),
    fontWeight: '500',
  },
  cartDiscount: {
    fontSize: vw(13),
    fontWeight: '500',
  },
  removeButtonContainer: {
    position: 'absolute',
    bottom: vh(5),
  },
  removeButton: {
    backgroundColor: ' rgba(0,0,0,0.1)',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: vw(5),
    width: vw(70),
    borderRadius: vw(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
