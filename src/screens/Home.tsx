// import {View, Text, Alert, Button, StyleSheet} from 'react-native';
// import React from 'react';
// import {useNavigation} from '@react-navigation/native';
// import auth from '@react-native-firebase/auth';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../../App';

// type HomeScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'Home'
// >;
// const Home = () => {
//   const navigation = useNavigation<HomeScreenNavigationProp>();

//   const handleLogout = async () => {
//     try {
//       await auth().signOut();
//       navigation.reset({
//         index: 0,
//         routes: [{name: 'AuthLoading'}],
//       });
//     } catch (error) {
//       console.error('Logout error:', error);
//       Alert.alert('Error', 'Failed to logout. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcomeText}>Welcome to the Home Screen!</Text>
//       <Button title="Logout" onPress={handleLogout} color="#FF3B30" />
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   welcomeText: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
// });

// export default Home;


// import React from 'react';
// import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

// const Home = () => {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.heading}>Welcome to the Home Screen</Text>

//       <View style={styles.card}>
//         <Text style={styles.title}>Popular Item</Text>
//         <Image
//           source={{
//             uri: 'https://via.placeholder.com/150',
//           }}
//           style={styles.image}
//         />
//         <Text style={styles.description}>
//           This is a test item to check UI layout and scrolling.
//         </Text>
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.title}>New Arrivals</Text>
//         <Image
//           source={{
//             uri: 'https://via.placeholder.com/150',
//           }}
//           style={styles.image}
//         />
//         <Text style={styles.description}>
//           Another mock product for testing.
//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginVertical: 20,
//   },
//   card: {
//     backgroundColor: '#f2f2f2',
//     width: '100%',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   image: {
//     width: 150,
//     height: 150,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   description: {
//     fontSize: 14,
//     color: '#333',
//     textAlign: 'center',
//   },
// });

// export default Home;



// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import axios from 'axios';

// type Product = {
//   id: string;
//   name: string;
//   price: string;
//   discounted_price: string;
//   description: string;
//   images: string[];
//   category: string;
// };

// const Home = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);

//   useEffect(() => {
//     axios
//       .get<Product[]>('https://68414ca4d48516d1d35af8a5.mockapi.io/api/v1/data')
//        // Replace with your actual MockAPI URL
//       .then(res => {
//         console.log('API Response:', res.data); // Add this line
//         setProducts(res.data);
//         const uniqueCategories = Array.from(new Set(res.data.map(item => item.category)));
//         setCategories(uniqueCategories);
//       })
//       .catch(err => console.error(err));
//   }, []);

//   const renderProduct = ({ item }: { item: Product }) => (
//     <View style={styles.productCard}>
//       <Image source={{ uri: item.images[0] }} style={styles.productImage} />
//       <Text style={styles.productName}>{item.name}</Text>
//       <Text style={styles.productPrice}>${item.discounted_price}</Text>
//     </View>
//   );

//   const renderCategory = (category: string) => (
//     <TouchableOpacity key={category} style={styles.categoryItem}>
//       <View style={styles.categoryIconPlaceholder}>
//         <Text style={styles.categoryIconText}>{category.charAt(0).toUpperCase()}</Text>
//       </View>
//       <Text style={styles.categoryName}>{category}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.userName}>Hi, Romina 👋</Text>
//         <View style={styles.headerIcons}>
//           <Text style={styles.icon}>🔔</Text>
//           <Text style={styles.icon}>⚙️</Text>
//         </View>
//       </View>

//       {/* New Items */}
//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>New Items</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeAll}>See All</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         horizontal
//         data={products.slice(0, 10)}
//         renderItem={renderProduct}
//         keyExtractor={item => item.id}
//         showsHorizontalScrollIndicator={false}
//       />

//       {/* Most Popular */}
//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>Most Popular</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeAll}>See All</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         horizontal
//         data={products.slice(10, 20)}
//         renderItem={renderProduct}
//         keyExtractor={item => item.id}
//         showsHorizontalScrollIndicator={false}
//       />

//       {/* Categories */}
//       <Text style={styles.sectionTitle}>Categories</Text>
//       <View style={styles.categoryGrid}>
//         {categories.map(renderCategory)}
//       </View>
//     </ScrollView>
//   );
// };

