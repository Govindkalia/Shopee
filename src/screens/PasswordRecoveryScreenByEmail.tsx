// import {
//   View,
//   Text,
//   SafeAreaView,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useRef, useState} from 'react';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../../App';

// type Props = NativeStackScreenProps<
//   RootStackParamList,
//   'PasswordRecoveryScreenByEmail'
// >;

// const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
// const [timer, setTimer] = useState(60);
// const [canResend, setCanResend] = useState(false);

// const inputRefs = useRef<Array<TextInput | null>>([]);

// const PasswordReciveryScreenByEmail: React.FC<Props> = ({navigation}) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Password Recovery</Text>
//       <Text style={styles.subtitle}>
//         Enter the 6-digit code sent to your email
//       </Text>
//       <Text style={styles.email}>here need to fetch email and show</Text>

//       <View style={styles.otpRow}>
//         {code.map((d, i) => (
//           <TextInput
//             key={i}
//             ref={r => {
//               inputRefs.current[i] = r;
//             }}
//             style={styles.otpInput}
//             keyboardType="number-pad"
//             maxLength={1}
//             value={d}
//             textAlign="center"
//             autoFocus={i === 0}
//           />
//         ))}
//       </View>

//       <TouchableOpacity
//         style={[styles.button, !canResend && styles.buttonDisabled]}
//         disabled={!canResend}>
//         <Text style={styles.buttonText}>
//           {canResend ? 'Resend OTP' : `Resend in ${timer}s`}
//         </Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default PasswordReciveryScreenByEmail;

// const styles = StyleSheet.create({
//   container: {flex: 1, padding: 24, justifyContent: 'center'},
//   title: {fontSize: 24, fontWeight: 'bold', marginBottom: 8},
//   subtitle: {fontSize: 16, marginBottom: 16, textAlign: 'center'},
//   email: {fontSize: 16, marginBottom: 24, textAlign: 'center'},

//   otpRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 24,
//   },
//   otpInput: {
//     width: 40,
//     height: 50,
//     borderWidth: 1,
//     borderRadius: 8,
//     fontSize: 20,
//   },

//   button: {
//     backgroundColor: '#316bff',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonDisabled: {opacity: 0.5},
//   buttonText: {color: '#fff', fontWeight: '600'},
// });

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ToastAndroid,
//   ActivityIndicator,
//   Image,
//   SafeAreaView,
// } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import {getUserEmail} from '../utils/firestore-utils'; // adjust the path as needed
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../../App';
// // import { getCurrentUserUid } from '../utils/firebaseAuthUtils'; // helper for getting current UID

// type Props = NativeStackScreenProps<
//   RootStackParamList,
//   'PasswordRecoveryScreenByEmail'
// >;

// const PasswordRecoveryScreenByEmail: React.FC<Props> = ({navigation}) => {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEmail = async () => {
//       try {
//         const uid = auth().currentUser?.uid;
//         console.log('uid from fetchemail in forgotpasswordbyemail:', uid);
//         if (!uid) {
//           ToastAndroid.show('User not logged in', ToastAndroid.SHORT);
//           return;
//         }

//         const fetchedEmail = await getUserEmail(uid);
//         console.log('fetched email is:', fetchEmail);
//         if (fetchedEmail) {
//           setEmail(fetchedEmail);
//         } else {
//           ToastAndroid.show('Email not found', ToastAndroid.SHORT);
//         }
//       } catch (err) {
//         console.log('Error fetching email:', err);
//         ToastAndroid.show('Error fetching email', ToastAndroid.SHORT);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmail();
//   }, []);

//   const handleSendResetEmail = async () => {
//     try {
//       if (!email) {
//         ToastAndroid.show('Email is required', ToastAndroid.SHORT);
//         return;
//       }

//       await auth().sendPasswordResetEmail(email);
//       ToastAndroid.show(
//         'If this email is registered, a password reset link has been sent.',
//         ToastAndroid.LONG,
//       );
//       setTimeout(() => {
//         navigation.navigate('Login'); // replace with your actual login screen name
//       }, 6000);
//     } catch (error) {
//       console.error('Error sending reset email:', error);
//       ToastAndroid.show('Failed to send reset email', ToastAndroid.SHORT);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#007bff" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.card}>
//         <View style={styles.avatarWrapper}>
//           <Image
//             source={require('../assets/avatar.webp')}
//             style={styles.avatar}
//           />
//         </View>

