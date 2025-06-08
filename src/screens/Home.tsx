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

import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Welcome to the Home Screen</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Popular Item</Text>
        <Image
          source={{
            uri: 'https://via.placeholder.com/150',
          }}
          style={styles.image}
        />
        <Text style={styles.description}>
          This is a test item to check UI layout and scrolling.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>New Arrivals</Text>
        <Image
          source={{
            uri: 'https://via.placeholder.com/150',
          }}
          style={styles.image}
        />
        <Text style={styles.description}>
          Another mock product for testing.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#f2f2f2',
    width: '100%',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default Home;
