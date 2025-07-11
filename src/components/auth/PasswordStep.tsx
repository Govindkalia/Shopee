'use client';

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Keyboard,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {getUserByEmail} from '../../utils/firestore-utils';

interface PasswordStepProps {
  email: string;
  displayName: string;
  photoURL?: string | null;
  password: string;
  setPassword: (password: string) => void;
  passwordError: string;
  loading: boolean;
  // showPassword: boolean;
  // setShowPassword: (show: boolean) => void;
  onLogin: () => void;
  onForgotPassword: () => void;
  onNotYou: () => void;
  isWrongPassword: boolean;
}

const PasswordStep: React.FC<PasswordStepProps> = ({
  email,
  displayName,
  photoURL,
  password,
  setPassword,
  passwordError,
  loading,
  // showPassword,
  // setShowPassword,
  onLogin,
  onForgotPassword,
  onNotYou,
  isWrongPassword,
}) => {
  const inputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log('enterig in getuserbyemail through password step');
    const fetchUserData = async () => {
      try {
        const {success, userData} = await getUserByEmail(email);
        if (success && userData) {
          console.log('found userdata from emial,', userData);
        }
      } catch (error) {
        console.error('Failed to fetch user display name:', error);
      }
    };

    fetchUserData();
  }, [email]);
  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const hideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (isWrongPassword) {
      setPassword('');
    }
  }, [isWrongPassword, setPassword]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({animated: true});
  }, [password]);

  const handleBoxPress = () => {
    inputRef.current?.focus();
  };

  const displayedCharacters = showPassword
    ? password.split('')
    : password.split('').map(() => '•');

  // const handlePasswordVisibility = () => {
  //   console.log('pressed eye button in PasswordSetup');
  //   console.log('showPassword in PasswordSetup : ', showPassword);
  //   showPassword = !showPassword;
  // };

  return (
    <View style={styles.formContainer}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={styles.profileContainer}>
          {photoURL ? (
            <Image source={{uri: photoURL}} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileInitial}>
                {displayName?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
          )}

          <Text style={styles.greeting}>Hello, {displayName}!!</Text>
        </View>

        <Text style={styles.passwordLabel}>Type your password</Text>

        {/* Hidden input to capture actual typing */}
        <TextInput
          ref={inputRef}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry={false}
          onSubmitEditing={onLogin}
          style={styles.hiddenInput}
          autoFocus
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleBoxPress}
          style={[
            styles.boxWrapper,
            isWrongPassword ? styles.inputError : null,
          ]}>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.boxScroll}>
            {displayedCharacters.map((char, index) => (
              <View key={index} style={styles.charBox}>
                <Text style={styles.charText}>{char}</Text>
              </View>
            ))}
            <View style={styles.cursorBox}>
              <Text style={styles.cursorText}>|</Text>
            </View>
          </ScrollView>

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color="#999"
              style={{marginLeft: 8}}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        {isWrongPassword && (
          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={onForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.notYouContainer}>
        <Text style={styles.notYouText}>Not you?</Text>
        <TouchableOpacity style={styles.notYouButton} onPress={onNotYou}>
          <Icon name="arrow-right" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#316bff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 16,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffb6c1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 50,
  },
  profileInitial: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  passwordLabel: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
  },
  boxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF4F4',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  boxScroll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  charBox: {
    textAlign: 'center',
    width: 12,
    height: 42,
    marginHorizontal: 2,
    borderBottomWidth: 2,
    borderColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  charText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  cursorBox: {
    width: 10,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cursorText: {
    fontSize: 20,
    color: '#316bff',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#ff4d4f',
  },
  errorText: {
    color: '#ff4d4f',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginBottom: 40,
  },
  forgotPasswordText: {
    color: '#000',
    fontSize: 14,
  },
  notYouContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  notYouText: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  notYouButton: {
    backgroundColor: '#316bff',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PasswordStep;
