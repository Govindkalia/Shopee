import {getApp} from '@react-native-firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from '@react-native-firebase/auth';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.trim() !== '' && emailRegex.test(email);
};

export const validatePassword = (password: string): boolean =>
  password.trim() !== '' && password.length >= 6;

export const checkUserExists = async (email: string): Promise<boolean> => {
  try {
    const app = getApp();
    const auth = getAuth(app);
    console.log('[Firebase App]', {
      name: app.name,
      options: app.options,
    });

    const methods = await fetchSignInMethodsForEmail(auth, email);
    console.log('[auth-utils] fetchSignInMethodsForEmail:', methods);

    return methods.length > 0;
  } catch (e) {
    console.warn(
      '[auth-utils] Could not fetch sign-in methods, assuming “exists”:',
      e,
    );

    return true;
  }
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<{success: boolean; errorCode?: string}> => {
  try {
    const auth = getAuth(getApp());
    await signInWithEmailAndPassword(auth, email, password);
    return {success: true};
  } catch (error: any) {
    console.error('[auth-utils] signIn error:', error.msg);
    return {
      success: false,
      errorCode: error.code,
    };
  }
};

export const sendPasswordResetEmail = async (
  email: string,
): Promise<{success: boolean; errorCode?: string}> => {
  try {
    const auth = getAuth(getApp());
    await firebaseSendPasswordResetEmail(auth, email);
    return {success: true};
  } catch (error: any) {
    console.error('[auth-utils] reset error:', error);
    return {
      success: false,
      errorCode: error.code,
    };
  }
};

export const getErrorMessageFromCode = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/invalid-credential':
      return 'Invalid email or password';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Try again later.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address';
    default:
      return 'Error signing in. Please try again.';
  }
};
