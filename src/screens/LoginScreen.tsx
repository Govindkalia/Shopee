// 'use client';

// import type React from 'react';
// import {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   fetchSignInMethodsForEmail,
// } from '@react-native-firebase/auth';

// // Login step enum
// enum LoginStep {
//   EMAIL = 'email',
//   PASSWORD = 'password',
// }

// interface UserData {
//   email: string;
//   displayName?: string;
//   photoURL?: string | null;
// }

// const LoginScreen: React.FC = () => {
//   // State for login flow
//   const [currentStep, setCurrentStep] = useState<LoginStep>(LoginStep.EMAIL);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [passwordDots, setPasswordDots] = useState<boolean[]>([]);

//   // Update password dots visualization
//   useEffect(() => {
//     const dots = Array(password.length).fill(true);
//     setPasswordDots(dots);
//   }, [password]);

//   // Check if email exists in Firebase
//   const checkEmailExists = async () => {
//     if (!validateEmail(email)) {
//       return false;
//     }

//     setLoading(true);
//     try {
//       const auth = getAuth();

//       // OPTION 1: Try to use fetchSignInMethodsForEmail
//       try {
//         const methods = await fetchSignInMethodsForEmail(auth, email);
//         console.log('Sign-in methods for email:', methods);

//         // If methods array is empty, the email doesn't exist
//         if (methods.length === 0) {
//           console.log('No sign-in methods found for this email');

//           // DEVELOPMENT FALLBACK: For testing, assume the email exists
//           // Remove this in production or when the issue is fixed
//           console.log('DEV MODE: Bypassing email check for development');
//           setUserData({
//             email,
//             displayName: email.split('@')[0],
//             photoURL: null,
//           });
//           return true;
//         }

//         setUserData({
//           email,
//           displayName: email.split('@')[0],
//           photoURL: null,
//         });

//         return true;
//       } catch (methodError) {
//         console.error('Error with fetchSignInMethodsForEmail:', methodError);

//         // OPTION 2: Alternative approach - try to sign in with a dummy password
//         // This will fail but tell us if the email exists
//         try {
//           await signInWithEmailAndPassword(
//             auth,
//             email,
//             'dummy-password-that-will-fail',
//           );
//           return true; // This line won't execute because the sign-in will fail
//         } catch (signInError: any) {
//           console.log('Sign-in error code:', signInError.code);

//           // If error is "auth/wrong-password", the email exists but password is wrong
//           // If error is "auth/user-not-found", the email doesn't exist
//           if (signInError.code === 'auth/wrong-password') {
//             setUserData({
//               email,
//               displayName: email.split('@')[0],
//               photoURL: null,
//             });
//             return true;
//           } else if (signInError.code === 'auth/user-not-found') {
//             setEmailError('No account found with this email');
//             return false;
//           } else {
//             // DEVELOPMENT FALLBACK: For testing, assume the email exists
//             // Remove this in production
//             console.log('DEV MODE: Bypassing email check for development');
//             setUserData({
//               email,
//               displayName: email.split('@')[0],
//               photoURL: null,
//             });
//             return true;
//           }
//         }
//       }
//     } catch (error: any) {
//       console.error('Error checking email:', error);
//       setEmailError('Error checking email. Please try again.');

//       // DEVELOPMENT FALLBACK: For testing, assume the email exists
//       // Remove this in production
//       console.log('DEV MODE: Bypassing email check due to error');
//       setUserData({
//         email,
//         displayName: email.split('@')[0],
//         photoURL: null,
//       });
//       return true;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle login with email and password
//   const handleLogin = async () => {
//     if (!validatePassword(password)) {
//       return;
//     }

//     setLoading(true);
//     try {
//       const auth = getAuth();
//       await signInWithEmailAndPassword(auth, email, password);

//       // Success - navigate to home screen or next component
//       Alert.alert('Success', 'You are now logged in!');
//       // Here you would navigate to your next screen
//     } catch (error: any) {
//       console.error('Login error:', error);

