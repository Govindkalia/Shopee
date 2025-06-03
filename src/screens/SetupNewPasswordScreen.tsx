// import {
//   View,
//   Text,
//   SafeAreaView,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
// } from 'react-native';
// import React from 'react';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../../App';

// type Props = NativeStackScreenProps<
//   RootStackParamList,
//   'SetupNewPasswordScreen'
// >;

// const SetupNewPasswordScreen: React.FC<Props> = ({navigation}) => {
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
//           Please, setup a new password for your account
//         </Text>

//         <TextInput
//         placeholder='new password'
//         />
//         <TextInput
//         placeholder='confirm password'
//         />

//       </View>
//       <TouchableOpacity style={styles.nextButton}>
//         <Text style={styles.nextButtonText}>Save</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
//         <Text style={styles.cancelText}>Cancel</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#F5F5F5'},
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
//     marginBottom: 24,
//     textAlign: 'center',
//     paddingHorizontal: 35,
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
//   cancelButton: {
//     paddingVertical: 10,
//   },
//   cancelText: {
//     color: '#666',
//     fontSize: 16,
//   },
// });
// export default SetupNewPasswordScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'SetupNewPasswordScreen'
>;

const SetupNewPasswordScreen: React.FC<Props> = ({navigation}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: '',
    color: '#ccc',
  });
  const [errors, setErrors] = useState<{password?: string}>({});
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    navigation.goBack();
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
    if (value !== newPassword) {
      setErrors(prev => ({...prev, password: 'Passwords do not match'}));
      return false;
    } else {
      setErrors(prev => ({...prev, password: ''}));
      return true;
    }
  };

  const handleSave = async () => {
    const isPasswordValid = validatePassword(newPassword);
    const isConfirmValid = validateConfirmPassword(confirmPassword);

    if (!isPasswordValid || !isConfirmValid) return;

    try {
      setLoading(true);
      const currentUser = auth().currentUser;
      console.log('current user from setupnewpasswordscreen:', currentUser);

      if (currentUser) {
        await currentUser.updatePassword(newPassword);
        Alert.alert('Success', 'Password updated. Please login again.');
        await auth().signOut();
        navigation.replace('Login');
      } else {
        Alert.alert('Error', 'No user is logged in.');
      }
    } catch (error: any) {
      console.error('Error updating password:', error);
      Alert.alert('Error', error.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  // Re-validate on every password change
  useEffect(() => {
    validatePassword(newPassword);
    validateConfirmPassword(confirmPassword);
  }, [newPassword, confirmPassword]);

  const isFormValid =
    newPassword &&
    confirmPassword &&
    errors.password === '' &&
    passwordStrength.score >= 3;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../assets/avatar.webp')}
              style={styles.avatar}
            />
          </View>

          <Text style={styles.title}>Setup New Password</Text>
          <Text style={styles.subtitle}>
            Please, setup a new password for your account
          </Text>

          <TextInput
            placeholder="New password"
            secureTextEntry
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <View style={styles.strengthBarWrapper}>
            <View
              style={[
                styles.strengthBar,
                {
                  width: `${passwordStrength.score * 25}%`,
                  backgroundColor: passwordStrength.color,
                },
              ]}
            />
          </View>

          {passwordStrength.label ? (
            <Text style={{color: passwordStrength.color, marginBottom: 8}}>
              Strength: {passwordStrength.label}
            </Text>
          ) : null}

          <TextInput
            placeholder="Confirm password"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {errors.password ? (
            <Text style={{color: 'red', marginBottom: 10}}>
              {errors.password}
            </Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={[
            styles.nextButton,
            (!isFormValid || loading) && {opacity: 0.6},
          ]}
          onPress={handleSave}
          disabled={!isFormValid || loading}>
          <Text style={styles.nextButtonText}>
            {loading ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
  input: {
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  strengthBarWrapper: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 8,
  },
  strengthBar: {
    height: '100%',
    borderRadius: 5,
  },
  nextButton: {
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
  cancelButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#666',
    fontSize: 16,
  },
});

export default SetupNewPasswordScreen;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   ScrollView,
// } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../../App';

// type Props = NativeStackScreenProps<
//   RootStackParamList,
//   'SetupNewPasswordScreen'
// >;

// const SetupNewPasswordScreen: React.FC<Props> = ({navigation}) => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirm, setConfirm] = useState('');
//   const [error, setError] = useState<string>();
//   const [loading, setLoading] = useState(false);

//   const validate = (): boolean => {
//     if (newPassword.length < 8) {
//       setError('Password must be at least 8 characters');
//       return false;
//     }
//     if (newPassword !== confirm) {
//       setError('Passwords do not match');
//       return false;
//     }
//     setError(undefined);
//     return true;
//   };

//   useEffect(() => {
//     validate();
//   }, [newPassword, confirm]);

//   const save = async () => {
//     if (!validate()) return;
//     try {
//       setLoading(true);
//       await auth().currentUser!.updatePassword(newPassword);
//       Alert.alert('Success', 'Password updated. Please log in again.', [
//         {
//           text: 'OK',
//           onPress: async () => {
//             await auth().signOut();
//             navigation.replace('Login');
//           },
//         },
//       ]);
//     } catch (err: any) {
//       const msg = err?.message ?? 'Failed to update password';
//       Alert.alert('Error', msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.title}>Set a new password</Text>
//         <TextInput
//           placeholder="New password"
//           secureTextEntry
//           style={styles.input}
//           value={newPassword}
//           onChangeText={setNewPassword}
//         />
//         <TextInput
//           placeholder="Confirm password"
//           secureTextEntry
//           style={styles.input}
//           value={confirm}
//           onChangeText={setConfirm}
//         />
//         {error ? <Text style={styles.error}>{error}</Text> : null}
//         <TouchableOpacity
//           style={[styles.button, (!!error || loading) && styles.buttonDisabled]}
//           onPress={save}
//           disabled={!!error || loading}>
//           <Text style={styles.buttonText}>{loading ? 'Saving…' : 'Save'}</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flexGrow: 1, padding: 24, justifyContent: 'center'},
//   title: {fontSize: 24, fontWeight: 'bold', marginBottom: 16},
//   input: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//   },
//   error: {color: 'red', marginBottom: 12},
//   button: {
//     backgroundColor: '#316bff',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonDisabled: {opacity: 0.6},
//   buttonText: {color: '#fff', fontWeight: '600'},
// });

// export default SetupNewPasswordScreen;
