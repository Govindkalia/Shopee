// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground,
// } from 'react-native';
// import Swiper from 'react-native-swiper';

// const {width, height} = Dimensions.get('window');

// const slides = [
//   {
//     key: '1',
//     title: 'Hello',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis. Morbi eu eleifend lacus.',
//     image: require('../assets/Placeholder_01.png'), // Update this path to your actual image
//   },
//   {
//     key: '2',
//     title: 'Ready?',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     image: require('../assets/Placeholder_01.png'), // Update this path to your actual image
//     isLast: true,
//   },
// ];

// const OnboardingScreen = ({navigation}: any) => {
//   const handleFinish = () => {
//     navigation.replace('Home');
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/bubble01.png')}
//       style={styles.background}
//       resizeMode="cover">
//       <Swiper loop={false} showsPagination activeDotColor="#007BFF">
//         {slides.map(slide => (
//           <View style={styles.slide} key={slide.key}>
//             <Image source={slide.image} style={styles.image} />
//             <Text style={styles.title}>{slide.title}</Text>
//             <Text style={styles.text}>{slide.text}</Text>
//             {slide.isLast && (
//               <TouchableOpacity style={styles.button} onPress={handleFinish}>
//                 <Text style={styles.buttonText}>Let's Start</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         ))}
//       </Swiper>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     paddingHorizontal: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   slide: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 24,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: width * 0.8,
//     height: height * 0.4,
//     borderRadius: 20,
//     resizeMode: 'cover',
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginBottom: 11,
//   },
//   text: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#555',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 20,
//   },
// });

// export default OnboardingScreen;

// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground,
//   Platform,
// } from 'react-native';
// import Swiper from 'react-native-swiper';

// const {width, height} = Dimensions.get('window');

// const slides = [
//   {
//     key: '1',
//     title: 'Hello',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis. Morbi eu eleifend lacus.',
//     image: require('../assets/slider.png'),
//   },
//   {
//     key: '2',
//     title: 'Hello',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis. Morbi eu eleifend lacus.',
//     image: require('../assets/slider2.png'),
//   },
//   {
//     key: '3',
//     title: 'Hello',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis. Morbi eu eleifend lacus.',
//     image: require('../assets/slider3.png'),
//   },
//   {
//     key: '4',
//     title: 'Ready?',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     image: require('../assets/slider4.png'),
//     isLast: true,
//   },
// ];

// const OnboardingScreen = ({navigation}: any) => {
//   const handleFinish = () => {
//     navigation.replace('MainTabs');
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/bubble01.png')}
//       style={styles.background}
//       resizeMode="cover">
//       <Swiper loop={false} showsPagination activeDotColor="#007BFF">
//         {slides.map(slide => (
//           <View style={styles.slide} key={slide.key}>
//             <View style={styles.card}>
//               <Image source={slide.image} style={styles.image} />
//               <Text style={styles.title}>{slide.title}</Text>
//               <Text style={styles.text}>{slide.text}</Text>
//               {slide.isLast && (
//                 <TouchableOpacity style={styles.button} onPress={handleFinish}>
//                   <Text style={styles.buttonText}>Let's Start</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           </View>
//         ))}
//       </Swiper>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'center',
//     width: 380,
//     height: 330,
//   },
//   slide: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   card: {
//     width: width * 0.85,
//     height: height * 0.8,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     //paddingVertical: 24,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 5},
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   image: {
//     width: width * 0.85,
//     height: height * 0.45,
//     resizeMode: 'cover',
//     borderRadius: 15,
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginBottom: 20,
//   },
//   text: {
//     fontSize: 17,
//     textAlign: 'center',
//     color: '#555',
//     marginBottom: 80,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 10,
//     //marginTop: ,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default OnboardingScreen;

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
    image: require('../assets/slider3.png'),
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
    await AsyncStorage.setItem('onboardingShown', 'true');
    navigation.replace('MainTabs');
  };

  return (
    <ImageBackground
      source={require('../assets/bubble01.png')}
      style={styles.background}
      resizeMode="cover">
      <Swiper loop={false} showsPagination activeDotColor="#007BFF">
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
    resizeMode: 'cover',
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
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
