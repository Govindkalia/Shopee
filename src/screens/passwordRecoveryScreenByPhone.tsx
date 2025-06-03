// import React, {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   StatusBar,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
// } from 'react-native';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../../App';
// import {getUserPhoneNumber} from '../utils/firestore-utils';

// type Props = NativeStackScreenProps<
//   RootStackParamList,
//   'PasswordRecoveryScreenByPhone'
// >;

// const PasswordRecoveryScreenByPhone: React.FC<Props> = ({
//   navigation,
//   route,
// }) => {
//   const [code, setCode] = useState(['', '', '', '']);
//   const [loading, setLoading] = useState(false);
//   const [resendTimer, setResendTimer] = useState(60);
//   const [canResend, setCanResend] = useState(false);

//   // Get phone number from route params or use default
//   // const phoneNumber = route.params?.phoneNumber || '+98*******00';

//   const [phoneNumber, setPhoneNumber] = useState('+98*******00');

//   useEffect(() => {
//     const fetchPhone = async () => {
//       const phone = await getUserPhoneNumber();
//       if (phone) {
//         setPhoneNumber(phone);
//       }
//     };

//     fetchPhone();
//   }, []);

//   // Refs for input fields
//   const inputRefs = useRef<(TextInput | null)[]>([]);

//   useEffect(() => {
//     // Start countdown timer
//     const timer = setInterval(() => {
//       setResendTimer(prev => {
//         if (prev <= 1) {
//           setCanResend(true);
//           clearInterval(timer);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const handleCodeChange = (value: string, index: number) => {
//     if (value.length > 1) return; // Prevent multiple characters

//     const newCode = [...code];
//     newCode[index] = value;
//     setCode(newCode);

//     // Auto-focus next input
//     if (value && index < 3) {
//       inputRefs.current[index + 1]?.focus();
//     }

//     // Auto-verify when all 4 digits are entered
//     if (newCode.every(digit => digit !== '') && index === 3) {
//       handleVerifyCode(newCode.join(''));
//     }
//   };

//   const handleKeyPress = (key: string, index: number) => {
//     if (key === 'Backspace' || 'delete') {
//       if (code[index]) {
//         // Clear current box if not already empty
//         const newCode = [...code];
//         newCode[index] = '';
//         setCode(newCode);
//       } else if (index > 0) {
//         // Move focus back and clear previous box
//         inputRefs.current[index - 1]?.focus();
//         const newCode = [...code];
//         newCode[index - 1] = '';
//         setCode(newCode);
//       }
//     }
//   };

//   const handleVerifyCode = async (verificationCode: string) => {
//     setLoading(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));