// const screenWidth = Dimensions.get('window').width;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   userName: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   icon: {
//     fontSize: 20,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   seeAll: {
//     fontSize: 14,
//     color: '#007bff',
//   },
//   productCard: {
//     marginRight: 12,
//     width: 120,
//     alignItems: 'center',
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//   },
//   productName: {
//     fontSize: 14,
//     marginTop: 5,
//     textAlign: 'center',
//   },
//   productPrice: {
//     fontSize: 14,
//     color: 'green',
//   },
//   categoryGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   categoryItem: {
//     width: screenWidth / 3 - 24,
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   categoryIconPlaceholder: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#eee',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   categoryIconText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   categoryName: {
//     marginTop: 5,
//     fontSize: 14,
//     textTransform: 'capitalize',
//   },
// });

// export default Home;/


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import axios from 'axios';

// type Product = {
//   id: string;
//   name: string;
//   price: string;
//   discounted_price: string;
//   description: string;
//   images: string[];
//   category: string;
// };

// type CategorySummary = {
//   name: string;
//   count: number;
//   image: string;
// };


// const Home = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);

  
//   const [categorySummaries, setCategorySummaries] = useState<CategorySummary[]>([]);

//   useEffect(() => {
//     axios
//       .get<Product[]>('https://68414ca4d48516d1d35af8a5.mockapi.io/api/v1/data')
//       .then(res => {
//         const updatedProducts = res.data.map(item => ({
//           ...item,
//           images: item.images.map(img => img.replace(/^https:/, 'http:')),
//         }));
  
//         setProducts(updatedProducts);
  
//         const categoryMap: Record<string, CategorySummary> = {};
  
//         updatedProducts.forEach(item => {
//           if (!categoryMap[item.category]) {
//             categoryMap[item.category] = {
//               name: item.category,
//               count: 1,
//               image: item.images[0],
//             };
//           } else {
//             categoryMap[item.category].count += 1;
//           }
//         });
  
//         setCategorySummaries(Object.values(categoryMap));
//       })
//       .catch(err => console.error(' API Error:', err));
//   }, []);
  
  

//   const renderProduct = ({ item }: { item: Product }) => {
//     console.log(' Rendering Product:', item.name);
//     console.log(' Image URL:', item.images?.[0]);

//     return (
//       <View style={styles.productCard}>
//         <Image
//           source={{ uri: item.images?.[0]}}
//           style={styles.productImage}
          
// resizeMode="cover"
// onError={(e) => {
// console.log(' Image failed to load:', e.nativeEvent.error);
// }}

//         />
//         <Text style={styles.productName}>{item.name}</Text>
//         <Text style={styles.productPrice}>${item.discounted_price}</Text>
//       </View>
//     );
//   };

 
// const renderCategory = (cat: CategorySummary, index: number) => (
//    <TouchableOpacity key={`${cat.name}-${index}`} style={styles.categoryItem}>
//    <Image source={{ uri: cat.image}} style={styles.categoryImage} />
//    <Text style={styles.categoryName}>{cat.name}</Text>
//   <Text style={styles.categoryCount}>{cat.count} items</Text>
//    </TouchableOpacity>
//   );
  

//   return (
//     <ScrollView style={styles.container}>
     
//       <View style={styles.header}>
//         <Text style={styles.userName}>Hi</Text>
//         <View style={styles.headerIcons}>
//           <Text style={styles.icon}></Text>
//           <Text style={styles.icon}></Text>
//         </View>
//       </View>

    
//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>New Items</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeAll}>See All</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         horizontal
//         data={products.slice(0, 10)}
//         renderItem={renderProduct}
//         keyExtractor={item => item.id}
//         showsHorizontalScrollIndicator={false}
//       />

      
//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>Most Popular</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeAll}>See All</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         horizontal
//         data={products.slice(10, 20)}
//         renderItem={renderProduct}
//         keyExtractor={item => item.id}
//         showsHorizontalScrollIndicator={false}
//       />

     
//       <Text style={styles.sectionTitle}>Categories</Text>
      
// <View style={styles.categoryGrid}>
// {categorySummaries.map(renderCategory)}
// </View>

//     </ScrollView>
//   );
// };

