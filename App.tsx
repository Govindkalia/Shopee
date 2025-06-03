import React, {useEffect} from 'react';
import StartScreen from './src/screens/StartScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import LoginScreen from './src/screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import PasswordRecoveryScreen from './src/screens/PasswordRecoveryScreen';
import TermsOfService from './src/screens/TermsOfService';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import PasswordRecoveryScreenByPhone from './src/screens/passwordRecoveryScreenByPhone';
import PasswordRecoveryScreenByEmail from './src/screens/PasswordRecoveryScreenByEmail';
import SetupNewPasswordScreen from './src/screens/SetupNewPasswordScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
// import Home from './src/screens/Home';

export type RootStackParamList = {
  Start: undefined;
  Signup: undefined;
  Login: undefined;
  PasswordRecoveryScreen: undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  PasswordRecoveryScreenByPhone: {phoneNumber?: string} | undefined;
  SetupNewPasswordScreen: undefined;
  PasswordRecoveryScreenByEmail: undefined;
  Home: undefined;
  Onboarding: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const handleGetStarted = () => {};
  const handleAlreadyHave = () => {};
  useEffect(() => {
    const timeout = setTimeout(() => {
      SplashScreen.hide();
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Signup" component={CreateAccountScreen} />
        <Stack.Screen name="TermsOfService" component={TermsOfService} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="PasswordRecoveryScreen"
          component={PasswordRecoveryScreen}
        />
        <Stack.Screen
          name="PasswordRecoveryScreenByPhone"
          component={PasswordRecoveryScreenByPhone}
        />
        <Stack.Screen
          name="PasswordRecoveryScreenByEmail"
          component={PasswordRecoveryScreenByEmail}
        />
        <Stack.Screen
          name="SetupNewPasswordScreen"
          component={SetupNewPasswordScreen}
        />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        {/* <Stack.Screen name="Home" component={Home} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
