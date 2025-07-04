import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {removeFromWishlist} from '../store/slices/wishlistSlice';
import {addToCart} from '../store/slices/cartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WishlistScreen = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const handleRemove = (id: string) => dispatch(removeFromWishlist(id));
  const handleMoveToCart = (product: any) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
  };

  const renderItem = ({item}: any) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.images[0]}} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur.
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.strikePrice}>${item.discounted_price}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        {/* <Text style={styles.sizeColor}>{item.size}</Text> */}
      </View>
      <TouchableOpacity
        onPress={() => handleRemove(item.id)}
        style={styles.iconLeft}>
        <View style={styles.iconCircle}>
          <Ionicons name="trash-outline" size={20} color="red" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleMoveToCart(item)}
        style={styles.iconRight}>
        <Ionicons name="cart-outline" size={30} color="#316bff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>Wishlist</Text>
      </View>
      <FlatList
        data={wishlistItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingLeft: 20,
    // backgroundColor: '#f8f8f8',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  list: {
    paddingTop: 30,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    // backgroundColor: '#fff',
    borderRadius: 8,
    // paddingTop: 10,
    // marginTop: 30,
    // position: 'relative',
  },
  imageContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 130,
    height: 110,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  strikePrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    marginRight: 8,
    fontSize: 18,
  },
  price: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },
  sizeColor: {
    marginTop: 4,
    color: '#555',
  },
  iconLeft: {
    position: 'absolute',
    left: 12,
    top: 75,
  },
  iconCircle: {
    backgroundColor: 'white',
    borderRadius: 15, // half of width/height to make it a circle
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // for Android shadow
  },

  iconRight: {
    position: 'absolute',
    right: 8,
    top: 80,
  },
});

export default WishlistScreen;
