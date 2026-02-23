import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import { Product } from '../data/mockData';

export const ProductDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const product: Product = route.params?.product || { 
    product_name: 'Product Details', 
    price_min: 0, 
    description: 'No description available',
    variants: [],
    cat_name: 'Unknown',
    thc_percent: 0,
    brand: 'Unknown',
    product_image: 'https://via.placeholder.com/300'
  };

  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);

  return (
    <View style={tw`flex-1 bg-[#0F1115]`}>
      <ScrollView contentContainerStyle={tw`pb-32`} showsVerticalScrollIndicator={false}>
        {/* Navigation & Hero Image Section */}
        <View style={tw`w-full aspect-square bg-[#1A1D23] relative`}>
          <ImageBackground
            source={{ uri: product.product_image || 'https://via.placeholder.com/400' }}
            style={tw`w-full h-full`}
          >
            <View style={tw`absolute inset-0 bg-transparent`}>
              {/* Note: React Native Expo gradients need expo-linear-gradient, using semi-transparent view for now */}
              <View style={tw`absolute inset-y-0 bottom-0 w-full h-[30%] bg-[#0F1115]/80`} />
            </View>
            
            {/* Top Nav Overlay */}
            <SafeAreaView style={tw`w-full px-4 pt-4 flex-row justify-between items-center z-10`}>
              <TouchableOpacity
                style={tw`w-10 h-10 items-center justify-center rounded-full bg-black/40 border border-white/10`}
                onPress={() => navigation.goBack()}
              >
                <MaterialIcons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <View style={tw`flex-row gap-3`}>
                <TouchableOpacity style={tw`w-10 h-10 items-center justify-center rounded-full bg-black/40 border border-white/10`}>
                  <MaterialIcons name="ios-share" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={tw`w-10 h-10 items-center justify-center rounded-full bg-black/40 border border-white/10`}>
                  <MaterialIcons name="favorite-border" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </ImageBackground>
        </View>

        {/* Main Content Container */}
        <View style={tw`px-5 -mt-6 relative z-10 flex-col gap-6`}>
          {/* Title Header */}
          <View style={tw`flex-col gap-1`}>
            <View style={tw`flex-row justify-between items-start`}>
              <Text style={tw`text-3xl font-extrabold tracking-tight text-white flex-1`} numberOfLines={2}>
                {product.product_name}
              </Text>
              <View style={tw`flex-row items-center gap-1 bg-[#1A1D23] px-2 py-1 rounded-lg border border-white/5`}>
                <MaterialIcons name="star" size={14} color="#facc15" />
                <Text style={tw`text-sm font-bold text-white`}>4.8</Text>
                <Text style={tw`text-xs text-[#94a3b8]`}> (124)</Text>
              </View>
            </View>
            <View style={tw`flex-row items-center flex-wrap gap-2 mt-1`}>
              <View style={tw`px-2.5 py-0.5 rounded-full bg-[#2b9dee]/20`}>
                <Text style={tw`text-[#2b9dee] text-xs font-bold tracking-wide uppercase`}>{product.cat_name}</Text>
              </View>
              <View style={tw`w-1 h-1 rounded-full bg-[#94a3b8]`} />
              <Text style={tw`text-sm text-[#94a3b8] font-medium`}>{product.brand}</Text>
              {product.thc_percent > 0 && (
                <>
                  <View style={tw`w-1 h-1 rounded-full bg-[#94a3b8]`} />
                  <Text style={tw`text-sm text-[#94a3b8] font-medium`}>THC {product.thc_percent}%</Text>
                </>
              )}
            </View>
          </View>

          {/* Effect Tags */}
          <View>
            <Text style={tw`text-sm font-semibold text-[#94a3b8] mb-3 uppercase tracking-wider`}>Effects</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`gap-3 pb-1 -mx-5 px-5`}>
              <View style={tw`flex-row items-center gap-2 px-4 py-2 rounded-full bg-[#2b9dee]/10 border border-[#2b9dee]/20`}>
                <MaterialIcons name="spa" size={18} color="#2b9dee" />
                <Text style={tw`text-sm font-medium text-[#2b9dee]`}>Relaxed</Text>
              </View>
              <View style={tw`flex-row items-center gap-2 px-4 py-2 rounded-full bg-[#1A1D23] border border-white/5`}>
                <MaterialIcons name="mood" size={18} color="#94a3b8" />
                <Text style={tw`text-sm font-medium text-[#94a3b8]`}>Euphoric</Text>
              </View>
              <View style={tw`flex-row items-center gap-2 px-4 py-2 rounded-full bg-[#1A1D23] border border-white/5`}>
                <MaterialIcons name="palette" size={18} color="#94a3b8" />
                <Text style={tw`text-sm font-medium text-[#94a3b8]`}>Creative</Text>
              </View>
            </ScrollView>
          </View>

          {/* Weight Selector */}
          {product.variants && product.variants.length > 0 && (
            <View>
              <Text style={tw`text-sm font-semibold text-[#94a3b8] mb-3 uppercase tracking-wider`}>Select Option</Text>
              <View style={tw`flex-row flex-wrap gap-2`}>
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant?.variant_id === variant.variant_id;
                  return (
                    <TouchableOpacity
                      key={variant.variant_id}
                      onPress={() => setSelectedVariant(variant)}
                      style={tw`relative flex-col items-center justify-center p-3 rounded-2xl w-[23%] ${
                        isSelected 
                          ? 'bg-[#2b9dee] border border-[#2b9dee] shadow-lg shadow-[#2b9dee]/25' 
                          : 'bg-[#1A1D23] border border-white/5'
                      }`}
                    >
                      <Text style={tw`text-sm font-bold ${isSelected ? 'text-white' : 'text-[#94a3b8]'}`}>
                        {variant.variant_name}
                      </Text>
                      <Text style={tw`text-[10px] ${isSelected ? 'opacity-80 text-white' : 'opacity-60 text-[#94a3b8]'}`}>
                        ${variant.price.toFixed(2)}
                      </Text>
                      {isSelected && (
                        <View style={tw`absolute -top-2 -right-2 bg-white rounded-full w-5 h-5 items-center justify-center shadow-sm`}>
                          <MaterialIcons name="check" size={14} color="#2b9dee" />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Description */}
          <View style={tw`pb-4 border-b border-white/5`}>
            <Text style={tw`text-lg font-bold text-white mb-2`}>Description</Text>
            <Text style={tw`text-[#94a3b8] leading-relaxed text-sm`}>
              {product.description.replace(/<[^>]+>/g, '') || "A potent premium product."}
            </Text>
          </View>

          {/* Details List */}
          <View style={tw`flex-col gap-4 mb-8`}>
            {product.thc_percent > 0 && (
              <TouchableOpacity style={tw`flex-row justify-between items-center py-2 border-b border-white/5`}>
                <View style={tw`flex-row items-center gap-3`}>
                  <View style={tw`w-8 h-8 rounded-full bg-[#1A1D23] items-center justify-center`}>
                    <MaterialIcons name="science" size={18} color="#94a3b8" />
                  </View>
                  <Text style={tw`font-medium text-white`}>Lab Results & Terpenes</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#94a3b8" />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={tw`flex-row justify-between items-center py-2 border-b border-white/5`}>
              <View style={tw`flex-row items-center gap-3`}>
                <View style={tw`w-8 h-8 rounded-full bg-[#1A1D23] items-center justify-center`}>
                  <MaterialIcons name="local-shipping" size={18} color="#94a3b8" />
                </View>
                <Text style={tw`font-medium text-white`}>Shipping & Returns</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#94a3b8" />
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

      {/* Fixed Bottom Bar (Add to Cart) */}
      <View style={tw`absolute bottom-0 w-full px-5 py-4 bg-[#0F1115]/90 border-t border-white/5 z-40`}>
        <View style={tw`flex-row items-center justify-between gap-4`}>
          <View style={tw`flex-col`}>
            <Text style={tw`text-xs text-[#94a3b8] font-medium`}>Total Price</Text>
            <Text style={tw`text-2xl font-extrabold text-white tracking-tight`}>
              ${(selectedVariant?.price || product.price_min || 0).toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity style={tw`flex-1 bg-[#2b9dee] h-14 rounded-full flex-row items-center justify-center gap-2 shadow-lg shadow-[#2b9dee]/20`}>
            <MaterialIcons name="shopping-bag" size={24} color="white" />
            <Text style={tw`text-white font-bold text-lg`}>Add to Bag</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
