import type React from 'react';
import {View, StyleSheet} from 'react-native';

const Background: React.FC = () => {
  return (
    <>
      <View style={styles.backgroundBlue} />
      <View style={styles.backgroundBlueSmall} />
    </>
  );
};

const styles = StyleSheet.create({
  backgroundBlue: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '40%',
    backgroundColor: '#316bff',
    borderBottomRightRadius: 200,
  },
  backgroundBlueSmall: {
    position: 'absolute',
    bottom: '20%',
    right: 0,
    width: '20%',
    height: '20%',
    backgroundColor: '#316bff',
    borderTopLeftRadius: 100,
  },
});

export default Background;
