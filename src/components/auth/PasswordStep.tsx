// 'use client';

// import type React from 'react';
// import {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   Keyboard,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// interface PasswordStepProps {
//   displayName: string;
//   photoURL?: string | null;
//   password: string;
//   setPassword: (password: string) => void;
//   passwordError: string;
//   loading: boolean;
//   showPassword: boolean;
//   setShowPassword: (show: boolean) => void;
//   onLogin: () => void;
//   onForgotPassword: () => void;
//   onNotYou: () => void;
//   isWrongPassword: boolean;
// }

// const MAX_PASSWORD_LENGTH = 8;

// const PasswordStep: React.FC<PasswordStepProps> = ({
//   displayName,
//   photoURL,
//   password,
//   setPassword,
//   passwordError,
//   loading,
//   showPassword,
//   setShowPassword,
//   onLogin,
//   onForgotPassword,
//   onNotYou,
//   isWrongPassword,
// }) => {
//   const inputRef = useRef<TextInput>(null);
//   const [isKeyboardVisible, setKeyboardVisible] = useState(false);
//   const [showErrorStyle, setShowErrorStyle] = useState(false);

//   // Listen for keyboard events
//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       'keyboardDidShow',
//       () => {
//         setKeyboardVisible(true);
//       },
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       'keyboardDidHide',
//       () => {
//         setKeyboardVisible(false);
//       },
//     );

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   // Clear password when wrong password is detected
//   useEffect(() => {
//     if (isWrongPassword) {
//       setShowErrorStyle(true);
//       setPassword('');
//     }
//   }, [isWrongPassword, setPassword]);

//   // Focus the hidden input when the password boxes are pressed
//   const handlePasswordBoxPress = () => {
//     inputRef.current?.focus();
//   };

//   // Handle password change with max length limit
//   const handlePasswordChange = (text: string) => {
//     if (text.length <= MAX_PASSWORD_LENGTH) {
//       if (showErrorStyle) {
//         setShowErrorStyle(false); // reset the red color once user starts typing again
//       }
//       setPassword(text);
//     }
//   };

//   // Create an array of MAX_PASSWORD_LENGTH password dots/boxes
//   const passwordDots = Array(MAX_PASSWORD_LENGTH)
//     .fill(false)
//     .map((_, index) => index < password.length);

//   return (
//     <View style={styles.formContainer}>
//       <View style={styles.profileContainer}>
//         {photoURL ? (
//           <Image source={{uri: photoURL}} style={styles.profileImage} />
//         ) : (
//           <View style={styles.profileImagePlaceholder}>
//             <Text style={styles.profileInitial}>
//               {displayName?.charAt(0).toUpperCase() || 'U'}
//             </Text>
//           </View>
//         )}
//         <Text style={styles.greeting}>Hello, {displayName}!!</Text>
//       </View>

//       <Text style={styles.passwordLabel}>Type your password</Text>

//       {/* Hidden input field - invisible but receives keyboard input */}
//       <TextInput
//         ref={inputRef}
//         style={styles.hiddenInput}
//         secureTextEntry={!showPassword}
//         value={password}
//         onChangeText={handlePasswordChange}
//         autoCapitalize="none"
//         onSubmitEditing={onLogin}
//         autoFocus
//         maxLength={MAX_PASSWORD_LENGTH}
//       />

//       {/* Password boxes/dots visualization */}
//       <TouchableOpacity
//         activeOpacity={0.8}
//         onPress={handlePasswordBoxPress}
//         style={styles.passwordBoxesContainer}>
//         {password.length > 0 || isWrongPassword ? (
//           // When keyboard is visible (typing), show dots
//           <View style={styles.passwordDotsContainer}>
//             {passwordDots.map((isFilled, index) => (
//               <View
//                 key={index}
//                 style={[
//                   styles.passwordDot,
//                   isFilled &&
//                     (showErrorStyle
//                       ? styles.passwordDotWrong
//                       : styles.passwordDotFilled),
//                 ]}
//               />
//             ))}
//           </View>
//         ) : (
//           // When keyboard is not visible (initial state), show empty boxes
//           <View style={styles.passwordBoxesRow}>
//             {Array(MAX_PASSWORD_LENGTH)
//               .fill(0)
//               .map((_, index) => (
//                 <View key={index} style={styles.passwordBox} />
//               ))}
//           </View>
//         )}
//       </TouchableOpacity>

//       {passwordError ? (
//         <Text style={styles.errorText}>{passwordError}</Text>
//       ) : null}