// const screenWidth = Dimensions.get('window').width;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   userName: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   icon: {
//     fontSize: 20,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   seeAll: {
//     fontSize: 14,
//     color: '#007bff',
//   },
//   productCard: {
//     marginRight: 12,
//     width: 120,
//     alignItems: 'center',
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//   },
//   productName: {
//     fontSize: 14,
//     marginTop: 5,
//     textAlign: 'center',
//   },
//   productPrice: {
//     fontSize: 14,
//     color: 'green',
//   },
//   categoryGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   categoryItem: {
//     width: screenWidth / 3 - 24,
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   categoryIconPlaceholder: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#eee',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   categoryIconText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   categoryName: {
//     marginTop: 5,
//     fontSize: 14,
//     textTransform: 'capitalize',
//   },
//   categoryImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginBottom: 5,
//   },
//   categoryCount: {
//     fontSize: 12,
//     color: '#666',
//   },
  
// });

// export default Home;













// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import axios from 'axios';

// type Product = {
//   id: string;
//   name: string;
//   price: string;
//   discounted_price: string;
//   description: string;
//   images: string[];
//   category: string;
// };

// type CategorySummary = {
//   name: string;
//   count: number;
//   images: string[];
// };

// const Home = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categorySummaries, setCategorySummaries] = useState<CategorySummary[]>([]);

//   useEffect(() => {
//     axios
//       .get<Product[]>('https://68414ca4d48516d1d35af8a5.mockapi.io/api/v1/data')
//       .then(res => {
//         const updatedProducts = res.data.map(item => ({
//           ...item,
//           images: item.images.map(img => img.replace(/^https:/, 'http:')),
//         }));

//         setProducts(updatedProducts);

//         const categoryMap: Record<string, CategorySummary> = {};

//         updatedProducts.forEach(item => {
//           if (!categoryMap[item.category]) {
//             categoryMap[item.category] = {
//               name: item.category,
//               count: 1,
//               images: item.images.slice(0, 4),
//             };
//           } else {
//             categoryMap[item.category].count += 1;
//             const currentImages = categoryMap[item.category].images;
//             if (currentImages.length < 4) {
//               categoryMap[item.category].images.push(...item.images.slice(0, 4 - currentImages.length));
//             }
//           }
//         });

//         setCategorySummaries(Object.values(categoryMap));
//       })
//       .catch(err => console.error('API Error:', err));
//   }, []);

//   const renderProduct = ({ item }: { item: Product }) => (
//     <View style={styles.productCard}>
//       <Image
//         source={{ uri: item.images?.[0] }}
//         style={styles.productImage}
//         resizeMode="cover"
//         onError={(e) => console.log('Image failed to load:', e.nativeEvent.error)}
//       />
//       <Text style={styles.productName}>{item.name}</Text>
//       <Text style={styles.productPrice}>${item.discounted_price}</Text>
//     </View>
//   );

//   const renderCategory = (cat: CategorySummary, index: number) => (
//     <TouchableOpacity key={`${cat.name}-${index}`} style={styles.categoryCard}>
//       <View style={styles.imageGrid}>
//         {cat.images.map((img, i) => (
//           <Image key={i} source={{ uri: img }} style={styles.gridImage} />
//         ))}
//       </View>
      
// <View style={styles.categoryInfoRow}>
//       <Text style={styles.categoryTitle}>{cat.name}</Text>
      
//       <Text style={styles.categoryCount}>{cat.count}</Text>
      
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.userName}>Hi</Text>
//         <View style={styles.headerIcons}>
//           <Text style={styles.icon}></Text>
//           <Text style={styles.icon}></Text>
//         </View>
//       </View>

//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>New Items</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeAll}>See All</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         horizontal
//         data={products.slice(0, 10)}
//         renderItem={renderProduct}
//         keyExtractor={item => item.id}
//         showsHorizontalScrollIndicator={false}
//       />

//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>Most Popular</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeAll}>See All</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         horizontal
//         data={products.slice(10, 20)}
//         renderItem={renderProduct}
//         keyExtractor={item => item.id}
//         showsHorizontalScrollIndicator={false}
//       />

//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>Categories</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeAll}>See All →</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.categoryGrid}>
//         {categorySummaries.map(renderCategory)}
//       </View>
//     </ScrollView>
//   );
// };

