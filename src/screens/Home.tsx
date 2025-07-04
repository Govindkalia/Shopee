import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../store/slices/productsSlice';
import {fetchCategories} from '../store/slices/categoriesSlice';
import {AppDispatch, RootState} from '../store';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

const screenWidth = Dimensions.get('window').width;

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CategoryPLP'
>;

type Product = {
  id: string;
  name: string;
  price: string;
  discounted_price: string;
  description: string;
  images: string[];
  category: string;
};

type CategorySummary = {
  name: string;
  count: number;
  images: string[];
};

const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   dispatch(fetchProducts());
  //   dispatch(fetchCategories());
  // }, [dispatch]);
  useEffect(() => {
    dispatch(fetchProducts())
      .unwrap()
      .then(() => {
        dispatch(fetchCategories());
      });
  }, [dispatch]);

  const products = useSelector(
    (state: RootState) => state.products.items,
  ) as Product[];
  const categorySummaries = useSelector(
    (state: RootState) => state.categories.summaries,
  ) as CategorySummary[];

  const banners = [
    {id: '1', image: require('../assets/Banner1.png')},
    {id: '2', image: require('../assets/Banner2.png')},
  ];

  const renderNewItem = ({item}: {item: any}) => (
    <View style={styles.newItemCard}>
      <Image source={{uri: item.images?.[0]}} style={styles.newItemImage} />
      <Text style={styles.newItemDescription}>{item.name}</Text>
      <Text style={styles.newItemPrice}>${item.discounted_price}</Text>
    </View>
  );

  const renderPopularItem = ({item}: {item: any}) => (
    <View style={styles.popularItemCard}>
      <Image source={{uri: item.images?.[0]}} style={styles.popularItemImage} />
      <Text style={styles.popularItemLikes}>Likes: 1780</Text>
      <Text style={styles.popularItemTag}>New</Text>
    </View>
  );

  const renderCategory = useCallback(
    (cat: CategorySummary, index: number) => (
      <TouchableOpacity
        key={`${cat.name}-${index}`}
        style={styles.categoryCard}
        onPress={() =>
          navigation.navigate('CategoryPLP', {category: cat.name})
        }>
        <View style={styles.imageGrid}>
          {cat.images.map((img: string, i: number) => (
            <Image key={i} source={{uri: img}} style={styles.gridImage} />
          ))}
        </View>

        <View style={styles.categoryInfoRow}>
          <Text style={styles.categoryTitle}>{cat.name}</Text>
          <Text style={styles.categoryCount}>{cat.count}</Text>
        </View>
      </TouchableOpacity>
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.userName}>Shop</Text>

          <View style={styles.searchBar}>
            <TextInput
              placeholder="Search"
              style={styles.searchInput}
              placeholderTextColor="#999"
            />

            <TouchableOpacity>
              <Image
                source={require('../assets/ImageIcon.png')}
                style={styles.cameraIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bannerContainer}>
          <Swiper
            loop
            autoplay
            autoplayTimeout={3}
            showsPagination
            activeDotColor="#007BFF"
            dotStyle={{backgroundColor: '#ccc'}}
            style={styles.swiper}>
            {banners.map(banner => (
              <View key={banner.id} style={styles.slide}>
                <Image
                  source={banner.image}
                  style={styles.bannerImage}
                  resizeMode="contain"
                />
              </View>
            ))}
          </Swiper>
        </View>

        {/* Categories */}
        <Section title="Categories">
          <View style={styles.categoryGrid}>
            {categorySummaries.map(renderCategory)}
          </View>
        </Section>

        {/* Top Products */}
        <Section title="Top Products">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.topProductsRow}>
            {products.slice(8, 13).map((item, index) => (
              <View key={index} style={styles.roundBox}>
                <Image
                  source={{uri: item.images?.[0]}}
                  style={styles.topProductImage}
                />
              </View>
            ))}
          </ScrollView>
        </Section>

        {/* New Items */}
        <Section title="New Items">
          <FlatList
            horizontal
            data={products.slice(0, 10)}
            renderItem={renderNewItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </Section>

        {/* Flash Sale */}
        <Section title="Flash Sale" rightText="00:36:60">
          <View style={styles.flashSaleGrid}>
            {products.slice(0, 6).map((item, index) => (
              <View key={index} style={styles.flashSaleCard}>
                <Image
                  source={{uri: item.images?.[0]}}
                  style={styles.flashSaleImage}
                />
                <Text style={styles.flashSaleTag}>Flash Sale</Text>
              </View>
            ))}
          </View>
        </Section>

        {/* Most Popular */}
        <Section title="Most Popular">
          <FlatList
            horizontal
            data={products.slice(10, 20)}
            renderItem={renderPopularItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </Section>

        {/* Just For You */}
        <Section title="Just For You">
          <View style={styles.justForYouGrid}>
            {products.slice(11, 15).map((item, index) => (
              <View key={index} style={styles.justForYouCard}>
                <Image
                  source={{uri: item.images?.[0]}}
                  style={styles.justForYouImage}
                />
                <Text style={styles.justForYouTitle}>${item.description}</Text>
                <Text style={styles.justForYouPrice}>
                  ${item.discounted_price}
                </Text>
              </View>
            ))}
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const Section = ({
  title,
  children,
  rightText,
}: {
  title: string;
  children: React.ReactNode;
  rightText?: string;
}) => (
  <>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {rightText ? (
        <Text style={styles.timer}>{rightText}</Text>
      ) : (
        <Text style={styles.seeAll}>See All</Text>
      )}
    </View>
    {children}
  </>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF4F4',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginLeft: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  cameraIcon: {
    width: 30,
    height: 25,
    // tintColor: '#888',
    marginLeft: 8,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    fontSize: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  seeAll: {
    fontSize: 14,
    color: '#007bff',
  },

  swiper: {
    height: 180,
    borderRadius: 10,
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bannerContainer: {
    height: 180,
    marginBottom: 6,
  },

  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  // New Items
  newItemCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newItemImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  newItemDescription: {
    fontSize: 12,
    marginTop: 6,
    color: 'black',
  },
  newItemPrice: {
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '700',
    color: '#191919',
    marginTop: 4,
  },

  // Most Popular
  popularItemCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  popularItemImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  popularItemLikes: {
    fontSize: 12,
    marginTop: 6,
  },
  popularItemTag: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#ff6347',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },

  // Categories
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  categoryCard: {
    width: screenWidth / 2 - 24,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 2,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  gridImage: {
    width: (screenWidth / 2 - 44) / 2,
    height: 80,
    resizeMode: 'cover',
    margin: 3,
    borderRadius: 10,
  },
  categoryInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginLeft: 8,
  },
  categoryCount: {
    backgroundColor: '#DFE9FF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 3,
    marginRight: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    fontSize: 11,
    fontWeight: 'bold',
    color: 'black',
  },

  timer: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },

  flashSaleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  flashSaleCard: {
    width: screenWidth / 3 - 20,
    marginBottom: 12,
    position: 'relative',
  },
  flashSaleImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  flashSaleTag: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#ff3b30',
    color: '#fff',
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  topProductsRow: {
    marginVertical: 20,
  },

  roundBox: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  topProductImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  justForYouGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  justForYouCard: {
    width: screenWidth / 2 - 24,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  justForYouImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  justForYouTitle: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 6,
  },
  justForYouPrice: {
    fontSize: 14,
    fontWeight: '700',
    fontStyle: 'italic',
    color: 'black',
    marginTop: 4,
  },
});

export default Home;