//       if (error.code === 'auth/wrong-password') {
//         setPasswordError('Incorrect password');
//       } else if (error.code === 'auth/too-many-requests') {
//         setPasswordError('Too many failed attempts. Try again later.');
//       } else {
//         setPasswordError('Error signing in. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle "Next" button press
//   const handleNext = async () => {
//     if (currentStep === LoginStep.EMAIL) {
//       const emailExists = await checkEmailExists();
//       if (emailExists) {
//         setCurrentStep(LoginStep.PASSWORD);
//       }
//     } else if (currentStep === LoginStep.PASSWORD) {
//       await handleLogin();
//     }
//   };

//   // Handle "Not you?" button press
//   const handleNotYou = () => {
//     setCurrentStep(LoginStep.EMAIL);
//     setEmail('');
//     setPassword('');
//     setUserData(null);
//     setEmailError('');
//     setPasswordError('');
//   };

//   // Handle "Forgot Password" press
//   const handleForgotPassword = () => {
//     // Will implement this in the future
//     Alert.alert(
//       'Forgot Password',
//       'Password recovery will be implemented soon.',
//     );
//   };

//   // Email validation
//   const validateEmail = (value: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!value.trim()) {
//       setEmailError('Email is required');
//       return false;
//     } else if (!emailRegex.test(value)) {
//       setEmailError('Please enter a valid email address');
//       return false;
//     } else {
//       setEmailError('');
//       return true;
//     }
//   };

//   // Password validation
//   const validatePassword = (value: string): boolean => {
//     if (!value.trim()) {
//       setPasswordError('Password is required');
//       return false;
//     } else if (value.length < 6) {
//       setPasswordError('Password must be at least 6 characters');
//       return false;
//     } else {
//       setPasswordError('');
//       return true;
//     }
//   };

//   // Render email step
//   const renderEmailStep = () => (
//     <View style={styles.formContainer}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.title}>Login</Text>
//         <Text style={styles.subtitle}>Good to see you back! ❤️</Text>
//       </View>

//       <View style={styles.inputWrapper}>
//         <TextInput
//           style={[styles.input, emailError ? styles.inputError : null]}
//           placeholder="Email"
//           placeholderTextColor="#999"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           autoComplete="email"
//           onSubmitEditing={handleNext}
//         />
//         {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
//       </View>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={handleNext}
//         disabled={loading}>
//         {loading ? (
//           <ActivityIndicator color="#fff" size="small" />
//         ) : (
//           <Text style={styles.buttonText}>Next</Text>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.cancelButton}>
//         <Text style={styles.cancelText}>Cancel</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   // Render password step
//   const renderPasswordStep = () => (
//     <View style={styles.formContainer}>
//       <View style={styles.profileContainer}>
//         {userData?.photoURL ? (
//           <Image
//             source={{uri: userData.photoURL}}
//             style={styles.profileImage}
//           />
//         ) : (
//           <View style={styles.profileImagePlaceholder}>
//             <Text style={styles.profileInitial}>
//               {userData?.displayName?.charAt(0).toUpperCase() || 'U'}
//             </Text>
//           </View>
//         )}
//         <Text style={styles.greeting}>
//           Hello, {userData?.displayName || 'User'}!!
//         </Text>
//       </View>

//       <Text style={styles.passwordLabel}>Type your password</Text>

//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={[
//             styles.passwordInput,
//             passwordError ? styles.inputError : null,
//           ]}
//           placeholder="Password"
//           placeholderTextColor="#999"
//           secureTextEntry={!showPassword}
//           value={password}
//           onChangeText={setPassword}
//           autoCapitalize="none"
//           onSubmitEditing={handleLogin}
//         />
//         <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//           <Icon
//             name={showPassword ? 'eye' : 'eye-off'}
//             size={20}
//             color="#999"
//           />
//         </TouchableOpacity>
//       </View>

//       {passwordError ? (
//         <Text style={styles.errorText}>{passwordError}</Text>
//       ) : null}

//       {/* Password dots visualization */}
//       <View style={styles.passwordDotsContainer}>
//         {Array(8)
//           .fill(0)
//           .map((_, index) => (
//             <View
//               key={index}
//               style={[
//                 styles.passwordDot,
//                 index < passwordDots.length ? styles.passwordDotFilled : null,
//               ]}
//             />
//           ))}
//       </View>

