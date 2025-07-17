import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PrivacyPolicy = ({navigation}: any) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}>
            <Ionicons name="close" size={28} color="#316bff" />
          </TouchableOpacity>
          <Text style={styles.title}>Privacy Policy</Text>
        </View>

        <Text style={styles.text}>
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you use
          our application. Please read this policy carefully.
          {'\n\n'}
          1. **Information We Collect**: We may collect personal information
          such as your name, email address, device information, and usage data
          to improve your experience.
          {'\n\n'}
          2. **How We Use Your Information**: The information we collect is used
          to operate and improve our services, personalize content, and
          communicate with you about updates or offers.
          {'\n\n'}
          3. **Data Sharing and Disclosure**: We do not sell your personal data.
          We may share information with trusted third parties who assist us in
          operating our app, provided they agree to keep this information
          confidential.
          {'\n\n'}
          4. **Data Security**: We implement appropriate security measures to
          protect your data from unauthorized access, alteration, or disclosure.
          {'\n\n'}
          5. **Your Rights**: You have the right to access, update, or delete
          your personal information. You can also opt out of certain data uses
          by adjusting your app settings.
          {'\n\n'}
          6. **Changes to This Policy**: We may update this Privacy Policy from
          time to time. Continued use of the app after changes means you accept
          the updated policy.
          {'\n\n'}
          If you have any questions or concerns about this Privacy Policy,
          please contact us through the app support section.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },

  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  cancelButton: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },

  text: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
  },
});

export default PrivacyPolicy;
