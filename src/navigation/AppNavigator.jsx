import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';

import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MenuScreen } from '../screens/MenuScreen';
import { ProductsListScreen } from '../screens/ProductsListScreen';
import { ProductDetailsScreen } from '../screens/ProductDetailsScreen';
import { OrdersScreen } from '../screens/OrdersScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { PaymentsScreen } from '../screens/PaymentsScreen';
import { CartScreen } from '../screens/CartScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: [tw`bg-[#101c22] border-t border-slate-800 py-2 h-[84px] absolute`, { opacity: 0.95 }],
                tabBarActiveTintColor: '#2badee',
                tabBarInactiveTintColor: '#64748b',
                tabBarShowLabel: true,
                tabBarLabelStyle: tw`text-[10px] font-medium pb-2`,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarIcon: ({ color }) => <MaterialIcons name="home" size={26} color={color} /> }}
            />
            <Tab.Screen
                name="Menu"
                component={MenuScreen}
                options={{ tabBarIcon: ({ color }) => <MaterialIcons name="grid-view" size={26} color={color} /> }}
            />
            <Tab.Screen
                name="Orders"
                component={OrdersScreen}
                options={{ tabBarIcon: ({ color }) => <MaterialIcons name="receipt-long" size={26} color={color} /> }}
            />
            <Tab.Screen
                name="Profile"
                component={UserProfileScreen}
                options={{ tabBarIcon: ({ color }) => <MaterialIcons name="person" size={26} color={color} /> }}
            />
        </Tab.Navigator>
    );
};

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: tw`bg-[#101c22]` }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="ProductsList" component={ProductsListScreen} />
                <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Payments" component={PaymentsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
