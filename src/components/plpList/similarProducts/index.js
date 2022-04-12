import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
export default function SimilarData({item, onClose, onItemPress}) {
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
    </View>
  );
}
// function similarRenderedData(prevData, nextData) {
//   return (
//     prevData.item === nextData.item &&
//     prevData.item.brandName === nextData.item.brandName &&
//     prevData.item.image === nextData.item.image
//   );
// }
// export const MemoSimilarData = React.memo(SimilarData, similarRenderedData);
