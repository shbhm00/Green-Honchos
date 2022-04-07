import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState, useCallback} from 'react';
import BaseLayout from '../components/baseLayout';
import Input from '../components/textInput';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {info} from '../actions/actions';
import DatePicker from 'react-native-date-picker';
import * as ImagePicker from 'react-native-image-picker';
import {dummyImage} from '../assests';
import {vh, vw, normalize} from '../utils/dimension';
const includeExtra = true;
export default function EmployEntry({navigation, route}) {
  console.log('routes', route);
  const [imageContainer, setImageContainer] = useState(null);
  const [firstName, setFirstName] = useState(
    route?.params?.item?.firstName || '',
  );
  const [lastName, setLastName] = useState(route?.params?.item?.lastName || '');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const selector = useSelector(state => state.Reducer.data);
  const [empId, setEmpId] = useState(() => {
    if (route.params?.item?.empId) {
      return route.params?.item.empId;
    } else if (selector.length > 0) {
      return selector[selector.length - 1].empId + 1;
    } else {
      return Math.floor(10000 + Math.random() * 90000);
    }
  });
  console.log(
    'selector empId',
    imageContainer,
    'route Image',
    route.params?.item?.image,
  );
  // console.log('imageContainer', imageContainer?.assets[0]?.uri);
  const dispatch = useDispatch();
  let month = String(date.getMonth() + 1);
  let year = String(date.getFullYear());
  let day = String(date.getDate());

  console.log('date', date.to);
  console.log('firstName', firstName);
  const dateGetter = () => {
    return (
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    );
  };

  const onPress = () => {
    // if(route.params.item.empId?setEmpId(route.params.item.empId):setEmpId(empId+1)){
    dispatch(
      info([
        firstName,
        lastName,
        `${day}/${month}/${year}`,
        imageContainer?.assets[0]?.uri,
        empId,
      ]),
    );
    navigation.goBack();
  };

  const uploadImage = useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(
        {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 200,
          maxWidth: 200,
        },
        res => {
          console.log('res', res);
          setImageContainer({res});
        },
      );
    } else {
      ImagePicker.launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 200,
          maxWidth: 200,
          includeExtra,
        },
        res => {
          console.log('res', res);
          setImageContainer({...res, assets: [...res.assets]});
        },
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <BaseLayout>
        <Text style={styles.header}>PERSONAL DATA</Text>
        <Text style={styles.inputHeading}>FIRST NAME</Text>
        <Input
          onFocus={() => {}}
          placeholder="First Name"
          onChangeText={text => setFirstName(text)}
          value={firstName}
        />
        <Text style={styles.inputHeading}>SECOND NAME</Text>
        <Input
          onFocus={() => {}}
          placeholder="Last Name"
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
        <Text style={styles.inputHeading}>DATE OF JOINING</Text>
        <Input
          placeholder="Pick Date"
          onFocus={() => setOpen(true)}
          value={`${day}/${month}/${year}`}
        />
        {dateGetter()}
        <Text style={styles.inputHeading}>UPLOAD IMAGE</Text>
        <View>
          {imageContainer === null ? (
            <TouchableOpacity onPress={() => uploadImage()}>
              <Image
                source={
                  route?.params?.item?.image
                    ? {uri: route?.params?.item?.image}
                    : dummyImage
                }
                style={
                  route?.params?.item?.image
                    ? styles.profileImage
                    : styles.image
                }
              />
            </TouchableOpacity>
          ) : (
            <View>
              {imageContainer?.assets?.map((item, index) => {
                return (
                  <View key={item?.uri} horizontal={true}>
                    <Image
                      source={{uri: item?.uri}}
                      style={styles.uploadImage}
                      resizeMode="cover"
                    />
                  </View>
                );
              })}
            </View>
          )}
        </View>
        <Button
          mode="contained"
          labelStyle={{padding: 5}}
          style={{marginTop: 50}}
          onPress={() => {
            onPress();
          }}>
          Save Changes
        </Button>
      </BaseLayout>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginVertical: vh(30),
    fontSize: vw(20),
  },
  inputHeading: {
    fontSize: vw(12),
    marginTop: vh(10),
  },
  dummyImage: {
    height: vw(50),
    width: vw(50),
    marginTop: vh(15),
    tintColor: 'grey',
  },
  profileImage: {
    height: vw(100),
    width: vw(100),
    marginTop: vh(15),
    borderRadius: vw(50),
  },
  uploadImage: {
    height: normalize(130),
    width: normalize(130),
    borderWidth: 1,
    borderRadius: vw(65),
    marginVertical: vh(20),
  },
});
