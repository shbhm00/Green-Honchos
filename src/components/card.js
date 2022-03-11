import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {deleteIcon, editIcon, profile} from '../assests';
import {vh, vw} from '../utils/dimension';
export default function Card({
  empName,
  empId,
  deletePress,
  date,
  editPress,
  avatar,
}) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.subContainer}>
        <View style={styles.infoContainer}>
          {/* for avatar */}
          <Image
            source={avatar ? {uri: avatar} : profile}
            style={styles.avatarPic}
          />
          {/* for name and emp id */}
          <View>
            <Text style={styles.empText}>{empName}</Text>
            <Text style={styles.epmIDText}>{`#${empId}`}</Text>
          </View>
        </View>
        <Text style={styles.dateText}>{date}</Text>
        <View style={styles.buttonContainer}>
          {/* for edit */}
          <TouchableOpacity onPress={editPress}>
            <Image source={editIcon} style={styles.icon} />
          </TouchableOpacity>
          {/* for delete */}
          <TouchableOpacity onPress={() => deletePress()}>
            <Image source={deleteIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    height: vh(120),
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e9eeff',
    marginVertical: vh(8),
    justifyContent: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  edit: {
    height: vw(30),
    width: vw(30),
  },
  delete: {
    height: vw(30),
    width: vw(30),
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  icon: {
    height: vw(30),
    width: vw(30),
    marginHorizontal: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  empText: {
    fontSize: vw(16),
    fontWeight: '700',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
  epmIDText: {
    fontSize: vw(13),
    fontWeight: '500',
  },
  dateText: {
    fontSize: vw(17),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  avatarPic: {
    height: vw(55),
    width: vw(55),
    marginHorizontal: vw(10),
    borderRadius: vw(30),
  },
});
