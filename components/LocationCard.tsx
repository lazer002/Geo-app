import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface LocationCardProps {
  location: {
    id: string;
    name: string;
    type: 'park' | 'cafe' | 'restaurant' | 'mall' | 'station' | 'other';
    distance: string;
    rating?: number;
    description?: string;
    isOpen?: boolean;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  onPress?: () => void;
  onNavigate?: () => void;
  variant?: 'default' | 'compact' | 'detailed';
}

export default function LocationCard({ 
  location, 
  onPress, 
  onNavigate, 
  variant = 'default' 
}: LocationCardProps) {
  const getLocationIcon = () => {
    switch (location.type) {
      case 'park':
        return { name: 'leaf', color: '#10B981', bgColor: '#ECFDF5' };
      case 'cafe':
        return { name: 'cafe', color: '#F59E0B', bgColor: '#FFFBEB' };
      case 'restaurant':
        return { name: 'restaurant', color: '#EF4444', bgColor: '#FEF2F2' };
      case 'mall':
        return { name: 'bag', color: '#8B5CF6', bgColor: '#F3E8FF' };
      case 'station':
        return { name: 'train', color: '#6B7280', bgColor: '#F3F4F6' };
      default:
        return { name: 'location', color: '#007AFF', bgColor: '#E3F2FD' };
    }
  };

  const getStatusColor = () => {
    if (location.isOpen === undefined) return '#6B7280';
    return location.isOpen ? '#10B981' : '#EF4444';
  };

  const getStatusText = () => {
    if (location.isOpen === undefined) return '';
    return location.isOpen ? 'Open' : 'Closed';
  };

  const icon = getLocationIcon();

  if (variant === 'compact') {
    return (
      <Pressable 
        onPress={onPress}
        className="flex-row items-center space-x-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"
      >
        <View 
          className="w-10 h-10 rounded-lg items-center justify-center"
          style={{ backgroundColor: icon.bgColor }}
        >
          <Ionicons name={icon.name as any} size={20} color={icon.color} />
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-sm">{location.name}</Text>
          <Text className="text-xs text-gray-500">{location.distance}</Text>
        </View>
        {onNavigate && (
          <Pressable onPress={onNavigate}>
            <Ionicons name="navigate" size={16} color="#007AFF" />
          </Pressable>
        )}
      </Pressable>
    );
  }

  if (variant === 'detailed') {
    return (
      <Pressable 
        onPress={onPress}
        className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3"
      >
        <View className="flex-row items-start justify-between">
          <View className="flex-row items-center space-x-3">
            <View 
              className="w-12 h-12 rounded-xl items-center justify-center"
              style={{ backgroundColor: icon.bgColor }}
            >
              <Ionicons name={icon.name as any} size={24} color={icon.color} />
            </View>
            <View>
              <Text className="font-bold text-lg">{location.name}</Text>
              <View className="flex-row items-center space-x-2 mt-1">
                <Text className="text-sm text-gray-500">{location.distance}</Text>
                {location.rating && (
                  <View className="flex-row items-center space-x-1">
                    <Ionicons name="star" size={12} color="#F59E0B" />
                    <Text className="text-xs text-gray-500">{location.rating}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          {location.isOpen !== undefined && (
            <View className="items-end">
              <View 
                className="px-2 py-1 rounded-full"
                style={{ backgroundColor: getStatusColor() + '20' }}
              >
                <Text 
                  className="text-xs font-medium"
                  style={{ color: getStatusColor() }}
                >
                  {getStatusText()}
                </Text>
              </View>
            </View>
          )}
        </View>
        
        {location.description && (
          <Text className="text-gray-600 text-sm leading-5">{location.description}</Text>
        )}
        
        <View className="flex-row space-x-2">
          {onNavigate && (
            <Pressable 
              onPress={onNavigate}
              className="flex-1 bg-blue-500 py-2 rounded-lg flex-row items-center justify-center space-x-2"
            >
              <Ionicons name="navigate" size={16} color="white" />
              <Text className="text-white font-medium">Navigate</Text>
            </Pressable>
          )}
          <Pressable className="bg-gray-100 py-2 px-4 rounded-lg">
            <Ionicons name="information-circle" size={16} color="#6B7280" />
          </Pressable>
        </View>
      </Pressable>
    );
  }

  // Default variant
  return (
    <Pressable 
      onPress={onPress}
      className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-3">
          <View 
            className="w-10 h-10 rounded-lg items-center justify-center"
            style={{ backgroundColor: icon.bgColor }}
          >
            <Ionicons name={icon.name as any} size={20} color={icon.color} />
          </View>
          <View className="flex-1">
            <Text className="font-semibold text-base">{location.name}</Text>
            <View className="flex-row items-center space-x-2 mt-1">
              <Text className="text-sm text-gray-500">{location.distance}</Text>
              {location.rating && (
                <View className="flex-row items-center space-x-1">
                  <Ionicons name="star" size={12} color="#F59E0B" />
                  <Text className="text-xs text-gray-500">{location.rating}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        
        <View className="items-end space-y-1">
          {location.isOpen !== undefined && (
            <View 
              className="px-2 py-1 rounded-full"
              style={{ backgroundColor: getStatusColor() + '20' }}
            >
              <Text 
                className="text-xs font-medium"
                style={{ color: getStatusColor() }}
              >
                {getStatusText()}
              </Text>
            </View>
          )}
          {onNavigate && (
            <Pressable onPress={onNavigate}>
              <Ionicons name="navigate" size={16} color="#007AFF" />
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
}
