import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

interface FriendCardProps {
  friend: {
    id: number;
    name: string;
    status: 'Online' | 'Offline' | 'Away' | 'Busy';
    avatar: string;
    lastMessage: string;
    lastSeen?: string;
    distance?: string;
    isFavorite?: boolean;
    mutualFriends?: number;
  };
  showDistance?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

export default function FriendCard({ 
  friend, 
  showDistance = false, 
  variant = 'default' 
}: FriendCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return '#10B981';
      case 'Away': return '#F59E0B';
      case 'Busy': return '#EF4444';
      default: return '#9CA3AF';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Online': return 'radio-button-on';
      case 'Away': return 'time';
      case 'Busy': return 'pause-circle';
      default: return 'radio-button-off';
    }
  };

  // Reusable Link wrapper for navigation
  const CardWrapper = ({ children }: { children: React.ReactNode }) => (
    <Link
      href={{
        pathname: "/(modals)/friends/profile",
        params: {
          id: friend.id.toString(),
          name: friend.name,
          lat: "28.6142",
          lng: "77.2024",
          avatar: friend.avatar,
        },
      }}
      asChild
    >
      <Pressable>{children}</Pressable>
    </Link>
  );

  if (variant === 'compact') {
    return (
      <CardWrapper>
        <View className="flex-row items-center space-x-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
          <View className="relative">
            <Image source={{ uri: friend.avatar }} className="w-10 h-10 rounded-full" />
            <View 
              className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
              style={{ backgroundColor: getStatusColor(friend.status) }}
            />
          </View>
          <View className="flex-1">
            <Text className="font-semibold text-sm">{friend.name}</Text>
            <Text className="text-xs text-gray-500">{friend.lastMessage}</Text>
          </View>
          {friend.isFavorite && (
            <Ionicons name="heart" size={16} color="#EF4444" />
          )}
        </View>
      </CardWrapper>
    );
  }

  if (variant === 'detailed') {
    return (
      <CardWrapper>
        <View className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-3">
              <View className="relative">
                <Image source={{ uri: friend.avatar }} className="w-14 h-14 rounded-full" />
                <View 
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                  style={{ backgroundColor: getStatusColor(friend.status) }}
                />
              </View>
              <View>
                <Text className="font-bold text-lg">{friend.name}</Text>
                <View className="flex-row items-center space-x-2">
                  <Ionicons 
                    name={getStatusIcon(friend.status) as any} 
                    size={12} 
                    color={getStatusColor(friend.status)} 
                  />
                  <Text 
                    className="text-xs"
                    style={{ color: getStatusColor(friend.status) }}
                  >
                    {friend.status}
                  </Text>
                  {friend.lastSeen && (
                    <Text className="text-xs text-gray-400">• {friend.lastSeen}</Text>
                  )}
                </View>
              </View>
            </View>
            {friend.isFavorite && (
              <Ionicons name="heart" size={20} color="#EF4444" />
            )}
          </View>
          
          <Text className="text-gray-600">{friend.lastMessage}</Text>
          
          <View className="flex-row items-center justify-between">
            {showDistance && friend.distance && (
              <View className="flex-row items-center space-x-1">
                <Ionicons name="location" size={14} color="#6B7280" />
                <Text className="text-xs text-gray-500">{friend.distance}</Text>
              </View>
            )}
            {friend.mutualFriends && (
              <View className="flex-row items-center space-x-1">
                <Ionicons name="people" size={14} color="#6B7280" />
                <Text className="text-xs text-gray-500">{friend.mutualFriends} mutual</Text>
              </View>
            )}
          </View>
        </View>
      </CardWrapper>
    );
  }

  // Default variant
  return (
    <CardWrapper>
      <View className="flex-row items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <View className="flex-row items-center space-x-3">
          <View className="relative">
            <Image source={{ uri: friend.avatar }} className="w-12 h-12 rounded-full" />
            <View 
              className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
              style={{ backgroundColor: getStatusColor(friend.status) }}
            />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center space-x-2">
              <Text className="font-semibold text-base">{friend.name}</Text>
              {friend.isFavorite && (
                <Ionicons name="heart" size={14} color="#EF4444" />
              )}
            </View>
            <Text className="text-sm text-gray-500">{friend.lastMessage}</Text>
            {showDistance && friend.distance && (
              <Text className="text-xs text-blue-500">{friend.distance}</Text>
            )}
          </View>
        </View>
      </View>
    </CardWrapper>
  );
}
