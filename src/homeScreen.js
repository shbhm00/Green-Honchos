import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import ModalTester from './components/modal';
import {vh, vw, normalize} from './utils/dimension';
import Filter from './components/filter';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [sortData, setSortData] = useState([]);
  const [sortBy, setSortBy] = useState({code: '', index: ''});
  const [isVisible, setIsVisible] = useState({
    sortVisible: false,
    filterVisible: false,
  });
  const [filterData, setFilterData] = useState([]);
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterCategory, setFilterCategory] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://ketchpim.greenhonchos.com/pim/pimresponse.php/?service=category&store=1&url_key=men-casual-shirts&page=${page}&count=16&sort_by=${sortBy.code}&sort_dir=${sortDirection}&filter=${filterCategory}`,
      );
      const {result} = await response.json();
      console.log('result', result);
      setData([...data, ...result.products]);
      let sort = result.sort.filter(item => item.code !== 'price');
      setSortData([
        ...sort,
        {code: 'priceLTH', label: 'low to high'},
        {code: 'priceHTL', label: 'high to low'},
      ]);
      setFilterData([...filterData, ...result.filters]);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, sortBy]);

  useEffect(() => {
    console.log('data', data);
    console.log('sortBy', sortBy);
    console.log('sortDirection', sortDirection);
  });

  const shortButtonPress = (item, index) => {
    if (sortBy.index === index) {
      setIsVisible(false);
      return;
    } else {
      setSortBy({
        code:
          item.code === 'priceLTH' || item.code === 'priceHTL'
            ? 'selling_price'
            : item.code,
        index: index,
      });
      setSortDirection(item.code === 'priceLTH' ? 'asc' : 'desc');
      setData([]);
      setIsVisible({...isVisible, sortVisible: false});
    }
  };
  const filter = () => {
    return (
      <ModalTester
        isVisible={isVisible.filterVisible}
        onClose={e => setIsVisible(e)}>
        <Filter
          onClose={e => setIsVisible({...isVisible, filterVisible: e})}
          data={filterData}
        />
      </ModalTester>
    );
  };
  const renderItem = useMemo(() => ({item}) => {
    return (
      <View style={styles.renderedContainer}>
        <Image source={{uri: item.image}} style={styles.renderedImage} />
        <View style={styles.infoBox}>
          <Text style={styles.brandName}>{item.brand}</Text>
          <Text style={styles.name} ellipsizeMode="clip" numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.sellingPrice}>Rs. {item.selling_price}</Text>
            <Text style={styles.price}>Rs. {item.price}</Text>
            <Text style={styles.discount}>({item.discount}% OFF)</Text>
          </View>
        </View>
      </View>
    );
  });

  const shortby = () => {
    return (
      <ModalTester
        isVisible={isVisible.sortVisible}
        onClose={e => setIsVisible(e)}>
        <View style={styles.modalContainer}>
          <Text style={styles.sortHeading}>SORT BY</Text>
          <View style={styles.horizontalLine} />
          {sortData.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => shortButtonPress(item, index)}
                style={[
                  styles.sortItem,
                  {backgroundColor: sortBy.index === index ? 'grey' : ''},
                ]}>
                <Text style={styles.sortLabel}>
                  {item.code === 'priceLTH' || item.code === 'priceHTL'
                    ? `Price: ${item.label}`
                    : item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ModalTester>
    );
  };
  const ListHeaderComponent = () => {
    return (
      <View style={styles.listHeaderContainer}>
        {/* <Image
          source={{
            uri: '	https://ketchssr.greenhonchos.com/_nuxt/img/back-arrow.8055629.png',
          }}
          style={styles.leftArrow}
        /> */}
        <Text style={styles.heading}>KETCH</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* <SafeAreaView> */}
      <ListHeaderComponent />
      {data.length == 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={data}
          columnWrapperStyle={styles.columnWrapper}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            setPage(page + 1);
          }}
          scrollEventThrottle={400}
          decelerationRate="fast"
        />
      )}
      <View style={styles.footerButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setIsVisible({...isVisible, sortVisible: !isVisible.sortVisible})
          }>
          <Text style={styles.footerButtonText}>SORT BY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setIsVisible({
              ...isVisible,
              filterVisible: true,
            })
          }>
          <Text Text style={styles.footerButtonText}>
            FILTER
          </Text>
        </TouchableOpacity>
      </View>
      {/* </SafeAreaView> */}
      {shortby()}
      {filter()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: vw(30),
    marginLeft: vw(20),
    marginBottom: vh(10),
  },
  renderedContainer: {
    borderWidth: 1,
    borderColor: '#f8f9fa',
    marginBottom: vh(5),
  },
  footerButton: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    height: vh(60),
  },
  button: {
    borderWidth: 1,
    borderColor: '#f8f9fa',
    width: screenWidth / 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(10),
  },
  footerButtonText: {
    fontSize: vw(17),
    fontWeight: '500',
  },
  listHeaderContainer: {
    paddingTop: vh(50),
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  leftArrow: {
    height: vh(20),
    width: vw(20),
    marginLeft: vw(10),
  },
  renderedImage: {
    height: vh(240),
    width: vw(190),
  },
  columnWrapper: {
    flex: 1,
    justifyContent: 'space-around',
  },
  infoBox: {
    marginLeft: vw(7),
  },
  name: {
    // text
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: vh(7),
  },
  brandName: {
    fontWeight: '500',
    letterSpacing: vw(0.3),
    marginBottom: vh(5),
    marginTop: vh(5),
  },
  sellingPrice: {
    marginRight: vh(5),
    fontWeight: '500',
    fontSize: vw(12),
  },
  price: {
    color: 'grey',
    textDecorationLine: 'line-through',
    marginRight: vw(5),
    fontSize: vw(12),
  },
  discount: {
    color: 'red',
    fontSize: vw(12),
    paddingBottom: vh(20),
  },
  modalContainer: {
    flex: 0.5,
    backgroundColor: 'white',
    bottom: 0,
    position: 'absolute',
    height: screenHeight / 2,
    width: '100%',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    width: '100%',
  },
  sortHeading: {
    textAlign: 'center',
    fontSize: vw(22),
    fontWeight: '500',
    marginVertical: vh(15),
  },
  sortLabel: {
    fontSize: vw(17),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  sortItem: {
    padding: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
});