//         <Text style={styles.title}>Reset Password</Text>
//         <TextInput
//           style={styles.input}
//           value={email}
//           editable={false} // to prevent editing
//           placeholder="Email"
//           keyboardType="email-address"
//         />
//         <TouchableOpacity style={styles.button} onPress={handleSendResetEmail}>
//           <Text style={styles.buttonText}>Send Reset Email</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default PasswordRecoveryScreenByEmail;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//     padding: 50,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   card: {
//     backgroundColor: 'transparent',
//     borderRadius: 16,
//     padding: 24,
//     alignItems: 'center',
//     flex: 1,
//     zIndex: 1,
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
//     marginBottom: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   input: {
//     borderColor: '#ddd',
//     borderWidth: 1,
//     padding: 12,
//     borderRadius: 6,
//     marginBottom: 20,
//     backgroundColor: '#f2f2f2',
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 15,
//     borderRadius: 6,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ToastAndroid,
//   ActivityIndicator,
//   Image,
//   SafeAreaView,
//   Dimensions,
// } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import {getUserEmail} from '../utils/firestore-utils'; // adjust the path as needed
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../../App';

// // Get screen dimensions
// const {width: screenWidth} = Dimensions.get('window');

// type Props = NativeStackScreenProps<
//   RootStackParamList,
//   'PasswordRecoveryScreenByEmail'
// >;

// const PasswordRecoveryScreenByEmail: React.FC<Props> = ({navigation}) => {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEmail = async () => {
//       try {
//         const uid = auth().currentUser?.uid;
//         console.log('uid from fetchemail in forgotpasswordbyemail:', uid);
//         if (!uid) {
//           ToastAndroid.show('User not logged in', ToastAndroid.SHORT);
//           return;
//         }

//         const fetchedEmail = await getUserEmail(uid);
//         console.log('fetched email is:', fetchEmail);
//         if (fetchedEmail) {
//           setEmail(fetchedEmail);
//         } else {
//           ToastAndroid.show('Email not found', ToastAndroid.SHORT);
//         }
//       } catch (err) {
//         console.log('Error fetching email:', err);
//         ToastAndroid.show('Error fetching email', ToastAndroid.SHORT);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmail();
//   }, []);

//   const handleSendResetEmail = async () => {
//     try {
//       if (!email) {
//         ToastAndroid.show('Email is required', ToastAndroid.SHORT);
//         return;
//       }

//       await auth().sendPasswordResetEmail(email);
//       ToastAndroid.show(
//         'If this email is registered, a password reset link has been sent.',
//         ToastAndroid.LONG,
//       );
//       setTimeout(() => {
//         navigation.navigate('Login'); // replace with your actual login screen name
//       }, 6000);
//     } catch (error) {
//       console.error('Error sending reset email:', error);
//       ToastAndroid.show('Failed to send reset email', ToastAndroid.SHORT);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#316bff" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Background Bubble */}
//       {/* <Image
//         source={require('../assets/Reset bubble.png')}
//         style={styles.backgroundBubble}
//         resizeMode="contain"
//       /> */}

//       <View style={styles.contentContainer}>
//         <View style={styles.avatarWrapper}>
//           <Image
//             source={require('../assets/avatar.webp')}
//             style={styles.avatar}
//           />
//         </View>

//         <Text style={styles.title}>Reset Password</Text>

//         <TextInput
//           style={styles.input}
//           value={email}
//           editable={false} // to prevent editing
//           placeholder="Email"
//           keyboardType="email-address"
//           placeholderTextColor="#999"
//         />