//       // For demo purposes, accept '1234' as valid code
//       if (verificationCode === '1234') {
//         Alert.alert('Success', 'Code verified successfully!', [
//           {
//             text: 'OK',
//             onPress: () => {
//               // Navigate to reset password screen or login
//               navigation.navigate('Login');
//             },
//           },
//         ]);
//       } else {
//         Alert.alert('Error', 'Invalid verification code. Please try again.');
//         setCode(['', '', '', '']);
//         inputRefs.current[0]?.focus();
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSendAgain = async () => {
//     if (!canResend) return;

//     setLoading(true);
//     try {
//       // Simulate resend API call
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       Alert.alert('Success', 'Verification code sent again!');

//       // Reset timer
//       setResendTimer(60);
//       setCanResend(false);
//       setCode(['', '', '', '']);
//       inputRefs.current[0]?.focus();

//       // Start countdown again
//       const timer = setInterval(() => {
//         setResendTimer(prev => {
//           if (prev <= 1) {
//             setCanResend(true);
//             clearInterval(timer);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to resend code. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     navigation.goBack();
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
//           Enter 4-digits code we sent on to your Phone Number
//         </Text>

//         {/* Phone Number */}
//         <Text style={styles.phoneNumber}>
//           +{phoneNumber.replace(/^(\d{2})\d{6}(\d{2})$/, '$1******$2')}
//         </Text>

//         {/* OTP Input */}
//         <View style={styles.otpContainer}>
//           {code.map((digit, index) => (
//             <TextInput
//               key={index}
//               ref={ref => {
//                 inputRefs.current[index] = ref;
//               }}
//               style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
//               value={digit}
//               onChangeText={value => handleCodeChange(value, index)}
//               onKeyPress={({nativeEvent}) =>
//                 handleKeyPress(nativeEvent.key, index)
//               }
//               keyboardType="numeric"
//               maxLength={1}
//               textAlign="center"
//               autoFocus={index === 0}
//             />
//           ))}
//         </View>

//         {/* Send Again Button */}
//         <TouchableOpacity
//           style={[
//             styles.sendAgainButton,
//             (!canResend || loading) && styles.sendAgainButtonDisabled,
//           ]}
//           onPress={handleSendAgain}
//           disabled={!canResend || loading}>
//           <Text style={styles.sendAgainText}>
//             {canResend ? 'Send Again' : `Send Again (${resendTimer}s)`}
//           </Text>
//         </TouchableOpacity>

//         {/* Cancel Button */}
//         <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
//           <Text style={styles.cancelText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   backgroundContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 300,
//   },
//   blueBackground: {
//     flex: 1,
//     backgroundColor: '#4A90E2',
//     borderBottomLeftRadius: 100,
//     borderBottomRightRadius: 100,
//   },
//   whiteOverlay: {
//     position: 'absolute',
//     top: 150,
//     left: 50,
//     right: 50,
//     bottom: -50,
//     backgroundColor: '#E8F0FE',
//     borderRadius: 80,
//     opacity: 0.3,
//   },
//   content: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     paddingTop: 120,
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
//   avatarContainer: {
//     marginBottom: 30,
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     borderWidth: 3,
//     borderColor: '#FF69B4',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 16,
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#444',
//     marginBottom: 44,
//     textAlign: 'center',
//     paddingHorizontal: 35,
//   },
//   description: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 22,
//     marginBottom: 20,
//   },
//   phoneNumber: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 40,
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     gap: 2,
//     marginBottom: 60,
//   },
//   otpInput: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#E0E0E0',
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   otpInputFilled: {
//     backgroundColor: '#4A90E2',
//     color: '#FFF',
//   },
//   sendAgainButton: {
//     backgroundColor: '#FF69B4',
//     paddingHorizontal: 40,
//     paddingVertical: 14,
//     borderRadius: 25,
//     marginBottom: 10,
//     marginTop: 140,
//   },
//   sendAgainButtonDisabled: {
//     backgroundColor: '#FFB3D1',
//   },
//   sendAgainText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   cancelButton: {
//     paddingVertical: 10,
//   },
//   cancelText: {
//     color: '#666',
//     fontSize: 16,
//   },
// });

// export default PasswordRecoveryScreenByPhone;

// import React, {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   Image,
//   SafeAreaView,
// } from 'react-native';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../../App';
// import {getUserPhoneNumber} from '../utils/firestore-utils';

// type Props = NativeStackScreenProps<
//   RootStackParamList,
//   'PasswordRecoveryScreenByPhone'
// >;

// const PasswordRecoveryScreenByPhone: React.FC<Props> = ({
//   navigation,
//   route,
// }) => {
//   const [code, setCode] = useState(['', '', '', '']);
//   const [loading, setLoading] = useState(false);
//   const [resendTimer, setResendTimer] = useState(60);
//   const [canResend, setCanResend] = useState(false);

//   const [phoneNumber, setPhoneNumber] = useState('+98*******00');

//   useEffect(() => {
//     const fetchPhone = async () => {
//       const phone = await getUserPhoneNumber();
//       if (phone) setPhoneNumber(phone);
//     };
//     fetchPhone();
//   }, []);

//   const inputRefs = useRef<(TextInput | null)[]>([]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setResendTimer(prev => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setCanResend(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const handleCodeChange = (value: string, index: number) => {
//     const newCode = [...code];

//     if (value === '') {
//       newCode[index] = '';
//       setCode(newCode);
//       return;
//     }

//     if (value.length > 1) return;

//     newCode[index] = value;
//     setCode(newCode);

//     // Move to next input
//     if (index < 3) {
//       inputRefs.current[index + 1]?.focus();
//     }

//     if (newCode.every(digit => digit !== '') && index === 3) {
//       handleVerifyCode(newCode.join(''));
//     }
//   };

//   const handleBackspace = (index: number) => {
//     const newCode = [...code];
//     newCode[index] = '';
//     setCode(newCode);
//     if (index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleVerifyCode = async (verificationCode: string) => {
//     setLoading(true);
//     try {
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       if (verificationCode === '1234') {
//         Alert.alert('Success', 'Code verified successfully!', [
//           {
//             text: 'OK',
//             onPress: () => navigation.navigate('Login'),
//           },
//         ]);
//       } else {
//         Alert.alert('Error', 'Invalid verification code. Please try again.');
//         setCode(['', '', '', '']);
//         inputRefs.current[0]?.focus();
//       }
//     } catch {
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSendAgain = async () => {
//     if (!canResend) return;
//     setLoading(true);
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       Alert.alert('Success', 'Verification code sent again!');
//       setResendTimer(60);
//       setCanResend(false);
//       setCode(['', '', '', '']);
//       inputRefs.current[0]?.focus();

//       const timer = setInterval(() => {
//         setResendTimer(prev => {
//           if (prev <= 1) {
//             clearInterval(timer);
//             setCanResend(true);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     } catch {
//       Alert.alert('Error', 'Failed to resend code. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     navigation.goBack();
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
//           Enter 4-digits code we sent on to your Phone Number
//         </Text>

//         <Text style={styles.phoneNumber}>
//           +{phoneNumber.replace(/^(\d{2})\d{6}(\d{2})$/, '$1******$2')}
//         </Text>

//         <View style={styles.otpContainer}>
//           {code.map((digit, index) => (
//             <TextInput
//               key={index}
//               ref={ref => {
//                 inputRefs.current[index] = ref;
//               }}
//               style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
//               value={digit}
//               onChangeText={value => {
//                 if (value.length > 1) return;

//                 const newCode = [...code];
//                 newCode[index] = value;
//                 setCode(newCode);

//                 if (value !== '' && index < 3) {
//                   inputRefs.current[index + 1]?.focus();
//                 }

//                 if (
//                   value !== '' &&
//                   index === 3 &&
//                   newCode.every(char => char !== '')
//                 ) {
//                   handleVerifyCode(newCode.join(''));
//                 }
//               }}
//               onKeyPress={({nativeEvent}) => {
//                 if (nativeEvent.key === 'Backspace') {
//                   if (code[index] === '') {
//                     if (index > 0) {
//                       inputRefs.current[index - 1]?.focus();
//                       const newCode = [...code];
//                       newCode[index - 1] = '';
//                       setCode(newCode);
//                     }
//                   } else {
//                     const newCode = [...code];
//                     newCode[index] = '';
//                     setCode(newCode);
//                   }
//                 }
//               }}
//               keyboardType="numeric"
//               maxLength={1}
//               textAlign="center"
//               autoFocus={index === 0}
//             />
//           ))}
//         </View>

//         <TouchableOpacity
//           style={[
//             styles.sendAgainButton,
//             (!canResend || loading) && styles.sendAgainButtonDisabled,
//           ]}
//           onPress={handleSendAgain}
//           disabled={!canResend || loading}>
//           <Text style={styles.sendAgainText}>
//             {canResend ? 'Send Again' : `Send Again (${resendTimer}s)`}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
//           <Text style={styles.cancelText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
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
//     borderWidth: 3,
//     borderColor: '#FF69B4',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 16,
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#444',
//     marginBottom: 44,
//     textAlign: 'center',
//     paddingHorizontal: 35,
//   },
//   phoneNumber: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 40,
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     gap: 2,
//     marginBottom: 60,
//   },
//   otpInput: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#E0E0E0',
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   otpInputFilled: {
//     backgroundColor: '#4A90E2',
//     color: '#FFF',
//   },
//   sendAgainButton: {
//     backgroundColor: '#FF69B4',
//     paddingHorizontal: 40,
//     paddingVertical: 14,
//     borderRadius: 25,
//     marginBottom: 10,
//     marginTop: 140,
//   },
//   sendAgainButtonDisabled: {
//     backgroundColor: '#FFB3D1',
//   },
//   sendAgainText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   cancelButton: {
//     paddingVertical: 10,
//   },
//   cancelText: {
//     color: '#666',
//     fontSize: 16,
//   },
// });

// export default PasswordRecoveryScreenByPhone;

//PasswordRecoveryScreenByPhone.tsx
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {getUserPhoneNumber} from '../utils/firestore-utils';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'PasswordRecoveryScreenByPhone'
>;

const PasswordRecoveryScreenByPhone: React.FC<Props> = ({navigation}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const fetchPhone = async () => {
      //    added later
      const currentUser = auth().currentUser;
      if (!currentUser) {
        Alert.alert('Error', 'No signed-in user found');
        return;
      }

      const phone = await getUserPhoneNumber(currentUser.uid);
      if (phone) {
        setPhoneNumber(phone);
        sendOTP(phone);
      } else {
        Alert.alert('Error', 'Phone number not found');
      }
    };

    fetchPhone();
  }, []);

  const sendOTP = async (phone: string) => {
    try {
      // if (auth().currentUser) {
      //   await auth().signOut();
      //   console.log('Signed out previous user');
      //   console.log('current user is:', auth().currentUser);
      // }
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setVerificationId(confirmation.verificationId);
      Alert.alert('OTP Sent', 'Check your phone for the verification code');
      startResendTimer();
    } catch (err: any) {
      Alert.alert('Failed to send OTP', err.message);
    }
  };

  const startResendTimer = () => {
    setResendTimer(60);
    setCanResend(false);
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCodeChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === 5 && newCode.every(d => d !== '')) {
      verifyCode(newCode.join(''));
    }
  };

  const verifyCode = async (otp: string) => {
    if (!verificationId) return;

    setLoading(true);
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
      await auth().signInWithCredential(credential);
      //await auth().currentUser!.reauthenticateWithCredential(credential);

      console.log('credentials from verify code,', credential);
      Alert.alert('Verified', 'OTP verified successfully', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SetupNewPasswordScreen'),
        },
      ]);
    } catch (err) {
      Alert.alert('Invalid OTP', 'Please try again.');
      console.log('error from cerify code', err);
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleSendAgain = () => {
    if (canResend) {
      sendOTP(phoneNumber);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatarWrapper}>
          <Image
            source={require('../assets/avatar.webp')}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.title}>Password Recovery</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to your phone
        </Text>

        <Text style={styles.phoneNumber}>
          {'+' +
            phoneNumber
              .replace('+', '') // remove +
              .replace(/^(\d{2})\d{6}(\d{2})$/, '$1******$2')}
        </Text>

        <View style={styles.otpContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                inputRefs.current[index] = ref;
              }}
              style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
              value={digit}
              onChangeText={value => handleCodeChange(value, index)}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace' && code[index] === '') {
                  if (index > 0) {
                    inputRefs.current[index - 1]?.focus();
                    const newCode = [...code];
                    newCode[index - 1] = '';
                    setCode(newCode);
                  }
                }
              }}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              autoFocus={index === 0}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.sendAgainButton,
            (!canResend || loading) && styles.sendAgainButtonDisabled,
          ]}
          onPress={handleSendAgain}
          disabled={!canResend || loading}>
          <Text style={styles.sendAgainText}>
            {canResend ? 'Send Again' : `Send Again (${resendTimer}s)`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5'},
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    flex: 1,
  },
  avatarWrapper: {
    backgroundColor: '#FDE8F1',
    padding: 8,
    borderRadius: 60,
    marginBottom: 16,
    marginTop: 70,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FF69B4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#444',
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 35,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 8,
    marginBottom: 30,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  otpInputFilled: {
    backgroundColor: '#4A90E2',
    color: '#FFF',
  },
  sendAgainButton: {
    backgroundColor: '#FF69B4',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 60,
  },
  sendAgainButtonDisabled: {
    backgroundColor: '#FFB3D1',
  },
  sendAgainText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 10,
  },
  cancelText: {
    color: '#666',
    fontSize: 16,
  },
});

