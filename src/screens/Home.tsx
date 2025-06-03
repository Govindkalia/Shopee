// import {View, Text, Alert, Button, StyleSheet} from 'react-native';
// import React from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { getAuth } from '@react-native-firebase/auth';
// import { getApp } from '@react-native-firebase/app';

// const Home = () => {
//     const navigation = useNavigation();

//     const handleLogout = async () => {
//       try {
//         const auth = getAuth(getApp());
//         await auth().signOut();
//         Alert.alert('Logged Out', 'You have been logged out successfully.');
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'Login' }],
//         });
//       } catch (error) {
//         Alert.alert('Error', 'Failed to logout. Try again.');
//       }
//     };

//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcomeText}>Welcome to the Home Screen!</Text>
//         <Button title="Logout" onPress={handleLogout} color="#FF3B30" />
//       </View>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     welcomeText: {
//       fontSize: 20,
//       marginBottom: 20,
//     },
//   });

// export default Home;
