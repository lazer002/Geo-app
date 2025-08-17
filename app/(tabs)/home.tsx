import { Ionicons } from "@expo/vector-icons";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import FriendCard from "../../components/FriendCard";
import Header from "../../components/Header";

const recentLocations = [
  { name: "Central Park", distance: "0.5 km", icon: "leaf", color: "#10B981" },
  { name: "Coffee Shop", distance: "1.2 km", icon: "cafe", color: "#F59E0B" },
  { name: "Shopping Mall", distance: "2.1 km", icon: "bag", color: "#8B5CF6" },
  { name: "Train Station", distance: "0.8 km", icon: "train", color: "#EF4444" },
];

const suggestedFriends = [
  { 
    id: 3, 
    name: "Maya", 
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "Online" as const,
    lastMessage: "Hey, how are you?",
    lastSeen: "Just now",
    distance: "0.8 km away",
    mutualFriends: 8
  },
  { 
    id: 4, 
    name: "Ravi", 
    avatar: "https://i.pravatar.cc/150?img=4",
    status: "Online" as const,
    lastMessage: "Want to grab coffee?",
    lastSeen: "5 min ago",
    distance: "1.2 km away",
    mutualFriends: 12
  },
];

const recentChats = [
  { id: 5, name: "Aisha", message: "Hey, meet you at 6?", avatar: "https://i.pravatar.cc/150?img=5", time: "2 min ago" },
  { id: 6, name: "John", message: "Location shared ✅", avatar: "https://i.pravatar.cc/150?img=6", time: "15 min ago" },
];

const missedCalls = [
  { id: 7, name: "Nina", time: "Today, 11:42 AM", avatar: "https://i.pravatar.cc/150?img=7" },
];

export default function HomeScreen() {
  const handleNotificationPress = () => {
    Alert.alert("Notifications", "You have 3 new notifications");
  };

  const handleProfilePress = () => {
    Alert.alert("Profile", "Profile settings coming soon!");
  };

  return (
    <View className="flex-1 bg-white">
      <Header 
        variant="home" 
        showSearch={true}
        onNotificationPress={handleNotificationPress}
        onProfilePress={handleProfilePress}
      />
      
      <ScrollView className="flex-1 px-4 py-4 space-y-6">
        
        {/* Quick Stats */}
        <View className="flex-row justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl shadow-sm border border-blue-100">
          <View className="items-center">
            <View className="bg-blue-100 p-2 rounded-full mb-2">
              <Ionicons name="location" size={24} color="#007AFF" />
            </View>
            <Text className="text-xs text-gray-500">Places</Text>
            <Text className="font-bold text-lg text-blue-600">12</Text>
          </View>
          <View className="items-center">
            <View className="bg-green-100 p-2 rounded-full mb-2">
              <Ionicons name="people" size={24} color="#10B981" />
            </View>
            <Text className="text-xs text-gray-500">Nearby</Text>
            <Text className="font-bold text-lg text-green-600">4</Text>
          </View>
          <View className="items-center">
            <View className="bg-orange-100 p-2 rounded-full mb-2">
              <Ionicons name="notifications" size={24} color="#F59E0B" />
            </View>
            <Text className="text-xs text-gray-500">Alerts</Text>
            <Text className="font-bold text-lg text-orange-600">3</Text>
          </View>
        </View>

        {/* Recent Locations */}
        <View>
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-semibold">Recent Locations</Text>
            <Pressable className="bg-blue-50 px-3 py-1 rounded-full">
              <Text className="text-blue-600 text-sm font-medium">View All</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
            {recentLocations.map((place, i) => (
              <Pressable key={i} className="w-36 h-36 bg-white rounded-xl p-4 justify-between shadow-sm border border-gray-100">
                <View className="flex-row justify-between items-start">
                  <View className="bg-gray-100 p-2 rounded-lg">
                    <Ionicons name={place.icon as any} size={20} color={place.color} />
                  </View>
                  <Ionicons name="navigate" size={16} color="#6B7280" />
                </View>
                <View>
                  <Text className="font-semibold text-sm">{place.name}</Text>
                  <Text className="text-xs text-gray-500">{place.distance}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Suggested Friends */}
        <View>
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-semibold">Suggested Friends</Text>
            <Pressable className="bg-green-50 px-3 py-1 rounded-full">
              <Text className="text-green-600 text-sm font-medium">Add All</Text>
            </Pressable>
          </View>
          <View className="space-y-3">
            {suggestedFriends.map((friend) => (
              <FriendCard
                key={friend.id}
                friend={friend}
                showDistance={true}
                variant="compact"
              />
            ))}
          </View>
        </View>

        {/* Recent Chats */}
        <View>
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-semibold">Recent Chats</Text>
            <Pressable className="bg-purple-50 px-3 py-1 rounded-full">
              <Text className="text-purple-600 text-sm font-medium">View All</Text>
            </Pressable>
          </View>
          {recentChats.map((chat) => (
            <Pressable key={chat.id} className="flex-row items-center justify-between bg-white p-3 rounded-xl border border-gray-100 mb-2">
              <View className="flex-row items-center space-x-3">
                <Image source={{ uri: chat.avatar }} className="w-12 h-12 rounded-full" />
                <View>
                  <Text className="font-semibold text-base">{chat.name}</Text>
                  <Text className="text-sm text-gray-500">{chat.message}</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-xs text-gray-400">{chat.time}</Text>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </View>
            </Pressable>
          ))}
        </View>

        {/* Missed Calls */}
        <View>
          <Text className="text-lg font-semibold mb-3">Missed Calls</Text>
          {missedCalls.map((call) => (
            <Pressable key={call.id} className="flex-row items-center justify-between bg-red-50 p-4 rounded-xl border border-red-100">
              <View className="flex-row items-center space-x-3">
                <Image source={{ uri: call.avatar }} className="w-12 h-12 rounded-full" />
                <View>
                  <Text className="font-semibold text-base">{call.name}</Text>
                  <Text className="text-sm text-red-500">{call.time}</Text>
                </View>
              </View>
              <View className="flex-row space-x-2">
                <Pressable className="bg-red-500 p-2 rounded-full">
                  <Ionicons name="call" size={16} color="white" />
                </Pressable>
                <Pressable className="bg-gray-200 p-2 rounded-full">
                  <Ionicons name="chatbubble" size={16} color="#6B7280" />
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
