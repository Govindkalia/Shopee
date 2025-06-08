// 'use client';

// import {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   ScrollView,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

// import {PermissionsAndroid} from 'react-native';
// import {
//   createUserWithEmailAndPassword,
//   getAuth,
// } from '@react-native-firebase/auth';
// import {RootStackParamList} from '../../App';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';

// type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

// const requestMediaPermission = async (): Promise<boolean> => {
//   if (Platform.OS === 'android' && Platform.Version >= 33) {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//       {
//         title: 'Media Permission',
//         message: 'App needs access to your photos to upload a profile picture',
//         buttonPositive: 'OK',
//       },
//     );
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   }
//   return true;
// };

// const requestCameraPermission = async (): Promise<boolean> => {
//   if (Platform.OS === 'android') {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: 'Camera Permission',
//         message: 'App needs access to your camera to take a photo',
//         buttonPositive: 'OK',
//       },
//     );
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   }
//   return true;
// };

// interface ValidationErrors {
//   email: string;
//   password: string;
//   phone: string;
// }

// const CreateAccountScreen: React.FC<Props> = ({navigation}) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [name, setName] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [photoUri, setPhotoUri] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [errors, setErrors] = useState<ValidationErrors>({
//     email: '',
//     password: '',
//     phone: '',
//   });
//   const [touched, setTouched] = useState({
//     email: false,
//     password: false,
//     confirmPassword: false,
//     phone: false,
//     name: false,
//   });

//   const [passwordStrength, setPasswordStrength] = useState({
//     score: 0,
//     label: '',
//     color: '#ccc',
//   });

//   useEffect(() => {
//     if (touched.email) {
//       validateEmail(email);
//     }
//   }, [email, touched.email]);

//   useEffect(() => {
//     if (touched.password) {
//       validatePassword(password);
//     }
//   }, [password, touched.password]);

//   useEffect(() => {
//     if (touched.confirmPassword) {
//       validateConfirmPassword(confirmPassword);
//     }
//   }, [confirmPassword, password, touched.confirmPassword]);

//   useEffect(() => {
//     if (touched.phone) {
//       validatePhone(phone);
//     }
//   }, [phone, touched.phone]);

//   const handleImagePick = () => {
//     Alert.alert('Upload Photo', 'Choose an option', [
//       {
//         text: 'Take Photo',
//         onPress: async () => {
//           const hasPermission = await requestCameraPermission();
//           if (hasPermission) {
//             launchCamera({mediaType: 'photo'}, response => {
//               if (response.assets?.length) {
//                 setPhotoUri(response.assets[0].uri || null);
//               }
//             });
//           } else {
//             Alert.alert('Camera permission denied');
//           }
//         },
//       },
//       {
//         text: 'Choose from Gallery',
//         onPress: async () => {
//           const hasPermission = await requestMediaPermission();
//           if (hasPermission) {
//             launchImageLibrary({mediaType: 'photo'}, response => {
//               if (response.assets?.length) {
//                 setPhotoUri(response.assets[0].uri || null);
//               }
//             });
//           } else {
//             Alert.alert('Gallery permission denied');
//           }
//         },
//       },
//       {text: 'Cancel', style: 'cancel'},
//     ]);
//   };

//   const validateEmail = (value: string): boolean => {
//     const emailRegex =
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//     if (!value.trim()) {
//       setErrors(prev => ({...prev, email: 'Email is required'}));
//       return false;
//     } else if (!emailRegex.test(value)) {
//       setErrors(prev => ({
//         ...prev,
//         email: 'Please enter a valid email address',
//       }));
//       return false;
//     } else {
//       setErrors(prev => ({...prev, email: ''}));
//       return true;
//     }
//   };

//   const validatePassword = (value: string): boolean => {
//     if (!value.trim()) {
//       setErrors(prev => ({...prev, password: 'Password is required'}));
//       setPasswordStrength({score: 0, label: '', color: '#ccc'});
//       return false;
//     }

//     let score = 0;
//     let feedback = '';

//     if (value.length < 8) {
//       feedback = 'Password must be at least 8 characters';
//       setErrors(prev => ({...prev, password: feedback}));
//       setPasswordStrength({score: 1, label: 'Weak', color: '#ff4d4f'});
//       return false;
//     } else {
//       score += 1;
//     }

//     const hasUpperCase = /[A-Z]/.test(value);
//     const hasLowerCase = /[a-z]/.test(value);
//     const hasNumbers = /\d/.test(value);
//     const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);

//     let complexityScore = 0;
//     if (hasUpperCase) complexityScore++;
//     if (hasLowerCase) complexityScore++;
//     if (hasNumbers) complexityScore++;
//     if (hasSpecialChars) complexityScore++;

//     score += complexityScore;

//     if (score <= 2) {
//       setPasswordStrength({score: 2, label: 'Weak', color: '#ff4d4f'});
//       feedback = 'Password is too weak';
//     } else if (score <= 3) {
//       setPasswordStrength({score: 3, label: 'Medium', color: '#faad14'});
//       feedback = '';
//     } else {
//       setPasswordStrength({score: 4, label: 'Strong', color: '#52c41a'});
//       feedback = '';
//     }

//     setErrors(prev => ({...prev, password: feedback}));
//     return feedback === '';
//   };

//   const validateConfirmPassword = (value: string): boolean => {
//     if (value !== password) {
//       setErrors(prev => ({...prev, password: 'Passwords do not match'}));
//       return false;
//     } else {
//       setErrors(prev => ({...prev, password: ''}));
//       return true;
//     }
//   };

//   const validatePhone = (value: string): boolean => {
//     const phoneRegex = /^(\+?\d{1,3})?[\s.-]?\d{3}[\s.-]?\d{3}[\s.-]?\d{4}$/;
//     if (!value.trim()) {
//       setErrors(prev => ({...prev, phone: 'Phone number is required'}));
//       return false;
//     } else if (!phoneRegex.test(value)) {
//       setErrors(prev => ({
//         ...prev,
//         phone: 'Please enter a valid phone number',
//       }));
//       return false;
//     } else {
//       setErrors(prev => ({...prev, phone: ''}));
//       return true;
//     }
//   };

