import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {vh, vw, normalize} from '../../utils/dimension';
import ToggleCheckBox from '../toggleCheckBox';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function Filter({onClose, data, filteredData}) {
  const [focusedData, setFocusedData] = useState({
    isFocused: false,
    data: [],
    FocusedIndex: null,
  });
  const [checked, setChecked] = useState({
    clicked: false,
    data: new Set(),
  });

  const clearAll = () => {
    checked.data.clear();
    selectedFilters.clear();
  };

  const [selectedFilters, setSelectedFilters] = useState(new Set());
  const leftSideContainer = () => {
    return (
      <View style={styles.leftContainer}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                {
                  backgroundColor:
                    focusedData.isFocused && focusedData.FocusedIndex === index
                      ? 'white'
                      : '#f8f9fa',
                },
                {
                  borderColor:
                    focusedData.isFocused && focusedData.FocusedIndex === index
                      ? 'white'
                      : 'rgba(150, 150, 150, 0.2)',
                },
              ]}
              key={index}
              onPress={() =>
                setFocusedData({
                  ...focusedData,
                  isFocused: true,
                  data: item.options,
                  FocusedIndex: index,
                })
              }>
              <Text style={styles.categoryText}>{item.filter_lable}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const toggleOnPress = (item, index) => {
    if (checked.data.has(item)) {
      checked.data.delete(item);
      selectedFilters.delete(`${item.code}~${item.value.split(' ').join('+')}`);
      filteredData(selectedFilters.size > 0 ? selectedFilters.join('|') : null);
      setChecked({...checked, clicked: false});
    } else {
      checked.data.add(item);
      selectedFilters.add(`${item.code}~${item.value.split(' ').join('+')}`);
      setChecked({...checked, clicked: true});
    }

    // selectedFilters.add(`${item.code}~${item.value.split(' ').join('+')}`);
    // console.log('checked', checked);
  };
  console.log('checked', checked);
  console.log('selectedFilters', selectedFilters);
  const rightSideContainer = () => {
    return (
      <View styles={styles.rightContainer}>
        {focusedData.isFocused ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {Array.isArray(focusedData.data)
              ? focusedData.data.map((item, index) => {
                  return (
                    <View style={styles.subcategoryValue} key={index}>
                      <ToggleCheckBox
                        onPress={() => toggleOnPress(item, index)}
                        checked={
                          checked.data.has(item)
                          //   &&
                          //   checked.selectedIndex.has(index)
                        }
                      />
                      {item.color_code ? (
                        <View
                          style={[
                            styles.colorCode,
                            {
                              backgroundColor: item.color_code
                                ? `${item.color_code}`
                                : 'white',
                            },
                          ]}></View>
                      ) : (
                        <></>
                      )}
                      <Text style={styles.valueStyle}>{item.value}</Text>
                    </View>
                  );
                })
              : Object.values(focusedData.data).map((item, index) => {
                  return (
                    <View style={styles.subcategoryValue} key={index}>
                      <ToggleCheckBox
                        onPress={() => toggleOnPress(item, index)}
                        checked={checked.data.has(item)}
                      />
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
          <View style={styles.headerContainer}>
            <Text style={styles.heading}>Filter</Text>
            {checked.data.size > 0 ? (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => clearAll()}>
                <Text>Clear All</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          {/* <HorizontalLine /> */}
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: vh(10),
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  clearButton: {
    padding: vh(5),
    borderWidth: 1,
    marginRight: vw(20),
    borderRadius: vw(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: vw(25),
    marginLeft: vw(20),
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

    height: screenHeight,
  },
  categoryButton: {
    padding: vh(15),
    borderWidth: 0.5,
    // borderColor: 'rgba(150, 150, 150, 0.2)',
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
  colorCode: {
    height: vh(20),
    width: vw(20),
    borderRadius: vw(10),
    borderWidth: 0.5,
    borderColor: 'grey',
  },
});
