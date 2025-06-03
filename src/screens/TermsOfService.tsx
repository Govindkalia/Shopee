import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const TermsOfService = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Terms of Service</Text>
      <Text style={styles.text}>
        Welcome to our application. By accessing or using this app, you agree to
        comply with and be bound by the following terms and conditions. Please
        read them carefully. This is a sample Terms of Service page. You can
        replace this content with your actual legal terms. These terms outline
        the rules and regulations for the use of this application, including
        user responsibilities, permitted and prohibited activities, and
        limitations of liability. By continuing to use this app, you acknowledge
        that you have read, understood, and agreed to these terms. If you do not
        agree with any part of these terms, please do not use the app.
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

export default TermsOfService;