//   const validateName = (value: string): boolean => {
//     if (!value.trim()) {
//       return false;
//     }
//     return true;
//   };

//   const handleBlur = (field: keyof typeof touched) => {
//     setTouched(prev => ({...prev, [field]: true}));

//     switch (field) {
//       case 'email':
//         validateEmail(email);
//         break;
//       case 'password':
//         validatePassword(password);
//         break;
//       case 'confirmPassword':
//         validateConfirmPassword(confirmPassword);
//         break;
//       case 'phone':
//         validatePhone(phone);
//         break;
//       case 'name':
//         validateName(name);
//         break;
//     }
//   };

//   const validateAllInputs = (): boolean => {
//     setTouched({
//       email: true,
//       password: true,
//       confirmPassword: true,
//       phone: true,
//       name: true,
//     });

//     const isEmailValid = validateEmail(email);
//     const isPasswordValid = validatePassword(password);
//     const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
//     const isPhoneValid = validatePhone(phone);
//     const isNameValid = validateName(name);

//     return (
//       isEmailValid &&
//       isPasswordValid &&
//       isConfirmPasswordValid &&
//       isPhoneValid &&
//       isNameValid
//     );
//   };

//   const onRegister = async () => {
//     if (!validateAllInputs()) {
//       Alert.alert('Validation Error', 'Please fix the errors in the form');
//       return;
//     }

//     setLoading(true);
//     try {
//       await createUserWithEmailAndPassword(getAuth(), email, password);
//       Alert.alert('Success', 'User account created & signed in!');

//       setEmail('');
//       setPassword('');
//       setConfirmPassword('');
//       setPhone('');
//       setName('');
//       setPhotoUri(null);
//       setTouched({
//         email: false,
//         password: false,
//         confirmPassword: false,
//         phone: false,
//         name: false,
//       });
//     } catch (error: any) {
//       if (error.code === 'auth/email-already-in-use') {
//         Alert.alert('Error', 'That email address is already in use!');
//       } else if (error.code === 'auth/invalid-email') {
//         Alert.alert('Error', 'That email address is invalid!');
//       } else if (error.code === 'auth/weak-password') {
//         Alert.alert('Error', 'Password is too weak.');
//       } else {
//         Alert.alert('Error', 'Something went wrong. Try again later.');
//         console.error(error);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderPasswordStrength = () => {
//     if (!touched.password || !password) return null;

//     return (
//       <View style={styles.strengthContainer}>
//         <Text style={styles.strengthLabel}>Password strength: </Text>
//         <Text style={[styles.strengthValue, {color: passwordStrength.color}]}>
//           {passwordStrength.label}
//         </Text>
//         <View style={styles.strengthBar}>
//           <View
//             style={[
//               styles.strengthFill,
//               {
//                 width: `${(passwordStrength.score / 4) * 100}%`,
//                 backgroundColor: passwordStrength.color,
//               },
//             ]}
//           />
//         </View>
//       </View>
//     );
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={{flex: 1}}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         keyboardShouldPersistTaps="handled">
//         <View style={styles.container}>
//           <Text style={styles.title}>Create{'\n'}Account</Text>

//           <TouchableOpacity
//             style={photoUri ? styles.imageContainer : styles.photoPlaceholder}
//             onPress={handleImagePick}>
//             {photoUri ? (
//               <Image source={{uri: photoUri}} style={styles.profilePhoto} />
//             ) : (
//               <Icon name="camera" size={24} color="#3A5BFF" />
//             )}
//           </TouchableOpacity>

//           <View style={styles.inputWrapper}>
//             <TextInput
//               style={styles.input}
//               placeholder="Full Name"
//               placeholderTextColor="#999"
//               value={name}
//               onChangeText={setName}
//               onBlur={() => handleBlur('name')}
//             />
//           </View>

//           <View style={styles.inputWrapper}>
//             <TextInput
//               style={[
//                 styles.input,
//                 touched.email && errors.email ? styles.inputError : null,
//               ]}
//               placeholder="Email"
//               placeholderTextColor="#999"
//               value={email}
//               onChangeText={setEmail}
//               onBlur={() => handleBlur('email')}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//             {touched.email && errors.email ? (
//               <Text style={styles.errorText}>{errors.email}</Text>
//             ) : null}
//           </View>

//           <View style={styles.inputWrapper}>
//             <View
//               style={[
//                 styles.passwordContainer,
//                 touched.password && errors.password ? styles.inputError : null,
//               ]}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Password"
//                 placeholderTextColor="#999"
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={setPassword}
//                 onBlur={() => handleBlur('password')}
//                 autoCapitalize="none"
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Icon
//                   name={showPassword ? 'eye' : 'eye-off'}
//                   size={20}
//                   color="#999"
//                 />
//               </TouchableOpacity>
//             </View>
//             {renderPasswordStrength()}
//             {touched.password && errors.password ? (
//               <Text style={styles.errorText}>{errors.password}</Text>
//             ) : null}
//           </View>

//           <View style={styles.inputWrapper}>
//             <View
//               style={[
//                 styles.passwordContainer,
//                 touched.confirmPassword && password !== confirmPassword
//                   ? styles.inputError
//                   : null,
//               ]}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Confirm Password"
//                 placeholderTextColor="#999"
//                 secureTextEntry={!showConfirmPassword}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 onBlur={() => handleBlur('confirmPassword')}
//                 autoCapitalize="none"
//               />
//               <TouchableOpacity
//                 onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
//                 <Icon
//                   name={showConfirmPassword ? 'eye' : 'eye-off'}
//                   size={20}
//                   color="#999"
//                 />
//               </TouchableOpacity>
//             </View>
//             {touched.confirmPassword && password !== confirmPassword ? (
//               <Text style={styles.errorText}>Passwords do not match</Text>
//             ) : null}
//           </View>

