// import React, {useEffect} from 'react';
// import {View, ActivityIndicator, StyleSheet} from 'react-native';
// import auth from '@react-native-firebase/auth';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../../App';

// type Props = NativeStackScreenProps<RootStackParamList, any>;

// const AuthLoadingScreen: React.FC<Props> = ({navigation}) => {
//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged(user => {
//       if (user) {
//         navigation.replace('MainTabs');
//       } else {
//         navigation.replace('Start');
//       }
//     });

//     return unsubscribe;
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <ActivityIndicator size="large" color="#316bff" />
//     </View>
//   );
// };

// export default AuthLoadingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, any>;

const AuthLoadingScreen: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    const checkAuthAndOnboarding = async () => {
      const user = auth().currentUser;
      const onboardingShown = await AsyncStorage.getItem('onboardingShown');
      console.log('AuthLoadingScreen checking user...');
      console.log('User:', user);
      console.log('onboardingShown:', onboardingShown);

      if (user) {
        if (onboardingShown === 'true') {
          navigation.replace('MainTabs');
        } else {
          navigation.replace('Onboarding');
        }
      } else {
        navigation.replace('Start');
      }
    };

    const unsubscribe = auth().onAuthStateChanged(() => {
      checkAuthAndOnboarding();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#316bff" />
    </View>
  );
};

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
