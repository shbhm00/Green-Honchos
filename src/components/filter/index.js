import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {vh, vw, normalize} from '../../utils/dimension';
import HorizontalLine from '../../utils/horizontalLine';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function Filter({onClose, data}) {
  const [focusedData, setFocusedData] = useState({isFocused: false, data: []});
  console.log('dtaaaa', data);
  const leftSideContainer = () => {
    console.log('dataaaa at categoryyy', focusedData.data);
    return (
      <View style={styles.leftContainer}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              style={[styles.categoryButton]}
              onPress={() =>
                setFocusedData({
                  ...focusedData,
                  isFocused: true,
                  data: [...item.options],
                })
              }>
              <Text style={styles.categoryText}>{item.filter_lable}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const rightSideContainer = () => {
    return (
      <View styles={styles.rightContainer}>
        {focusedData.isFocused ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {focusedData.data.map((item, index) => {
              return (
                <View style={styles.subcategoryValue}>
                  {item.color_code ? (
                    <View
                      style={{
                        height: vh(20),
                        width: vw(20),
                        backgroundColor: item.color_code
                          ? `${item.color_code}`
                          : 'white',
                        borderRadius: vw(10),
                        borderWidth: 0.5,
                        borderColor: 'grey',
                      }}></View>
                  ) : (
                    <></>
                  )}
                  <Text style={styles.valueStyle}>{item.value}</Text>
                </View>
              );
            })}
          </ScrollView>
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.modalContainer}>
      <SafeAreaView>
        <View>
          <Text style={styles.heading}>Filter</Text>
          <HorizontalLine />
          <View style={styles.footerButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onClose(false)}>
              <Text style={styles.footerButtonText}>close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={[styles.footerButtonText, {color: 'red'}]}>
                apply
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterBoxes}>
            {leftSideContainer()}
            {rightSideContainer()}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    bottom: 0,
    position: 'absolute',
    height: screenHeight,
    width: '100%',
  },
  heading: {
    fontSize: vw(25),
    marginLeft: vw(20),
    marginBottom: vh(15),
    textTransform: 'uppercase',
  },
  footerButton: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    position: 'absolute',
    top: screenHeight - vh(100),
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
    textTransform: 'uppercase',
  },
  filterBoxes: {
    flexDirection: 'row',
  },
  leftContainer: {
    width: '40%',
    height: screenHeight,
    backgroundColor: '#f8f9fa',
  },
  rightContainer: {
    width: '60%',
    backgroundColor: 'green',
    height: screenHeight,
  },
  categoryButton: {
    padding: vh(15),
    borderWidth: 0.5,
    borderColor: 'rgba(150, 150, 150, 0.2)',
  },
  categoryText: {
    fontSize: vw(13),
    fontWeight: '500',
  },
  subcategoryValue: {
    padding: vh(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueStyle: {
    marginLeft: vw(10),
  },
});
