import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { ImageBackground } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { Category, getStoreData } from '../data/firestoreService';

export const MenuScreen = () => {
  const navigation = useNavigation<any>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getStoreData();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const getCategoryIcon = (name: string): keyof typeof MaterialIcons.glyphMap => {
    switch (name) {
      case 'THCa Flower': return 'local-florist';
      case 'Edibles': return 'cookie';
      case 'Vapes': return 'vape-free';
      case 'Concentrates': return 'water-drop';
      case 'Accessories': return 'construction';
      case 'CBD Options': return 'spa';
      default: return 'category';
    }
  };

  const getCategoryColor = (name: string): string => {
    switch (name) {
      case 'THCa Flower': return 'text-[#8b5cf6]'; // Purple
      case 'Edibles': return 'text-[#f59e0b]'; // Amber
      case 'Vapes': return 'text-[#0ea5e9]'; // Sky blue
      case 'Concentrates': return 'text-[#f43f5e]'; // Rose
      case 'Accessories': return 'text-[#64748b]'; // Slate
      case 'CBD Options': return 'text-[#10b981]'; // Emerald
      default: return 'text-[#2badee]';
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100`}>
      {/* Search Header */}
      <View style={tw`flex-row items-center justify-between px-4 pt-6 pb-2 bg-background-light dark:bg-background-dark shrink-0 relative z-10 border-b border-slate-800/50`}>
        <View style={tw`flex-row items-center w-full h-12 bg-[#192b33] rounded-xl px-4 shadow-lg`}>
          <MaterialIcons name="search" size={24} color="#64748b" />
          <TextInput
            style={tw`flex-1 h-full pl-3 pr-2 text-white text-base`}
            placeholder="Search categories..."
            placeholderTextColor="#64748b"
          />
          <TouchableOpacity style={tw`p-1 bg-[#2badee] rounded-md`}>
            <MaterialIcons name="tune" size={18} color="#101c22" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={tw`flex-grow px-4 pb-24`} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={tw`h-64 items-center justify-center`}>
            <ActivityIndicator size="large" color="#2badee" />
            <Text style={tw`text-[#94a3b8] mt-4 font-medium`}>Loading Catalog...</Text>
          </View>
        ) : (
          <View style={tw`flex-col gap-6`}>
            {/* Featured Deals / Banner */}
            <View style={tw`mt-4 mb-4`}>
              <TouchableOpacity
                style={tw`w-full h-40 rounded-2xl overflow-hidden`}
                activeOpacity={0.9}
              >
                <ImageBackground
                  source={{ uri: 'https://images.unsplash.com/photo-1579246941785-3bcce72a39d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }}
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
                      <MaterialIcons name={getCategoryIcon(cat.category_name)} size={32} style={tw`${getCategoryColor(cat.category_name)} `} />
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
          </View>
        )}
      </ScrollView>

    </SafeAreaView>
  );
};