//       <TouchableOpacity
//         style={styles.forgotPasswordButton}
//         onPress={handleForgotPassword}>
//         <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//       </TouchableOpacity>

//       <View style={styles.notYouContainer}>
//         <Text style={styles.notYouText}>Not you?</Text>
//         <TouchableOpacity style={styles.notYouButton} onPress={handleNotYou}>
//           <Icon name="arrow-right" size={16} color="#fff" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}>
//       <View style={styles.backgroundBlue} />
//       <View style={styles.backgroundBlueSmall} />

//       {currentStep === LoginStep.EMAIL
//         ? renderEmailStep()
//         : renderPasswordStep()}
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   backgroundBlue: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '50%',
//     height: '40%',
//     backgroundColor: '#316bff',
//     borderBottomRightRadius: 200,
//   },
//   backgroundBlueSmall: {
//     position: 'absolute',
//     bottom: '20%',
//     right: 0,
//     width: '30%',
//     height: '20%',
//     backgroundColor: '#316bff',
//     borderTopLeftRadius: 100,
//   },
//   formContainer: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
//   },
//   headerContainer: {
//     marginBottom: 40,
//   },
//   title: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#333',
//   },
//   inputWrapper: {
//     marginBottom: 24,
//   },
//   input: {
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
//   button: {
//     backgroundColor: '#316bff',
//     borderRadius: 12,
//     padding: 16,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   cancelButton: {
//     alignItems: 'center',
//   },
//   cancelText: {
//     color: '#316bff',
//     fontSize: 16,
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   profileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     borderWidth: 3,
//     borderColor: '#fff',
//     marginBottom: 16,
//   },
//   profileImagePlaceholder: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#ffb6c1',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 3,
//     borderColor: '#fff',
//     marginBottom: 16,
//   },
//   profileInitial: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   greeting: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   passwordLabel: {
//     fontSize: 16,
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F6F6F6',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     marginBottom: 16,
//   },
//   passwordInput: {
//     flex: 1,
//     paddingVertical: 16,
//     fontSize: 16,
//   },
//   passwordDotsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 16,
//     marginBottom: 24,
//   },
//   passwordDot: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: '#E0E0E0',
//     marginHorizontal: 4,
//   },
//   passwordDotFilled: {
//     backgroundColor: '#316bff',
//   },
//   forgotPasswordButton: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   forgotPasswordText: {
//     color: '#316bff',
//     fontSize: 14,
//   },
//   notYouContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   notYouText: {
//     fontSize: 14,
//     color: '#333',
//     marginRight: 8,
//   },
//   notYouButton: {
//     backgroundColor: '#316bff',
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default LoginScreen;

// 'use client';

// import type React from 'react';
// import {useState} from 'react';
// import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';

// // Components
// import EmailStep from '../components/auth/EmailStep';
// import PasswordStep from '../components/auth/PasswordStep';
// import Background from '../components/ui/Background';

// // Utils
// import {
//   validateEmail,
//   validatePassword,
//   loginWithEmailAndPassword,
//   sendPasswordResetEmail,
//   getErrorMessageFromCode,
// } from '../utils/auth-utils';

// // Login step enum
// enum LoginStep {
//   EMAIL = 'email',
//   PASSWORD = 'password',
// }

// interface UserData {
//   email: string;
//   displayName: string;
//   photoURL?: string | null;
// }

// const LoginScreen: React.FC = () => {
//   // State for login flow
//   const [currentStep, setCurrentStep] = useState<LoginStep>(LoginStep.EMAIL);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [isWrongPassword, setIsWrongPassword] = useState(false);

//   // Handle email step next button
//   const handleEmailNext = async () => {
//     // Validate email format only
//     if (!validateEmail(email)) {
//       setEmailError('Please enter a valid email address');
//       return;
//     }

//     // Skip email existence check and proceed directly to password step
//     const username = email.split('@')[0];
//     // Sanitize username to prevent XSS
//     const sanitizedUsername = username.replace(/[^\w\s]/gi, '');

//     setUserData({
//       email,
//       displayName: sanitizedUsername,
//       photoURL: null,
//     });

//     setCurrentStep(LoginStep.PASSWORD);
//   };