//       {isWrongPassword && (
//         <TouchableOpacity
//           style={styles.forgotPasswordButton}
//           onPress={onForgotPassword}>
//           <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
//         </TouchableOpacity>
//       )}

//       <View style={styles.notYouContainer}>
//         <Text style={styles.notYouText}>Not you?</Text>
//         <TouchableOpacity style={styles.notYouButton} onPress={onNotYou}>
//           <Icon name="arrow-right" size={16} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       {loading && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="large" color="#316bff" />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   formContainer: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
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
//   hiddenInput: {
//     position: 'absolute',
//     opacity: 0,
//     height: 0,
//     width: 0,
//   },
//   passwordBoxesContainer: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   passwordBoxesRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//     maxWidth: '100%',
//   },
//   passwordBox: {
//     width: 32,
//     height: 32,
//     backgroundColor: '#F6F6F6',
//     borderRadius: 4,
//     marginHorizontal: 4,
//     marginVertical: 4,
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
//   passwordDotWrong: {
//     backgroundColor: '#ff4d4f',
//   },
//   errorText: {
//     color: '#ff4d4f',
//     fontSize: 12,
//     textAlign: 'center',
//     marginBottom: 16,
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
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default PasswordStep;

// 'use client';

// import type React from 'react';
// import {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   Keyboard,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// interface PasswordStepProps {
//   displayName: string;
//   photoURL?: string | null;
//   password: string;
//   setPassword: (password: string) => void;
//   passwordError: string;
//   loading: boolean;
//   showPassword: boolean;
//   setShowPassword: (show: boolean) => void;
//   onLogin: () => void;
//   onForgotPassword: () => void;
//   onNotYou: () => void;
//   isWrongPassword: boolean;
// }

// const MAX_PASSWORD_LENGTH = 8;

// const PasswordStep: React.FC<PasswordStepProps> = ({
//   displayName,
//   photoURL,
//   password,
//   setPassword,
//   passwordError,
//   loading,
//   showPassword,
//   setShowPassword,
//   onLogin,
//   onForgotPassword,
//   onNotYou,
//   isWrongPassword,
// }) => {
//   const inputRef = useRef<TextInput>(null);
//   const [isKeyboardVisible, setKeyboardVisible] = useState(false);
//   const [showErrorStyle, setShowErrorStyle] = useState(false);
//   const [hasStartedTyping, setHasStartedTyping] = useState(false);

//   // Listen for keyboard events
//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       'keyboardDidShow',
//       () => {
//         setKeyboardVisible(true);
//       },
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       'keyboardDidHide',
//       () => {
//         setKeyboardVisible(false);
//       },
//     );

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   // Auto-clear error state after 3 seconds
//   useEffect(() => {
//     if (showErrorStyle) {
//       const timer = setTimeout(() => {
//         setShowErrorStyle(false);
//       }, 3000); // Clear after 3 seconds

//       return () => clearTimeout(timer);
//     }
//   }, [showErrorStyle]);

//   // Handle wrong password state
//   useEffect(() => {
//     if (isWrongPassword) {
//       setShowErrorStyle(true);
//       setHasStartedTyping(true); // Force showing dots instead of boxes
//       // Don't clear password immediately, let the user see the red dots first
//       setTimeout(() => {
//         setPassword('');
//       }, 500); // Small delay to show red dots
//     }
//   }, [isWrongPassword, setPassword]);

//   // Focus the hidden input when the password boxes are pressed
//   const handlePasswordBoxPress = () => {
//     inputRef.current?.focus();
//   };

//   // Handle password change with max length limit
//   const handlePasswordChange = (text: string) => {
//     if (text.length <= MAX_PASSWORD_LENGTH) {
//       // Mark that user has started typing
//       if (!hasStartedTyping) {
//         setHasStartedTyping(true);
//       }

//       // Clear error state immediately when user starts typing
//       if (showErrorStyle) {
//         setShowErrorStyle(false);
//       }

//       setPassword(text);
//     }
//   };

//   // Create an array of MAX_PASSWORD_LENGTH password dots/boxes
//   const passwordDots = Array(MAX_PASSWORD_LENGTH)
//     .fill(false)
//     .map((_, index) => index < password.length);

//   // Determine whether to show dots or boxes
//   const shouldShowDots =
//     hasStartedTyping || password.length > 0 || showErrorStyle;

