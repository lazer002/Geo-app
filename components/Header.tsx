import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showProfile?: boolean;
  onSearchChange?: (text: string) => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  variant?: 'default' | 'home' | 'friends' | 'map';
}

export default function Header({
  title = "Geo App",
  showSearch = false,
  showNotifications = true,
  showProfile = true,
  onSearchChange,
  onNotificationPress,
  onProfilePress,
  variant = 'default'
}: HeaderProps) {
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    onSearchChange?.(text);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (variant === 'home') {
    return (
      <View className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900">{getGreeting()}, Ajit 👋</Text>
            <Text className="text-gray-500 text-sm">Here's what's happening now</Text>
          </View>
          <View className="flex-row items-center space-x-3">
            {showNotifications && (
              <Pressable 
                onPress={onNotificationPress}
                className="relative bg-gray-100 p-2 rounded-full"
              >
                <Ionicons name="notifications" size={24} color="#374151" />
                <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              </Pressable>
            )}
            {showProfile && (
              <Pressable onPress={onProfilePress}>
                <Image 
                  source={{ uri: "https://i.pravatar.cc/150?img=8" }} 
                  className="w-10 h-10 rounded-full border-2 border-blue-500"
                />
              </Pressable>
            )}
          </View>
        </View>
        
        {showSearch && (
          <View className="bg-gray-100 rounded-full px-4 py-3 flex-row items-center">
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              placeholder="Search places, friends, or activities..."
              className="ml-3 flex-1 text-base"
              value={searchText}
              onChangeText={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchText.length > 0 && (
              <Pressable onPress={() => handleSearchChange('')}>
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </Pressable>
            )}
          </View>
        )}
      </View>
    );
  }

  if (variant === 'friends') {
    return (
      <View className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold text-gray-900">Friends</Text>
          <View className="flex-row items-center space-x-3">
            <Pressable className="bg-blue-500 px-3 py-2 rounded-full flex-row items-center space-x-1">
              <Ionicons name="person-add" size={16} color="white" />
              <Text className="text-white text-sm font-medium">Add</Text>
            </Pressable>
            <Pressable className="bg-gray-100 p-2 rounded-full">
              <Ionicons name="ellipsis-horizontal" size={20} color="#374151" />
            </Pressable>
          </View>
        </View>
        
        {showSearch && (
          <View className="bg-gray-100 rounded-full px-4 py-3 flex-row items-center">
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              placeholder="Search friends..."
              className="ml-3 flex-1 text-base"
              value={searchText}
              onChangeText={handleSearchChange}
            />
            {searchText.length > 0 && (
              <Pressable onPress={() => handleSearchChange('')}>
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </Pressable>
            )}
          </View>
        )}
      </View>
    );
  }

  if (variant === 'map') {
    return (
      <View className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold text-gray-900">Map</Text>
          <View className="flex-row items-center space-x-3">
            <Pressable className="bg-blue-500 p-2 rounded-full">
              <Ionicons name="location" size={20} color="white" />
            </Pressable>
            <Pressable className="bg-gray-100 p-2 rounded-full">
              <Ionicons name="layers" size={20} color="#374151" />
            </Pressable>
            <Pressable className="bg-gray-100 p-2 rounded-full">
              <Ionicons name="ellipsis-horizontal" size={20} color="#374151" />
            </Pressable>
          </View>
        </View>
        
        {showSearch && (
          <View className="bg-gray-100 rounded-full px-4 py-3 flex-row items-center">
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              placeholder="Search locations..."
              className="ml-3 flex-1 text-base"
              value={searchText}
              onChangeText={handleSearchChange}
            />
            {searchText.length > 0 && (
              <Pressable onPress={() => handleSearchChange('')}>
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </Pressable>
            )}
          </View>
        )}
      </View>
    );
  }

  // Default variant
  return (
    <View className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-gray-900">{title}</Text>
        <View className="flex-row items-center space-x-3">
          {showNotifications && (
            <Pressable 
              onPress={onNotificationPress}
              className="relative bg-gray-100 p-2 rounded-full"
            >
              <Ionicons name="notifications" size={20} color="#374151" />
              <View className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Pressable>
          )}
          {showProfile && (
            <Pressable onPress={onProfilePress}>
              <Image 
                source={{ uri: "https://i.pravatar.cc/150?img=8" }} 
                className="w-8 h-8 rounded-full"
              />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