//   // Handle password step login button
//   const handleLogin = async () => {
//     // Validate password
//     if (!validatePassword(password)) {
//       setPasswordError('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await loginWithEmailAndPassword(email, password);

//       if (result.success) {
//         // Success - navigate to home screen or next component
//         Alert.alert('Success', 'You are now logged in!');
//         // Reset wrong password state
//         setIsWrongPassword(false);
//       } else {
//         console.log('Login error code:', result.errorCode);

//         // Since Firebase returns "auth/invalid-credential" for both wrong passwords
//         // and non-existent users, we need to use a more generic error message
//         if (result.errorCode === 'auth/invalid-credential') {
//           setPasswordError('Invalid email or password');
//           setIsWrongPassword(true);
//         } else if (result.errorCode === 'auth/user-not-found') {
//           setPasswordError('No account found with this email');
//           setIsWrongPassword(false);
//         } else {
//           // Handle other errors
//           const errorMessage = getErrorMessageFromCode(result.errorCode || '');
//           setPasswordError(errorMessage);
//           setIsWrongPassword(true);
//         }

//         // Clear password on error
//         setPassword('');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle "Not you?" button press
//   const handleNotYou = () => {
//     setCurrentStep(LoginStep.EMAIL);
//     setPassword('');
//     setUserData(null);
//     setPasswordError('');
//     setIsWrongPassword(false);
//   };

//   // Handle "Forgot Password" press
//   const handleForgotPassword = async () => {
//     if (!email) {
//       Alert.alert('Error', 'Email is required for password reset');
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await sendPasswordResetEmail(email);

//       if (result.success) {
//         Alert.alert(
//           'Password Reset Email Sent',
//           'Check your email for instructions to reset your password.',
//         );
//       } else {
//         // Check if the error is because the user doesn't exist
//         if (result.errorCode === 'auth/user-not-found') {
//           Alert.alert('Error', 'No account found with this email');
//         } else {
//           Alert.alert(
//             'Error',
//             'Failed to send password reset email. Please try again.',
//           );
//         }
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle cancel button
//   const handleCancel = () => {
//     // Navigate back or to home screen
//     Alert.alert('Cancel', 'Login cancelled');
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}>
//       <Background />

//       {currentStep === LoginStep.EMAIL ? (
//         <EmailStep
//           email={email}
//           setEmail={setEmail}
//           emailError={emailError}
//           loading={loading}
//           onNext={handleEmailNext}
//           onCancel={handleCancel}
//         />
//       ) : (
//         <PasswordStep
//           displayName={userData?.displayName || 'User'}
//           photoURL={userData?.photoURL}
//           password={password}
//           setPassword={setPassword}
//           passwordError={passwordError}
//           loading={loading}
//           showPassword={showPassword}
//           setShowPassword={setShowPassword}
//           onLogin={handleLogin}
//           onForgotPassword={handleForgotPassword}
//           onNotYou={handleNotYou}
//           isWrongPassword={isWrongPassword}
//         />
//       )}
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

// export default LoginScreen;

// 'use client';

// import type React from 'react';
// import {useState} from 'react';
// import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';

// // Components
// import EmailStep from '../components/auth/EmailStep';
// import PasswordStep from '../components/auth/PasswordStep';
// import Background from '../components/ui/Background';

// // Utils
// import {
//   validateEmail,
//   validatePassword,
//   loginWithEmailAndPassword,
//   sendPasswordResetEmail,
//   getErrorMessageFromCode,
//   checkUserExists, // <-- New utility
// } from '../utils/auth-utils';

// // Login step enum
// enum LoginStep {
//   EMAIL = 'email',
//   PASSWORD = 'password',
// }

// interface UserData {
//   email: string;
//   displayName: string;
//   photoURL?: string | null;
// }

// const LoginScreen: React.FC = () => {
//   // State for login flow
//   const [currentStep, setCurrentStep] = useState<LoginStep>(LoginStep.EMAIL);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [isWrongPassword, setIsWrongPassword] = useState(false);

//   // Handle email step next button
//   const handleEmailNext = async () => {
//     setEmailError('');
//     if (!validateEmail(email)) {
//       setEmailError('Please enter a valid email address');
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await checkUserExists(email);

//       if (!result.exists) {
//         setEmailError('No account found with this email');
//         return;
//       }

