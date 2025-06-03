import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const PrivacyPolicy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.text}>
        This is a sample privacy policy. Your privacy is important to us. We do
        not share your personal information with third parties without
        consent...
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default PrivacyPolicy;
