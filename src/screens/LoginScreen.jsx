import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors } from '../theme';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.replace('MainTabs');
        } catch (error) {
            console.error(error);
            Alert.alert("Login Failed", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-[#101c22]`}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={tw`flex-1`}
            >
                <ScrollView contentContainerStyle={tw`flex-grow justify-center`} showsVerticalScrollIndicator={false}>
                    {/* Main Container */}
                    <View style={tw`w-full px-6 flex-col`}>

                        {/* Header Section */}
                        <View style={tw`items-center pt-8 pb-6 relative z-10`}>
                            <View style={tw`w-20 h-20 mb-6 bg-[#192b33] rounded-xl items-center justify-center shadow-lg border border-[#325567]/30`}>
                                <MaterialIcons name="eco" size={48} color={colors.primary} />
                            </View>
                            <Text style={tw`text-3xl font-bold tracking-tight text-center mb-2 text-white`}>
                                Welcome Back
                            </Text>
                            <Text style={tw`text-slate-400 text-center text-sm font-medium`}>
                                Sign in to continue your order
                            </Text>
                        </View>

                        {/* Form Section */}
                        <View style={tw`w-full flex-col gap-5 flex-grow z-10`}>
                            {/* Email Input */}
                            <Input
                                label="Email"
                                icon="mail"
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                editable={!isLoading}
                            />

                            {/* Password Input */}
                            <View style={tw`gap-2`}>
                                <Input
                                    label="Password"
                                    icon="lock"
                                    placeholder="Enter your password"
                                    isPassword
                                    value={password}
                                    onChangeText={setPassword}
                                    editable={!isLoading}
                                />
                                <View style={tw`flex-row justify-end mt-2`}>
                                    <TouchableOpacity disabled={isLoading}>
                                        <Text style={tw`text-sm font-semibold text-[#2badee]`}>
                                            Forgot Password?
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Login Button */}
                            <Button
                                title={isLoading ? "Logging in..." : "Log In"}
                                style={tw`mt-2`}
                                onPress={handleLogin}
                                disabled={isLoading}
                            />

                            {/* Divider */}
                            <View style={tw`flex-row py-4 items-center`}>
                                <View style={tw`flex-1 border-t border-[#325567]`} />
                                <Text style={tw`mx-4 text-slate-400 text-xs uppercase tracking-wider font-medium`}>
                                    Or continue with
                                </Text>
                                <View style={tw`flex-1 border-t border-[#325567]`} />
                            </View>

                            {/* Social Login */}
                            <View style={tw`flex-row justify-between flex-wrap gap-4`}>
                                <TouchableOpacity style={tw`flex-1 flex-row items-center justify-center gap-2 bg-[#192b33] border border-[#325567] py-3 rounded-xl`}>
                                    <MaterialIcons name="g-translate" size={20} color="white" />
                                    <Text style={tw`text-white font-medium`}>Google</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={tw`flex-1 flex-row items-center justify-center gap-2 bg-[#192b33] border border-[#325567] py-3 rounded-xl`}>
                                    <MaterialIcons name="apple" size={20} color="white" />
                                    <Text style={tw`text-white font-medium`}>Apple</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Footer */}
                        <View style={tw`p-6 z-10 pb-10 mt-4 flex-row justify-center`}>
                            <Text style={tw`text-slate-400 text-sm`}>
                                New to Spliffy?{' '}
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Text style={tw`font-bold text-[#2badee]`}>Create Account</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