//           <View style={styles.inputWrapper}>
//             <View
//               style={[
//                 styles.phoneContainer,
//                 touched.phone && errors.phone ? styles.inputError : null,
//               ]}>
//               <TextInput
//                 style={styles.phoneInput}
//                 placeholder="Your number"
//                 placeholderTextColor="#999"
//                 keyboardType="phone-pad"
//                 value={phone}
//                 onChangeText={setPhone}
//                 onBlur={() => handleBlur('phone')}
//               />
//             </View>
//             {touched.phone && errors.phone ? (
//               <Text style={styles.errorText}>{errors.phone}</Text>
//             ) : null}
//           </View>

//           <TouchableOpacity
//             onPress={onRegister}
//             style={[styles.doneButton, loading && styles.disabledButton]}
//             disabled={loading}>
//             {loading ? (
//               <ActivityIndicator color="#fff" size="small" />
//             ) : (
//               <Text style={styles.doneText}>Create Account</Text>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity>
//             <Text style={styles.cancelText}>Cancel</Text>
//           </TouchableOpacity>

//           <View style={styles.termsContainer}>
//             <Text style={styles.termsText}>
//               By signing up, you agree to our{' '}
//               <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
//               <Text style={styles.termsLink}>Privacy Policy</Text>
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default CreateAccountScreen;

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 24,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     alignSelf: 'flex-start',
//     marginTop: 40,
//     marginBottom: 30,
//     color: '#000',
//   },
//   profilePhoto: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   imageContainer: {
//     marginBottom: 30,
//     borderRadius: 40,
//     overflow: 'hidden',
//   },
//   photoPlaceholder: {
//     borderWidth: 2,
//     borderColor: '#3A5BFF',
//     borderStyle: 'dashed',
//     borderRadius: 50,
//     padding: 25,
//     marginBottom: 30,
//   },
//   inputWrapper: {
//     width: '100%',
//     marginBottom: 16,
//   },
//   input: {
//     width: '100%',
//     backgroundColor: '#F6F6F6',
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//   },
//   inputError: {
//     borderWidth: 1,
//     borderColor: '#ff4d4f',
//   },
//   errorText: {
//     color: '#ff4d4f',
//     fontSize: 12,
//     marginTop: 4,
//     marginLeft: 4,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     backgroundColor: '#F6F6F6',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//   },
//   passwordInput: {
//     flex: 1,
//     paddingVertical: 16,
//     fontSize: 16,
//   },
//   phoneContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     backgroundColor: '#F6F6F6',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     height: 56,
//   },
//   phoneInput: {
//     flex: 1,
//     paddingVertical: 16,
//     fontSize: 16,
//   },
//   strengthContainer: {
//     marginTop: 8,
//     width: '100%',
//   },
//   strengthLabel: {
//     fontSize: 12,
//     color: '#666',
//   },
//   strengthValue: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     marginLeft: 4,
//   },
//   strengthBar: {
//     height: 4,
//     backgroundColor: '#eee',
//     borderRadius: 2,
//     marginTop: 4,
//     width: '100%',
//   },
//   strengthFill: {
//     height: '100%',
//     borderRadius: 2,
//   },
//   doneButton: {
//     backgroundColor: '#3A5BFF',
//     width: '100%',
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
//   doneText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   cancelText: {
//     color: '#3A5BFF',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   termsContainer: {
//     marginTop: 10,
//     paddingHorizontal: 20,
//   },
//   termsText: {
//     fontSize: 12,
//     color: '#666',
//     textAlign: 'center',
//   },
//   termsLink: {
//     color: '#3A5BFF',
//     fontWeight: '500',
//   },
// });

'use client';