//       const username = email.split('@')[0];
//       // Sanitize username to prevent XSS
//       const sanitizedUsername = username.replace(/[^\w\s]/gi, '');

//       setUserData({
//         email,
//         displayName: sanitizedUsername,
//         photoURL: null,
//       });

//       setCurrentStep(LoginStep.PASSWORD);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle password step login button
//   const handleLogin = async () => {
//     setPasswordError('');
//     if (!validatePassword(password)) {
//       setPasswordError('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await loginWithEmailAndPassword(email, password);

//       if (result.success) {
//         Alert.alert('Success', 'You are now logged in!');
//         setIsWrongPassword(false);
//       } else {
//         console.log('Login error code:', result.errorCode);

//         if (result.errorCode === 'auth/invalid-credential') {
//           setPasswordError('Invalid email or password');
//           setIsWrongPassword(true);
//         } else if (result.errorCode === 'auth/user-not-found') {
//           setPasswordError('No account found with this email');
//           setIsWrongPassword(false);
//         } else {
//           const errorMessage = getErrorMessageFromCode(result.errorCode || '');
//           setPasswordError(errorMessage);
//           setIsWrongPassword(true);
//         }
//         setPassword('');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle "Not you?" button press
//   const handleNotYou = () => {
//     setCurrentStep(LoginStep.EMAIL);
//     setPassword('');
//     setUserData(null);
//     setPasswordError('');
//     setIsWrongPassword(false);
//   };

//   // Handle "Forgot Password" press
//   const handleForgotPassword = async () => {
//     if (!email) {
//       Alert.alert('Error', 'Email is required for password reset');
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await sendPasswordResetEmail(email);

//       if (result.success) {
//         Alert.alert(
//           'Password Reset Email Sent',
//           'Check your email for instructions to reset your password.',
//         );
//       } else {
//         if (result.errorCode === 'auth/user-not-found') {
//           Alert.alert('Error', 'No account found with this email');
//         } else {
//           Alert.alert(
//             'Error',
//             'Failed to send password reset email. Please try again.',
//           );
//         }
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle cancel button
//   const handleCancel = () => {
//     Alert.alert('Cancel', 'Login cancelled');
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}>
//       <Background />

//       {currentStep === LoginStep.EMAIL ? (
//         <EmailStep
//           email={email}
//           setEmail={setEmail}
//           emailError={emailError}
//           loading={loading}
//           onNext={handleEmailNext}
//           onCancel={handleCancel}
//         />
//       ) : (
//         <PasswordStep
//           displayName={userData?.displayName || 'User'}
//           photoURL={userData?.photoURL}
//           password={password}
//           setPassword={setPassword}
//           passwordError={passwordError}
//           loading={loading}
//           showPassword={showPassword}
//           setShowPassword={setShowPassword}
//           onLogin={handleLogin}
//           onForgotPassword={handleForgotPassword}
//           onNotYou={handleNotYou}
//           isWrongPassword={isWrongPassword}
//         />
//       )}
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

// export default LoginScreen;

// 'use client';

// import React, {useState} from 'react';
// import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';

// // Components
// import EmailStep from '../components/auth/EmailStep';
// import PasswordStep from '../components/auth/PasswordStep';
// import Background from '../components/ui/Background';

// // Utils
// import {
//   validateEmail,
//   validatePassword,
//   loginWithEmailAndPassword,
//   sendPasswordResetEmail,
//   getErrorMessageFromCode,
//   checkUserExists,
// } from '../utils/auth-utils';

// // Login step enum
// enum LoginStep {
//   EMAIL = 'email',
//   PASSWORD = 'password',
// }

// interface UserData {
//   email: string;
//   displayName: string;
//   photoURL?: string | null;
// }

// const LoginScreen: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState<LoginStep>(LoginStep.EMAIL);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [isWrongPassword, setIsWrongPassword] = useState(false);

//   // Handle email step next button
//   const handleEmailNext = async () => {
//     setEmailError('');
//     if (!validateEmail(email)) {
//       setEmailError('Please enter a valid email address');
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await checkUserExists(email);

//       if (!result.exists) {
//         setEmailError('No account found with this email');
//         return; // Stop here, don't go to password step
//       }

