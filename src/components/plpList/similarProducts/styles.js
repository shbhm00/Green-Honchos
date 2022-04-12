import {StyleSheet, Dimensions} from 'react-native';
import {vh, vw, normalize} from '../../../utils/dimension';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  renderedContainer: {
    borderWidth: 1,
    borderColor: '#f8f9fa',
    marginBottom: vh(5),
    marginLeft: vw(10),
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
  listHeaderContainer: {
    paddingTop: vh(50),
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  renderedImage: {
    height: vw(210),
    width: vw(157),
  },
  infoBox: {
    marginLeft: vw(7),
  },
  name: {
    // text
    width: vw(190) - vw(50),
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
    fontSize: vw(10),
    paddingBottom: vh(20),
  },
  similarIcon: {
    height: vh(20),
    width: vw(27),
  },
  similarProducts: {
    position: 'absolute',
    bottom: vh(95),
    right: vw(15),
    backgroundColor: '#f8f9fa',
    height: vh(35),
    width: vw(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(45) / 2,
  },
});
