import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import tw from 'twrnc';

export const Button = ({
    title,
    loading = false,
    variant = 'primary',
    style,
    ...props
}) => {
    const baseStyle = tw`py-3.5 px-4 rounded-xl flex-row items-center justify-center`;

    const variantStyles = {
        primary: tw`bg-[#2badee] shadow-md`,
        outline: tw`bg-[#192b33] border border-[#325567]`,
        ghost: tw`bg-transparent py-2`,
    };

    const textStyles = {
        primary: tw`text-white font-bold text-base`,
        outline: tw`text-white font-medium text-base`,
        ghost: tw`text-[#2badee] font-semibold text-sm`,
    };

    return (
        <TouchableOpacity
            style={[baseStyle, variantStyles[variant], style]}
            disabled={loading || props.disabled}
            activeOpacity={0.8}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? 'white' : '#2badee'} />
            ) : (
                <Text style={textStyles[variant]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};