//         <TouchableOpacity style={styles.button} onPress={handleSendResetEmail}>
//           <Text style={styles.buttonText}>Send Reset Email</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.cancelButton}
//           onPress={() => navigation.goBack()}>
//           <Text style={styles.cancelText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default PasswordRecoveryScreenByEmail;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   backgroundBubble: {
//     position: 'absolute',
//     width: screenWidth * 0.8,
//     height: screenWidth * 0.4,
//     top: 0,
//     right: -screenWidth * 0.2,
//     zIndex: -1,
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     paddingTop: 140,
//   },
//   avatarWrapper: {
//     backgroundColor: '#FDE8F1',
//     padding: 8,
//     borderRadius: 60,
//     marginBottom: 24,
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 32,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#F6F6F6',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#316bff',
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   cancelButton: {
//     marginTop: 8,
//   },
//   cancelText: {
//     color: '#666',
//     fontSize: 16,
//   },
// });

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ToastAndroid,
//   ActivityIndicator,
//   Image,
//   SafeAreaView,
//   Dimensions,
// } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import {getUserEmail} from '../utils/firestore-utils';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../../App';
// import Icon from 'react-native-vector-icons/Feather';

// const {width: screenWidth} = Dimensions.get('window');

// type Props = NativeStackScreenProps<
//   RootStackParamList,
//   'PasswordRecoveryScreenByEmail'
// >;

// const PasswordRecoveryScreenByEmail: React.FC<Props> = ({
//   navigation,
//   route,
// }) => {
//   const {email: emailFromParams} = route.params || {};
//   const [email, setEmail] = useState(emailFromParams || '');
//   const [loading, setLoading] = useState(true);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [sendingEmail, setSendingEmail] = useState(false);

//   useEffect(() => {
//     const fetchEmail = async () => {
//       try {
//         const uid = auth().currentUser?.uid;
//         console.log('uid from fetchemail in forgotpasswordbyemail:', uid);
//         if (!uid) {
//           ToastAndroid.show('User not logged in', ToastAndroid.SHORT);
//           return;
//         }

//         const fetchedEmail = await getUserEmail(uid);
//         console.log('fetched email is:', fetchEmail);
//         if (fetchedEmail) {
//           setEmail(fetchedEmail);
//         } else {
//           ToastAndroid.show('Email not found', ToastAndroid.SHORT);
//         }
//       } catch (err) {
//         console.log('Error fetching email:', err);
//         ToastAndroid.show('Error fetching email', ToastAndroid.SHORT);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmail();
//   }, []);

//   const handleSendResetEmail = async () => {
//     try {
//       if (!email) {
//         ToastAndroid.show('Email is required', ToastAndroid.SHORT);
//         return;
//       }

//       setSendingEmail(true);
//       await auth().sendPasswordResetEmail(email);
//       setSendingEmail(false);
//       setShowSuccessMessage(true);

//       setTimeout(() => {
//         navigation.navigate('Login');
//       }, 4000);
//     } catch (error) {
//       console.error('Error sending reset email:', error);
//       setSendingEmail(false);
//       ToastAndroid.show('Failed to send reset email', ToastAndroid.SHORT);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#316bff" />
//       </View>
//     );
//   }

//   if (showSuccessMessage) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Image
//           source={require('../assets/forgotbuble.png')}
//           style={styles.backgroundBubble}
//           resizeMode="contain"
//         />

//         <View style={styles.successContainer}>
//           <View style={styles.successIconWrapper}>
//             <Icon name="check-circle" size={80} color="#4CAF50" />
//           </View>

//           <Text style={styles.successTitle}>Email Sent!</Text>

//           <Text style={styles.successMessage}>
//             A password reset link has been sent to
//           </Text>

//           <Text style={styles.emailText}>{email}</Text>

//           <Text style={styles.instructionText}>
//             Please check your email and follow the instructions to reset your
//             password.
//           </Text>

//           <View style={styles.redirectContainer}>
//             <ActivityIndicator
//               size="small"
//               color="#316bff"
//               style={styles.redirectLoader}
//             />
//             <Text style={styles.redirectText}>
//               Redirecting to login in a few seconds...
//             </Text>
//           </View>

//           <TouchableOpacity
//             style={styles.backToLoginButton}
//             onPress={() => navigation.navigate('Login')}>
//             <Text style={styles.backToLoginText}>Back to Login</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Image
//         source={require('../assets/forgotbuble.png')}
//         style={styles.backgroundBubble}
//         resizeMode="contain"
//       />

//       <View style={styles.contentContainer}>
//         <View style={styles.avatarWrapper}>
//           <Image
//             source={require('../assets/avatar.webp')}
//             style={styles.avatar}
//           />
//         </View>

//         <Text style={styles.title}>Reset Password</Text>

//         <TextInput
//           style={styles.input}
//           value={email}
//           editable={false}
//           placeholder="Email"
//           keyboardType="email-address"
//           placeholderTextColor="#999"
//         />

//         <TouchableOpacity
//           style={[styles.button, sendingEmail && styles.buttonDisabled]}
//           onPress={handleSendResetEmail}
//           disabled={sendingEmail}>
//           {sendingEmail ? (
//             <ActivityIndicator color="#fff" size="small" />
//           ) : (
//             <Text style={styles.buttonText}>Send Reset Email</Text>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.cancelButton}
//           onPress={() => navigation.goBack()}>
//           <Text style={styles.cancelText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default PasswordRecoveryScreenByEmail;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     position: 'relative',
//     zIndex: 0,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   backgroundBubble: {
//     width: '100%',
//     height: '90%',
//     position: 'absolute',
//     top: -250,
//     left: 0,
//     zIndex: -1,
//   },

//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     paddingTop: 140,
//   },
//   avatarWrapper: {
//     backgroundColor: '#FDE8F1',
//     padding: 8,
//     borderRadius: 60,
//     marginBottom: 24,
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 32,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#F6F6F6',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#316bff',
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   cancelButton: {
//     marginTop: 8,
//   },
//   cancelText: {
//     color: '#666',
//     fontSize: 16,
//   },

//   successContainer: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     paddingTop: 80,
//     marginTop: 80,
//   },
//   successIconWrapper: {
//     marginBottom: 24,
//   },
//   successTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 16,
//   },
//   successMessage: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   emailText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#316bff',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   instructionText: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 20,
//     marginBottom: 40,
//     paddingHorizontal: 20,
//   },
//   redirectContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   redirectLoader: {
//     marginRight: 8,
//   },
//   redirectText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   backToLoginButton: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#316bff',
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backToLoginText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import Icon from 'react-native-vector-icons/Feather';

const {width: screenWidth} = Dimensions.get('window');

type Props = NativeStackScreenProps<
  RootStackParamList,
  'PasswordRecoveryScreenByEmail'
>;

const PasswordRecoveryScreenByEmail: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const {email: emailFromParams} = route.params || {};
  const [email, setEmail] = useState(emailFromParams || '');
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    if (!emailFromParams) {
      ToastAndroid.show('No email provided', ToastAndroid.SHORT);
    }
    setLoading(false);
  }, []);

  const handleSendResetEmail = async () => {
    try {
      if (!email) {
        ToastAndroid.show('Email is required', ToastAndroid.SHORT);
        return;
      }

      setSendingEmail(true);
      await auth().sendPasswordResetEmail(email);
      setSendingEmail(false);
      setShowSuccessMessage(true);

      setTimeout(() => {
        navigation.navigate('Login');
      }, 4000);
    } catch (error) {
      console.error('Error sending reset email:', error);
      setSendingEmail(false);
      ToastAndroid.show('Failed to send reset email', ToastAndroid.SHORT);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#316bff" />
      </View>
    );
  }

  if (showSuccessMessage) {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../assets/forgotbuble.png')}
          style={styles.backgroundBubble}
          resizeMode="contain"
        />
        <View style={styles.successContainer}>
          <View style={styles.successIconWrapper}>
            <Icon name="check-circle" size={80} color="#4CAF50" />
          </View>

          <Text style={styles.successTitle}>Email Sent!</Text>

          <Text style={styles.successMessage}>
            A password reset link has been sent to
          </Text>

          <Text style={styles.emailText}>{email}</Text>

          <Text style={styles.instructionText}>
            Please check your email and follow the instructions to reset your
            password.
          </Text>

          <View style={styles.redirectContainer}>
            <ActivityIndicator
              size="small"
              color="#316bff"
              style={styles.redirectLoader}
            />
            <Text style={styles.redirectText}>
              Redirecting to login in a few seconds...
            </Text>
          </View>

          <TouchableOpacity
            style={styles.backToLoginButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.backToLoginText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/forgotbuble.png')}
        style={styles.backgroundBubble}
        resizeMode="contain"
      />

      <View style={styles.contentContainer}>
        <View style={styles.avatarWrapper}>
          <Image
            source={require('../assets/avatar.webp')}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.title}>Reset Password</Text>

        <TextInput
          style={styles.input}
          value={email}
          editable={false}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={[styles.button, sendingEmail && styles.buttonDisabled]}
          onPress={handleSendResetEmail}
          disabled={sendingEmail}>
          {sendingEmail ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Send Reset Email</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordRecoveryScreenByEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    zIndex: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backgroundBubble: {
    width: '100%',
    height: '90%',
    position: 'absolute',
    top: -250,
    left: 0,
    zIndex: -1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 140,
  },
  avatarWrapper: {
    backgroundColor: '#FDE8F1',
    padding: 8,
    borderRadius: 60,
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#316bff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 8,
  },
  cancelText: {
    color: '#666',
    fontSize: 16,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 80,
    marginTop: 80,
  },
  successIconWrapper: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#316bff',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  redirectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  redirectLoader: {
    marginRight: 8,
  },
  redirectText: {
    fontSize: 14,
    color: '#666',
  },
  backToLoginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#316bff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backToLoginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
