import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useRoute, RouteProp} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FilterModal from '../components/FilterModal';
import {RootState} from '../store';

type Product = {
  id: string;
  name: string;
  price: string;
  discounted_price: string;
  description: string;
  images: string[];
  category: string;
  brand: string;
  color: string[];
  size: string[];
  tags: string[];
  in_stock: boolean;
  origin: string;
  material: string[];
  createdAt: string;
};

type RouteParams = {
  PLP: {
    category: string;
  };
};

const CategoryPLP = ({navigation}: any) => {
  const route = useRoute<RouteProp<RouteParams, 'PLP'>>();
  const {category} = route.params;
  const products = useSelector(
    (state: RootState) => state.products.items,
  ) as Product[];

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    brands: [] as string[],
    colors: [] as string[],
    sizes: [] as string[],
    inStockOnly: false,
    sortBy: 'popular' as
      | 'popular'
      | 'newest'
      | 'priceLowToHigh'
      | 'priceHighToLow',
  });

  const categoryProducts = products.filter(
    p => p.category.toLowerCase() === category.toLowerCase(),
  );

  const availableBrands = Array.from(
    new Set(categoryProducts.map(p => p.brand)),
  );
  const availableColors = Array.from(
    new Set(categoryProducts.flatMap(p => p.color)),
  );
  const availableSizes = Array.from(
    new Set(categoryProducts.flatMap(p => p.size)),
  );
  const priceValues = categoryProducts.map(p => parseFloat(p.price));
  const minPrice = Math.min(...priceValues);
  const maxPrice = Math.max(...priceValues);

  const filteredProducts = categoryProducts
    .filter(
      p =>
        !filters.minPrice ||
        parseFloat(p.discounted_price) >= parseFloat(filters.minPrice),
    )
    .filter(
      p =>
        !filters.maxPrice ||
        parseFloat(p.discounted_price) <= parseFloat(filters.maxPrice),
    )
    .filter(
      p => filters.brands.length === 0 || filters.brands.includes(p.brand),
    )
    .filter(
      p =>
        filters.colors.length === 0 ||
        filters.colors.some(c => p.color.includes(c)),
    )
    .filter(
      p =>
        filters.sizes.length === 0 ||
        filters.sizes.some(s => p.size.includes(s)),
    )
    .filter(p => !filters.inStockOnly || p.in_stock)
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'priceLowToHigh':
          return (
            parseFloat(a.discounted_price) - parseFloat(b.discounted_price)
          );
        case 'priceHighToLow':
          return (
            parseFloat(b.discounted_price) - parseFloat(a.discounted_price)
          );
        case 'newest':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return 0; // 'popular' or default
      }
    });

  const renderProduct = ({item}: {item: Product}) => (
    <TouchableOpacity style={styles.productCard} onPress={() => {}}>
      <Image source={{uri: item.images?.[0]}} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.discounted_price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#316bff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="filter" size={24} color="#316bff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        availableBrands={availableBrands}
        availableColors={availableColors}
        availableSizes={availableSizes}
        // minPrice={minPrice}
        // maxPrice={maxPrice}
        currentFilters={filters}
        onApplyFilters={newFilters => setFilters(newFilters)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f8f8f8',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  listContent: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: Dimensions.get('window').width / 2 - 32,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
});

export default CategoryPLP;