import {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Dimensions,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Background from '../components/ui/Background';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import {PermissionsAndroid} from 'react-native';
import {
  createUserWithEmailAndPassword,
  getAuth,
} from '@react-native-firebase/auth';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {saveUserToFirestore} from '../utils/firestore-utils';

import {Picker} from '@react-native-picker/picker';
import {CountryData} from '../utils/country-data';
import {
  parsePhoneNumberFromString,
  isValidPhoneNumber,
} from 'libphonenumber-js';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const {height: screenHeight, width: screenWidth} = Dimensions.get('window');

const requestMediaPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      {
        title: 'Media Permission',
        message: 'App needs access to your photos to upload a profile picture',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera to take a photo',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

interface ValidationErrors {
  email: string;
  password: string;
  phone: string;
}

const CreateAccountScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [dialCode, setDialCode] = useState('+91');

  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<ValidationErrors>({
    email: '',
    password: '',
    phone: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
    name: false,
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: '',
    color: '#ccc',
  });

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
  }, []);

  useEffect(() => {
    if (touched.email) {
      validateEmail(email);
    }
  }, [email, touched.email]);

  useEffect(() => {
    if (touched.password) {
      validatePassword(password);
    }
  }, [password, touched.password]);

  useEffect(() => {
    if (touched.confirmPassword) {
      validateConfirmPassword(confirmPassword);
    }
  }, [confirmPassword, password, touched.confirmPassword]);

  useEffect(() => {
    if (touched.phone) validatePhone(`${dialCode}${phone}`);
  }, [phone, dialCode, touched.phone]);

  type UploadPhotoModalProps = {
    visible: boolean;
    onClose: () => void;
    onCamera: () => void;
    onGallery: () => void;
  };
  const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({
    visible,
    onClose,
    onCamera,
    onGallery,
  }) => {
    return (
      <Modal transparent visible={visible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Upload Photo</Text>

            <TouchableOpacity style={styles.button} onPress={onCamera}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onGallery}>
              <Text style={styles.buttonText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const handleImagePick = () => {
    setShowModal(true);
    // Alert.alert('Upload Photo', 'Choose an option', [
    //   {
    //     text: 'Take Photo',
    //     onPress: async () => {
    //       const hasPermission = await requestCameraPermission();
    //       if (hasPermission) {
    //         launchCamera({mediaType: 'photo'}, response => {
    //           if (response.assets?.length) {
    //             setPhotoUri(response.assets[0].uri || null);
    //           }
    //         });
    //       } else {
    //         Alert.alert('Camera permission denied');
    //       }
    //     },
    //   },
    //   {
    //     text: 'Choose from Gallery',
    //     onPress: async () => {
    //       const hasPermission = await requestMediaPermission();
    //       if (hasPermission) {
    //         launchImageLibrary({mediaType: 'photo'}, response => {
    //           if (response.assets?.length) {
    //             setPhotoUri(response.assets[0].uri || null);
    //           }
    //         });
    //       } else {
    //         Alert.alert('Gallery permission denied');
    //       }
    //     },
    //   },
    //   {text: 'Cancel', style: 'cancel'},
    // ]);
  };

  const handleCamera = async () => {
    setShowModal(false);
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      launchCamera({mediaType: 'photo'}, response => {
        if (response.assets?.length) {
          setPhotoUri(response.assets[0].uri || null);
        }
      });
    }
  };

  const handleGallery = async () => {
    setShowModal(false);
    const hasPermission = await requestMediaPermission();
    if (hasPermission) {
      launchImageLibrary({mediaType: 'photo'}, response => {
        if (response.assets?.length) {
          setPhotoUri(response.assets[0].uri || null);
        }
      });
    }
  };

  const validateEmail = (value: string): boolean => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!value.trim()) {
      setErrors(prev => ({...prev, email: 'Email is required'}));
      return false;
    } else if (!emailRegex.test(value)) {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address',
      }));
      return false;
    } else {
      setErrors(prev => ({...prev, email: ''}));
      return true;
    }
  };

  const validatePassword = (value: string): boolean => {
    if (!value.trim()) {
      setErrors(prev => ({...prev, password: 'Password is required'}));
      setPasswordStrength({score: 0, label: '', color: '#ccc'});
      return false;
    }

    let score = 0;
    let feedback = '';

    if (value.length < 8) {
      feedback = 'Password must be at least 8 characters';
      setErrors(prev => ({...prev, password: feedback}));
      setPasswordStrength({score: 1, label: 'Weak', color: '#ff4d4f'});
      return false;
    } else {
      score += 1;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    let complexityScore = 0;
    if (hasUpperCase) complexityScore++;
    if (hasLowerCase) complexityScore++;
    if (hasNumbers) complexityScore++;
    if (hasSpecialChars) complexityScore++;

    score += complexityScore;

    if (score <= 2) {
      setPasswordStrength({score: 2, label: 'Weak', color: '#ff4d4f'});
      feedback = 'Password is too weak';
    } else if (score <= 3) {
      setPasswordStrength({score: 3, label: 'Medium', color: '#faad14'});
      feedback = '';
    } else {
      setPasswordStrength({score: 4, label: 'Strong', color: '#52c41a'});
      feedback = '';
    }

    setErrors(prev => ({...prev, password: feedback}));
    return feedback === '';
  };

  const validateConfirmPassword = (value: string): boolean => {
    if (value !== password) {
      setErrors(prev => ({...prev, password: 'Passwords do not match'}));
      return false;
    } else {
      setErrors(prev => ({...prev, password: ''}));
      return true;
    }
  };

  const validatePhone = (value: string): boolean => {
    const fullPhone = phone.startsWith('+') ? phone : `${dialCode}${phone}`;

    try {
      const phoneNumber = parsePhoneNumberFromString(fullPhone);
      const e164 = phoneNumber?.format('E.164');
      console.log('full number is:', fullPhone);

      if (!value.trim()) {
        setErrors(prev => ({...prev, phone: 'Phone number is required'}));
        return false;
      } else if (!phoneNumber || !phoneNumber.isValid()) {
        setErrors(prev => ({
          ...prev,
          phone: 'Please enter a valid phone number',
        }));
        return false;
      } else {
        setErrors(prev => ({...prev, phone: ''}));
        return true;
      }
    } catch (err) {
      setErrors(prev => ({...prev, phone: 'Invalid phone number'}));
      return false;
    }
  };

  const validateName = (value: string): boolean => {
    if (!value.trim()) {
      return false;
    }
    return true;
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({...prev, [field]: true}));

    switch (field) {
      case 'email':
        validateEmail(email);
        break;
      case 'password':
        validatePassword(password);
        break;
      case 'confirmPassword':
        validateConfirmPassword(confirmPassword);
        break;
      case 'phone':
        validatePhone(`${dialCode}${phone}`);
        break;
      case 'name':
        validateName(name);
        break;
    }
  };

  const validateAllInputs = (): boolean => {
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
      phone: true,
      name: true,
    });

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    const isPhoneValid = validatePhone(`${dialCode}${phone}`);
    const isNameValid = validateName(name);

    return (
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isPhoneValid &&
      isNameValid
    );
  };

  const onRegister = async () => {
    console.log('onRegister called in CreateAccountScreen comp');
    if (!validateAllInputs()) {
      console.log('Validation error occured in CreateAccountScreen');
      Alert.alert('Validation Error', 'Please fix the errors in the form');
      return;
    }

    setLoading(true);
    try {
      console.log(
        'calling createUserWithEmailAndPassword in CreateAccountScreen',
      );
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      console.log('calling saveUserToFirestore in CreateAccountScreen');
      const result = await saveUserToFirestore(user.uid, {
        email,
        displayName: name,
        phone: `${dialCode}${phone}`,
        photoUri: photoUri,
      });

      console.log('user stored in CreateAccountScreen in result : ', result);

      if (result.success) {
        Alert.alert('Success', 'Account created successfully!');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
        setName('');
        setPhotoUri(null);
        setTouched({
          email: false,
          password: false,
          confirmPassword: false,
          phone: false,
          name: false,
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'AuthLoading'}],
        });
      } else {
        Alert.alert('Error', 'Account created but failed to save profile data');
      }
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'That email address is invalid!');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'Password is too weak.');
      } else {
        Alert.alert('Error', 'Something went wrong. Try again later.');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordStrength = () => {
    if (!touched.password || !password) return null;

    return (
      <View style={styles.strengthContainer}>
        <Text style={styles.strengthLabel}>Password strength: </Text>
        <Text style={[styles.strengthValue, {color: passwordStrength.color}]}>
          {passwordStrength.label}
        </Text>
        <View style={styles.strengthBar}>
          <View
            style={[
              styles.strengthFill,
              {
                width: `${(passwordStrength.score / 4) * 100}%`,
                backgroundColor: passwordStrength.color,
              },
            ]}
          />
        </View>
      </View>
    );
  };

  const onCancel = () => {
    navigation.navigate('Start');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Bubbles.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={[
              styles.scrollContainer,
              keyboardVisible && styles.scrollContainerKeyboard,
            ]}
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardShouldPersistTaps="handled">
            <View style={styles.formcontainer}>
              <Text style={styles.title}>Create{'\n'}Account</Text>

              <View style={{width: '100%', alignItems: 'flex-start'}}>
                <TouchableOpacity
                  style={
                    photoUri ? styles.imageContainer : styles.photoPlaceholder
                  }
                  onPress={handleImagePick}>
                  {photoUri ? (
                    <Image
                      source={{uri: photoUri}}
                      style={styles.profilePhoto}
                    />
                  ) : (
                    <Icon name="camera" size={24} color="#3A5BFF" />
                  )}
                </TouchableOpacity>
                <UploadPhotoModal
                  visible={showModal}
                  onClose={() => setShowModal(false)}
                  onCamera={handleCamera}
                  onGallery={handleGallery}
                />
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                  onBlur={() => handleBlur('name')}
                />
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    touched.email && errors.email ? styles.inputError : null,
                  ]}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  onBlur={() => handleBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {touched.email && errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>

              <View style={styles.inputWrapper}>
                <View
                  style={[
                    styles.passwordContainer,
                    touched.password && errors.password
                      ? styles.inputError
                      : null,
                  ]}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    onBlur={() => handleBlur('password')}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                      name={showPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
                {renderPasswordStrength()}
                {touched.password && errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
              </View>

              <View style={styles.inputWrapper}>
                <View
                  style={[
                    styles.passwordContainer,
                    touched.confirmPassword && password !== confirmPassword
                      ? styles.inputError
                      : null,
                  ]}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="#999"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onBlur={() => handleBlur('confirmPassword')}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }>
                    <Icon
                      name={showConfirmPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
                {touched.confirmPassword && password !== confirmPassword ? (
                  <Text style={styles.errorText}>Passwords do not match</Text>
                ) : null}
              </View>

              <View style={styles.inputWrapper}>
                <View style={styles.phoneContainer}>
                  <Picker
                    selectedValue={dialCode}
                    style={styles.pickerNative}
                    onValueChange={value => setDialCode(value)}
                    mode="dropdown">
                    {CountryData.map(country => (
                      <Picker.Item
                        key={country.value}
                        label={`${country.emoji} ${country.label} (${country.dial_value})`}
                        value={country.dial_value}
                      />
                    ))}
                  </Picker>
                  <TextInput
                    style={styles.phoneInput}
                    placeholder="Phone number"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    onBlur={() => handleBlur('phone')}
                  />
                </View>
                {touched.phone && errors.phone ? (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                ) : null}
              </View>

              <TouchableOpacity
                onPress={onRegister}
                style={[styles.doneButton, loading && styles.disabledButton]}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.doneText}>Create Account</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={onCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By signing up, you agree to our{' '}
                  <Text
                    onPress={() => navigation.navigate('TermsOfService')}
                    style={styles.termsLink}>
                    Terms of Service
                  </Text>{' '}
                  and{' '}
                  <Text
                    onPress={() => navigation.navigate('PrivacyPolicy')}
                    style={styles.termsLink}>
                    Privacy Policy
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '40%',
    zIndex: -1,
  },
  scrollContainerKeyboard: {
    paddingBottom: 200,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    minHeight: screenHeight,
  },
  formcontainer: {
    backgroundColor: 'transparent',
    flexGrow: 1,
    padding: 14,
    //alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: screenHeight - 100,
    //backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 40,
    marginBottom: 30,
    color: '#000',
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  imageContainer: {
    marginBottom: 30,
    borderRadius: 40,
    overflow: 'hidden',
  },
  photoPlaceholder: {
    borderWidth: 2,
    borderColor: '#3A5BFF',
    borderStyle: 'dashed',
    borderRadius: 50,
    padding: 25,
    marginBottom: 30,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#F6F6F6',
    borderRadius: 18,
    padding: 14,
    fontSize: 16,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#ff4d4f',
  },
  errorText: {
    color: '#ff4d4f',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F6F6F6',
    borderRadius: 18,
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
  },

  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 18,
    height: 50,
    overflow: 'hidden',
  },
  pickerNative: {
    width: 140,
    height: '120%',
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 1,
    paddingVertical: 1,
    fontSize: 16,
  },

  strengthContainer: {
    marginTop: 12,
    width: '100%',
  },
  strengthLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#666',
  },
  strengthValue: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  strengthBar: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    marginTop: 4,
    width: '100%',
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  doneButton: {
    backgroundColor: '#3A5BFF',
    width: '100%',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.7,
  },
  doneText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    color: '#3A5BFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  termsContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  termsLink: {
    color: '#3A5BFF',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    backgroundColor: '#3478f6',
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 12,
    alignItems: 'center',
  },
});

