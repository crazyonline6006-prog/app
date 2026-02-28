import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';

export const AgeVerificationModal = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkVerification = async () => {
            try {
                const verified = await AsyncStorage.getItem('ageVerified');
                if (verified !== 'true') {
                    setIsVisible(true);
                }
            } catch (error) {
                console.error("Error checking age verification status:", error);
                setIsVisible(true);
            }
        };
        checkVerification();
    }, []);

    const handleVerify = async (isOfAge) => {
        if (isOfAge) {
            try {
                await AsyncStorage.setItem('ageVerified', 'true');
                setIsVisible(false);
            } catch (error) {
                console.error("Error setting age verification:", error);
            }
        } else {
            Alert.alert("Access Denied", "You must be 21 or older to use this application.");
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => { }}
        >
            <View style={tw`flex-1 bg-black/95 justify-center items-center px-6`}>
                <View style={tw`bg-[#101c22] border border-[#233c48] rounded-3xl p-8 w-full items-center shadow-xl`}>
                    <View style={tw`w-16 h-16 rounded-full bg-[#192b33] border border-[#325567] mb-6 justify-center items-center`}>
                        <Text style={tw`text-2xl font-bold text-[#2badee]`}>21+</Text>
                    </View>
                    <Text style={tw`text-white text-2xl font-extrabold mb-2 text-center`}>Age Verification</Text>
                    <Text style={tw`text-[#94a3b8] text-center mb-8`}>
                        This application contains products intended solely for adult use.
                        You must be 21 years of age or older to enter.
                    </Text>

                    <TouchableOpacity
                        style={tw`w-full bg-[#2badee] h-14 rounded-xl items-center justify-center mb-4`}
                        onPress={() => handleVerify(true)}
                    >
                        <Text style={tw`text-[#101c22] font-extrabold text-lg uppercase tracking-wider`}>I am 21 or older</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw`w-full bg-[#192b33] border border-[#325567] h-14 rounded-xl items-center justify-center`}
                        onPress={() => handleVerify(false)}
                    >
                        <Text style={tw`text-[#94a3b8] font-bold text-base uppercase tracking-wider`}>I am under 21</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
