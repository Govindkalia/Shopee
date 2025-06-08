// import {View, Text, Alert, Button, StyleSheet} from 'react-native';
// import React from 'react';
// import {useNavigation} from '@react-navigation/native';
// import auth from '@react-native-firebase/auth';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../../App';

// type HomeScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'Profile'
// >;
// const Profile = () => {
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
//       <Text style={styles.welcomeText}>Welcome to the Profile Screen!</Text>
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

// export default Profile;

import {View, Text, Alert, Button, StyleSheet} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootStackParamList, TabParamList} from '../../App'; // Make sure TabParamList is exported from App or wherever you declared it

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Profile'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const Profile = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleLogout = async () => {
    try {
      await auth().signOut();

      // Reset the stack navigator, not the tab navigator
      navigation.getParent()?.reset({
        index: 0,
        routes: [{name: 'AuthLoading'}],
      });
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Profile Screen!</Text>
      <Button title="Logout" onPress={handleLogout} color="#FF3B30" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Profile;