// 'use client';

// import {useState, useEffect, useRef, SetStateAction} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   ScrollView,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
// import {PermissionsAndroid} from 'react-native';

// import {
//   createUserWithEmailAndPassword,
//   getAuth,
// } from '@react-native-firebase/auth';
// import {RootStackParamList} from '../../App';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {saveUserToFirestore} from '../utils/firestore-utils';

// import {Picker} from '@react-native-picker/picker';

// // 👇 NEW IMPORT
// import RNPickerSelect from 'react-native-picker-select';
// import {CountryData} from '../utils/country-data';

// type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

// // A small sample list—expand as needed or import from a JSON
// const COUNTRY_CODES = [
//   {label: '🇮🇳 +91', value: '+91'},
//   {label: '🇺🇸 +1', value: '+1'},
//   {label: '🇬🇧 +44', value: '+44'},
//   // …add the rest of your supported countries here
// ];

// const requestMediaPermission = async (): Promise<boolean> => {
//   if (Platform.OS === 'android' && Platform.Version >= 33) {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//       {
//         title: 'Media Permission',
//         message: 'App needs access to your photos to upload a profile picture',
//         buttonPositive: 'OK',
//       },
//     );
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   }
//   return true;
// };

// const requestCameraPermission = async (): Promise<boolean> => {
//   if (Platform.OS === 'android') {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: 'Camera Permission',
//         message: 'App needs access to your camera to take a photo',
//         buttonPositive: 'OK',
//       },
//     );
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   }
//   return true;
// };

