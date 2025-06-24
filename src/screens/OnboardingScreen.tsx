import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Welcome!',
    text: 'Discover great deals and products at your fingertips.',
    image: require('../assets/slider.png'),
  },
  {
    key: '2',
    title: 'Easy Shopping',
    text: 'Browse and buy easily with our smooth interface.',
    image: require('../assets/slider2.png'),
  },
  {
    key: '3',
    title: 'Track Orders',
    text: 'Stay updated on your order’s journey.',
    image: require('../assets/slider2.png'),
  },
  {
    key: '4',
    title: 'Let’s Start!',
    text: 'Sign in or sign up to begin your shopping experience.',
    image: require('../assets/slider4.png'),
    isLast: true,
  },
];

const OnboardingScreen = ({navigation}: any) => {
  const handleFinish = async () => {
    const user = auth().currentUser;
    // await AsyncStorage.setItem('onboardingShown', 'true');

    if (user) {
      await AsyncStorage.setItem(`onboardingShown_${user.uid}`, 'true');
    }
    navigation.replace('MainTabs');
  };

  return (
    <ImageBackground
      source={require('../assets/bubble01.png')}
      style={styles.background}
      imageStyle={{width: '60%', height: '30%', alignSelf: 'center'}}
      resizeMode="cover">
      <Swiper
        loop={false}
        showsPagination
        activeDotColor="#007BFF"
        dotStyle={{backgroundColor: '#ccc'}}>
        {slides.map(slide => (
          <View style={styles.slide} key={slide.key}>
            <View style={styles.card}>
              <Image source={slide.image} style={styles.image} />
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.text}>{slide.text}</Text>
              {slide.isLast && (
                <TouchableOpacity style={styles.button} onPress={handleFinish}>
                  <Text style={styles.buttonText}>Let's Start</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </Swiper>
    </ImageBackground>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width * 0.85,
    height: height * 0.8,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: width * 0.85,
    height: height * 0.45,
    // resizeMode: 'cover',
    borderRadius: 15,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  text: {
    fontSize: 17,
    textAlign: 'center',
    color: '#555',
    marginBottom: 80,
  },
  button: {
    backgroundColor: '#316bff',
    paddingVertical: 14,
    paddingHorizontal: 38,
    borderRadius: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