// const screenWidth = Dimensions.get('window').width;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   userName: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   icon: {
//     fontSize: 20,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   seeAll: {
//     fontSize: 14,
//     color: '#007bff',
//   },
//   productCard: {
//     marginRight: 12,
//     width: 120,
//     alignItems: 'center',
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//   },
//   productName: {
//     fontSize: 14,
//     marginTop: 5,
//     textAlign: 'center',
//   },
//   productPrice: {
//     fontSize: 14,
//     color: 'green',
//   },
//   categoryGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   categoryCard: {
//     width: screenWidth / 2 - 24,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//     padding: 0,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   countInfo:{
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//     padding: 0,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   imageGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 4,
//   },
//   gridImage: {
//     width: (screenWidth / 2 - 32) / 2,
//     height: 50,
//     borderRadius: 6,
//   },
//   categoryInfoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   categoryTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     textTransform: 'capitalize',
//   },




// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import axios from 'axios';

// type Product = {
//   id: string;
//   name: string;
//   price: string;
//   discounted_price: string;
//   description: string;
//   images: string[];
//   category: string;
// };

// type CategorySummary = {
//   name: string;
//   count: number;
//   images: string[];
// };

// const Home = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categorySummaries, setCategorySummaries] = useState<CategorySummary[]>([]);

//   useEffect(() => {
//     axios
//       .get<Product[]>('https://68414ca4d48516d1d35af8a5.mockapi.io/api/v1/data')
//       .then(res => {
//         const updatedProducts = res.data.map(item => ({
//           ...item,
//           images: item.images.map(img => img.replace(/^https:/, 'http:')),
//         }));

//         setProducts(updatedProducts);

//         const categoryMap: Record<string, CategorySummary> = {};

//         updatedProducts.forEach(item => {
//           if (!categoryMap[item.category]) {
//             categoryMap[item.category] = {
//               name: item.category,
//               count: 1,
//               images: item.images.slice(0, 4),
//             };
//           } else {
//             categoryMap[item.category].count += 1;
//             const currentImages = categoryMap[item.category].images;
//             if (currentImages.length < 4) {
//               categoryMap[item.category].images.push(...item.images.slice(0, 4 - currentImages.length));
//             }
//           }
//         });

//         setCategorySummaries(Object.values(categoryMap));
//       })
//       .catch(err => console.error('API Error:', err));
//   }, []);

//   const renderNewItem = ({ item }: { item: Product }) => (
//     <View style={styles.newItemCard}>
//       <Image source={{ uri: item.images?.[0] }} style={styles.newItemImage} />
//       <Text style={styles.newItemDescription}>{item.name}</Text>
//       <Text style={styles.newItemPrice}>${item.discounted_price}</Text>
//     </View>
//   );

//   const renderPopularItem = ({ item }: { item: Product }) => (
//     <View style={styles.popularItemCard}>
//       <Image source={{ uri: item.images?.[0] }} style={styles.popularItemImage} />
//       <Text style={styles.popularItemLikes}>1780♥</Text>
//       <Text style={styles.popularItemTag}>New</Text>
//     </View>
//   );

//   const renderCategory = (cat: CategorySummary, index: number) => (
//     <TouchableOpacity key={`${cat.name}-${index}`} style={styles.categoryCard}>
//       <View style={styles.imageGrid}>
//         {cat.images.map((img, i) => (
//           <Image key={i} source={{ uri: img }} style={styles.gridImage} />
//         ))}
//       </View>
//       <View style={styles.categoryInfoRow}>
//         <Text style={styles.categoryTitle}>{cat.name}</Text>
//         <Text style={styles.categoryCount}>{cat.count} items</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.userName}>Hi</Text>
//         <View style={styles.headerIcons}>
//           <Text style={styles.icon}></Text>
//           <Text style={styles.icon}></Text>
//         </View>
//       </View>

//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>New Items</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeAll}>See All</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         horizontal
//         data={products.slice(0, 10)}
//         renderItem={renderNewItem}
//         keyExtractor={item => item.id}
//         showsHorizontalScrollIndicator={false}
//       />

//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>Most Popular</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeAll}>See All</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         horizontal
//         data={products.slice(10, 20)}
//         renderItem={renderPopularItem}
//         keyExtractor={item => item.id}
//         showsHorizontalScrollIndicator={false}
//       />

//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>Categories</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeAll}>See All</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.categoryGrid}>
//         {categorySummaries.map(renderCategory)}
//       </View>

