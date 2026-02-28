import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { useCart } from '../context/CartContext';

export const PaymentsScreen = () => {
  const navigation = useNavigation();
  const { total, clearCart } = useCart();
  const [selectedCard, setSelectedCard] = useState('visa');

  const handleCheckout = () => {
    if (total === 0) {
      Alert.alert("Empty Cart", "Please add items to your cart before proceeding.");
      return;
    }
    Alert.alert(
      "Payment Successful",
      `Your payment of $${total.toFixed(2)} was processed successfully!`,
      [
        {
          text: "OK",
          onPress: () => {
            clearCart();
            navigation.navigate('MainTabs');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#101c22]`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-6 pt-6 pb-4 bg-[#101c22] shrink-0`}>
        <View style={tw`flex-row items-center gap-4`}>
          <TouchableOpacity
            style={tw`w-10 h-10 items-center justify-center rounded-full bg-[#192b33]/50`}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#92b7c9" />
          </TouchableOpacity>
          <Text style={tw`text-2xl font-bold tracking-tight text-white`}>Wallet</Text>
        </View>
        <TouchableOpacity>
          <Text style={tw`text-[#2badee] font-semibold text-sm`}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={tw`flex-grow px-6 pb-24 pt-4`} showsVerticalScrollIndicator={false}>
        {/* Payment Cards Carousel */}
        <View style={tw`flex-col gap-6 mb-8`}>
          {/* Card 1 (Visa) */}
          <TouchableOpacity
            onPress={() => setSelectedCard('visa')}
            activeOpacity={0.9}
            style={[tw`w-full rounded-2xl overflow-hidden shadow-lg bg-[#064e3b]`, { aspectRatio: 1.58 }, selectedCard === 'visa' ? tw`border-2 border-[#2badee]` : { opacity: 0.6 }]}
          >
            {/* Abstract representations of gradient/textures */}
            <View style={tw`absolute inset-0 bg-black/40`} />

            <View style={tw`relative z-10 p-6 flex-col justify-between h-full`}>
              <View style={tw`flex-row justify-between items-start`}>
                <MaterialIcons name="contactless" size={28} color="rgba(255,255,255,0.8)" />
                <Text style={tw`text-white font-bold tracking-widest text-lg italic`}>VISA</Text>
              </View>

              <View style={tw`flex-col gap-1`}>
                <View style={tw`flex-row gap-4 items-center mb-2`}>
                  <Text style={tw`text-white/70 text-lg tracking-widest mb-1`}>•••• •••• ••••</Text>
                  <Text style={tw`text-white text-lg font-bold tracking-widest`}>4242</Text>
                </View>
                <View style={tw`flex-row justify-between items-end`}>
                  <View style={tw`flex-col`}>
                    <Text style={tw`text-[10px] text-white/60 uppercase tracking-wider font-semibold mb-1`}>Card Holder</Text>
                    <Text style={tw`text-sm text-white font-medium tracking-wide`}>JONATHAN DOE</Text>
                  </View>
                  <View style={tw`flex-col items-end`}>
                    <Text style={tw`text-[10px] text-white/60 uppercase tracking-wider font-semibold mb-1`}>Expires</Text>
                    <Text style={tw`text-sm text-white font-medium tracking-wide`}>12/25</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Card 2 (Mastercard) */}
          <TouchableOpacity
            onPress={() => setSelectedCard('mastercard')}
            activeOpacity={0.9}
            style={[tw`relative w-full rounded-2xl overflow-hidden shadow-lg bg-[#312e81]`, { aspectRatio: 1.58 }, selectedCard === 'mastercard' ? tw`border-2 border-[#2badee]` : { opacity: 0.6 }]}
          >
            {/* Abstract representations of gradient/textures */}
            <View style={tw`absolute inset-0 bg-black/40`} />

            <View style={tw`relative z-10 p-6 flex-col justify-between h-full`}>
              <View style={tw`flex-row justify-between items-start`}>
                <MaterialIcons name="contactless" size={28} color="rgba(255,255,255,0.8)" />
                <View style={tw`flex-row items-center -space-x-3`}>
                  <View style={tw`w-6 h-6 rounded-full bg-white/30`} />
                  <View style={tw`w-6 h-6 rounded-full bg-white/50 -ml-3`} />
                </View>
              </View>
              <View style={tw`flex-col gap-1`}>
                <View style={tw`flex-row gap-4 items-center mb-2`}>
                  <Text style={tw`text-white/70 text-lg tracking-widest mb-1`}>•••• •••• ••••</Text>
                  <Text style={tw`text-white text-lg font-bold tracking-widest`}>8888</Text>
                </View>
                <View style={tw`flex-row justify-between items-end`}>
                  <View style={tw`flex-col`}>
                    <Text style={tw`text-[10px] text-white/60 uppercase tracking-wider font-semibold mb-1`}>Card Holder</Text>
                    <Text style={tw`text-sm text-white font-medium tracking-wide`}>JONATHAN DOE</Text>
                  </View>
                  <View style={tw`flex-col items-end`}>
                    <Text style={tw`text-[10px] text-white/60 uppercase tracking-wider font-semibold mb-1`}>Expires</Text>
                    <Text style={tw`text-sm text-white font-medium tracking-wide`}>09/26</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Add Payment Button */}
        <View style={tw`mb-8`}>
          <TouchableOpacity style={tw`w-full h-14 bg-[#2badee] flex-row items-center justify-center gap-2 rounded-xl shadow-lg`}>
            <MaterialIcons name="add" size={20} color="#101c22" />
            <Text style={tw`text-[#101c22] font-bold text-base`}>Add New Payment Method</Text>
          </TouchableOpacity>
        </View>

        {/* Settings List */}
        <View style={tw`bg-[#192b33] rounded-xl overflow-hidden border border-[#233c48]`}>
          <TouchableOpacity style={tw`flex-row items-center justify-between p-4 border-b border-[#233c48]`}>
            <View style={tw`flex-row items-center gap-4`}>
              <View style={tw`w-10 h-10 rounded-full bg-[#233c48] items-center justify-center`}>
                <MaterialIcons name="location-on" size={20} color="#2badee" />
              </View>
              <View>
                <Text style={tw`text-white font-medium text-sm`}>Billing Address</Text>
                <Text style={tw`text-slate-400 text-xs`}>123 High Street, Denver, CO</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={tw`flex-row items-center justify-between p-4 border-b border-[#233c48]`}>
            <View style={tw`flex-row items-center gap-4`}>
              <View style={tw`w-10 h-10 rounded-full bg-[#233c48] items-center justify-center`}>
                <MaterialIcons name="history" size={20} color="#2badee" />
              </View>
              <View>
                <Text style={tw`text-white font-medium text-sm`}>Transaction History</Text>
                <Text style={tw`text-slate-400 text-xs`}>View past orders</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#64748b" />
          </TouchableOpacity>

          <View style={tw`flex-row items-center justify-between p-4`}>
            <View style={tw`flex-row items-center gap-4`}>
              <View style={tw`w-10 h-10 rounded-full bg-[#233c48] items-center justify-center`}>
                <MaterialIcons name="lock" size={20} color="#34d399" />
              </View>
              <View>
                <Text style={tw`text-white font-medium text-sm`}>Security</Text>
                <View style={tw`flex-row items-center gap-1`}>
                  <MaterialIcons name="check-circle" size={12} color="#34d399" />
                  <Text style={tw`text-[#34d399] text-xs`}>256-bit SSL Encrypted</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Footer Note */}
        <View style={tw`py-8 items-center`}>
          <Text style={tw`text-xs text-slate-500 text-center`}>
            Your payment information is securely stored.{"\n"}
            Spliffy does not share your financial details with merchants.
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Checkout Pay Button */}
      {total > 0 && (
        <View style={tw`absolute bottom-0 w-full px-5 py-6 bg-[#0F1115]/95 border-t border-[#233c48] z-40`}>
          <TouchableOpacity
            style={tw`w-full bg-[#2badee] h-14 rounded-full flex-row items-center justify-center gap-2 shadow-lg`}
            onPress={handleCheckout}
          >
            <MaterialIcons name="lock" size={20} color="white" />
            <Text style={tw`text-white font-bold text-lg mr-2`}>Pay ${total.toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      )}

    </SafeAreaView>
  );
};
