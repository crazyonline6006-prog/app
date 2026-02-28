import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';

export const Input = ({ label, icon, isPassword, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(!isPassword);

    return (
        <View style={tw`mb-4`}>
            <Text style={tw`text-sm font-medium text-slate-300 ml-1 mb-2`}>{label}</Text>
            <View
                style={[
                    tw`relative flex-row items-center bg-[#192b33] border rounded-xl overflow-hidden`,
                    isFocused ? tw`border-[#2badee]` : tw`border-[#325567]`
                ]}
            >
                {icon && (
                    <View style={tw`pl-4`}>
                        <MaterialIcons
                            name={icon}
                            size={20}
                            color={isFocused ? '#2badee' : '#94a3b8'}
                        />
                    </View>
                )}
                <TextInput
                    style={tw`flex-1 text-white text-base py-3.5 px-4`}
                    placeholderTextColor="#94a3b8"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={isPassword && !showPassword}
                    {...props}
                />
                {isPassword && (
                    <TouchableOpacity
                        style={tw`pr-4`}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <MaterialIcons
                            name={showPassword ? 'visibility' : 'visibility-off'}
                            size={20}
                            color="#94a3b8"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};
