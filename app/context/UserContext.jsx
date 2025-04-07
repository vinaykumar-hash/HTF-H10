import { createContext, useState, useContext,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Load user data on app start
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userData');
        if (jsonValue) {
          const userData = JSON.parse(jsonValue);
          setUser(userData);
          
          // Redirect to PIN verification if user has PIN set
          if (userData?.isPinSet && !userData?.pinVerified) {
            router.push('/auth/verify-pin');
          }
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUserData();
  }, []);

  // Save user data when it changes
  useEffect(() => {
    const saveUserData = async () => {
      if (user) {
        try {
          await AsyncStorage.setItem('userData', JSON.stringify(user));
        } catch (error) {
          console.error('Failed to save user data:', error);
        }
      }
    };

    saveUserData();
  }, [user]);

  const login = (userData) => {
    setUser({ ...userData, pinVerified: false });
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setUser(null);
      router.replace('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const verifyPin = (enteredPin) => {
    if (user?.pin === enteredPin) { // In production, compare hashed PINs
      setUser({ ...user, pinVerified: true });
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  };