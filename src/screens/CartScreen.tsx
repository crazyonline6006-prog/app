import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { useCart } from '../context/CartContext';

export const CartScreen = () => {
    const navigation = useNavigation<any>();
    const { items, updateQuantity, removeFromCart, subtotal, tax, total } = useCart();

    return (
        <SafeAreaView style={tw`flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100`}>
            {/* Header */}
            <View style={tw`flex-row items-center px-4 pt-6 pb-4 bg-background-dark z-10 border-b border-[#233c48]`}>
                <TouchableOpacity
                    style={tw`w-10 h-10 items-center justify-center rounded-full hover:bg-[#233c48]`}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={tw`text-xl font-bold text-white flex-1 text-center pr-10`}>Your Bag</Text>
            </View>

            <ScrollView contentContainerStyle={tw`flex-grow pb-32`} showsVerticalScrollIndicator={false}>
                {items.length === 0 ? (
                    <View style={tw`flex-1 items-center justify-center pt-32 px-6`}>
                        <View style={tw`w-24 h-24 bg-[#192b33] rounded-full justify-center items-center mb-6 border border-[#233c48]`}>
                            <MaterialIcons name="shopping-bag" size={48} color="#94a3b8" />
                        </View>
                        <Text style={tw`text-2xl font-bold text-white mb-2 text-center`}>Your bag is empty</Text>
                        <Text style={tw`text-[#94a3b8] text-center mb-8`}>Looks like you haven't added anything to your bag yet.</Text>
                        <TouchableOpacity
                            style={tw`bg-[#2badee] px-8 py-4 rounded-xl shadow-lg shadow-[#2badee]/20`}
                            onPress={() => navigation.navigate('MainTabs')}
                        >
                            <Text style={tw`text-white font-bold text-lg`}>Browse Menu</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={tw`p-4`}>
                        {/* Cart Items */}
                        <View style={tw`flex-col gap-4 mb-8`}>
                            {items.map((item) => (
                                <View key={item.cartItemId} style={tw`bg-[#192b33] p-4 rounded-xl border border-[#233c48] flex-row gap-4 shadow-md`}>
                                    {/* Image */}
                                    <View style={tw`w-20 h-20 bg-[#101c22] rounded-lg overflow-hidden`}>
                                        <Image source={{ uri: item.product.product_image || 'https://via.placeholder.com/150' }} style={tw`w-full h-full`} />
                                    </View>

                                    {/* Info */}
                                    <View style={tw`flex-1 flex-col justify-between`}>
                                        <View style={tw`flex-row justify-between items-start`}>
                                            <View style={tw`flex-1 pr-2`}>
                                                <Text style={tw`text-white font-bold text-base line-clamp-1`}>{item.product.product_name}</Text>
                                                <Text style={tw`text-[#94a3b8] text-xs mt-1`}>{item.variant.variant_name}</Text>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => removeFromCart(item.cartItemId)}
                                                style={tw`p-1`}
                                            >
                                                <MaterialIcons name="close" size={20} color="#94a3b8" />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={tw`flex-row items-center justify-between mt-2`}>
                                            <Text style={tw`text-white font-bold text-lg`}>${(item.variant.price * item.quantity).toFixed(2)}</Text>

                                            {/* Quantity Selector */}
                                            <View style={tw`flex-row items-center bg-[#101c22] rounded-lg border border-[#233c48]`}>
                                                <TouchableOpacity
                                                    style={tw`w-8 h-8 items-center justify-center`}
                                                    onPress={() => updateQuantity(item.cartItemId, -1)}
                                                >
                                                    <MaterialIcons name="remove" size={16} color="white" />
                                                </TouchableOpacity>
                                                <Text style={tw`text-white font-bold w-6 text-center`}>{item.quantity}</Text>
                                                <TouchableOpacity
                                                    style={tw`w-8 h-8 items-center justify-center`}
                                                    onPress={() => updateQuantity(item.cartItemId, 1)}
                                                >
                                                    <MaterialIcons name="add" size={16} color="white" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Receipt Summary */}
                        <View style={tw`bg-[#192b33] rounded-xl p-5 border border-[#233c48] mb-6`}>
                            <Text style={tw`text-white font-bold text-lg mb-4 border-b border-[#233c48] pb-3`}>Order Summary</Text>

                            <View style={tw`flex-col gap-3 mb-4`}>
                                <View style={tw`flex-row justify-between`}>
                                    <Text style={tw`text-[#94a3b8]`}>Subtotal</Text>
                                    <Text style={tw`text-white font-medium`}>${subtotal.toFixed(2)}</Text>
                                </View>
                                <View style={tw`flex-row justify-between`}>
                                    <Text style={tw`text-[#94a3b8]`}>Estimated Tax</Text>
                                    <Text style={tw`text-white font-medium`}>${tax.toFixed(2)}</Text>
                                </View>
                                <View style={tw`flex-row justify-between`}>
                                    <Text style={tw`text-[#94a3b8]`}>Delivery Fee</Text>
                                    <Text style={tw`text-[#10b981] font-bold tracking-wide uppercase text-xs self-center`}>Free</Text>
                                </View>
                            </View>

                            <View style={tw`flex-row justify-between border-t border-[#233c48] pt-4`}>
                                <Text style={tw`text-white font-bold text-xl`}>Total</Text>
                                <Text style={tw`text-[#2badee] font-bold text-xl`}>${total.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Fixed Checkout Bar */}
            {items.length > 0 && (
                <View style={tw`absolute bottom-0 w-full px-5 py-4 bg-[#0F1115]/95 border-t border-[#233c48] z-40`}>
                    <TouchableOpacity
                        style={tw`w-full bg-[#2badee] h-14 rounded-full flex-row items-center justify-center gap-2 shadow-lg shadow-[#2badee]/20`}
                        onPress={() => navigation.navigate('Payments')}
                    >
                        <Text style={tw`text-white font-bold text-lg mr-2`}>Checkout</Text>
                        <View style={tw`bg-black/20 px-3 py-1 rounded-full`}>
                            <Text style={tw`text-white font-bold`}>${total.toFixed(2)}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};
