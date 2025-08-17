import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

interface NotificationCardProps {
  notification: {
    id: string;
    type: 'friend_request' | 'location_shared' | 'nearby_friend' | 'message' | 'call' | 'general';
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    avatar?: string;
    actionRequired?: boolean;
    data?: any;
  };
  onPress?: () => void;
  onAction?: () => void;
}

export default function NotificationCard({ 
  notification, 
  onPress, 
  onAction 
}: NotificationCardProps) {
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'friend_request':
        return { name: 'person-add', color: '#007AFF', bgColor: '#E3F2FD' };
      case 'location_shared':
        return { name: 'location', color: '#10B981', bgColor: '#ECFDF5' };
      case 'nearby_friend':
        return { name: 'people', color: '#8B5CF6', bgColor: '#F3E8FF' };
      case 'message':
        return { name: 'chatbubble', color: '#F59E0B', bgColor: '#FFFBEB' };
      case 'call':
        return { name: 'call', color: '#EF4444', bgColor: '#FEF2F2' };
      default:
        return { name: 'notifications', color: '#6B7280', bgColor: '#F3F4F6' };
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const icon = getNotificationIcon();

  return (
    <Pressable 
      onPress={onPress}
      className={`flex-row items-start space-x-3 p-4 rounded-xl border ${
        notification.isRead ? 'bg-white border-gray-100' : 'bg-blue-50 border-blue-200'
      }`}
    >
      {/* Avatar or Icon */}
      {notification.avatar ? (
        <Image source={{ uri: notification.avatar }} className="w-10 h-10 rounded-full" />
      ) : (
        <View 
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: icon.bgColor }}
        >
          <Ionicons name={icon.name as any} size={20} color={icon.color} />
        </View>
      )}

      {/* Content */}
      <View className="flex-1">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className={`font-semibold text-base ${
              notification.isRead ? 'text-gray-900' : 'text-blue-900'
            }`}>
              {notification.title}
            </Text>
            <Text className="text-gray-600 text-sm mt-1 leading-5">
              {notification.message}
            </Text>
          </View>
          
          {/* Unread indicator */}
          {!notification.isRead && (
            <View className="w-2 h-2 bg-blue-500 rounded-full ml-2" />
          )}
        </View>

        {/* Timestamp and Actions */}
        <View className="flex-row items-center justify-between mt-3">
          <Text className="text-gray-400 text-xs">
            {getTimeAgo(notification.timestamp)}
          </Text>
          
          {notification.actionRequired && (
            <View className="flex-row space-x-2">
              <Pressable 
                onPress={onAction}
                className="bg-blue-500 px-3 py-1 rounded-full"
              >
                <Text className="text-white text-xs font-medium">Accept</Text>
              </Pressable>
              <Pressable 
                onPress={onAction}
                className="bg-gray-200 px-3 py-1 rounded-full"
              >
                <Text className="text-gray-600 text-xs font-medium">Decline</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
