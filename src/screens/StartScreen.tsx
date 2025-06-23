import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Start'>;

const StartScreen: React.FC<Props> = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={styles.headerContainer}>
          <View style={styles.logoWrapper}>
            <Image
              source={require('../assets/bag.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Shoppe</Text>
          <Text style={styles.subtitle}>
            Beautiful eCommerce UI Kit{'\n'}for your online store
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>Let’s get started</Text>
        </TouchableOpacity>

        {
          <View style={styles.footer}>
            <Text style={styles.footerText}>I already have an account</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.iconButton}>
              <Icon name="arrow-right" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        }
      </View>
    </>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40,
    paddingTop: 100,
  },
  headerContainer: {
    alignItems: 'center',
  },
  logoWrapper: {
    position: 'absolute',
    top: '25%',
    backgroundColor: '#f0f4ff',
    height: 120,
    width: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    height: 80,
    width: 80,
  },
  title: {
    fontSize: 52,
    fontWeight: '700',
    marginTop: '60%',
    color: '#111',
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#316bff',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 200,
    width: '85%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom:30,
  },

  footerText: {
    fontSize: 14,
    color: '#333',
  },

  iconButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#316bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundDecorations: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  // content: {
  //   flex: 1,
  //   paddingTop: StatusBar.currentHeight || 40,
  // },
});