// interface ValidationErrors {
//   email: string;
//   password: string;
//   phone: string;
// }

// const CreateAccountScreen: React.FC<Props> = ({navigation}) => {
//   // … your existing state
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [phone, setPhone] = useState(''); // the 10-digit part
//   const [dialCode, setDialCode] = useState('+91'); // default country code
//   const [name, setName] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [photoUri, setPhotoUri] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [errors, setErrors] = useState<ValidationErrors>({
//     email: '',
//     password: '',
//     phone: '',
//   });
//   const [touched, setTouched] = useState({
//     email: false,
//     password: false,
//     confirmPassword: false,
//     phone: false,
//     name: false,
//   });

//   const [passwordStrength, setPasswordStrength] = useState({
//     score: 0,
//     label: '',
//     color: '#ccc',
//   });

//   // — your existing useEffects for validation —
//   useEffect(() => {
//     if (touched.email) validateEmail(email);
//   }, [email, touched.email]);
//   useEffect(() => {
//     if (touched.password) validatePassword(password);
//   }, [password, touched.password]);
//   useEffect(() => {
//     if (touched.confirmPassword) validateConfirmPassword(confirmPassword);
//   }, [confirmPassword, password, touched.confirmPassword]);
//   useEffect(() => {
//     if (touched.phone) validatePhone(`${dialCode}${phone}`);
//   }, [phone, dialCode, touched.phone]);

//   const handleImagePick = () => {
//     Alert.alert('Upload Photo', 'Choose an option', [
//       {
//         text: 'Take Photo',
//         onPress: async () => {
//           const hasPermission = await requestCameraPermission();
//           if (hasPermission) {
//             launchCamera({mediaType: 'photo'}, response => {
//               if (response.assets?.length) {
//                 setPhotoUri(response.assets[0].uri || null);
//               }
//             });
//           } else {
//             Alert.alert('Camera permission denied');
//           }
//         },
//       },
//       {
//         text: 'Choose from Gallery',
//         onPress: async () => {
//           const hasPermission = await requestMediaPermission();
//           if (hasPermission) {
//             launchImageLibrary({mediaType: 'photo'}, response => {
//               if (response.assets?.length) {
//                 setPhotoUri(response.assets[0].uri || null);
//               }
//             });
//           } else {
//             Alert.alert('Gallery permission denied');
//           }
//         },
//       },
//       {text: 'Cancel', style: 'cancel'},
//     ]);
//   };

