import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { AgeVerificationModal } from './src/components/AgeVerificationModal';

export default function App() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <CartProvider>
                    <Text style={{ color: 'white', marginTop: 100 }}>Hello from CartProvider</Text>
                    {/* <AppNavigator /> */}
                    {/* <AgeVerificationModal /> */}
                </CartProvider>
            </AuthProvider>
            <StatusBar style="light" />
        </SafeAreaProvider>
    );
}
