import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';

interface AddressModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSelectZone: (zone: string) => void;
}

const ZONES = [
    { id: '1', name: 'Downtown Center', available: true },
    { id: '2', name: 'Northside District', available: true },
    { id: '3', name: 'West End', available: true },
    { id: '4', name: 'Eastside Suburbs', available: true },
    { id: '5', name: 'Out of State / Unserviceable', available: false },
];

export const AddressModal: React.FC<AddressModalProps> = ({ isVisible, onClose, onSelectZone }) => {

    const handleSelect = async (zone: typeof ZONES[0]) => {
        if (zone.available) {
            try {
                await AsyncStorage.setItem('deliveryZone', zone.name);
                onSelectZone(zone.name);
                onClose();
            } catch (error) {
                console.error("Error saving delivery zone", error);
            }
        } else {
            Alert.alert("Out of Range", "Sorry, we do not currently deliver to this area.");
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={tw`flex-1 justify-end bg-black/60`}>
                <View style={tw`bg-[#101c22] rounded-t-3xl border-t border-[#233c48] pt-6 pb-12 px-5 min-h-[50%]`}>
                    <View style={tw`flex-row justify-between items-center mb-6`}>
                        <Text style={tw`text-white text-xl font-bold`}>Select Delivery Zone</Text>
                        <TouchableOpacity onPress={onClose} style={tw`p-2 bg-[#192b33] rounded-full`}>
                            <MaterialIcons name="close" size={20} color="#94a3b8" />
                        </TouchableOpacity>
                    </View>

                    <Text style={tw`text-[#94a3b8] text-sm mb-4`}>
                        Choose your general location to see delivery availability and accurate pricing.
                    </Text>

                    <FlatList
                        data={ZONES}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={tw`flex-row items-center justify-between p-4 mb-3 rounded-xl border ${item.available ? 'bg-[#192b33] border-[#325567]' : 'bg-[#192b33]/50 border-[#233c48]'}`}
                                onPress={() => handleSelect(item)}
                            >
                                <View style={tw`flex-row items-center gap-3`}>
                                    <MaterialIcons
                                        name={item.available ? "location-on" : "location-off"}
                                        size={24}
                                        color={item.available ? "#2badee" : "#64748b"}
                                    />
                                    <View>
                                        <Text style={tw`text-white font-bold text-base ${!item.available ? 'text-slate-500' : ''}`}>
                                            {item.name}
                                        </Text>
                                        {item.available && <Text style={tw`text-[#2badee] text-xs mt-1`}>Delivery Available</Text>}
                                        {!item.available && <Text style={tw`text-red-400 text-xs mt-1`}>Out of Range</Text>}
                                    </View>
                                </View>
                                <MaterialIcons name="chevron-right" size={24} color="#64748b" />
                            </TouchableOpacity>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </Modal>
    );
};