//       const username = email.split('@')[0];
//       // Sanitize username to prevent XSS
//       const sanitizedUsername = username.replace(/[^\w\s]/gi, '');

//       setUserData({
//         email,
//         displayName: sanitizedUsername,
//         photoURL: null,
//       });

//       setCurrentStep(LoginStep.PASSWORD);
//     } catch (err) {
//       setEmailError('Error checking email existence. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle password step login button
//   const handleLogin = async () => {
//     setPasswordError('');
//     if (!validatePassword(password)) {
//       setPasswordError('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await loginWithEmailAndPassword(email, password);

//       if (result.success) {
//         Alert.alert('Success', 'You are now logged in!');
//         setIsWrongPassword(false);
//         // TODO: Navigate to the next screen or main app screen here
//       } else {
//         if (result.errorCode === 'auth/invalid-credential') {
//           setPasswordError('Invalid email or password');
//           setIsWrongPassword(true);
//         } else if (result.errorCode === 'auth/user-not-found') {
//           setPasswordError('No account found with this email');
//           setIsWrongPassword(false);
//         } else {
//           const errorMessage = getErrorMessageFromCode(result.errorCode || '');
//           setPasswordError(errorMessage);
//           setIsWrongPassword(true);
//         }
//         setPassword('');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle "Not you?" button press
//   const handleNotYou = () => {
//     setCurrentStep(LoginStep.EMAIL);
//     setPassword('');
//     setUserData(null);
//     setPasswordError('');
//     setIsWrongPassword(false);
//     setEmailError('');
//   };

//   // Handle "Forgot Password" press
//   const handleForgotPassword = async () => {
//     if (!email) {
//       Alert.alert('Error', 'Email is required for password reset');
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await sendPasswordResetEmail(email);

//       if (result.success) {
//         Alert.alert(
//           'Password Reset Email Sent',
//           'Check your email for instructions to reset your password.',
//         );
//       } else {
//         if (result.errorCode === 'auth/user-not-found') {
//           Alert.alert('Error', 'No account found with this email');
//         } else {
//           Alert.alert(
//             'Error',
//             'Failed to send password reset email. Please try again.',
//           );
//         }
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle cancel button
//   const handleCancel = () => {
//     Alert.alert('Cancel', 'Login cancelled');
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}>
//       <Background />

//       {currentStep === LoginStep.EMAIL ? (
//         <EmailStep
//           email={email}
//           setEmail={setEmail}
//           emailError={emailError}
//           loading={loading}
//           onNext={handleEmailNext}
//           onCancel={handleCancel}
//         />
//       ) : (
//         <PasswordStep
//           displayName={userData?.displayName || 'User'}
//           photoURL={userData?.photoURL}
//           password={password}
//           setPassword={setPassword}
//           passwordError={passwordError}
//           loading={loading}
//           showPassword={showPassword}
//           setShowPassword={setShowPassword}
//           onLogin={handleLogin}
//           onForgotPassword={handleForgotPassword}
//           onNotYou={handleNotYou}
//           isWrongPassword={isWrongPassword}
//         />
//       )}
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

// export default LoginScreen;

// 'use client';

// import type React from 'react';
// import {useState} from 'react';
// import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';

// // Components
// import EmailStep from '../components/auth/EmailStep';
// import PasswordStep from '../components/auth/PasswordStep';
// import Background from '../components/ui/Background';

// // Utils
// import {
//   validateEmail,
//   validatePassword,
//   loginWithEmailAndPassword,
//   sendPasswordResetEmail,
//   getErrorMessageFromCode,
// } from '../utils/auth-utils';

// // Login step enum
// enum LoginStep {
//   EMAIL = 'email',
//   PASSWORD = 'password',
// }

// interface UserData {
//   email: string;
//   displayName: string;
//   photoURL?: string | null;
// }

// const LoginScreen: React.FC = () => {
//   // State for login flow
//   const [currentStep, setCurrentStep] = useState<LoginStep>(LoginStep.EMAIL);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [isWrongPassword, setIsWrongPassword] = useState(false);

//   // Handle email step next button
//   const handleEmailNext = async () => {
//     // Validate email format only
//     if (!validateEmail(email)) {
//       setEmailError('Please enter a valid email address');
//       return;
//     }

