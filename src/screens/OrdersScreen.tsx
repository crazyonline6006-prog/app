import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { ImageBackground } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

export const OrdersScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={tw`flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100`}>
            {/* Header */}
            <View style={tw`flex-row items-center justify-between px-6 pt-6 pb-4 bg-background-light dark:bg-background-dark z-10`}>
                <Text style={tw`text-2xl font-bold tracking-tight text-white`}>My Orders</Text>
                <TouchableOpacity style={tw`w-10 h-10 items-center justify-center rounded-full bg-[#192b33]/50`}>
                    <MaterialIcons name="settings" size={20} color="#92b7c9" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={tw`flex-grow px-4 pb-24`} showsVerticalScrollIndicator={false}>
                {/* Active Order Section */}
                <View style={tw`mb-8`}>
                    <View style={tw`flex-row items-center justify-between mb-4 px-2`}>
                        <Text style={tw`text-lg font-bold text-white`}>Active Order</Text>
                        <Text style={tw`text-xs font-semibold text-[#2badee] uppercase tracking-wider`}>In Progress</Text>
                    </View>

                    {/* Active Order Card */}
                    <View style={tw`relative overflow-hidden rounded-2xl bg-[#192b33] border border-[#233c48] shadow-lg`}>
                        {/* Map/Visual Header */}
                        <View style={tw`h-32 w-full bg-[#101c22]`}>
                            <ImageBackground
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzuPZ5QSSCRccFSrGlxYSfZlmy7phdY_wucrEouPFpu4nqJNwDtN01Fnx-aPD5p5a5dCsvm8hruMhbhwHZMXFzvfD0jb4cmDmeCdOsBOuCCnkDYT-p2PkaxCE1P3qTW7sMBeW0L8Sfk29o6AVRLUBPTrVvIczz3N5oIf40X4pkU-p-o6zSwNYU2xAXtPc0y0zzyakB_RgTS7JqxgKHAzt59rAJHfjzCUbEuz3YP9JYYNGvuyuK_O7_V5VaNhZ5l_5uPnGLe_Drp1U' }}
                                style={tw`flex-1 justify-end p-4`}
                                imageStyle={tw`opacity-50`}
                            >
                                <View style={tw`flex-row items-center gap-3`}>
                                    <View style={tw`w-10 h-10 rounded-full bg-[#233c48] border-2 border-[#192b33] overflow-hidden`}>
                                        <ImageBackground source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNH8niL3xQX4IWIIS3XCPKd1DUivboDCWoa3mih-Y1nJyo5Uo8WHQVmkhf19jr7DgYe4j4I1su4VEbHemToyuN1YfRgRzC8s7dFNmflaz5Vs_D7mD6H8WWxUW_FKn6gBom8Utu8M0nJZwJVNOym190G8pRKFTDcFA1k02m9yEuK7VU_Xrc4-990NhPTwl2WOru0NVsazJ4jnFUyx4GNMW2yb2bXrrEgE9KQeJqxL2YfcUgUNMDYRT_u_JFNnPbgYoi5ournV_TgBE' }} style={tw`w-full h-full`} />
                                    </View>
                                    <View>
                                        <Text style={tw`text-sm font-bold text-white`}>Driver: Marcus</Text>
                                        <Text style={tw`text-xs text-[#92b7c9]`}>Arriving in 12 mins</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>

                        <View style={tw`p-5`}>
                            <View style={tw`flex-row justify-between items-start mb-6`}>
                                <View>
                                    <Text style={tw`text-xl font-bold text-white mb-1`}>Order #4092</Text>
                                    <Text style={tw`text-sm text-[#92b7c9]`}>3 items • $45.50</Text>
                                </View>
                                <TouchableOpacity style={tw`px-4 py-2 bg-[#2badee]/10 rounded-lg`}>
                                    <Text style={tw`text-[#2badee] text-sm font-semibold`}>Track</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Progress Steps */}
                            <View style={tw`relative mb-2`}>
                                <View style={tw`flex-row justify-between z-10 relative`}>
                                    {[
                                        { icon: 'check', label: 'Confirmed', active: true, color: '#2badee' },
                                        { icon: 'inventory-2', label: 'Packed', active: true, color: '#2badee' },
                                        { icon: 'local-shipping', label: 'On way', active: true, color: '#2badee', glow: true },
                                        { icon: 'home', label: 'Arrived', active: false, color: '#92b7c9' }
                                    ].map((step, index) => (
                                        <View key={index} style={tw`items-center w-12`}>
                                            <View style={tw`w-6 h-6 rounded-full mb-1 items-center justify-center ${step.active ? `bg-[${step.color}]` : 'bg-[#233c48]'}`}>
                                                <MaterialIcons name={step.icon as any} size={14} color={step.active ? '#101c22' : '#92b7c9'} />
                                            </View>
                                            <Text style={tw`text-[10px] ${step.active ? `text-[${step.color}] font-bold` : 'text-[#92b7c9] font-medium'}`}>{step.label}</Text>
                                        </View>
                                    ))}
                                </View>
                                {/* Connecting Line */}
                                <View style={tw`absolute top-3 left-6 right-6 h-[2px] bg-[#233c48] -z-10`}>
                                    <View style={tw`h-full bg-[#2badee] w-[66%] rounded-full`} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Past Orders Section */}
                <View>
                    <View style={tw`flex-row items-center justify-between mb-4 px-2`}>
                        <Text style={tw`text-lg font-bold text-white`}>Past Orders</Text>
                        <TouchableOpacity>
                            <Text style={tw`text-sm font-medium text-[#2badee]`}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={tw`gap-4`}>
                        {[
                            { id: '1', date: 'Oct 24, 2023', location: 'Home', price: 124.50, items: 4 },
                            { id: '2', date: 'Sep 15, 2023', location: 'Work', price: 42.00, items: 1 }
                        ].map((order) => (
                            <View key={order.id} style={tw`bg-[#192b33] rounded-xl p-4 border border-[#233c48]`}>
                                <View style={tw`flex-row justify-between items-start mb-3`}>
                                    <View style={tw`flex-row items-center gap-3`}>
                                        <View style={tw`w-10 h-10 rounded-lg bg-[#233c48] items-center justify-center`}>
                                            <MaterialIcons name="shopping-bag" size={20} color="#92b7c9" />
                                        </View>
                                        <View>
                                            <Text style={tw`text-white font-semibold`}>{order.date}</Text>
                                            <Text style={tw`text-xs text-[#92b7c9]`}>Delivered to {order.location}</Text>
                                        </View>
                                    </View>
                                    <View style={tw`items-end`}>
                                        <Text style={tw`text-white font-bold`}>${order.price.toFixed(2)}</Text>
                                        <Text style={tw`text-xs text-[#92b7c9]`}>{order.items} Items</Text>
                                    </View>
                                </View>
                                <View style={tw`flex-row gap-3 pt-2`}>
                                    <TouchableOpacity style={tw`flex-1 py-2.5 rounded-lg bg-[#233c48] items-center`}>
                                        <Text style={tw`text-white text-sm font-semibold`}>View Receipt</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={tw`flex-1 py-2.5 rounded-lg bg-[#2badee] items-center`}>
                                        <Text style={tw`text-white text-sm font-bold`}>Reorder</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
