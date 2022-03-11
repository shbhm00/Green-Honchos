import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import BaseLayout from './components/baseLayout';
import {vh, vw, normalize} from './utils/dimension';
import {useSelector, useDispatch} from 'react-redux';
import Card from './components/card';
import {deleteInfo, EmployeeId} from './actions/actions';
export default function HomeScreen({navigation}) {
  const selector = useSelector(state => state.Reducer.data);
  const dispatch = useDispatch();
  console.log('selector', selector);
  return (
    <View style={styles.container}>
      <BaseLayout>
        {selector?.map((item, index) => {
          // console.log('item', item.image);
          return (
            <Card
              empName={item.firstName}
              empId={selector?.length > 0 ? item.empId : null}
              date={item.date}
              editPress={() =>
                navigation.navigate('Add / Edit Employee', {item})
              }
              avatar={item.image}
              deletePress={() => dispatch(deleteInfo(item?.empId))}
            />
          );
        })}
        <View style={styles.addButton}>
          <Button
            icon="plus"
            mode="contained"
            contentStyle={styles.addButtonContent}
            labelStyle={{fontSize: vw(40)}}
            style={styles.addButtonStyle}
            onPress={() => {
              // dispatch(EmployeeId(empId + 1));
              navigation.navigate('Add / Edit Employee');
            }}
          />
        </View>
      </BaseLayout>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addButton: {
    position: 'absolute',
    bottom: vh(40),
    left: vw(130),
  },
  addButtonContent: {
    height: normalize(40),
    width: normalize(40),
    marginLeft: vw(5),
  },
  addButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: normalize(80),
    width: normalize(80),
    borderRadius: 40,
  },
});