export default PasswordRecoveryScreenByPhone;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet
// } from 'react-native';
// import auth from '@react-native-firebase/auth';

// const PasswordRecoveryScreenByPhone = () => {
//   const [phone, setPhone] = useState('');
//   const [code, setCode] = useState('');
//   const [verificationId, setVerificationId] = useState<string | null>(null);
//   const [canResend, setCanResend] = useState(true);
//   const [timer, setTimer] = useState(30);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (!canResend && timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       setCanResend(true);
//       setTimer(30);
//     }
//     return () => clearInterval(interval);
//   }, [canResend, timer]);

//   const beginTimer = () => {
//     setCanResend(false);
//     setTimer(30);
//   };

//   const startVerify = async (phone: string) => {
//     setCanResend(false);
//     try {
//       const confirmationResult = await auth().signInWithPhoneNumber(phone);
//       setVerificationId(confirmationResult.verificationId);
//       Alert.alert('OTP Sent', `Code sent to ${phone}`);
//       beginTimer();
//     } catch (error: any) {
//       console.error('verifyPhoneNumber error', error);
//       Alert.alert('Failed to send OTP', error.message);
//     }
//   };

//   const confirmCode = async () => {
//     if (!verificationId) {
//       Alert.alert('Error', 'No verification ID available.');
//       return;
//     }

