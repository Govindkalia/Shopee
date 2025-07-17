// import React from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {RootState} from '../store';
// import {removeFromWishlist} from '../store/slices/wishlistSlice';
// import {addToCart} from '../store/slices/cartSlice';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useNavigation} from '@react-navigation/native';
// import {RootStackParamList} from '../../App';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// const screenWidth = Dimensions.get('window').width;

// const WishlistScreen = () => {
//   const navigation =
//     useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const dispatch = useDispatch();
//   const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

//   const handleRemove = (id: string) => dispatch(removeFromWishlist(id));
//   const handleMoveToCart = (product: any) => {
//     dispatch(addToCart(product));
//     dispatch(removeFromWishlist(product.id));
//   };

//   const renderItem = ({item}: any) => (
//     // <View style={styles.itemContainer}>

//     <TouchableOpacity
//       onPress={() => navigation.navigate('CategoryPDP', {product: item})}
//       style={styles.itemContainer}
//       activeOpacity={0.8}>
//       <View style={styles.imageContainer}>
//         <Image source={{uri: item.images[0]}} style={styles.image} />
//       </View>
//       <View style={styles.details}>
//         <Text style={styles.description}>
//           Lorem ipsum dolor sit amet consectetur.
//         </Text>
//         <View style={styles.priceRow}>
//           <Text style={styles.strikePrice}>${item.discounted_price}</Text>
//           <Text style={styles.price}>${item.price}</Text>
//         </View>
//         {/* <Text style={styles.sizeColor}>{item.size}</Text> */}
//       </View>
//       <TouchableOpacity
//         onPress={() => handleRemove(item.id)}
//         style={styles.iconLeft}>
//         <View style={styles.iconCircle}>
//           <Ionicons name="trash-outline" size={18} color="red" />
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => handleMoveToCart(item)}
//         style={styles.iconRight}>
//         <Ionicons name="cart-outline" size={30} color="#316bff" />
//       </TouchableOpacity>
//       {/* </View> */}
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.userName}>Wishlist</Text>
//       </View>
//       {wishlistItems.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Image
//             source={require('../assets/emptyWishlist.png')}
//             style={styles.emptyImage}
//           />
//         </View>
//       ) : (
//         <FlatList
//           data={wishlistItems}
//           keyExtractor={item => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={styles.list}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   backgroundColor: '#fff',
// },
// header: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   paddingTop: 50,
//   paddingLeft: 20,
//   // backgroundColor: '#f8f8f8',
//   justifyContent: 'space-between',
// },
// userName: {
//   fontSize: 28,
//   fontWeight: 'bold',
//   textTransform: 'capitalize',
// },
// list: {
//   paddingTop: 30,
//   padding: 20,
// },
// itemContainer: {
//   flexDirection: 'row',
//   marginBottom: 10,
//   // backgroundColor: '#fff',
//   borderRadius: 8,
//   // paddingTop: 10,
//   // marginTop: 30,
//   // position: 'relative',
// },
// imageContainer: {
//   backgroundColor: '#fff',
//   borderRadius: 10,
//   padding: 5,
//   marginBottom: 16,
//   shadowColor: '#000',
//   shadowOffset: {width: 0, height: 2},
//   shadowOpacity: 0.1,
//   shadowRadius: 4,
//   elevation: 3,
// },
// image: {
//   // width: (screenWidth / 2 + 20) / 1.9,
//   height: 120,
//   aspectRatio: 0.7,
//   borderRadius: 8,
//   resizeMode: 'cover',
// },
// details: {
//   flex: 1,
//   marginLeft: 12,
// },
// description: {
//   fontSize: 14,
//   fontWeight: '500',
// },
// priceRow: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   marginTop: 6,
// },
// strikePrice: {
//   textDecorationLine: 'line-through',
//   color: '#888',
//   marginRight: 8,
//   fontSize: 18,
// },
// price: {
//   fontWeight: 'bold',
//   color: '#000',
//   fontSize: 18,
// },
// sizeColor: {
//   marginTop: 4,
//   color: '#555',
// },
// iconLeft: {
//   position: 'absolute',
//   left: 8,
//   top: 80,
// },
// iconCircle: {
//   backgroundColor: 'white',
//   borderRadius: 15, // half of width/height to make it a circle
//   width: 30,
//   height: 30,
//   justifyContent: 'center',
//   alignItems: 'center',
//   shadowColor: '#000',
//   shadowOffset: {width: 0, height: 2},
//   shadowOpacity: 0.2,
//   shadowRadius: 2,
//   elevation: 3, // for Android shadow
// },

// iconRight: {
//   position: 'absolute',
//   right: 8,
//   top: 80,
// },
// emptyContainer: {
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',
//   padding: 20,
// },
// emptyImage: {
//   width: 200,
//   height: 200,
//   resizeMode: 'contain',
//   marginBottom: 20,
// },
// });

// export default WishlistScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {removeFromWishlist} from '../store/slices/wishlistSlice';
import {addToCart} from '../store/slices/cartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {Product} from '../types/Product';
import CustomSizeAlert from '../components/alerts/customSizeAlert';
import ConfirmActionModal from '../components/alerts/confirmActionAlert';

const screenWidth = Dimensions.get('window').width;

