'use client';

import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import EmailStep from '../components/auth/EmailStep';
import PasswordStep from '../components/auth/PasswordStep';

import {
  validateEmail,
  validatePassword,
  checkUserExists,
  loginWithEmailAndPassword,
  getErrorMessageFromCode,
} from '../utils/auth-utils';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {getUserByEmail} from '../utils/firestore-utils';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

enum LoginStep {
  EMAIL = 'email',
  PASSWORD = 'password',
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState<LoginStep>(LoginStep.EMAIL);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [showSignupOption, setShowSignupOption] = useState(false);
  const [displayName, setDisplayName] = useState('User');

  const handleEmailNext = async () => {
    setEmailError('');
    setShowSignupOption(false);
    const {success, userData} = await getUserByEmail(email);

    console.log('userdata coming from email is:', userData);
    if (success && userData) {
      setDisplayName(userData.displayName);
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    try {
      const exists = await checkUserExists(email);
      if (!exists) {
        setEmailError('No account found with this email');
        setShowSignupOption(true);
        return;
      }
      setCurrentStep(LoginStep.PASSWORD);
    } catch (err) {
      console.error('Error checking user existence:', err);
    }
  };

  // const handleLogin = async () => {
  //   setPasswordError('');

  //   if (!validatePassword(password)) {
  //     setPasswordError('Password must be at least 6 characters');
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const result = await loginWithEmailAndPassword(email, password);
  //     if (result.success) {
  //       // Alert.alert('Success', 'You are now logged in!');
  //       setIsWrongPassword(false);
  //       navigation.reset({
  //         index: 0,
  //         routes: [{name: 'AuthLoading'}],
  //       });
  //     } else {
  //       const msg = getErrorMessageFromCode(
  //         result.errorCode || 'auth/invalid-credential',
  //       );
  //       setPasswordError(msg);
  //       setIsWrongPassword(true);
  //       setPassword('');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogin = async () => {
    setLoading(true); // Add this

    try {
      const result = await loginWithEmailAndPassword(email, password);

      if (result.success) {
        setIsWrongPassword(false);
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'AuthLoading'}],
        });
      } else {
        const msg = getErrorMessageFromCode(
          result.errorCode || 'auth/invalid-credential',
        );
        setIsWrongPassword(true);
        setPassword('');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNotYou = () => {
    setCurrentStep(LoginStep.EMAIL);
    setPassword('');
    setPasswordError('');
    setIsWrongPassword(false);
  };

  const handleForgotPassword = () => {
    navigation.navigate('PasswordRecoveryScreen', {email});
  };

  const handleCancel = () => {
    navigation.navigate('Start');
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Image
                source={require('../assets/bubble02.png')}
                style={styles.bubbleLeft}
                resizeMode="contain"
              />
              <Image
                source={require('../assets/bubble01.png')}
                style={styles.bubbleTopLeft}
                resizeMode="contain"
              />

              <Image
                source={require('../assets/bubble03.png')}
                style={styles.bubbleTopRight}
                resizeMode="contain"
              />
              <Image
                source={require('../assets/bubble04.png')}
                style={styles.bubbleRight}
                resizeMode="contain"
              />
              {currentStep === LoginStep.EMAIL ? (
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.formWrapper}>
                  <EmailStep
                    email={email}
                    setEmail={setEmail}
                    emailError={emailError}
                    loading={loading}
                    onNext={handleEmailNext}
                    onCancel={handleCancel}
                  />

                  {showSignupOption && (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Signup')}
                      style={styles.signupContainer}>
                      <Text style={styles.signupText}>
                        Don’t have an account?{' '}
                        <Text style={styles.signupLink}>Sign up</Text>
                      </Text>
                    </TouchableOpacity>
                  )}
                </ScrollView>
              ) : (
                <PasswordStep
                  email={email}
                  displayName={displayName}
                  photoURL=""
                  //   displayName={userData?.displayName || 'User'}
                  //   photoURL={userData?.photoURL}
                  password={password}
                  setPassword={setPassword}
                  passwordError={passwordError}
                  loading={loading}
                  //   showPassword={true}
                  //   setShowPassword={() => {}}
                  onLogin={handleLogin}
                  onForgotPassword={handleForgotPassword}
                  onNotYou={handleNotYou}
                  isWrongPassword={isWrongPassword}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    zIndex: 0,
  },
  bubbleTopLeft: {
    position: 'absolute',
    top: -100,
    left: -120,
    width: 400,
    height: 350,
    zIndex: -1,
    elevation: -1,
  },

  bubbleLeft: {
    position: 'absolute',
    top: -40,
    left: -60,
    width: 380,
    height: 330,
    zIndex: -1,
    elevation: -1,
    borderColor: 'red',
  },

  bubbleTopRight: {
    position: 'absolute',
    top: 200,
    right: -100,
    width: 250,
    height: 137,
    zIndex: -1,
    elevation: -1,
  },

  bubbleRight: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    width: 400,
    height: 400,
    zIndex: -1,
    elevation: -1,
  },

  emailContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 14,
    paddingBottom: 40,
  },
  signupContainer: {
    alignSelf: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    color: '#666',
  },
  formWrapper: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 14,
    paddingBottom: 40,
  },
  signupLink: {
    color: '#316bff',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