//     // Skip email existence check and proceed directly to password step
//     const username = email.split('@')[0];
//     // Sanitize username to prevent XSS
//     const sanitizedUsername = username.replace(/[^\w\s]/gi, '');

//     setUserData({
//       email,
//       displayName: sanitizedUsername,
//       photoURL: null,
//     });

//     setCurrentStep(LoginStep.PASSWORD);
//   };

//   // Handle password step login button
//   const handleLogin = async () => {
//     // Validate password
//     if (!validatePassword(password)) {
//       setPasswordError('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await loginWithEmailAndPassword(email, password);

//       if (result.success) {
//         // Success - navigate to home screen or next component
//         Alert.alert('Success', 'You are now logged in!');
//         // Reset wrong password state
//         setIsWrongPassword(false);
//       } else {
//         console.log('Login error code:', result.errorCode);

//         // Since Firebase returns "auth/invalid-credential" for both wrong passwords
//         // and non-existent users, we need to use a more generic error message
//         if (result.errorCode === 'auth/invalid-credential') {
//           setPasswordError('Invalid email or password');
//           setIsWrongPassword(true);
//         } else if (result.errorCode === 'auth/user-not-found') {
//           setPasswordError('No account found with this email');
//           setIsWrongPassword(false);
//         } else {
//           // Handle other errors
//           const errorMessage = getErrorMessageFromCode(result.errorCode || '');
//           setPasswordError(errorMessage);
//           setIsWrongPassword(true);
//         }

//         // Clear password on error
//         setPassword('');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle "Not you?" button press
//   const handleNotYou = () => {
//     setCurrentStep(LoginStep.EMAIL);
//     setPassword('');
//     setUserData(null);
//     setPasswordError('');
//     setIsWrongPassword(false);
//   };

//   // Handle "Forgot Password" press
//   const handleForgotPassword = async () => {
//     if (!email) {
//       Alert.alert('Error', 'Email is required for password reset');
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await sendPasswordResetEmail(email);

//       if (result.success) {
//         Alert.alert(
//           'Password Reset Email Sent',
//           'Check your email for instructions to reset your password.',
//         );
//       } else {
//         // Check if the error is because the user doesn't exist
//         if (result.errorCode === 'auth/user-not-found') {
//           Alert.alert('Error', 'No account found with this email');
//         } else {
//           Alert.alert(
//             'Error',
//             'Failed to send password reset email. Please try again.',
//           );
//         }
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle cancel button
//   const handleCancel = () => {
//     // Navigate back or to home screen
//     Alert.alert('Cancel', 'Login cancelled');
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}>
//       <Background />

//       {currentStep === LoginStep.EMAIL ? (
//         <EmailStep
//           email={email}
//           setEmail={setEmail}
//           emailError={emailError}
//           loading={loading}
//           onNext={handleEmailNext}
//           onCancel={handleCancel}
//         />
//       ) : (
//         <PasswordStep
//           displayName={userData?.displayName || 'User'}
//           photoURL={userData?.photoURL}
//           password={password}
//           setPassword={setPassword}
//           passwordError={passwordError}
//           loading={loading}
//           showPassword={showPassword}
//           setShowPassword={setShowPassword}
//           onLogin={handleLogin}
//           onForgotPassword={handleForgotPassword}
//           onNotYou={handleNotYou}
//           isWrongPassword={isWrongPassword}
//         />
//       )}
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

// export default LoginScreen;

// 'use client';

// import React, {useState} from 'react';
// import {
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import Background from '../components/ui/Background';
// import EmailStep from '../components/auth/EmailStep';
// import PasswordStep from '../components/auth/PasswordStep';

// import {
//   validateEmail,
//   validatePassword,
//   checkUserExists,
//   loginWithEmailAndPassword,
//   sendPasswordResetEmail,
//   getErrorMessageFromCode,
// } from '../utils/auth-utils';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../../App';

// type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

// enum LoginStep {
//   EMAIL = 'email',
//   PASSWORD = 'password',
// }

// interface UserData {
//   email: string;
//   displayName: string;
//   photoURL?: string | null;
// }