const sizeSupportedCategories = ['Shoes', 'Clothing', 'Hoodies', 'Lingerie'];
const defaultSizes: Record<string, string[]> = {
  Shoes: ['6', '7', '8', '9', '10', '11'],
  Clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Hoodies: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Lingerie: ['XS', 'S', 'M', 'L'],
};

const WishlistScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // const handleRemove = (id: string) => dispatch(removeFromWishlist(id));
  const handleRemove = (id: string) => {
    setItemToDelete(id);
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(removeFromWishlist(itemToDelete));
      setItemToDelete(null);
    }
    setShowDeleteAlert(false);
  };

  // const handleMoveToCart = (product: Product) => {
  //   const supportsSize = sizeSupportedCategories.includes(product.category);
  //   const hasSelectedSize = !!product.selectedSize;

  //   if (!supportsSize || hasSelectedSize) {
  //     dispatch(addToCart(product));
  //     dispatch(removeFromWishlist(product.id));
  //   } else {
  //     setSelectedProduct(product);
  //     setShowSizeModal(true);
  //   }
  // };

  const handleMoveToCart = (product: Product) => {
    const sizeSupportedCategories = [
      'Shoes',
      'Clothing',
      'Hoodies',
      'Lingerie',
    ];
    const supportsSize = sizeSupportedCategories.includes(product.category);
    const hasSelectedSize = !!product.selectedSize;

    if (!supportsSize || hasSelectedSize) {
      if (supportsSize && !product.selectedSize) {
        Alert.alert('Please select a size before adding to cart.');
        return;
      }

      dispatch(
        addToCart({
          ...product,
          selectedSize: product.selectedSize || '',
          quantity: 1,
        }),
      );
      dispatch(removeFromWishlist(product.id));
    } else {
      setSelectedProduct(product);
      setShowSizeModal(true);
    }
  };

  const confirmSizeSelection = () => {
    if (!selectedSize || !selectedProduct) {
      return;
    }

    const productWithSize = {
      ...selectedProduct,
      selectedSize,
      quantity: 1,
    };

    dispatch(addToCart(productWithSize));
    dispatch(removeFromWishlist(selectedProduct.id));
    setShowSizeModal(false);
    setSelectedProduct(null);
    setSelectedSize(null);
  };

  const renderItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CategoryPDP', {product: item})}
      style={styles.itemContainer}
      activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.images[0]}} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {item.description}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.strikePrice}>${item.discounted_price}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleRemove(item.id)}
        style={styles.iconLeft}>
        <View style={styles.iconCircle}>
          <Ionicons name="trash-outline" size={25} color="red" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleMoveToCart(item)}
        style={styles.iconRight}>
        <Ionicons name="cart-outline" size={35} color="#316bff" />
      </TouchableOpacity>
      <ConfirmActionModal
        visible={showDeleteAlert}
        title="Remove from Wishlist"
        message="Are you sure you want to remove this item from your wishlist"
        onCancel={() => setShowDeleteAlert(false)}
        onConfirm={confirmDelete}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>Wishlist</Text>
      </View>

      {wishlistItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../assets/emptyWishlist.png')}
            style={styles.emptyImage}
          />
        </View>
      ) : (
        <FlatList
          data={wishlistItems}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}

      <Modal visible={showSizeModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Size</Text>
            <View style={styles.sizeOptions}>
              {selectedProduct &&
                defaultSizes[selectedProduct.category]?.map(size => {
                  const isAvailable = selectedProduct.size?.includes(size);
                  const isSelected = selectedSize === size;
                  return (
                    <TouchableOpacity
                      key={size}
                      onPress={() => isAvailable && setSelectedSize(size)}
                      disabled={!isAvailable}
                      style={[
                        styles.sizeBox,
                        isSelected && styles.selectedSizeBox,
                        !isAvailable && styles.disabledSizeBox,
                      ]}>
                      <Text
                        style={[
                          styles.sizeText,
                          !isAvailable && styles.disabledSizeText,
                        ]}>
                        {size}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>

            <TouchableOpacity
              onPress={selectedSize ? confirmSizeSelection : undefined}
              style={[
                styles.confirmButton,
                {backgroundColor: selectedSize ? '#316bff' : '#ccc'},
              ]}
              disabled={!selectedSize}>
              <Text style={styles.confirmButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    // width: (screenWidth / 2 + 20) / 1.9,
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
    marginRight: 80,
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
    right: 12,
    top: 20,
  },
  iconCircle: {
    // backgroundColor: 'white',
    // borderRadius: 15, // half of width/height to make it a circle
    // width: 30,
    // height: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // elevation: 3, // for Android shadow
  },

  iconRight: {
    position: 'absolute',
    right: 8,
    top: 80,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sizeBox: {
    padding: 10,
    margin: 5,
    backgroundColor: '#FAF4F4',
    borderRadius: 6,
  },
  selectedSizeBox: {
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#e0f0ff',
    borderColor: '#316bff',
  },

  disabledSizeBox: {
    backgroundColor: '#e0f0ff',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  disabledSizeText: {
    color: '#aaa',
    textDecorationLine: 'line-through',
  },

  selectedSizeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#316bff',
    padding: 12,
    borderRadius: 6,
  },
  confirmButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default WishlistScreen;
