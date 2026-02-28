import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { useAuth } from '../context/AuthContext';
import { seedInitialData, getAllProducts, Product } from '../data/firestoreService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddressModal } from '../components/AddressModal';

export const HomeScreen = () => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddressModalVisible, setAddressModalVisible] = useState(false);
    const [deliveryZone, setDeliveryZone] = useState('Select Zone');

    useEffect(() => {
        const initializeApp = async () => {
            try {
                setLoading(true);
                // Ensure data exists in the new Firebase DB
                await seedInitialData();

                // Fetch products to display in featured
                const products = await getAllProducts();
                // Just grab the first 4 for the featured section
                setFeaturedProducts(products.slice(0, 4));

                const storedZone = await AsyncStorage.getItem('deliveryZone');
                if (storedZone) {
                    setDeliveryZone(storedZone);
                }
            } catch (error) {
                console.error("Error initializing home screen data", error);
            } finally {
                setLoading(false);
            }
        };

        initializeApp();
    }, []);

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            // Pass the query to the generic products screen
            navigation.navigate('ProductsList', {
                category: { category_name: `Search: ${searchQuery}`, products: featuredProducts }, // We will refactor ProductsList to handle raw queries next
                searchQuery: searchQuery
            });
        }
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-[#101c22]`}>
            {/* Dynamic Header */}
            <View style={tw`flex-row items-center justify-between px-4 pt-6 pb-2 z-10`}>
                <TouchableOpacity
                    style={tw`flex-row items-center gap-3 bg-[#192b33] pl-2 pr-4 py-1.5 rounded-full border border-[#233c48] active:bg-[#233c48]`}
                    onPress={() => setAddressModalVisible(true)}
                >
                    <View style={tw`w-8 h-8 rounded-full bg-[#101c22] items-center justify-center border border-[#325567]`}>
                        <MaterialIcons name="location-on" size={18} color="#2badee" />
                    </View>
                    <View>
                        <Text style={tw`text-[#94a3b8] text-[10px] font-semibold uppercase tracking-wider leading-none`}>Deliver To</Text>
                        <View style={tw`flex-row items-center gap-1`}>
                            <Text style={tw`text-white font-bold text-sm leading-tight`} numberOfLines={1}>{deliveryZone}</Text>
                            <MaterialIcons name="keyboard-arrow-down" size={14} color="#64748b" />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw`w-10 h-10 rounded-full bg-[#192b33] flex items-center justify-center border border-[#325567] relative`}
                    onPress={() => navigation.navigate('Cart')}
                >
                    <MaterialIcons name="shopping-bag" size={20} color="white" />
                    <View style={tw`absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full`} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={tw`pb-32 px-4`} showsVerticalScrollIndicator={false}>

                {/* Search Bar */}
                <View style={tw`flex-row items-center bg-[#192b33] h-12 rounded-xl px-4 mt-4 border border-[#325567]`}>
                    <MaterialIcons name="search" size={20} color="#94a3b8" />
                    <TextInput
                        style={tw`flex-1 text-white ml-2 text-base h-full`}
                        placeholder="Search strains, edibles, & more..."
                        placeholderTextColor="#94a3b8"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearchSubmit}
                        returnKeyType="search"
                    />
                </View>

                {/* Hero Banner */}
                <View style={tw`w-full h-40 mt-6 rounded-2xl overflow-hidden bg-black/80 border border-[#233c48]`}>
                    <ImageBackground
                        source={{ uri: 'https://images.unsplash.com/photo-1603588261314-cc4ca3332560?auto=format&fit=crop&q=80' }}
                        style={tw`w-full h-full justify-center px-6`}
                        imageStyle={tw`opacity-40`}
                    >
                        <View style={tw`bg-[#2badee]/20 self-start px-2 py-1 rounded mb-2 border border-[#2badee]/30`}>
                            <Text style={tw`text-[#2badee] text-xs font-bold tracking-widest uppercase`}>New Arrival</Text>
                        </View>
                        <Text style={tw`text-white text-2xl font-extrabold w-2/3 tracking-tight leading-tight`}>Premium Indoor Exotics</Text>
                        <TouchableOpacity style={tw`mt-3 bg-white w-28 h-8 rounded-full items-center justify-center shadow-md`}>
                            <Text style={tw`text-black font-bold text-xs uppercase tracking-wider`}>Shop Now</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>

                {/* Categories Quick Links */}
                <View style={tw`mt-8`}>
                    <View style={tw`flex-row items-center justify-between mb-4`}>
                        <Text style={tw`text-lg font-bold text-white`}>Shop by Category</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                            <Text style={tw`text-[#2badee] font-medium text-sm`}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`gap-4`}>
                        {[
                            { id: '1', name: 'THCa Flower', icon: 'local-florist' },
                            { id: '2', name: 'Edibles', icon: 'cookie' },
                            { id: '3', name: 'Vapes', icon: 'vape-free' },
                            { id: '4', name: 'Concentrates', icon: 'water-drop' }
                        ].map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                style={tw`items-center gap-2`}
                                onPress={() => navigation.navigate('ProductsList', { searchQuery: cat.name })}
                            >
                                <View style={tw`w-16 h-16 rounded-2xl bg-[#192b33] border border-[#233c48] items-center justify-center`}>
                                    <MaterialIcons name={cat.icon} size={28} color="#2badee" />
                                </View>
                                <Text style={tw`text-xs font-medium text-slate-300 w-16 text-center leading-tight`}>{cat.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Featured Products */}
                <View style={tw`mt-8 mb-6`}>
                    <Text style={tw`text-lg font-bold text-white mb-4`}>Trending Near You</Text>

                    {loading ? (
                        <View style={tw`h-40 items-center justify-center`}>
                            <ActivityIndicator size="large" color="#2badee" />
                            <Text style={tw`text-[#94a3b8] mt-4`}>Loading catalog...</Text>
                        </View>
                    ) : (
                        <View style={tw`flex-row flex-wrap justify-between gap-y-4`}>
                            {featuredProducts.map((product) => (
                                <TouchableOpacity
                                    key={product.product_id}
                                    style={tw`w-[48%] bg-[#192b33] rounded-xl border border-[#233c48] overflow-hidden`}
                                    onPress={() => navigation.navigate('ProductDetails', { product })}
                                    activeOpacity={0.9}
                                >
                                    <View style={tw`w-full aspect-square bg-[#101c22]`}>
                                        <Image
                                            source={{ uri: product.product_image || 'https://via.placeholder.com/150' }}
                                            style={tw`w-full h-full`}
                                            contentFit="cover"
                                        />
                                    </View>
                                    <View style={tw`p-3 flex-col gap-1`}>
                                        <Text style={tw`text-[#2badee] text-[10px] font-bold uppercase tracking-wider`} numberOfLines={1}>{product.cat_name}</Text>
                                        <Text style={tw`text-white font-bold text-sm leading-tight`} numberOfLines={1}>{product.product_name}</Text>
                                        <View style={tw`flex-row justify-between items-center mt-2`}>
                                            <Text style={tw`text-white font-bold`}>${product.price_min?.toFixed(2) || '0.00'}</Text>
                                            <View style={tw`w-6 h-6 rounded-full bg-[#101c22] border border-[#325567] items-center justify-center`}>
                                                <MaterialIcons name="add" size={14} color="white" />
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

            </ScrollView>

            <AddressModal
                isVisible={isAddressModalVisible}
                onClose={() => setAddressModalVisible(false)}
                onSelectZone={(zone) => setDeliveryZone(zone)}
            />
        </SafeAreaView>
    );
};
