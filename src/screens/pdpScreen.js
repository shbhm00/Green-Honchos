import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {vh, vw, normalize} from '../utils/dimension';
import {leftArrow, rightArrow, back, cart} from '../assests';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../actions/actions';
import Header from '../components/header';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function PdpScreen({route, navigation}) {
  console.log('route', route.params.item);
  let sliderLength = route.params.item.gallery.length;
  const dispatch = useDispatch();
  const selecter = useSelector(state => state);
  let sizeofCart = selecter.Reducer.data.length;
  const flatlistRef = useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isLoading, setLoading] = React.useState(true);
  const [productOptions, setProductOptions] = React.useState('');

  const {
    id_product,
    product_options,
    name,
    group_id,
    sku,
    master_sku,
    price,
    qty_ordered,
    selling_price,
    store,
  } = route.params.item;
  const [size, setSize] = React.useState(
    Object.values(route.params.item.variation),
  );
  console.log('size', size);
  const renderItem = ({item, floatingNumber}) => {
    // let {height, width} = Image.getSize(item.image || '', screenWidth);
    return (
      <Image
        source={{uri: item.image}}
        style={{
          width: screenWidth,
          height: 'auto',
          aspectRatio: 3 / 4,
        }}
        onLoadEnd={() => setLoading(false)}
        resizeMode="contain"
      />
    );
  };
  const scrollToIndex = index => {
    flatlistRef.current.scrollToIndex({
      animated: true,
      index: index,
    });
  };

  const addToCartPressed = async () => {
    try {
      const response = await fetch(
        'https://ketchcart-pim.greenhonchos.com/api/v1/product/add-product',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_id: id_product,
            product_parent_id: id_product,
            product_options: productOptions || 'S',
            name: name,
            group_id: group_id,
            sku: sku,
            master_sku: master_sku,
            price: price,
            qty_ordered: qty_ordered || 1,
            final_price: selling_price,
            store: store,
          }),
        },
      );
      const json = await response.json();
      console.log('json', json);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header onPress={() => navigation.goBack()} />
      <ScrollView style={{flex: 1}}>
        <View style={styles.dotContainer}>
          {route.params.item.gallery.map((item, index) => {
            return (
              <TouchableOpacity
                style={[
                  styles.dots,
                  {backgroundColor: activeIndex === index ? 'red' : 'black'},
                ]}
                onPress={() => scrollToIndex(index)}></TouchableOpacity>
            );
          })}
        </View>
        <FlatList
          ref={flatlistRef}
          data={route.params.item.gallery}
          keyExtractor={item => item.index}
          horizontal={true}
          renderItem={renderItem}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          initialScrollIndex={0}
          onMomentumScrollEnd={({nativeEvent}) => {
            scrollX.setValue(nativeEvent.contentOffset.x);
            if (nativeEvent.contentOffset.x === 0) {
              setActiveIndex(0);
            } else if (nativeEvent.contentOffset.x % screenWidth === 0) {
              setActiveIndex(nativeEvent.contentOffset.x / screenWidth);
            }
          }}
        />
        <View style={styles.sliderButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              scrollToIndex(activeIndex - 1);
            }}
            disabled={activeIndex === 0}
            style={styles.sliderButton}>
            <Image source={leftArrow} style={styles.sliderButtonImage} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => {
              scrollToIndex(activeIndex + 1);
            }}
            disabled={activeIndex === sliderLength - 1}>
            <Image source={rightArrow} style={styles.sliderButtonImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.brandName}>{route.params.item.brand}</Text>
          <Text style={styles.desc}>
            {route.params.item.brand} {route.params.item.description}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.sellingPrice}>
              Rs. {route.params.item.selling_price}
            </Text>
            <Text style={styles.price}>Rs. {route.params.item?.price}</Text>
            <Text style={styles.discount}>
              ({route.params.item?.discount}% OFF)
            </Text>
          </View>
        </View>
        <View style={styles.sizeContainer}>
          <Text style={styles.size}>Select Size</Text>
          <View style={styles.sizeList}>
            {size.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sizeItem,
                    {
                      borderColor:
                        productOptions === item.size ? 'red' : 'black',
                    },
                  ]}
                  onPress={() => {
                    setProductOptions(item.size);
                  }}>
                  <Text
                    style={[
                      styles.sizeText,
                      {
                        color: productOptions === item.size ? 'red' : 'black',
                      },
                    ]}>
                    {item.size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={{paddingBottom: vh(50)}}></View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>WishList</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addToCartPressed()}
            style={[styles.footerButton, {backgroundColor: 'black'}]}>
            <Text style={[styles.footerButtonText, {color: 'white'}]}>
              Add to cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  heading: {
    fontSize: vw(25),
    fontWeight: '500',
    marginLeft: vw(20),
    textTransform: 'uppercase',
  },
  headingContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    flexDirection: 'row',
    alignItems: 'center',
    height: vh(90),
  },
  backIcon: {
    height: vh(25),
    width: vw(25),
    marginLeft: vw(10),
  },
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: vw(330),
    zIndex: 1,
    left: vw(120),
  },
  dots: {
    height: normalize(10),
    width: normalize(10),
    marginHorizontal: vw(5),
    borderRadius: normalize(5),
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: vh(20),
  },
  brandName: {
    fontSize: vw(20),
    fontWeight: '500',
    letterSpacing: vw(0.5),
  },
  desc: {
    fontSize: vw(17),
    width: '85%',
    fontWeight: '400',
    letterSpacing: vw(0.5),
    marginTop: vh(10),
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(10),
  },
  sellingPrice: {
    fontSize: vw(16),
    fontWeight: '500',
    letterSpacing: vw(0.2),
    marginRight: vw(10),
  },
  price: {
    fontSize: vw(14),
    letterSpacing: vw(0.5),
    marginRight: vw(10),
    color: '#979797',
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: vw(16),
    fontWeight: '500',
    letterSpacing: vw(0.2),
    color: 'red',
  },
  sliderButtonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: vw(200),
    zIndex: 1,
  },
  sliderButton: {
    height: vh(50),
    width: vw(70),
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: screenWidth - vw(140),
  },
  sliderButtonImage: {
    height: vw(30),
    width: vw(30),
    tintColor: 'rgba(255,255,255,0.5)',
  },
  footerContainer: {
    height: vh(70),
    backgroundColor: 'white',
    position: 'absolute',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    zIndex: 1,
    bottom: 0,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowColor: '#000000',
    elevation: 4,
    shadowOpacity: 0.1,
  },
  footerButtonContainer: {
    flexDirection: 'row',
    width: screenWidth,
  },
  footerButton: {
    height: vh(50),
    width: screenWidth / 2 - vw(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: vw(10),
    marginHorizontal: vw(10),
  },
  footerButtonText: {
    fontSize: vw(15),
    fontWeight: '500',
    letterSpacing: vw(0.5),
    textTransform: 'uppercase',
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
  sizeContainer: {
    marginTop: vh(20),
    marginBottom: vh(20),
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
  },
  size: {
    fontSize: vw(20),
    fontWeight: '500',
    letterSpacing: vw(0.5),
    textTransform: 'uppercase',
    marginTop: vh(10),
  },
  sizeItem: {
    marginVertical: vh(10),
    marginHorizontal: vw(5),
    alignItems: 'center',
    justifyContent: 'center',
    height: vw(40),
    width: vw(40),
    borderRadius: vw(25),
    borderWidth: 1,
  },
  sizeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
