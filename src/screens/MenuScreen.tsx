import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { getStoreData } from '../data/mockData';

export const MenuScreen = () => {
  const navigation = useNavigation<any>();
  const categories = getStoreData();

  const getCategoryIcon = (name: string): keyof typeof MaterialIcons.glyphMap => {
    switch (name) {
      case 'Flower': return 'eco';
      case 'Edibles': return 'cookie';
      case 'Vaporizers': return 'vape-free';
      case 'Pre-rolls': return 'smoking-rooms';
      default: return 'category';
    }
  };

  const getCategoryColor = (name: string) => {
    switch (name) {
      case 'Flower': return 'text-[#9333ea]'; // purple-600
      case 'Edibles': return 'text-[#ec4899]'; // pink-500
      case 'Vaporizers': return 'text-[#facc15]'; // yellow-400
      case 'Pre-rolls': return 'text-[#94a3b8]'; // slate-400
      default: return 'text-[#2badee]';
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100`}>
      {/* Header / Sticky Search Area */}
      <View style={tw`w-full px-4 pt-4 pb-4 bg-background-light/90 dark:bg-background-dark/90 border-b border-slate-200 dark:border-slate-800 z-50`}>
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <View>
            <Text style={tw`text-2xl font-bold tracking-tight text-white`}>Discover</Text>
            <Text style={tw`text-sm text-slate-400`}>Find your perfect strain</Text>
          </View>
          <TouchableOpacity style={tw`relative p-2 rounded-full bg-[#1e293b] text-slate-300`}>
            <MaterialIcons name="notifications" size={24} color="#cbd5e1" />
            <View style={tw`absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1e293b]`} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={tw`relative flex-row items-center w-full h-12 rounded-xl bg-[#1e293b] shadow-lg`}>
          <View style={tw`absolute left-4 z-10`}>
            <MaterialIcons name="search" size={20} color="#64748b" />
          </View>
          <TextInput
            style={tw`flex-1 h-full pl-12 pr-4 text-white text-base`}
            placeholder="Search strains, edibles, brands..."
            placeholderTextColor="#64748b"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={tw`flex-grow px-4 pb-24`} showsVerticalScrollIndicator={false}>
        {/* Featured Deals / Banner */}
        <View style={tw`mt-4 mb-8`}>
          <TouchableOpacity 
            style={tw`w-full h-40 rounded-2xl overflow-hidden`}
            activeOpacity={0.9}
          >
            <ImageBackground 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzV1f7dJKYCwR63Ldx1dfiXIwKNAXgADHXGQZENUgE_FIcVVHHVWb0aXUHIP01Gg1acU2WRNE0eAlzjFFNIqPWKPpPciu1i2J5GrVRSyl4FITjeApn2PrFvXSHEvLo6NncNtTTx-djxZnGA0YiOkcOmO9vXzRs0mmvu2qeh4wKrmz7Ec4aT8jSq6wwe64KZ5s0ZLUYnx-ZmBrjhVxA9ouqbbAAytwrdzWOh0XdM--52T7tpF-Y1blrSwPQzuhpKm2lMFJa7JfuMUE' }} 
              style={tw`flex-1 justify-center px-6`}
              imageStyle={tw`opacity-60`}
            >
              <View style={tw`bg-[#2badee] self-start px-2 py-1 rounded mb-2`}>
                <Text style={tw`text-xs font-bold tracking-wider text-[#101c22]`}>NEW ARRIVAL</Text>
              </View>
              <Text style={tw`text-2xl font-bold text-white mb-1`}>Purple Haze</Text>
              <Text style={tw`text-slate-300 text-sm mb-3`}>Premium sativa dominant hybrid</Text>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-[#2badee] text-sm font-semibold`}>Shop Now </Text>
                <MaterialIcons name="arrow-forward" size={16} color="#2badee" />
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        {/* Categories Grid */}
        <View>
          <View style={tw`flex-row items-center justify-between mb-4`}>
            <Text style={tw`text-xl font-bold text-white`}>Shop by Category</Text>
            <TouchableOpacity>
              <Text style={tw`text-sm font-medium text-[#2badee]`}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={tw`flex-row flex-wrap justify-between`}>
            {categories.map((cat, index) => (
              <TouchableOpacity
                key={cat.category_id}
                style={tw`w-[48%] flex items-center justify-center p-6 bg-[#1e293b] rounded-xl h-40 border border-slate-700/50 mb-4`}
                onPress={() => navigation.navigate('ProductsList', { category: cat })}
              >
                <View style={tw`w-16 h-16 mb-3 rounded-full bg-[#101c22] items-center justify-center shadow-lg`}>
                  <MaterialIcons name={getCategoryIcon(cat.category_name)} size={32} style={tw`${getCategoryColor(cat.category_name)}`} />
                </View>
                <Text style={tw`text-base font-bold text-white text-center`}>{cat.category_name}</Text>
                <Text style={tw`text-xs text-slate-400 mt-1 text-center`}>{cat.category_description || 'View Products'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Brands Horizontal Scroll */}
        <View style={tw`mt-4`}>
          <Text style={tw`text-xl font-bold text-white mb-4`}>Popular Brands</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`gap-4`}>
            {['Stiiizy', 'Raw Garden', 'Cookies', 'Jeeter'].map((brand, i) => (
              <View key={i} style={tw`items-center`}>
                <View style={tw`w-20 h-20 rounded-full bg-[#1e293b] border border-slate-800 items-center justify-center overflow-hidden mb-2`}>
                   <View style={tw`w-full h-full bg-[#2badee]/20`} />
                </View>
                <Text style={tw`text-xs font-medium text-slate-300`}>{brand}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