//     const credential = auth.PhoneAuthProvider.credential(verificationId, code);

//     try {
//       await auth().signInWithCredential(credential);
//       Alert.alert('Success', 'Phone authentication successful!');
//     } catch (error: any) {
//       console.error('signInWithCredential error:', error);
//       if (error.code === 'auth/user-mismatch') {
//         Alert.alert('Invalid OTP', 'The supplied credentials do not match the current user.');
//       } else {
//         Alert.alert('Invalid OTP', 'Please try again.');
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Password Recovery</Text>
//       <Text>Enter your phone number:</Text>
//       <TextInput
//         style={styles.input}
//         value={phone}
//         onChangeText={setPhone}
//         keyboardType="phone-pad"
//         placeholder="+91XXXXXXXXXX"
//       />
//       <TouchableOpacity onPress={() => startVerify(phone)} disabled={!canResend}>
//         <Text style={styles.buttonText}>
//           {canResend ? 'Send Code' : `Send Again (${timer}s)`}
//         </Text>
//       </TouchableOpacity>

//       <TextInput
//         style={styles.input}
//         value={code}
//         onChangeText={setCode}
//         keyboardType="number-pad"
//         placeholder="Enter 6-digit code"
//       />
//       <TouchableOpacity onPress={confirmCode}>
//         <Text style={styles.buttonText}>Verify Code</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: 'blue',
//     marginTop: 10,
//   },
// });

// export default PasswordRecoveryScreenByPhone;
