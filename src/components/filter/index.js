import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {vh, vw, normalize} from '../../utils/dimension';
import ToggleCheckBox from '../toggleCheckBox';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export function Filter({onClose, data, filteredData, selectedData, filter}) {
  const [focusedData, setFocusedData] = useState({
    isFocused: true,
    data: Object.values(data[0].options),
    FocusedIndex: 0,
  });
  const [checked, setChecked] = useState(filter);
  const [selectedFilters, setSelectedFilters] = useState(new Set());

  console.log('filter', filter);
  const clearAll = () => {
    setChecked([]);
    filteredData(selectedFilters.clear());
    selectedData([]);
    // filter.clear();
  };

  useEffect(() => {
    console.log('filterComponent called');
    if (filter.size > 0) {
      console.log('filterComponent called');
      checked.push(...filter);
    }
  }, []);
  console.log('checked', checked);
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
              onPress={() => {
                console.log('index', index);
                setFocusedData({
                  isFocused: true,
                  data: item.options,
                  FocusedIndex: index,
                });
              }}>
              <Text style={styles.categoryText}>{item.filter_lable}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const toggleOnPress = (item, index) => {
    console.log('item at filter', item);
    if (checked.includes(item.value_key)) {
      checked.splice(checked.indexOf(item.value_key), 1);
      selectedFilters.delete(`${item.code}~${item.value_key}`);
      filteredData(
        selectedFilters.size > 0 ? [...selectedFilters].join('|') : null,
      );
      selectedData(checked);
      console.log('checked Data delete', checked);
    } else {
      checked.push(item.value_key);
      selectedFilters.add(`${item.code}~${item.value_key}`);
      filteredData(
        selectedFilters.size > 0 ? [...selectedFilters].join('|') : null,
      );
      selectedData(checked);
      console.log('checked Data added', checked);
    }
  };

  const rightSideContainer = () => {
    return (
      <View styles={styles.rightContainer}>
        {focusedData.isFocused ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {Array.isArray(focusedData.data)
              ? focusedData.data.map((item, index) => {
                  return (
                    <View style={styles.subcategoryValue} key={index}>
                      {filter.some(el => el === item.value_key) ? (
                        <ToggleCheckBox
                          onPress={() => {
                            console.log('toggled true');
                            toggleOnPress(item, index);
                          }}
                          checked={true}
                        />
                      ) : (
                        <ToggleCheckBox
                          onPress={() => {
                            toggleOnPress(item, index);
                          }}
                          checked={false}
                        />
                      )}
                      {item.color_code ? (
                        <View
                          style={[
                            styles.colorCode,
                            {
                              backgroundColor: item.color_code
                                ? `${item.color_code}`
                                : 'white',
                            },
                          ]}
                        />
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
                      {filter.some(el => el === item.value_key) ? (
                        <ToggleCheckBox
                          onPress={() => {
                            console.log('toggled true');
                            toggleOnPress(item, index);
                          }}
                          checked={true}
                        />
                      ) : (
                        <ToggleCheckBox
                          onPress={() => {
                            console.log('toggled false');
                            toggleOnPress(item, index);
                          }}
                          checked={false}
                        />
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
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Filter</Text>
          {checked.length > 0 ? (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => clearAll()}>
              <Text>Clear All</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </SafeAreaView>
      {/* <HorizontalLine /> */}
      <View style={styles.filterBoxes}>
        {leftSideContainer()}
        {rightSideContainer()}
      </View>
      <View style={styles.footerButton}>
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onClose(false);
            }}>
            <Text style={styles.footerButtonText}>close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onClose(false)}>
            <Text style={[styles.footerButtonText, {color: 'red'}]}>apply</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    height: vw(55),
    backgroundColor: 'white',
    position: 'absolute',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    zIndex: 1,
    bottom: 0,
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
    height: vw(20),
    width: vw(20),
    borderRadius: vw(10),
    borderWidth: 0.5,
    borderColor: 'grey',
  },
});
export const MemoFilter = React.memo(Filter);
