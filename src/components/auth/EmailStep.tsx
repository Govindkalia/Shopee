import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StatusBar,
} from 'react-native';

interface Props {
  email: string;
  setEmail: (e: string) => void;
  emailError: string;
  loading: boolean;
  onNext: () => void;
  onCancel: () => void;
}

const EmailStep: React.FC<Props> = ({
  email,
  setEmail,
  emailError,
  loading,
  onNext,
  onCancel,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Login</Text>
    <Text style={styles.subtitle}>Good to see you back! &#128156;</Text>

    <TextInput
      style={[styles.input, emailError ? styles.inputError : null]}
      placeholder="Email"
      placeholderTextColor="#999"
      autoCapitalize="none"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
      onSubmitEditing={onNext}
    />
    {emailError.length > 0 && (
      <Text style={styles.errorText}>{emailError}</Text>
    )}

    <TouchableOpacity style={styles.button} onPress={onNext} disabled={loading}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>Next</Text>
      )}
    </TouchableOpacity>

    <TouchableOpacity style={styles.cancel} onPress={onCancel}>
      <Text style={styles.cancelText}>Cancel</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 14,
    paddingBottom: 0,
    position: 'relative',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#FAF4F4',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#ff4d4f',
  },
  errorText: {
    color: '#ff4d4f',
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#316bff',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancel: {
    marginTop: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelText: {
    color:' #202020',
    fontSize: 16,
  },
});

export default EmailStep;
