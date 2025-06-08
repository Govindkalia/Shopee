// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
// } from 'react-native';

// const PasswordRecoveryScreen = ({navigation}: any) => {
//   const [selectedOption, setSelectedOption] = useState<'SMS' | 'Email'>('SMS');

//   const handleOptionSelect = (option: 'SMS' | 'Email') => {
//     setSelectedOption(option);
//   };

//   const handleNext = () => {
//     if (selectedOption === 'SMS') {
//       navigation.navigate('PasswordRecoveryScreenByPhone');
//     } else {
//       navigation.navigate('PasswordRecoveryScreenByEmail');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.card}>
//         <View style={styles.avatarWrapper}>
//           <Image
//             source={require('../assets/avatar.webp')}
//             style={styles.avatar}
//           />
//         </View>

//         <Text style={styles.title}>Password Recovery</Text>
//         <Text style={styles.subtitle}>
//           How would you like to restore your password?
//         </Text>

//         <TouchableOpacity
//           style={[
//             styles.optionButton,
//             selectedOption === 'SMS' && styles.selectedSMS,
//           ]}
//           onPress={() => handleOptionSelect('SMS')}>
//           <Text
//             style={[
//               styles.optionText,
//               selectedOption === 'SMS' && {
//                 color: '#316bff',
//                 fontWeight: 'bold',
//               },
//             ]}>
//             SMS
//           </Text>
//           <View
//             style={[
//               styles.radio,
//               selectedOption === 'SMS' && styles.radioSelected,
//             ]}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.optionButton,
//             selectedOption === 'Email' && styles.selectedEmail,
//           ]}
//           onPress={() => handleOptionSelect('Email')}>
//           <Text
//             style={[
//               styles.optionText,
//               selectedOption === 'Email' && {
//                 color: '#eb7c7c',
//                 fontWeight: 'bold',
//               },
//             ]}>
//             Email
//           </Text>
//           <View
//             style={[
//               styles.radio,
//               selectedOption === 'Email' && {
//                 borderColor: '#faf7f7',
//                 backgroundColor: '#eb7c7c',
//               },
//             ]}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//           <Text style={styles.nextButtonText}>Next</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={styles.cancelText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default PasswordRecoveryScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F6F6F6',
//   },
//   header: {
//     color: '#316bff',
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 24,
//     alignItems: 'center',
//     flex: 1,
//   },
//   avatarWrapper: {
//     backgroundColor: '#FDE8F1',
//     padding: 8,
//     borderRadius: 60,
//     marginBottom: 16,
//     marginTop: 70,
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   subtitle: {
//     fontSize: 17,
//     color: '#444',
//     marginBottom: 44,
//     textAlign: 'center',
//   },
//   optionButton: {
//     width: '70%',
//     padding: 14,
//     borderRadius: 12,

//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//     backgroundColor: '#f0f0f0',
//   },
//   selectedSMS: {
//     backgroundColor: '#e5edff',
//   },
//   selectedEmail: {
//     backgroundColor: '#ffe5e5',
//   },
//   optionText: {
//     fontSize: 16,
//     paddingLeft: '40%',
//     color: '#222',
//   },
//   selectedText: {
//     fontWeight: 'bold',
//     color: '#316bff',
//   },
//   radio: {
//     width: 20,
//     height: 20,
//     borderRadius: 20,
//     borderWidth: 3,
//     borderColor: '#faf7f7',
//     // backgroundColor: '#316bff',
//   },
//   radioSelected: {
//     borderColor: '#faf7f7',
//     backgroundColor: '#316bff',
//   },
//   nextButton: {
//     marginTop: 180,
//     width: '100%',
//     backgroundColor: '#316bff',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   nextButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   cancelText: {
//     color: '#999',
//     fontSize: 14,
//     marginTop: 16,
//   },
// });

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'PasswordRecoveryScreen'
>;

// Get screen dimensions
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const PasswordRecoveryScreen: React.FC<Props> = ({navigation, route}) => {
  const {email} = route.params || {};
  const [selectedOption, setSelectedOption] = useState<'SMS' | 'Email'>('SMS');

  const handleOptionSelect = (option: 'SMS' | 'Email') => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === 'SMS') {
      navigation.navigate('PasswordRecoveryScreenByPhone');
    } else {
      navigation.navigate('PasswordRecoveryScreenByEmail', {email});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/forgotbuble.png')}
        style={styles.backgroundBubble}
        resizeMode="contain"
      />

      <View style={styles.card}>
        <View style={styles.avatarWrapper}>
          <Image
            source={require('../assets/avatar.webp')}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.title}>Password Recovery</Text>
        <Text style={styles.subtitle}>
          How would you like to restore your password?
        </Text>

        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === 'SMS' && styles.selectedSMS,
          ]}
          onPress={() => handleOptionSelect('SMS')}>
          <Text
            style={[
              styles.optionText,
              selectedOption === 'SMS' && {
                color: '#316bff',
                fontWeight: 'bold',
              },
            ]}>
            SMS
          </Text>
          <View
            style={[
              styles.radio,
              selectedOption === 'SMS' && styles.radioSelected,
            ]}>
            {selectedOption === 'SMS' && (
              <Icon
                name="check"
                size={14}
                color="#fff"
                style={styles.checkIcon}
              />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === 'Email' && styles.selectedEmail,
          ]}
          onPress={() => handleOptionSelect('Email')}>
          <Text
            style={[
              styles.optionText,
              selectedOption === 'Email' && {
                color: '#eb7c7c',
                fontWeight: 'bold',
              },
            ]}>
            Email
          </Text>
          <View
            style={[
              styles.radio,
              selectedOption === 'Email' && {
                borderColor: '#faf7f7',
                backgroundColor: '#eb7c7c',
              },
            ]}>
            {selectedOption === 'Email' && (
              <Icon
                name="check"
                size={14}
                color="#fff"
                style={styles.checkIcon}
              />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordRecoveryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    position: 'relative',
    zIndex: 0,
  },
  backgroundBubble: {
    width: '100%',
    height: '90%',
    position: 'absolute',
    top: -250,
    left: 0,
    zIndex: -1,
    // opacity: 0.15, // optional: subtle background effect
  },
  header: {
    color: '#316bff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    flex: 1,
    zIndex: 1,
  },
  avatarWrapper: {
    backgroundColor: '#FDE8F1',
    padding: 8,
    borderRadius: 60,
    marginBottom: 26,
    marginTop: 110,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 17,
    color: '#444',
    marginBottom: 44,
    textAlign: 'center',
  },
  optionButton: {
    width: '70%',
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
  },
  selectedSMS: {
    backgroundColor: '#e5edff',
  },
  selectedEmail: {
    backgroundColor: '#ffe5e5',
  },
  optionText: {
    fontSize: 16,
    paddingLeft: '40%',
    color: '#222',
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#316bff',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#faf7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#faf7f7',
    backgroundColor: '#316bff',
  },
  checkIcon: {
    alignSelf: 'center',
  },
  nextButton: {
    marginTop: 130,
    width: '100%',
    backgroundColor: '#316bff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelText: {
    color: '#999',
    fontSize: 14,
    marginTop: 16,
  },
});
