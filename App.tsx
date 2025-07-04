import React, {useEffect} from 'react';
import StartScreen from './src/screens/StartScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import LoginScreen from './src/screens/LoginScreen';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import PasswordRecoveryScreen from './src/screens/PasswordRecoveryScreen';
import TermsOfService from './src/screens/TermsOfService';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import PasswordRecoveryScreenByPhone from './src/screens/passwordRecoveryScreenByPhone';
import PasswordRecoveryScreenByEmail from './src/screens/PasswordRecoveryScreenByEmail';
import SetupNewPasswordScreen from './src/screens/SetupNewPasswordScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import Home from './src/screens/Home';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from './src/screens/ProfileScreen';
import Wishlist from './src/screens/WishlistScreen';
import Cart from './src/screens/CartScreen';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CategoryPLPScreen from './src/screens/CategoryPLPScreen';
import CategoryPDPScreen from './src/screens/CategoryPDPScreen';
import {Product} from './src/types/Product';

export type RootStackParamList = {
  AuthLoading: undefined;
  Start: undefined;
  Signup: undefined;
  Login: undefined;
  PasswordRecoveryScreen: {email: string};
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  PasswordRecoveryScreenByPhone: {phoneNumber?: string} | undefined;
  SetupNewPasswordScreen: undefined;
  PasswordRecoveryScreenByEmail: {email: string};
  MainTabs: NavigatorScreenParams<TabParamList>;
  Onboarding: undefined;
  CategoryPLP: {category: string};
  CategoryPDP: {product: Product};
};

export type TabParamList = {
  Home: undefined;
  Wishlist: undefined;
  Cart: undefined;
  Profile: undefined;
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

  const Tab = createBottomTabNavigator();

  function MainTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#191919',
          tabBarInactiveTintColor: '#316bff',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Wishlist"
          component={Wishlist}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="heart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="AuthLoading"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
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
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="CategoryPLP" component={CategoryPLPScreen} />
            <Stack.Screen name="CategoryPDP" component={CategoryPDPScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
