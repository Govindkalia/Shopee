'use client';

import {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

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
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomSizeAlert from '../components/alerts/customSizeAlert';
import UploadPhotoModal from '../components/alerts/uploadPhotoAlert';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

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

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

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

  const handleImagePick = () => {
    setShowModal(true);
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
      // Alert.alert('Validation Error', 'Please fix the errors in the form');
      showAlert('Validation Error', 'Please fix the errors in the form');
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
        showAlert('Error', 'Account created but failed to save profile data');
      }
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        showAlert('Error', 'That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        showAlert('Error', 'That email address is invalid!');
      } else if (error.code === 'auth/weak-password') {
        showAlert('Error', 'Password is too weak.');
      } else {
        showAlert('Error', 'Something went wrong. Try again later.');
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
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/Bubbles.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
            <CustomSizeAlert
              visible={alertVisible}
              title={alertTitle}
              message={alertMessage}
              onClose={() => setAlertVisible(false)}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    zIndex: 0,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '40%',
    zIndex: -1,
  },
  scrollContainerKeyboard: {
    // paddingBottom: 200,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    // minHeight: screenHeight,
  },
  formcontainer: {
    backgroundColor: 'transparent',
    flexGrow: 1,
    padding: 14,
    justifyContent: 'flex-start',
    // minHeight: screenHeight - 140,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 40,
    marginBottom: 20,
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
    backgroundColor: '#FAF4F4',
    borderRadius: 18,
    padding: 14,
    fontSize: 14,
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
    backgroundColor: '#FAF4F4',
    borderRadius: 18,
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
  },

  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF4F4',
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
    fontSize: 14,
  },

  strengthContainer: {
    margin: 12,
    width: '93%',
  },
  strengthLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#666',
  },
  strengthValue: {
    fontSize: 12,
    fontWeight: 'bold',
    // marginLeft: 4,
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
    color: '#202020',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  termsContainer: {
    marginTop: 30,
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
