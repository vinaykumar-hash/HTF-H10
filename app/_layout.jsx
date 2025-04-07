import { Stack } from 'expo-router';
import { UserProvider } from './context/UserContext';

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup/set-pin" options={{ title: 'Set PIN' }} />
        {/* Other screens */}
      </Stack>
    </UserProvider>
  );
}