import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
export default function index({
  item,
  isSimilarProduct,
  similarButtonPress,
  onItemPress,
}) {
  return (
    <View style={styles.renderedContainer}>
      <TouchableOpacity onPress={() => onItemPress()}>
        <Image
          source={{uri: item?.image}}
          style={styles.renderedImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.infoBox}>
        <Text style={styles.brandName}>{item?.brand}</Text>
        <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>
          {item?.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.sellingPrice}>Rs. {item?.selling_price}</Text>
          <Text style={styles.price}>Rs. {item?.price}</Text>
          <Text style={styles.discount}>({item?.discount}% OFF)</Text>
        </View>
      </View>
      {isSimilarProduct && (
        <TouchableOpacity
          hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
          style={styles.similarProducts}
          onPress={() => similarButtonPress()}>
          <Image
            source={{uri: 'https://getketch.com/images/similar.png'}}
            style={styles.similarIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
