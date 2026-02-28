import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import { useCart } from '../context/CartContext';
import { getAllProducts } from '../data/firestoreService';

export const ProductsListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { addToCart } = useCart();

  const category = route.params?.category;
  const initialSearchQuery = route.params?.searchQuery || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      setLoading(true);
      try {
        let prods = [];

        if (category) {
          // If a specific category was passed, use its products.
          const getProductsFromCategory = (cat) => {
            let p = cat.products ? [...cat.products] : [];
            if (cat.children) {
              cat.children.forEach(child => {
                p = [...p, ...getProductsFromCategory(child)];
              });
            }
            return p;
          };
          prods = getProductsFromCategory(category);
        } else {
          // Otherwise fetch all products (e.g., if arriving via search without a category)
          prods = await getAllProducts();
        }

        // Apply search filter if query exists
        if (initialSearchQuery) {
          prods = prods.filter(p =>
            p.product_name.toLowerCase().includes(initialSearchQuery.toLowerCase()) ||
            (p.brand && p.brand.toLowerCase().includes(initialSearchQuery.toLowerCase()))
          );
        }

        setProducts(prods);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterProducts();
  }, [category, initialSearchQuery]);


  return (
    <SafeAreaView style={tw`flex-1 bg-[#101c22]`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between bg-[#101c22]/95 px-4 py-4 border-b border-[#233c48] z-20`}>
        <TouchableOpacity
          style={tw`w-10 h-10 items-center justify-center rounded-full bg-[#233c48]`}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-lg font-bold leading-tight flex-1 text-center`} numberOfLines={1}>
          {category ? category.category_name : (initialSearchQuery ? `Search: ${initialSearchQuery}` : 'All Products')}
        </Text>
        <TouchableOpacity style={tw`w-10 h-10 items-center justify-center rounded-full bg-[#233c48]`}>
          <MaterialIcons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Filter & Sort Bar */}
      <View style={tw`flex-row gap-3 px-4 py-3 bg-[#101c22] border-b border-[#233c48] z-10`}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`gap-3`}>
          <TouchableOpacity style={tw`flex-row h-9 items-center justify-center gap-2 rounded-lg bg-[#233c48] px-3`}>
            <MaterialIcons name="sort" size={20} color="white" />
            <Text style={tw`text-white text-sm font-medium`}>Sort: Popularity</Text>
            <MaterialIcons name="arrow-drop-down" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row h-9 items-center justify-center gap-2 rounded-lg bg-[#233c48] px-3`}>
            <MaterialIcons name="filter-list" size={20} color="white" />
            <Text style={tw`text-white text-sm font-medium`}>Filters</Text>
            <MaterialIcons name="arrow-drop-down" size={20} color="white" />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Product List */}
      <ScrollView contentContainerStyle={tw`flex-col gap-4 p-4 pb-24`} showsVerticalScrollIndicator={false}>
        {loading ? (
          <Text style={tw`text-center text-slate-400 py-10`}>Loading products...</Text>
        ) : products.length > 0 ? (
          products.map((product) => (
            <TouchableOpacity
              key={product.product_id}
              style={tw`flex-col gap-3 rounded-xl bg-[#192b33] p-3 shadow-lg`}
              onPress={() => navigation.navigate('ProductDetails', { product })}
              activeOpacity={0.9}
            >
              <View style={tw`flex-row gap-4`}>
                {/* Image Container */}
                <View style={tw`relative w-28 h-28 rounded-lg bg-[#233c48] overflow-hidden`}>
                  <ImageBackground
                    source={{ uri: product.product_image || 'https://via.placeholder.com/150' }}
                    style={tw`w-full h-full`}
                  />
                  <View style={tw`absolute top-1 left-1 rounded bg-black/60 px-1.5 py-0.5`}>
                    <Text style={tw`text-[10px] font-bold uppercase tracking-wider text-white`}>
                      {product.cat_name || 'Hybrid'}
                    </Text>
                  </View>
                </View>

                {/* Content */}
                <View style={tw`flex-1 flex-col justify-between py-1`}>
                  <View style={tw`flex-col gap-1`}>
                    <View style={tw`flex-row items-center justify-between`}>
                      <Text style={tw`text-[#2badee] text-[11px] font-bold uppercase tracking-wider`}>
                        {product.brand || 'Spliffy Selects'}
                      </Text>
                      <View style={tw`flex-row items-center gap-1`}>
                        <MaterialIcons name="star" size={14} color="#facc15" />
                        <Text style={tw`text-xs font-medium text-white`}>4.8</Text>
                      </View>
                    </View>
                    <Text style={tw`text-white text-base font-bold leading-tight`} numberOfLines={2}>
                      {product.product_name}
                    </Text>

                    <View style={tw`flex-row flex-wrap gap-2 pt-1`}>
                      {product.thc_percent > 0 && (
                        <View style={tw`rounded bg-[#233c48] px-1.5 py-0.5`}>
                          <Text style={tw`text-[10px] font-medium text-[#92b7c9]`}>{product.thc_percent}% THC</Text>
                        </View>
                      )}
                      <View style={tw`rounded bg-[#233c48] px-1.5 py-0.5`}>
                        <Text style={tw`text-[10px] font-medium text-[#92b7c9]`}>Top Shelf</Text>
                      </View>
                    </View>
                  </View>

                  <View style={tw`flex-row items-end justify-between mt-2`}>
                    <Text style={tw`text-lg font-bold text-white`}>${product.price_min?.toFixed(2) || '0.00'}</Text>
                    <TouchableOpacity
                      style={tw`flex h-8 w-8 items-center justify-center rounded-full bg-[#2badee] shadow-md`}
                      onPress={(e) => {
                        e.stopPropagation(); // Prevent navigating to details
                        if (product.variants && product.variants.length > 0) {
                          addToCart(product, product.variants[0], 1);
                          Alert.alert("Added", `${product.product_name} added to cart.`);
                        }
                      }}
                    >
                      <MaterialIcons name="add" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={tw`items-center justify-center py-10`}>
            <Text style={tw`text-slate-400`}>No products found matching your criteria.</Text>
          </View>
        )}

        {/* Legal Disclaimer Spacer */}
        <View style={tw`mt-4 px-2 pb-6`}>
          <Text style={tw`text-[10px] text-[#233c48] text-center`}>
            Warning: This product has intoxicating effects and may be habit forming. Smoking is hazardous to your health. There may be health risks associated with consumption of this product. For use only by adults 21 and older. Keep out of reach of children.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