//   // — your existing validations…
//   const validateEmail = (value: string): boolean => {
//     const emailRegex =
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (!value.trim()) {
//       setErrors(prev => ({...prev, email: 'Email is required'}));
//       return false;
//     } else if (!emailRegex.test(value)) {
//       setErrors(prev => ({
//         ...prev,
//         email: 'Please enter a valid email address',
//       }));
//       return false;
//     } else {
//       setErrors(prev => ({...prev, email: ''}));
//       return true;
//     }
//   };

//   const validatePassword = (value: string): boolean => {
//     // …same as before
//     // setErrors(prev => ({...prev, password: feedback}));
//     // setPasswordStrength(...)
//     // return feedback === '';
//     // (keep exactly your old code)
//     if (!value.trim()) {
//       setErrors(prev => ({...prev, password: 'Password is required'}));
//       setPasswordStrength({score: 0, label: '', color: '#ccc'});
//       return false;
//     }
//     let score = 0,
//       feedback = '';
//     if (value.length < 8) {
//       feedback = 'Password must be at least 8 characters';
//       setErrors(prev => ({...prev, password: feedback}));
//       setPasswordStrength({score: 1, label: 'Weak', color: '#ff4d4f'});
//       return false;
//     } else score++;
//     const hasUpper = /[A-Z]/.test(value);
//     const hasLower = /[a-z]/.test(value);
//     const hasNum = /\d/.test(value);
//     const hasSpec = /[!@#$%^&*(),.?":{}|<>]/.test(value);
//     let complexity = [hasUpper, hasLower, hasNum, hasSpec].filter(
//       x => x,
//     ).length;
//     score += complexity;
//     if (score <= 2) {
//       setPasswordStrength({score: 2, label: 'Weak', color: '#ff4d4f'});
//       feedback = 'Password is too weak';
//     } else if (score <= 3) {
//       setPasswordStrength({score: 3, label: 'Medium', color: '#faad14'});
//       feedback = '';
//     } else {
//       setPasswordStrength({score: 4, label: 'Strong', color: '#52c41a'});
//       feedback = '';
//     }
//     setErrors(prev => ({...prev, password: feedback}));
//     return feedback === '';
//   };

//   const validateConfirmPassword = (value: string): boolean => {
//     if (value !== password) {
//       setErrors(prev => ({...prev, password: 'Passwords do not match'}));
//       return false;
//     } else {
//       setErrors(prev => ({...prev, password: ''}));
//       return true;
//     }
//   };

//   // const validatePhone = (value: string): boolean => {
//   //   if (!value.trim()) {
//   //     setErrors(prev => ({...prev, phone: 'Phone number is required'}));
//   //     return false;
//   //   }
//   //   const regex = /^\+[1-9]\d{1,14}$/; // E.164 format
//   //   if (!regex.test(value)) {
//   //     setErrors(prev => ({
//   //       ...prev,
//   //       phone: 'Please enter a valid phone number',
//   //     }));
//   //     return false;
//   //   }
//   //   setErrors(prev => ({...prev, phone: ''}));
//   //   return true;
//   // };
//   const validatePhone = (value: string): boolean => {
//     const fullPhone = dialCode + value;
//     const phoneRegex = /^\+\d{1,4}[\s.-]?\d{3,4}[\s.-]?\d{3,4}$/;
//     if (!value.trim()) {
//       setErrors(prev => ({...prev, phone: 'Phone number is required'}));
//       return false;
//     } else if (!phoneRegex.test(fullPhone)) {
//       setErrors(prev => ({
//         ...prev,
//         phone: 'Please enter a valid phone number',
//       }));
//       return false;
//     } else {
//       setErrors(prev => ({...prev, phone: ''}));
//       return true;
//     }
//   };

//   const validateName = (value: string): boolean => !!value.trim();

//   const handleBlur = (field: keyof typeof touched) => {
//     setTouched(prev => ({...prev, [field]: true}));
//     switch (field) {
//       case 'email':
//         validateEmail(email);
//         break;
//       case 'password':
//         validatePassword(password);
//         break;
//       case 'confirmPassword':
//         validateConfirmPassword(confirmPassword);
//         break;
//       case 'phone':
//         validatePhone(`${dialCode}${phone}`);
//         break;
//       case 'name':
//         validateName(name);
//         break;
//     }
//   };

//   const validateAllInputs = (): boolean => {
//     setTouched({
//       email: true,
//       password: true,
//       confirmPassword: true,
//       phone: true,
//       name: true,
//     });

//     const v1 = validateEmail(email);
//     const v2 = validatePassword(password);
//     const v3 = validateConfirmPassword(confirmPassword);
//     const v4 = validatePhone(`${dialCode}${phone}`);
//     const v5 = validateName(name);
//     return v1 && v2 && v3 && v4 && v5;
//   };

//   const onRegister = async () => {
//     if (!validateAllInputs()) {
//       Alert.alert('Validation Error', 'Please fix the errors in the form');
//       return;
//     }
//     setLoading(true);
//     try {
//       const auth = getAuth();
//       const userCred = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password,
//       );
//       const user = userCred.user;

//       await saveUserToFirestore(user.uid, {
//         email,
//         displayName: name,
//         phone: `${dialCode}${phone}`, // full E.164
//         photoUri,
//       });

//       Alert.alert('Success', 'Account created successfully!');
//       // reset form…
//       setEmail('');
//       setPassword('');
//       setConfirmPassword('');
//       setPhone('');
//       setName('');
//       setPhotoUri(null);
//       setTouched({
//         email: false,
//         password: false,
//         confirmPassword: false,
//         phone: false,
//         name: false,
//       });
//     } catch (err: any) {
//       if (err.code === 'auth/email-already-in-use') {
//         Alert.alert('Error', 'That email address is already in use!');
//       } else if (err.code === 'auth/invalid-email') {
//         Alert.alert('Error', 'That email address is invalid!');
//       } else if (err.code === 'auth/weak-password') {
//         Alert.alert('Error', 'Password is too weak.');
//       } else {
//         Alert.alert('Error', 'Something went wrong. Try again later.');
//         console.error(err);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderPasswordStrength = () => {
//     if (!touched.password || !password) return null;
//     return (
//       <View style={styles.strengthContainer}>
//         <Text style={styles.strengthLabel}>Password strength: </Text>
//         <Text style={[styles.strengthValue, {color: passwordStrength.color}]}>
//           {passwordStrength.label}
//         </Text>
//         <View style={styles.strengthBar}>
//           <View
//             style={[
//               styles.strengthFill,
//               {
//                 width: `${(passwordStrength.score / 4) * 100}%`,
//                 backgroundColor: passwordStrength.color,
//               },
//             ]}
//           />
//         </View>
//       </View>
//     );
//   };

//   const onCancel = () => navigation.navigate('Start');

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={{flex: 1}}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         keyboardShouldPersistTaps="handled">
//         <View style={styles.container}>
//           <Text style={styles.title}>Create{'\n'}Account</Text>

//           <View style={{width: '100%', alignItems: 'flex-start'}}>
//             <TouchableOpacity
//               style={photoUri ? styles.imageContainer : styles.photoPlaceholder}
//               onPress={handleImagePick}>
//               {photoUri ? (
//                 <Image source={{uri: photoUri}} style={styles.profilePhoto} />
//               ) : (
//                 <Icon name="camera" size={24} color="#3A5BFF" />
//               )}
//             </TouchableOpacity>
//           </View>

//           <View style={styles.inputWrapper}>
//             <TextInput
//               style={styles.input}
//               placeholder="Full Name"
//               placeholderTextColor="#999"
//               value={name}
//               onChangeText={setName}
//               onBlur={() => handleBlur('name')}
//             />
//           </View>

//           <View style={styles.inputWrapper}>
//             <TextInput
//               style={[
//                 styles.input,
//                 touched.email && errors.email ? styles.inputError : null,
//               ]}
//               placeholder="Email"
//               placeholderTextColor="#999"
//               value={email}
//               onChangeText={setEmail}
//               onBlur={() => handleBlur('email')}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//             {touched.email && errors.email ? (
//               <Text style={styles.errorText}>{errors.email}</Text>
//             ) : null}
//           </View>

//           <View style={styles.inputWrapper}>
//             <View
//               style={[
//                 styles.passwordContainer,
//                 touched.password && errors.password ? styles.inputError : null,
//               ]}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Password"
//                 placeholderTextColor="#999"
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={setPassword}
//                 onBlur={() => handleBlur('password')}
//                 autoCapitalize="none"
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Icon
//                   name={showPassword ? 'eye' : 'eye-off'}
//                   size={20}
//                   color="#999"
//                 />
//               </TouchableOpacity>
//             </View>
//             {renderPasswordStrength()}
//             {touched.password && errors.password ? (
//               <Text style={styles.errorText}>{errors.password}</Text>
//             ) : null}
//           </View>

//           <View style={styles.inputWrapper}>
//             <View
//               style={[
//                 styles.passwordContainer,
//                 touched.confirmPassword && password !== confirmPassword
//                   ? styles.inputError
//                   : null,
//               ]}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Confirm Password"
//                 placeholderTextColor="#999"
//                 secureTextEntry={!showConfirmPassword}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 onBlur={() => handleBlur('confirmPassword')}
//                 autoCapitalize="none"
//               />
//               <TouchableOpacity
//                 onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
//                 <Icon
//                   name={showConfirmPassword ? 'eye' : 'eye-off'}
//                   size={20}
//                   color="#999"
//                 />
//               </TouchableOpacity>
//             </View>
//             {touched.confirmPassword && password !== confirmPassword ? (
//               <Text style={styles.errorText}>Passwords do not match</Text>
//             ) : null}
//           </View>

//           {/* 👇 Country Code Picker + Phone Input */}
//           {/* Country Code Picker + Phone Input */}
//           {/* <View style={styles.inputWrapper}>
//             <View style={styles.phoneContainer}>
//               <Picker
//                 selectedValue={dialCode}
//                 style={styles.pickerNative}
//                 onValueChange={code => setDialCode(code)}
//                 mode="dropdown">
//                 {COUNTRY_CODES.map(c => (
//                   <Picker.Item key={c.value} label={c.label} value={c.value} />
//                 ))}
//               </Picker>

//               <TextInput
//                 style={styles.phoneInput}
//                 placeholder="Phone number"
//                 placeholderTextColor="#999"
//                 keyboardType="phone-pad"
//                 value={phone}
//                 onChangeText={setPhone}
//                 onBlur={() => handleBlur('phone')}
//               />
//             </View>
//             {touched.phone && errors.phone ? (
//               <Text style={styles.errorText}>{errors.phone}</Text>
//             ) : null}
//           </View> */}

//           <View style={styles.inputWrapper}>
//             <View style={styles.phoneContainer}>
//               <Picker
//                 selectedValue={dialCode}
//                 style={styles.pickerNative}
//                 onValueChange={value => setDialCode(value)}
//                 mode="dropdown">
//                 {CountryData.map(country => (
//                   <Picker.Item
//                     key={country.value}
//                     label={`${country.emoji} ${country.label} (${country.dial_value})`}
//                     value={country.dial_value}
//                   />
//                 ))}
//               </Picker>
//               <TextInput
//                 style={styles.phoneInput}
//                 placeholder="Phone number"
//                 placeholderTextColor="#999"
//                 keyboardType="phone-pad"
//                 value={phone}
//                 onChangeText={setPhone}
//                 onBlur={() => handleBlur('phone')}
//               />
//             </View>
//             {touched.phone && errors.phone ? (
//               <Text style={styles.errorText}>{errors.phone}</Text>
//             ) : null}
//           </View>

//           <TouchableOpacity
//             onPress={onRegister}
//             style={[styles.doneButton, loading && styles.disabledButton]}
//             disabled={loading}>
//             {loading ? (
//               <ActivityIndicator color="#fff" size="small" />
//             ) : (
//               <Text style={styles.doneText}>Create Account</Text>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity onPress={onCancel}>
//             <Text style={styles.cancelText}>Cancel</Text>
//           </TouchableOpacity>

//           <View style={styles.termsContainer}>
//             <Text style={styles.termsText}>
//               By signing up, you agree to our{' '}
//               <Text
//                 onPress={() => navigation.navigate('TermsOfService')}
//                 style={styles.termsLink}>
//                 Terms of Service
//               </Text>{' '}
//               and{' '}
//               <Text
//                 onPress={() => navigation.navigate('PrivacyPolicy')}
//                 style={styles.termsLink}>
//                 Privacy Policy
//               </Text>
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default CreateAccountScreen;

// const styles = StyleSheet.create({
//   scrollContainer: {paddingVertical: 20},
//   container: {flex: 1, alignItems: 'center', paddingHorizontal: 20},
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },

