import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {removeFromCart, updateQuantity} from '../store/slices/cartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartScreen = () => {
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
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.images[0]}} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.description}>
          {item.description || 'Lorem ipsum dolor sit amet consectetur.'}
        </Text>
        <Text style={styles.size}>Size: {item.selectedSize}</Text>

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
          <Ionicons name="trash-outline" size={20} color="red" />
        </View>
      </TouchableOpacity>
    </View>
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
      <FlatList
        data={cartItems}
        keyExtractor={item => `${item.id}-${item.selectedSize}`}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
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
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CartScreen;
