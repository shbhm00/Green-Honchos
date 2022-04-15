import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import ModalTester from '../components/modal';
import {vh, vw, normalize} from '../utils/dimension';
import PlpList from '../components/plpList';
import SimilarData from '../components/plpList/similarProducts';
import {MemoFilter} from '../components/filter';
import Header from '../components/header';
import {useDispatch, useSelector} from 'react-redux';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function PlpScreen({navigation}) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [sortData, setSortData] = useState([]);
  const [sortBy, setSortBy] = useState({code: '', index: ''});
  const [isVisible, setIsVisible] = useState({
    sortVisible: false,
    filterVisible: false,
    similarVisible: false,
  });
  const [filterData, setFilterData] = useState([]);
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterCategory, setFilterCategory] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [selectedFilterData, setSelectedFilterData] = useState([]);
  const [similarProductsList, setSimilarProductsList] = useState([]);
  const [urlKey, setUrlKey] = useState('');
  const selector = useSelector(state => state.Reducer.data);
  console.log('selector at plp', selector);
  const fetchData = async () => {
    try {
      const BASE_URL = `https://getketchpim.getketch.com/pim/pimresponse.php/?service=category&store=1`;
      const response = await fetch(
        `${BASE_URL}&url_key=men-casual-shirts&page=${page}&count=16&sort_by=${
          sortBy.code || ''
        }&sort_dir=${sortDirection || ''}&filter=${filterCategory || ''}`,
      );
      console.log('response', response);
      if (response.status === 200) {
        let dataa = await response.json();
        console.log('dataa', dataa);
        setData([...data, ...dataa.result.products]);
        let sort = dataa.result.sort.filter(item => item.code !== 'price');
        setSortData([
          ...sort,
          {code: 'priceLTH', label: 'low to high'},
          {code: 'priceHTL', label: 'high to low'},
        ]);
        setFilterData(
          dataa.result.filters.length > 0 ? dataa.result.filters : filterData,
        );
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const fetchSimilarData = async () => {
    console.log('urlKey', urlKey);
    try {
      const BASE_URL = `https://getketchpim.getketch.com/pim/pimresponse.php/?service=product&store=1`;
      const response = await fetch(
        `${BASE_URL}&url_key=${urlKey}&is_list=true`,
      );
      if (response.status === 200) {
        let dataa = await response.json();
        setSimilarProductsList(dataa?.result?.similar_product_list || []);
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, sortBy, sortDirection, filterCategory]);
  useEffect(() => {
    fetchSimilarData();
  }, [urlKey]);

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
        animationInType="slideInUp"
        animationOutType="slideOutDown"
        onClose={e => setIsVisible(e)}>
        <MemoFilter
          onClose={e => setIsVisible({...isVisible, filterVisible: e})}
          data={filterData}
          filteredData={e => {
            console.log('eeeeeee', e);
            setFilterCategory(e);
            setData([]);
          }}
          selectedData={item => setSelectedFilterData(item)}
          filter={selectedFilterData}
        />
      </ModalTester>
    );
  };
  const SimilarProductHeader = () => {
    console.log('modalHeadreCalled');
    return (
      <SafeAreaView
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#e6e6e6',
        }}>
        <View style={styles.similarHeadingContainer}>
          <Text style={styles.similarHeading}>Similar Products</Text>
          <TouchableOpacity
            onPress={() => {
              setIsVisible({...isVisible, similarVisible: false});
              setSimilarProductsList([]);
              setUrlKey('');
            }}>
            <Image
              source={{
                uri: 'https://getketch.com/images/close-icon.png',
              }}
              style={styles.crossImage}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      //   </View>
    );
  };

  const renderSimilarProducts = item => {
    return (
      <ModalTester
        isVisible={isVisible.similarVisible}
        backdropOpacity={0.3}
        animationInTime={800}
        animationInType="slideInRight"
        animationOutType="slideOutRight"
        onClose={e => {
          setIsVisible(e);
          setSimilarProductsList([]);
          setUrlKey('');
        }}>
        {similarProductsList.length > 0 ? (
          <FlatList
            data={similarProductsList}
            style={styles.modalContainerSimilar}
            ListHeaderComponent={() => <SimilarProductHeader />}
            progressViewOffset={100}
            columnWrapperStyle={styles.columnWrapper}
            numColumns={2}
            renderItem={(item, index) => (
              <SimilarData
                item={item.item}
                onItemPress={() => {
                  console.log('item on Similar', item.item);
                  // navigation.navigate('PDP', {item: item.item});
                }}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            scrollEventThrottle={400}
            decelerationRate="fast"
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.5)',
            }}>
            <ActivityIndicator size="large" color="grey" />
          </View>
        )}
      </ModalTester>
    );
  };
  const renderItem = useMemo(() => ({item}) => {
    return (
      <PlpList
        item={item}
        isSimilarProduct={true}
        similarButtonPress={() => {
          setIsVisible({...isVisible, similarVisible: true});
          setUrlKey(item.url_key);
        }}
        onItemPress={() =>
          setTimeout(() => {
            navigation.navigate('PDP', {item: item});
          }, 100)
        }
      />
    );
  });

  const shortby = () => {
    return (
      <ModalTester
        isVisible={isVisible.sortVisible}
        animationInType="slideInUp"
        animationOutType="slideOutDown"
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
  return (
    <View style={styles.container}>
      <Header
        onPress={() => alert('Sorry')}
        cartButtonPress={() => navigation.navigate('Cart')}
        // floatingText={selector.length > 0 ? selector.products.length : 0}
      />
      {data.length == 0 ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={data}
          columnWrapperStyle={styles.columnWrapper}
          numColumns={2}
          renderItem={renderItem}
          initialNumToRender={16}
          keyExtractor={(_, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            console.log('onEndReached');
            setPage(page + 1);
          }}
          // scrollEventThrottle={400}
          decelerationRate="fast"
          // onMomentumScrollBegin={()=>}
          getItemLayout={(data, index) => ({
            length: 240,
            offset: 240 * index,
            index,
          })}
          ListFooterComponent={() => {
            if (isLoading) return null;
            return (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="large" />
              </View>
            );
          }}
        />
      )}
      <View style={styles.footerButton}>
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              setIsVisible({
                ...isVisible,
                sortVisible: !isVisible.sortVisible,
              })
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
      </View>
      {/* </SafeAreaView> */}
      {shortby()}
      {filter()}
      {renderSimilarProducts()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: vw(25),
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
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // // backgroundColor: 'white',
    // position: 'absolute',
    // bottom: -vw(40),
    // zIndex: 1,
    // height: vh(60),
    height: vw(55),
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
    // paddingTop: vh(2),
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  columnWrapper: {
    flex: 1,
    justifyContent: 'space-around',
  },

  modalContainer: {
    flex: 0.5,
    backgroundColor: 'white',
    bottom: 0,
    position: 'absolute',
    height: screenHeight / 2 + vh(20),
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
  footerLoader: {
    padding: vh(50),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: vh(30),
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainerSimilar: {
    flex: 1,
    backgroundColor: 'white',
    bottom: 0,
    right: 0,
    position: 'absolute',
    height: screenHeight - vh(50),
    width: '88%',
    borderRadius: vw(5),
  },
  similarHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: vh(40),
    // justifyContent: 'center',
  },
  similarHeading: {
    fontSize: vw(20),
    textTransform: 'uppercase',
    fontWeight: '500',
    marginLeft: vw(70),
  },
  crossImage: {
    height: vh(20),
    width: vw(20),
    marginLeft: vw(40),
  },
});
