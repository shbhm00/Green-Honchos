import {StyleSheet, Dimensions} from 'react-native';
import {vh, vw, normalize} from '../../utils/dimension';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  renderedContainer: {
    borderWidth: 1,
    borderColor: '#f8f9fa',
    marginBottom: vh(5),
    flex: 1,
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
    aspectRatio: 3 / 4,
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
    width: vw(190) - vw(10),
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
  similarIcon: {
    height: vw(20),
    width: vw(27),
  },
  similarProducts: {
    position: 'absolute',
    bottom: vw(100),
    right: vw(15),
    backgroundColor: '#f8f9fa',
    height: vw(35),
    width: vw(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(35) / 2,
  },
});
