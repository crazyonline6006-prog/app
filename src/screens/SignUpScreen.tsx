import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors } from '../theme';

export const SignUpScreen = () => {
  const navigation = useNavigation<any>();
  const [ageVerified, setAgeVerified] = useState(false);

  return (
    <SafeAreaView style={tw`flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100`}>
      {/* Top Bar */}
      <View style={tw`flex-row items-center px-4 pt-6 pb-2 justify-between z-10`}>
        <TouchableOpacity 
          style={tw`w-10 h-10 items-center justify-center rounded-full bg-[#192b33]/0 hover:bg-[#192b33]/50`}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10`}>
          Sign Up
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <ScrollView contentContainerStyle={tw`flex-grow px-4 pb-8`} showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View style={tw`pt-4 pb-6`}>
            <Text style={tw`text-white text-3xl font-extrabold leading-tight mb-2`}>
              Create your account
            </Text>
            <Text style={tw`text-slate-400 text-base font-normal leading-normal`}>
              Get premium products delivered in minutes.
            </Text>
          </View>

          {/* Form */}
          <View style={tw`space-y-5 flex-col gap-4`}>
            <Input
              label="Full Name"
              icon="person"
              placeholder="Enter your full name"
            />
            <Input
              label="Email Address"
              icon="mail"
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Phone Number"
              icon="phone"
              placeholder="(555) 000-0000"
              keyboardType="phone-pad"
            />
            <Input
              label="Password"
              icon="lock"
              placeholder="••••••••"
              isPassword
            />

            {/* Age Verification */}
            <TouchableOpacity 
              style={tw`flex-row items-start gap-3 p-4 rounded-xl bg-[#2badee]/10 border border-[#2badee]/20 mt-2`}
              onPress={() => setAgeVerified(!ageVerified)}
              activeOpacity={0.8}
            >
              <View style={tw`w-5 h-5 rounded border ${ageVerified ? 'bg-[#2badee] border-[#2badee]' : 'bg-[#192b33] border-[#2badee]/50'} items-center justify-center`}>
                {ageVerified && <MaterialIcons name="check" size={16} color="white" />}
              </View>
              <Text style={tw`flex-1 text-sm leading-tight text-slate-300`}>
                I verify that I am <Text style={tw`font-bold text-white`}>21 years of age or older</Text> and agree to the <Text style={tw`text-[#2badee]`}>Terms of Service</Text>.
              </Text>
            </TouchableOpacity>

            <Button 
              title="Create Account" 
              style={tw`mt-4 font-bold text-lg h-14`}
              onPress={() => navigation.navigate('MainTabs')} 
            />
          </View>

          {/* Social Login Divider */}
          <View style={tw`flex-row py-8 items-center`}>
            <View style={tw`flex-1 border-t border-[#325567]`} />
            <Text style={tw`mx-4 text-slate-400 text-sm`}>
              Or continue with
            </Text>
            <View style={tw`flex-1 border-t border-[#325567]`} />
          </View>

          {/* Social Buttons */}
          <View style={tw`flex-row justify-between flex-wrap gap-4`}>
            <TouchableOpacity style={tw`flex-1 flex-row items-center justify-center gap-2 bg-[#192b33] border border-[#325567] h-12 rounded-lg`}>
              <MaterialIcons name="g-translate" size={20} color="white" />
              <Text style={tw`text-white font-medium text-sm`}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex-1 flex-row items-center justify-center gap-2 bg-[#192b33] border border-[#325567] h-12 rounded-lg`}>
              <MaterialIcons name="apple" size={20} color="white" />
              <Text style={tw`text-white font-medium text-sm`}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Link */}
          <View style={tw`mt-8 text-center pb-6 flex-row justify-center`}>
            <Text style={tw`text-slate-400 text-sm`}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={tw`font-bold text-[#2badee]`}>Sign In</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
