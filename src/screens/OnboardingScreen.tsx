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

const {width, height} = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Hello',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis. Morbi eu eleifend lacus.',
    image: require('../assets/Placeholder_01.png'), // Update this path to your actual image
  },
  {
    key: '2',
    title: 'Ready?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: require('../assets/Placeholder_01.png'), // Update this path to your actual image
    isLast: true,
  },
];

const OnboardingScreen = ({navigation}: any) => {
  const handleFinish = () => {
    navigation.replace('Home');
  };

  return (
    <ImageBackground
      source={require('../assets/Placeholder_01.png')}
      style={styles.background}
      resizeMode="cover">
      <Swiper loop={false} showsPagination activeDotColor="#007BFF">
        {slides.map(slide => (
          <View style={styles.slide} key={slide.key}>
            <Image source={slide.image} style={styles.image} />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.text}>{slide.text}</Text>
            {slide.isLast && (
              <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.buttonText}>Let's Start</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </Swiper>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    borderRadius: 20,
    resizeMode: 'cover',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 11,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
  },
});

export default OnboardingScreen;