//   return (
//     <View style={styles.formContainer}>
//       <View style={styles.profileContainer}>
//         {photoURL ? (
//           <Image source={{uri: photoURL}} style={styles.profileImage} />
//         ) : (
//           <View style={styles.profileImagePlaceholder}>
//             <Text style={styles.profileInitial}>
//               {displayName?.charAt(0).toUpperCase() || 'U'}
//             </Text>
//           </View>
//         )}
//         <Text style={styles.greeting}>Hello, {displayName}!!</Text>
//       </View>

//       <Text style={styles.passwordLabel}>Type your password</Text>

//       {/* Hidden input field - invisible but receives keyboard input */}
//       <TextInput
//         ref={inputRef}
//         style={styles.hiddenInput}
//         secureTextEntry={!showPassword}
//         value={password}
//         onChangeText={handlePasswordChange}
//         autoCapitalize="none"
//         onSubmitEditing={onLogin}
//         autoFocus
//         maxLength={MAX_PASSWORD_LENGTH}
//       />

//       {/* Password boxes/dots visualization */}
//       <TouchableOpacity
//         activeOpacity={0.8}
//         onPress={handlePasswordBoxPress}
//         style={styles.passwordBoxesContainer}>
//         {shouldShowDots ? (
//           // Show dots when user has started typing or there's an error
//           <View style={styles.passwordDotsContainer}>
//             {Array(MAX_PASSWORD_LENGTH)
//               .fill(false)
//               .map((_, index) => {
//                 const isFilled = index < password.length;
//                 const isError = showErrorStyle && isFilled;

//                 return (
//                   <View
//                     key={index}
//                     style={[
//                       styles.passwordDot,
//                       isFilled && !isError && styles.passwordDotFilled,
//                       isError && styles.passwordDotWrong,
//                     ]}
//                   />
//                 );
//               })}
//           </View>
//         ) : (
//           // Show empty boxes initially
//           <View style={styles.passwordBoxesRow}>
//             {Array(MAX_PASSWORD_LENGTH)
//               .fill(0)
//               .map((_, index) => (
//                 <View key={index} style={styles.passwordBox} />
//               ))}
//           </View>
//         )}
//       </TouchableOpacity>

//       {passwordError ? (
//         <Text style={styles.errorText}>{passwordError}</Text>
//       ) : null}

//       {isWrongPassword && (
//         <TouchableOpacity
//           style={styles.forgotPasswordButton}
//           onPress={onForgotPassword}>
//           <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
//         </TouchableOpacity>
//       )}

//       <View style={styles.notYouContainer}>
//         <Text style={styles.notYouText}>Not you?</Text>
//         <TouchableOpacity style={styles.notYouButton} onPress={onNotYou}>
//           <Icon name="arrow-right" size={16} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       {loading && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="large" color="#316bff" />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   formContainer: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
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
//   hiddenInput: {
//     position: 'absolute',
//     opacity: 0,
//     height: 0,
//     width: 0,
//   },
//   passwordBoxesContainer: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   passwordBoxesRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//     maxWidth: '100%',
//   },
//   passwordBox: {
//     width: 32,
//     height: 32,
//     backgroundColor: '#F6F6F6',
//     borderRadius: 4,
//     marginHorizontal: 4,
//     marginVertical: 4,
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
//   passwordDotWrong: {
//     backgroundColor: '#ff4d4f',
//   },
//   errorText: {
//     color: '#ff4d4f',
//     fontSize: 12,
//     textAlign: 'center',
//     marginBottom: 16,
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
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default PasswordStep;

// 'use client';

// import type React from 'react';
// import {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   Keyboard,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// interface PasswordStepProps {
//   displayName: string;
//   photoURL?: string | null;
//   password: string;
//   setPassword: (password: string) => void;
//   passwordError: string;
//   loading: boolean;
//   showPassword: boolean;
//   setShowPassword: (show: boolean) => void;
//   onLogin: () => void;
//   onForgotPassword: () => void;
//   onNotYou: () => void;
//   isWrongPassword: boolean;
// }

// const MAX_PASSWORD_LENGTH = 8;