// const LoginScreen: React.FC<Props> = ({navigation}) => {
//   const [currentStep, setCurrentStep] = useState<LoginStep>(LoginStep.EMAIL);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [isWrongPassword, setIsWrongPassword] = useState(false);
//   const [showSignupOption, setShowSignupOption] = useState(false);

//   const handleEmailNext = async () => {
//     setEmailError('');
//     setShowSignupOption(false);

//     if (!validateEmail(email)) {
//       setEmailError('Please enter a valid email address');
//       return;
//     }

//     // setLoading(true);
//     try {
//       const exists = await checkUserExists(email);
//       if (!exists) {
//         setEmailError('No account found with this email');
//         setShowSignupOption(true);
//         return;
//       }

//       const username = email.split('@')[0].replace(/[^\w\s]/gi, '');
//       setUserData({
//         email,
//         displayName: username,
//         photoURL: null,
//       });
//       setCurrentStep(LoginStep.PASSWORD);
//     } finally {
//       //   setLoading(false);
//     }
//   };

//   const handleLogin = async () => {
//     console.log('handleLogin called');
//     setPasswordError('');
//     if (!validatePassword(password)) {
//       setPasswordError('Password must be at least 6 characters');
//       return;
//     }
//     // setLoading(true);

//     try {
//       const result = await loginWithEmailAndPassword(email, password);
//       if (result.success) {
//         Alert.alert('Success', 'You are now logged in!');
//         setIsWrongPassword(false);
//       } else {
//         const msg = getErrorMessageFromCode(
//           result.errorCode || 'auth/invalid-credential',
//         );
//         setPasswordError(msg);

//         setIsWrongPassword(true);
//         setPassword('');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNotYou = () => {
//     setCurrentStep(LoginStep.EMAIL);
//     setPassword('');
//     setUserData(null);
//     setPasswordError('');
//     setIsWrongPassword(false);
//   };

//   const handleForgotPassword = async () => {
//     navigation.navigate('PasswordRecovery');
//   };

//   const handleCancel = () => {
//     navigation.navigate('Start');
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//       <Background />

//       {currentStep === LoginStep.EMAIL ? (
//         <View style={styles.emailContainer}>
//           <EmailStep
//             email={email}
//             setEmail={setEmail}
//             emailError={emailError}
//             loading={loading}
//             onNext={handleEmailNext}
//             onCancel={handleCancel}
//           />

//           {showSignupOption && (
//             <TouchableOpacity
//               onPress={() => navigation.navigate('Signup')}
//               style={styles.signupContainer}>
//               <Text style={styles.signupText}>
//                 Don’t have an account?{' '}
//                 <Text style={styles.signupLink}>Sign up</Text>
//               </Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       ) : (
//         <PasswordStep
//           displayName={userData?.displayName || 'User'}
//           photoURL={userData?.photoURL}
//           password={password}
//           setPassword={setPassword}
//           passwordError={passwordError}
//           loading={loading}
//           showPassword={false}
//           setShowPassword={() => {}}
//           onLogin={handleLogin}
//           onForgotPassword={handleForgotPassword}
//           onNotYou={handleNotYou}
//           isWrongPassword={isWrongPassword}
//         />
//       )}
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#fff'},

//   emailContainer: {
//     flex: 1,
//     justifyContent: 'space-between',
//     paddingHorizontal: 14,
//     paddingVertical: 200,
//   },

//   signupContainer: {
//     alignSelf: 'center',
//     marginTop: 20,
//   },
//   signupText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   signupLink: {
//     color: '#316bff',
//     fontWeight: '600',
//     textDecorationLine: 'underline',
//   },
// });

// export default LoginScreen;

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

import Background from '../components/ui/Background';
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
import Toast from 'react-native-root-toast';

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
    try {
      const result = await loginWithEmailAndPassword(email, password);

      if (result.success) {
        setIsWrongPassword(false);

        // Show success toast
        Toast.show('Login Successful! 🎉', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });

        // Delay navigation to allow toast to show
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'AuthLoading'}],
          });
        }, 8000); // 1 second delay
      } else {
        // Show error toast
        Toast.show('Invalid credentials. Please try again.', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          backgroundColor: 'red',
          textColor: 'white',
        });

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
