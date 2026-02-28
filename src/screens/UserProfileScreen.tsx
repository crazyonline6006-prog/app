import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const UserProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { user, logOut } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    await logOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-4 pt-6 pb-2 z-10`}>
        <Text style={tw`text-white text-2xl font-bold`}>Profile</Text>
        <TouchableOpacity style={tw`p-2 bg-[#192b33] rounded-full`}>
          <MaterialIcons name="settings" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={tw`flex-grow px-4 pb-24`} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={tw`mt-4 bg-[#192b33] rounded-xl p-6 items-center border border-[#325567]`}>
          <View style={tw`w-24 h-24 rounded-full bg-[#2badee]/20 items-center justify-center mb-4`}>
            <MaterialIcons name="person" size={48} color="#2badee" />
          </View>
          {loading ? (
            <ActivityIndicator color="#2badee" style={tw`mb-5`} />
          ) : (
            <>
              <Text style={tw`text-xl font-bold text-white mb-1`}>{userData?.fullName || 'User Name'}</Text>
              <Text style={tw`text-sm text-slate-400 mb-4`}>{user?.email || 'user@example.com'}</Text>
            </>
          )}
          <View style={tw`flex-row gap-4 w-full`}>
            <View style={tw`flex-1 bg-[#101c22] p-3 rounded-lg items-center`}>
              <Text style={tw`text-lg font-bold text-white`}>12</Text>
              <Text style={tw`text-xs text-slate-400`}>Orders</Text>
            </View>
            <View style={tw`flex-1 bg-[#101c22] p-3 rounded-lg items-center`}>
              <Text style={tw`text-lg font-bold text-[#facc15]`}>450</Text>
              <Text style={tw`text-xs text-slate-400`}>Points</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={tw`mt-6 gap-3`}>
          <Text style={tw`text-sm font-bold text-slate-400 uppercase tracking-wider mb-2`}>Account settings</Text>

          {[
            { icon: 'history', label: 'Order History', screen: 'Orders' },
            { icon: 'payment', label: 'Payment Methods', screen: 'Payments' },
            { icon: 'local-shipping', label: 'Delivery Addresses', screen: null },
            { icon: 'notifications-none', label: 'Notifications', screen: null }
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={tw`flex-row items-center justify-between p-4 bg-[#192b33] rounded-xl border border-[#325567]`}
              onPress={() => item.screen ? navigation.navigate(item.screen) : null}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <View style={tw`w-8 h-8 rounded-full bg-[#101c22] items-center justify-center`}>
                  <MaterialIcons name={item.icon as any} size={18} color="#2badee" />
                </View>
                <Text style={tw`text-base font-medium text-white`}>{item.label}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#64748b" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={tw`mt-6 gap-3`}>
          <Text style={tw`text-sm font-bold text-slate-400 uppercase tracking-wider mb-2`}>Support & More</Text>
          {[
            { icon: 'help-outline', label: 'Help Center' },
            { icon: 'info-outline', label: 'About Spliffy' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={tw`flex-row items-center justify-between p-4 bg-[#192b33] rounded-xl border border-[#325567]`}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <View style={tw`w-8 h-8 rounded-full bg-[#101c22] items-center justify-center`}>
                  <MaterialIcons name={item.icon as any} size={18} color="#94a3b8" />
                </View>
                <Text style={tw`text-base font-medium text-white`}>{item.label}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#64748b" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={tw`flex-row items-center p-4 bg-red-500/10 rounded-xl border border-red-500/20 mt-4`}
            onPress={handleLogout}
          >
            <View style={tw`w-8 h-8 rounded-full bg-red-500/20 items-center justify-center mr-3`}>
              <MaterialIcons name="logout" size={18} color="#ef4444" />
            </View>
            <Text style={tw`text-base font-bold text-red-500`}>Log Out</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
