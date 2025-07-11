import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {removeFromCart, updateQuantity} from '../store/slices/cartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;

const sizeSupportedCategories = ['Shoes', 'Clothing', 'Hoodies', 'Lingerie'];

const CartScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: string, selectedSize: string) =>
    dispatch(removeFromCart({id, selectedSize}));

  const handleQuantityChange = (
    id: string,
    selectedSize: string,
    quantity: number,
  ) => {
    if (quantity > 0) {
      dispatch(updateQuantity({id, selectedSize, quantity}));
    }
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CategoryPDP', {product: item})}
      style={styles.itemContainer}
      activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.images[0]}} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.description}>
          {item.description || 'Lorem ipsum dolor sit amet consectetur.'}
        </Text>
        <Text style={styles.size}>
          {sizeSupportedCategories.includes(item.category)
            ? `Size: ${item.selectedSize}`
            : 'Size: One Size'}
        </Text>

        <View style={styles.priceQuantityRow}>
          <Text style={styles.price}>${item.price}</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              onPress={() =>
                handleQuantityChange(
                  item.id,
                  item.selectedSize,
                  item.quantity - 1,
                )
              }
              style={styles.qtyButton}>
              <Text style={styles.qtyText}>−</Text>
            </TouchableOpacity>
            <View style={styles.qtyValueBox}>
              <Text style={styles.qtyValue}>{item.quantity}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                handleQuantityChange(
                  item.id,
                  item.selectedSize,
                  item.quantity + 1,
                )
              }
              style={styles.qtyButton}>
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleRemove(item.id, item.selectedSize)}
        style={styles.iconLeft}>
        <View style={styles.iconCircle}>
          <Ionicons name="trash-outline" size={18} color="red" />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>Cart</Text>
      </View>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../assets/emptyCart.png')}
            style={styles.emptyImage}
          />
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => `${item.id}-${item.selectedSize}`}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}

      <View style={styles.bottomContainer}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total: </Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.checkoutButton,
            total === 0 && styles.checkoutButtonDisabled,
          ]}
          disabled={total === 0}
          // onPress={() => navigation.navigate('Wishlist')}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
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
    // width: 130,
    // height: 110,
    // borderRadius: 8,
    // resizeMode: 'cover',
    height: 120,
    aspectRatio: 0.7,
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
  size: {
    marginTop: 4,
    fontSize: 13,
    color: '#555',
  },
  price: {
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
    fontSize: 18,
  },
  priceQuantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#316bff', // blue outline
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },

  qtyValueBox: {
    backgroundColor: '#e0f0ff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 6,
    borderRadius: 4,
  },

  qtyValue: {
    fontSize: 16,
    fontWeight: '500',
  },

  iconLeft: {
    position: 'absolute',
    left: 8,
    top: 80,
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
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },

  totalSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkoutButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 10,
  },

  checkoutButtonDisabled: {
    backgroundColor: '#ccc',
  },

  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default CartScreen;
