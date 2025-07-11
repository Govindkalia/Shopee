import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Product} from '../types/Product';
import {useDispatch, useSelector} from 'react-redux';
import {addToWishlist} from '../store/slices/wishlistSlice';
import {addToCart} from '../store/slices/cartSlice';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootState} from '../store';
import {RootStackParamList, TabParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CustomSizeAlert from '../components/alerts/customSizeAlert';

type RouteParams = {
  PDP: {
    product: Product;
  };
};

const CategoryPDPScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'PDP'>>();
  const {product} = route.params;

  const dispatch = useDispatch();
  // const navigation = useNavigation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [wishlisted, setWishlisted] = useState(false);

  const defaultSizes: Record<string, string[]> = {
    Shoes: ['6', '7', '8', '9', '10', '11'],
    Clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    Hoodies: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    Lingerie: ['XS', 'S', 'M', 'L'],
    Bags: [],
    Watch: [],
  };

  const sizeSupportedCategories = ['Shoes', 'Clothing', 'Hoodies', 'Lingerie'];
  const category = product.category;
  const supportsSize = sizeSupportedCategories.includes(category);
  const allCategorySizes = defaultSizes[category] || [];
  const availableSizes = product.size || [];

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some(item =>
    supportsSize
      ? item.id === product.id && item.selectedSize === selectedSize
      : item.id === product.id,
  );

  const [showAlert, setShowAlert] = useState(false);

  React.useEffect(() => {
    if (!supportsSize && (category === 'Bags' || category === 'Watch')) {
      setSelectedSize('One Size');
    }
  }, [category, supportsSize]);

  const handleWishlist = () => {
    const productWithSize = supportsSize
      ? {...product, selectedSize: selectedSize || undefined}
      : {...product, selectedSize: 'One Size'};

    dispatch(addToWishlist(productWithSize));

    setWishlisted(!wishlisted);
  };

  const handleBuyNow = () => {
    if (supportsSize && !selectedSize) {
      setShowAlert(true);
      return;
    }
    dispatch(addToCart({...product, selectedSize: selectedSize!, quantity: 1}));
    navigation.navigate('MainTabs', {
      screen: 'Cart',
    });
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <View style={{position: 'relative'}}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#316bff" />
          </TouchableOpacity>

          {/* Swiper */}
          <Swiper
            style={styles.swiper}
            showsPagination
            autoplay
            autoplayTimeout={3}>
            {product.images.map((img, index) => (
              <View key={index} style={{flex: 1}}>
                <Image source={{uri: img}} style={styles.productImage} />
              </View>
            ))}
          </Swiper>
        </View>

        <View style={styles.content}>
          <View style={styles.priceRow}>
            <Text style={styles.strikePrice}>${product.discounted_price}</Text>

            <Text style={styles.price}>${product.price}</Text>
          </View>
          <Text style={styles.description}>{product.description}</Text>

          {(supportsSize && allCategorySizes.length > 0) ||
          (!supportsSize && selectedSize === 'One Size') ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Size</Text>
              <View style={styles.sizeContainer}>
                {supportsSize ? (
                  allCategorySizes.map((size, index) => {
                    const isAvailable = availableSizes.includes(size);
                    const isSelected = selectedSize === size;
                    return (
                      <TouchableOpacity
                        key={`${size}-${index}`}
                        style={[
                          styles.sizeBox,
                          isSelected && styles.selectedSizeBox,
                          !isAvailable && styles.disabledSizeBox,
                        ]}
                        onPress={() => isAvailable && setSelectedSize(size)}
                        disabled={!isAvailable}>
                        <Text
                          style={[
                            styles.sizeText,
                            !isAvailable && styles.disabledSizeText,
                          ]}>
                          {size}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <View style={[styles.sizeBox, styles.selectedSizeBox]}>
                    <Text style={styles.sizeText}>One Size</Text>
                  </View>
                )}
              </View>
            </View>
          ) : null}

          {/* Specifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <Text style={styles.subTitle}>Material:</Text>
            <View style={styles.boxContainer}>
              {product.material.map((item, index) => (
                <View key={index} style={styles.materialBox}>
                  <Text style={styles.boxText}>{item}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.subTitle}>Origin:</Text>
            <View style={styles.boxContainer}>
              <View style={styles.originBox}>
                <Text style={styles.boxText}>{product.origin}</Text>
              </View>
            </View>
          </View>

          {/* Delivery Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Options</Text>
            <View style={styles.deliveryOption}>
              <Text style={styles.deliveryType}>Standard</Text>
              <Text style={styles.deliveryTime}>5-7 days</Text>
              <Text style={styles.deliveryPrice}>$3.00</Text>
            </View>
            <View style={styles.deliveryOption}>
              <Text style={styles.deliveryType}>Express</Text>
              <Text style={styles.deliveryTime}>1-2 days</Text>
              <Text style={styles.deliveryPrice}>$12.00</Text>
            </View>
          </View>

          {/* Reviews */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rating & Reviews</Text>
            <Text style={styles.reviewUser}>Veronika</Text>
            <Text style={styles.reviewText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All Reviews</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={handleWishlist}>
          <Ionicons
            name={isWishlisted ? 'heart' : 'heart-outline'}
            size={33}
            color={isWishlisted ? 'red' : 'black'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            if (supportsSize && !selectedSize) {
              setShowAlert(true); // Show custom alert.
              return;
            }
            if (!isInCart) {
              dispatch(
                addToCart({
                  ...product,
                  selectedSize: selectedSize ?? '',
                  quantity: 1,
                }),
              );
            } else {
              navigation.navigate('MainTabs', {
                screen: 'Cart',
              });
            }
          }}>
          <Text style={styles.cartText}>
            {isInCart ? 'Go to Cart' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>

        <CustomSizeAlert
          visible={showAlert}
          title="Size Required"
          message="Please select a size."
          onClose={() => setShowAlert(false)}
        />

        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  container: {backgroundColor: '#fff', marginBottom: 90},
  backButton: {
    position: 'absolute',
    top: 35,
    left: 18,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 6,
  },

  swiper: {
    height: 550,
  },

  productImage: {
    width: '100%',
    height: 550,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  productName: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  strikePrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    marginRight: 8,
    fontSize: 18,
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 18,
    color: '#000',
    marginBottom: 30,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },

  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  sizeBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FAF4F4',
  },
  selectedSizeBox: {
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#e0f0ff',

    borderColor: '#316bff',
  },
  disabledSizeBox: {
    backgroundColor: '#e0f0ff',
    borderColor: '#ddd',
    borderRadius: 4,
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

  specText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
    color: '#000',
    marginLeft: 1,
  },
  boxContainer: {
    marginLeft: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  materialBox: {
    backgroundColor: '#ffe6ea',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  originBox: {
    backgroundColor: '#e0f0ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  boxText: {
    fontSize: 14,
    color: '#333',
  },

  deliveryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#316bff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#F8F9FF',
  },
  deliveryType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  deliveryTime: {
    fontSize: 14,
    color: '#316bff',
    flex: 1,
  },
  deliveryPrice: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },

  reviewUser: {
    fontWeight: '600',
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  viewAll: {
    color: '#316bff',
    fontWeight: '600',
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    fontSize: 20,
    color: '#333',
  },
  cartButton: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 10,
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cartText: {
    color: '#fff',
    fontWeight: '600',
  },
  buyButton: {
    backgroundColor: '#316bff',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  buyText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default CategoryPDPScreen;