//       <View style={styles.sectionHeader}>
//   <Text style={styles.sectionTitle}>Flash Sale</Text>
//   <Text style={styles.timer}>00:36:58</Text>
// </View>
// <View style={styles.flashSaleGrid}>
//   {products.slice(0, 6).map((item, index) => (
//     <View key={index} style={styles.flashSaleCard}>
//       <Image source={{ uri: item.images?.[0] }} style={styles.flashSaleImage} />
//       <Text style={styles.flashSaleTag}>Flash Sale</Text>
//     </View>
//   ))}
// </View>

// <View style={styles.sectionHeader}>
//   <Text style={styles.sectionTitle}>Top Products</Text>
// </View>
// <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topProductsRow}>
//   {products.slice(6, 11).map((item, index) => (
//     <Image key={index} source={{ uri: item.images?.[0] }} style={styles.topProductImage} />
//   ))}
// </ScrollView>

// <View style={styles.sectionHeader}>
//   <Text style={styles.sectionTitle}>Just For You</Text>
// </View>
// <View style={styles.justForYouGrid}>
//   {products.slice(11, 15).map((item, index) => (
//     <View key={index} style={styles.justForYouCard}>
//       <Image source={{ uri: item.images?.[0] }} style={styles.justForYouImage} />
//       <Text style={styles.justForYouTitle}>Lorem ipsum dolor sit amet</Text>
//       <Text style={styles.justForYouPrice}>${item.discounted_price}</Text>
//     </View>
//   ))}
// </View>

//     </ScrollView>
//   );
// };

// const screenWidth = Dimensions.get('window').width;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   userName: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   icon: {
//     fontSize: 20,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   seeAll: {
//     fontSize: 14,
//     color: '#007bff',
//   },

//   // New Items
//   newItemCard: {
//     width: 140,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     marginRight: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   newItemImage: {
//     width: '100%',
//     height: 100,
//     borderRadius: 8,
//   },
//   newItemDescription: {
//     fontSize: 12,
//     marginTop: 6,
//   },
//   newItemPrice: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: 'green',
//     marginTop: 4,
//   },

//   // Most Popular
//   popularItemCard: {
//     width: 140,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     marginRight: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   popularItemImage: {
//     width: '100%',
//     height: 100,
//     borderRadius: 8,
//   },
//   popularItemLikes: {
//     fontSize: 12,
//     marginTop: 6,
//   },
//   popularItemTag: {
//     fontSize: 12,
//     color: '#fff',
//     backgroundColor: '#ff6347',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 6,
//     alignSelf: 'flex-start',
//     marginTop: 4,
//   },

//   // Categories
//   categoryGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   categoryCard: {
//     width: screenWidth / 2 - 24,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//     padding: 2,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   imageGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 4,
//   },
//   gridImage: {
//     width: (screenWidth / 2 - 32) / 2,
//     height: 50,
//     borderRadius: 6,
//   },
//   categoryInfoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   categoryTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     textTransform: 'capitalize',
//   },
//   categoryCount: {
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#666',
//   },

//   timer: {
//     fontSize: 14,
//     color: '#ff3b30',
//     fontWeight: 'bold',
//   },
  
//   flashSaleGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   flashSaleCard: {
//     width: screenWidth / 3 - 20,
//     marginBottom: 12,
//     position: 'relative',
//   },
//   flashSaleImage: {
//     width: '100%',
//     height: 100,
//     borderRadius: 8,
//   },
//   flashSaleTag: {
//     position: 'absolute',
//     top: 6,
//     left: 6,
//     backgroundColor: '#ff3b30',
//     color: '#fff',
//     fontSize: 10,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
  
//   topProductsRow: {
//     marginVertical: 10,
//   },
//   topProductImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 12,
//   },
  
//   justForYouGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   justForYouCard: {
//     width: screenWidth / 2 - 24,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   justForYouImage: {
//     width: '100%',
//     height: 100,
//     borderRadius: 8,
//   },
//   justForYouTitle: {
//     fontSize: 12,
//     marginTop: 6,
//   },
//   justForYouPrice: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: 'green',
//     marginTop: 4,
//   },
  
// });

// export default Home;




import React, { useEffect } from 'react';
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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productsSlice';
import { fetchCategories } from '../store/slices/categoriesSlice';
import { AppDispatch, RootState } from '../store';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
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

  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const products = useSelector((state: RootState) => state.products.items) as Product[];