// const PasswordStep: React.FC<PasswordStepProps> = ({
//   displayName,
//   photoURL,
//   password,
//   setPassword,
//   passwordError,
//   loading,
//   showPassword,
//   setShowPassword,
//   onLogin,
//   onForgotPassword,
//   onNotYou,
//   isWrongPassword,
// }) => {
//   const inputRef = useRef<TextInput>(null);
//   const [isKeyboardVisible, setKeyboardVisible] = useState(false);
//   const [showRedDots, setShowRedDots] = useState(false);

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       'keyboardDidShow',
//       () => {
//         setKeyboardVisible(true);
//       },
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       'keyboardDidHide',
//       () => {
//         setKeyboardVisible(false);
//       },
//     );

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   useEffect(() => {
//     if (isWrongPassword) {
//       console.log('useEffect called in PasswordStep');
//       setShowRedDots(true);
//       const timer = setTimeout(() => {
//         setShowRedDots(false);
//       }, 7000);
//       return () => clearTimeout(timer);
//     }
//   }, [isWrongPassword]);

//   useEffect(() => {
//     if (isWrongPassword) {
//       setPassword('');
//     }
//   }, [isWrongPassword, setPassword]);

//   const handlePasswordBoxPress = () => {
//     inputRef.current?.focus();
//   };

//   const handlePasswordChange = (text: string) => {
//     if (text.length <= MAX_PASSWORD_LENGTH) {
//       if (showRedDots) {
//         setShowRedDots(false);
//       }
//       setPassword(text);
//     }
//   };

//   const passwordDots = Array(MAX_PASSWORD_LENGTH)
//     .fill(false)
//     .map((_, index) => index < password.length);

//   return (
//     <View style={styles.formContainer}>
//       <View style={styles.profileContainer}>
//         {photoURL ? (
//           <Image source={{uri: photoURL}} style={styles.profileImage} />
//         ) : (
//           <View style={styles.profileImagePlaceholder}>
//             <Text style={styles.profileInitial}>
//               {displayName?.charAt(0).toUpperCase() || 'U'}
//             </Text>
//           </View>
//         )}
//         <Text style={styles.greeting}>Hello, {displayName}!!</Text>
//       </View>

//       <Text style={styles.passwordLabel}>Type your password</Text>

//       <TextInput
//         ref={inputRef}
//         style={styles.hiddenInput}
//         secureTextEntry={!showPassword}
//         value={password}
//         onChangeText={handlePasswordChange}
//         autoCapitalize="none"
//         onSubmitEditing={onLogin}
//         autoFocus
//         maxLength={MAX_PASSWORD_LENGTH}
//       />

//       <TouchableOpacity
//         activeOpacity={0.8}
//         onPress={handlePasswordBoxPress}
//         style={styles.passwordBoxesContainer}>
//         {isKeyboardVisible ? (
//           <View style={styles.passwordDotsContainer}>
//             {passwordDots.map((isFilled, index) => (
//               <View
//                 key={index}
//                 style={[
//                   styles.passwordDot,
//                   isFilled && !showRedDots && styles.passwordDotFilled,
//                   isFilled && showRedDots && styles.passwordDotWrong,
//                 ]}
//               />
//             ))}
//           </View>
//         ) : (
//           <View style={styles.passwordBoxesRow}>
//             {Array(MAX_PASSWORD_LENGTH)
//               .fill(0)
//               .map((_, index) => (
//                 <View key={index} style={styles.passwordBox} />
//               ))}
//           </View>
//         )}
//       </TouchableOpacity>

//       {passwordError ? (
//         <Text style={styles.errorText}>{passwordError}</Text>
//       ) : null}

//       {isWrongPassword && (
//         <TouchableOpacity
//           style={styles.forgotPasswordButton}
//           onPress={onForgotPassword}>
//           <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
//         </TouchableOpacity>
//       )}

//       <View style={styles.notYouContainer}>
//         <Text style={styles.notYouText}>Not you?</Text>
//         <TouchableOpacity style={styles.notYouButton} onPress={onNotYou}>
//           <Icon name="arrow-right" size={16} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       {loading && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="large" color="#316bff" />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   formContainer: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
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
//   hiddenInput: {
//     position: 'absolute',
//     opacity: 0,
//     height: 0,
//     width: 0,
//   },
//   passwordBoxesContainer: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   passwordBoxesRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//     maxWidth: '100%',
//   },
//   passwordBox: {
//     width: 32,
//     height: 32,
//     backgroundColor: '#F6F6F6',
//     borderRadius: 4,
//     marginHorizontal: 4,
//     marginVertical: 4,
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
//   passwordDotWrong: {
//     backgroundColor: '#ff4d4f',
//   },
//   errorText: {
//     color: '#ff4d4f',
//     fontSize: 12,
//     textAlign: 'center',
//     marginBottom: 16,
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
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default PasswordStep;

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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PasswordStep;
