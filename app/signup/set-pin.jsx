import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useContext, useState } from 'react';
import { useUser } from '../context/UserContext'; 

export default function SetPinScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { setUser } = useUser();
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleSubmit = () => {
    if (pin.length !== 6 || confirmPin.length !== 6) {
      Alert.alert('Invalid PIN', 'PIN must be 6 digits');
      return;
    }

    if (pin !== confirmPin) {
      Alert.alert('PIN Mismatch', 'PINs do not match');
      return;
    }

    // Combine all user data with PIN
    const completeUserData = {
      ...params,
      pin: pin, // Store hashed PIN in production
      isPinSet: true
    };
    console.log(completeUserData)
    // Save user and redirect to home
    setUser(completeUserData);
    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Your 6-Digit Private Key</Text>
      <Text style={styles.subheader}>This will be used to secure your health data</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter 6-digit PIN"
        keyboardType="number-pad"
        secureTextEntry
        maxLength={6}
        value={pin}
        onChangeText={setPin}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm 6-digit PIN"
        keyboardType="number-pad"
        secureTextEntry
        maxLength={6}
        value={confirmPin}
        onChangeText={setConfirmPin}
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={handleSubmit}
        disabled={pin.length !== 6 || confirmPin.length !== 6}
      >
        <Text style={styles.buttonText}>Save Private Key</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1b998e',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#1b998e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});