const categorySummaries = useSelector((state: RootState) => state.categories.summaries) as CategorySummary[];

const banners = [
  { id: '1', image: require('../assets/Banner1.png') },
  { id: '2', image: require('../assets/Banner2.png') },
];

const renderBanners = () => (
  <ScrollView
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    style={styles.bannerContainer}
  >
    {banners.map((banner) => (
      <Image
        key={banner.id}
        source={banner.image}
        style={styles.bannerImage}
        resizeMode="cover"
      />
    ))}
  </ScrollView>
);


  const renderNewItem = ({ item }: { item: any }) => (
    <View style={styles.newItemCard}>
      <Image source={{ uri: item.images?.[0] }} style={styles.newItemImage} />
      <Text style={styles.newItemDescription}>{item.name}</Text>
      <Text style={styles.newItemPrice}>${item.discounted_price}</Text>
    </View>
  );

  const renderPopularItem = ({ item }: { item: any }) => (
    <View style={styles.popularItemCard}>
      <Image source={{ uri: item.images?.[0] }} style={styles.popularItemImage} />
      <Text style={styles.popularItemLikes}>Likes: 1780</Text>
      <Text style={styles.popularItemTag}>New</Text>
    </View>
  );

  const renderCategory = (cat: any, index: number) => (
    <TouchableOpacity key={`${cat.name}-${index}`} style={styles.categoryCard}>
      <View style={styles.imageGrid}>
        {cat.images.map((img: string, i: number) => (
          <Image key={i} source={{ uri: img }} style={styles.gridImage} />
        ))}
      </View>
      <View style={styles.categoryInfoRow}>
        <Text style={styles.categoryTitle}>{cat.name}</Text>
        <Text style={styles.categoryCount}>{cat.count}</Text>
      </View>
    </TouchableOpacity>
  );

  return (


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
<Image source={require('../assets/ImageIcon.png')} style={styles.cameraIcon} />
</TouchableOpacity>
 </View>

        <View style={styles.headerIcons}>
          <Text style={styles.icon}></Text>
          <Text style={styles.icon}></Text>
        </View>
      </View>

      {renderBanners()}


       {/* Categories */}
       <Section title="Categories">
        <View key={screenWidth} style={styles.categoryGrid}>
          {categorySummaries.map(renderCategory)}
        </View>
      </Section>

       {/* Top Products */}
<Section title="Top Products">
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topProductsRow}>
    {products.slice(8, 13).map((item, index) => (
      <View key={index} style={styles.roundBox}>
        <Image source={{ uri: item.images?.[0] }} style={styles.topProductImage} />
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
              <Image source={{ uri: item.images?.[0] }} style={styles.flashSaleImage} />
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
              <Image source={{ uri: item.images?.[0] }} style={styles.justForYouImage} />
              <Text style={styles.justForYouTitle}>Lorem ipsum dolor sit amet</Text>
              <Text style={styles.justForYouPrice}>${item.discounted_price}</Text>
            </View>
          ))}
        </View>
      </Section>
    </ScrollView>
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
      {rightText ? <Text style={styles.timer}>{rightText}</Text> : <Text style={styles.seeAll}>See All</Text>}
    </View>
    {children}
  </>
);


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  
searchBar: {
   flex: 1,
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: '#F8F8F8',
   borderRadius: 10,
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
  width: 20,
  height: 20,
  //   tintColor: '#888',
   marginLeft: 8,
  }
,  
  userName: {
    fontSize: 22,
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
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 14,
    color: '#007bff',
  },

  bannerContainer: {
    width: screenWidth-28,
    height: 180,
    marginBottom: 16,
  },
  bannerImage: {
    width: screenWidth-34,
    height: 180,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  

  // New Items
  newItemCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
  },
  newItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
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
    margin:3,
    borderRadius: 10,
  },
  categoryInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginLeft:8
  },
  categoryCount: {
    backgroundColor: '#DFE9FF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom:3,
    marginRight:5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    fontSize: 11,
    fontWeight: 'bold',
    color: 'black',
  },

  timer: {
    fontSize: 14,
    color: '#ff3b30',
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  topProductImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  }
,  
  
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
    shadowOffset: { width: 0, height: 2 },
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
    fontSize: 12,
    marginTop: 6,
  },
  justForYouPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 4,
  },
  
});

export default Home;
