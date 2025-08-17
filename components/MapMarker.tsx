import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

interface MapMarkerProps {
  type: 'user' | 'friend' | 'place' | 'event' | 'custom';
  title: string;
  description?: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  onPress?: () => void;
  isSelected?: boolean;
  userAvatar?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  distance?: string;
  customIcon?: string;
  customColor?: string;
}

export default function MapMarker({
  type,
  title,
  description,
  coordinate,
  onPress,
  isSelected = false,
  userAvatar,
  status = 'offline',
  distance,
  customIcon,
  customColor
}: MapMarkerProps) {
  const [isPressed, setIsPressed] = useState(false);

  const getMarkerIcon = () => {
    switch (type) {
      case 'user':
        return 'person-circle';
      case 'friend':
        return 'people';
      case 'place':
        return 'location';
      case 'event':
        return 'calendar';
      default:
        return customIcon || 'location';
    }
  };

  const getMarkerColor = () => {
    if (customColor) return customColor;
    
    switch (type) {
      case 'user':
        return '#007AFF';
      case 'friend':
        return status === 'online' ? '#10B981' : '#6B7280';
      case 'place':
        return '#F59E0B';
      case 'event':
        return '#8B5CF6';
      default:
        return '#007AFF';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#10B981';
      case 'away': return '#F59E0B';
      case 'busy': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getMarkerSize = () => {
    if (isSelected) return 50;
    if (type === 'user') return 40;
    return 35;
  };

  const renderUserMarker = () => (
    <View className="items-center">
      <View className="relative">
        <Image 
          source={{ uri: userAvatar || "https://i.pravatar.cc/150?img=8" }} 
          className="w-12 h-12 rounded-full border-3 border-white shadow-lg"
          style={{ borderColor: 'white' }}
        />
        <View 
          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
          style={{ backgroundColor: getStatusColor(status) }}
        />
      </View>
      {isSelected && (
        <View className="bg-white px-2 py-1 rounded-lg shadow-lg mt-1">
          <Text className="text-xs font-medium text-gray-800">{title}</Text>
          {distance && (
            <Text className="text-xs text-gray-500">{distance}</Text>
          )}
        </View>
      )}
    </View>
  );

  const renderFriendMarker = () => (
    <View className="items-center">
      <View className="relative">
        <View 
          className="bg-white rounded-full p-2 shadow-lg"
          style={{ 
            borderWidth: 2, 
            borderColor: getMarkerColor(),
            transform: [{ scale: isSelected ? 1.2 : 1 }]
          }}
        >
          <Ionicons 
            name="people" 
            size={getMarkerSize() - 10} 
            color={getMarkerColor()} 
          />
        </View>
        <View 
          className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
          style={{ backgroundColor: getStatusColor(status) }}
        />
      </View>
      {isSelected && (
        <View className="bg-white px-2 py-1 rounded-lg shadow-lg mt-1">
          <Text className="text-xs font-medium text-gray-800">{title}</Text>
          {distance && (
            <Text className="text-xs text-gray-500">{distance}</Text>
          )}
        </View>
      )}
    </View>
  );

  const renderPlaceMarker = () => (
    <View className="items-center">
      <View 
        className="bg-white rounded-full p-2 shadow-lg"
        style={{ 
          borderWidth: 2, 
          borderColor: getMarkerColor(),
          transform: [{ scale: isSelected ? 1.2 : 1 }]
        }}
      >
        <Ionicons 
          name="location" 
          size={getMarkerSize() - 10} 
          color={getMarkerColor()} 
        />
      </View>
      {isSelected && (
        <View className="bg-white px-2 py-1 rounded-lg shadow-lg mt-1">
          <Text className="text-xs font-medium text-gray-800">{title}</Text>
          {description && (
            <Text className="text-xs text-gray-500">{description}</Text>
          )}
        </View>
      )}
    </View>
  );

  const renderEventMarker = () => (
    <View className="items-center">
      <View 
        className="bg-white rounded-full p-2 shadow-lg"
        style={{ 
          borderWidth: 2, 
          borderColor: getMarkerColor(),
          transform: [{ scale: isSelected ? 1.2 : 1 }]
        }}
      >
        <Ionicons 
          name="calendar" 
          size={getMarkerSize() - 10} 
          color={getMarkerColor()} 
        />
      </View>
      {isSelected && (
        <View className="bg-white px-2 py-1 rounded-lg shadow-lg mt-1">
          <Text className="text-xs font-medium text-gray-800">{title}</Text>
          {description && (
            <Text className="text-xs text-gray-500">{description}</Text>
          )}
        </View>
      )}
    </View>
  );

  const renderCustomMarker = () => (
    <View className="items-center">
      <View 
        className="bg-white rounded-full p-2 shadow-lg"
        style={{ 
          borderWidth: 2, 
          borderColor: getMarkerColor(),
          transform: [{ scale: isSelected ? 1.2 : 1 }]
        }}
      >
        <MaterialCommunityIcons 
          name={customIcon as any || "map-marker"} 
          size={getMarkerSize() - 10} 
          color={getMarkerColor()} 
        />
      </View>
      {isSelected && (
        <View className="bg-white px-2 py-1 rounded-lg shadow-lg mt-1">
          <Text className="text-xs font-medium text-gray-800">{title}</Text>
          {description && (
            <Text className="text-xs text-gray-500">{description}</Text>
          )}
        </View>
      )}
    </View>
  );

  const renderMarker = () => {
    switch (type) {
      case 'user':
        return renderUserMarker();
      case 'friend':
        return renderFriendMarker();
      case 'place':
        return renderPlaceMarker();
      case 'event':
        return renderEventMarker();
      default:
        return renderCustomMarker();
    }
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={{
        transform: [{ scale: isPressed ? 0.95 : 1 }]
      }}
    >
      {renderMarker()}
    </Pressable>
  );
}