//   imageContainer: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     overflow: 'hidden',
//     marginBottom: 20,
//   },
//   photoPlaceholder: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profilePhoto: {width: '100%', height: '100%'},

//   inputWrapper: {width: '100%', marginBottom: 15},
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     height: 45,
//   },
//   inputError: {borderColor: '#ff4d4f'},
//   errorText: {color: '#ff4d4f', marginTop: 5},

//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     height: 45,
//   },
//   passwordInput: {flex: 1},

//   strengthContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
//   strengthLabel: {fontSize: 12},
//   strengthValue: {fontSize: 12, fontWeight: 'bold'},
//   strengthBar: {
//     flex: 1,
//     height: 5,
//     backgroundColor: '#eee',
//     borderRadius: 3,
//     marginLeft: 10,
//   },
//   strengthFill: {height: '100%', borderRadius: 3},

//   // phone picker + input container
//   // phoneContainer: {
//   //   flexDirection: 'row',
//   //   alignItems: 'center',
//   //   borderWidth: 1,
//   //   borderColor: '#ccc',
//   //   borderRadius: 8,
//   //   height: 45,
//   //   overflow: 'hidden',
//   // },
//   // pickerNative: {
//   //   width: 200,
//   //   height: '180%',
//   //   color: '#333',
//   // },
//   pickerText: {
//     fontSize: 16,
//     paddingVertical: 0,
//     paddingHorizontal: 8,
//   },
//   // phoneInput: {
//   //   flex: 1,
//   //   height: '100%',
//   //   paddingHorizontal: 10,
//   // },
//   phoneContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     height: 60,
//     overflow: 'hidden',
//   },
//   pickerNative: {
//     width: 140,
//     height: '100%',
//     color: '#333',
//   },
//   phoneInput: {
//     flex: 1,
//     height: '100%',
//     paddingHorizontal: 10,
//     color: '#000',
//   },

//   doneButton: {
//     backgroundColor: '#3A5BFF',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   disabledButton: {opacity: 0.6},
//   doneText: {color: '#fff', fontSize: 16},
//   cancelText: {color: '#3A5BFF', marginTop: 10},
//   termsContainer: {marginTop: 20, paddingHorizontal: 10},
//   termsText: {fontSize: 12, textAlign: 'center', color: '#666'},
//   termsLink: {color: '#3A5BFF'},
// });
