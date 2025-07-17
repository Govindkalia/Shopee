// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const TermsOfService = ({navigation}: any) => {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#316bff" />
//         </TouchableOpacity>
//         <Text style={styles.title}>Terms of Service</Text>
//       </View>
//       <Text style={styles.text}>
//         Welcome to our application. By accessing or using this app, you agree to
//         comply with and be bound by the following terms and conditions. Please
//         read them carefully. This is a sample Terms of Service page. You can
//         replace this content with your actual legal terms. These terms outline
//         the rules and regulations for the use of this application, including
//         user responsibilities, permitted and prohibited activities, and
//         limitations of liability. By continuing to use this app, you acknowledge
//         that you have read, understood, and agreed to these terms. If you do not
//         agree with any part of these terms, please do not use the app.
//       </Text>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     paddingTop: 60,
//   },
//   header: {
//     flexDirection: 'row',
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   text: {
//     fontSize: 16,
//     lineHeight: 24,
//   },
// });

// export default TermsOfService;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TermsOfService = ({navigation}: any) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}>
          <Ionicons name="close" size={28} color="#316bff" />
        </TouchableOpacity>
        <Text style={styles.title}>Terms of Service</Text>
      </View>

      <Text style={styles.text}>
        Welcome to our application. By accessing or using this app, you agree to
        be bound by the following Terms of Service. Please read them carefully.
        {'\n'}
        1. **Acceptance of Terms**: By using this app, you agree to comply with
        these terms and all applicable laws and regulations.
        {'\n\n'}
        2. **User Responsibilities**: You agree not to misuse the app or help
        anyone else do so. This includes not interfering with the app’s normal
        operation or trying to access it using a method other than the interface
        provided.
        {'\n\n'}
        3. **Privacy**: We respect your privacy. Please review our Privacy
        Policy to understand how we collect and use your information.
        {'\n\n'}
        4. **Modifications**: We may revise these terms at any time. Continued
        use of the app means you accept the updated terms.
        {'\n'}
        If you do not agree with any part of these terms, please discontinue use
        of the app immediately.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default TermsOfService;
