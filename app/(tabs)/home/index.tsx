import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";

const recentLocations = ["Park", "Cafe", "Mall", "Station"];
const suggestedFriends = [
  { id: 3, name: "Maya", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Ravi", avatar: "https://i.pravatar.cc/150?img=4" },
];
const recentChats = [
  { id: 5, name: "Aisha", message: "Hey, meet you at 6?", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 6, name: "John", message: "Location shared ✅", avatar: "https://i.pravatar.cc/150?img=6" },
];
const missedCalls = [
  { id: 7, name: "Nina", time: "Today, 11:42 AM", avatar: "https://i.pravatar.cc/150?img=7" },
];

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white px-4 py-6 space-y-6">
      
      {/* Greeting */}
      <View>
        <Text className="text-2xl font-semibold">Hello, Ajit 👋</Text>
        <Text className="text-gray-500">Here’s what’s happening now</Text>
      </View>

      {/* Quick Stats */}
      <View className="flex-row justify-between bg-gray-100 p-4 rounded-2xl shadow-sm">
        <View className="items-center">
          <Ionicons name="location" size={24} color="#007AFF" />
          <Text className="text-xs text-gray-500 mt-1">Places</Text>
          <Text className="font-bold text-base">12</Text>
        </View>
        <View className="items-center">
          <Ionicons name="people" size={24} color="#10B981" />
          <Text className="text-xs text-gray-500 mt-1">Nearby</Text>
          <Text className="font-bold text-base">4</Text>
        </View>
        <View className="items-center">
          <Ionicons name="notifications" size={24} color="#F59E0B" />
          <Text className="text-xs text-gray-500 mt-1">Alerts</Text>
          <Text className="font-bold text-base">3</Text>
        </View>
      </View>

      {/* Recent Locations */}
      <View>
        <Text className="text-lg font-semibold mb-2">Recent Locations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
          {recentLocations.map((place, i) => (
            <View key={i} className="w-32 h-32 bg-blue-50 rounded-xl p-3 justify-between shadow-sm">
              <Text className="font-semibold">{place}</Text>
              <Text className="text-xs text-gray-500">2 km away</Text>
              <Ionicons name="navigate" size={20} color="#007AFF" />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Suggested Friends */}
      <View>
        <Text className="text-lg font-semibold mb-2">Suggested Friends</Text>
        <View className="space-y-3">
          {suggestedFriends.map((friend) => (
            <View key={friend.id} className="flex-row items-center justify-between bg-gray-100 p-3 rounded-xl">
              <View className="flex-row items-center space-x-3">
                <Image source={{ uri: friend.avatar }} className="w-10 h-10 rounded-full" />
                <Text className="font-medium">{friend.name}</Text>
              </View>
              <Link
                href={{
                  pathname: "/friends/profile",
                  params: {
                    id: friend.id,
                    name: friend.name,
                    lat: "28.4935",
                    lng: "77.1472",
                    avatar: friend.avatar,
                  },
                }}
              >
                <Text className="text-blue-500 text-sm">View</Text>
              </Link>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Chats */}
      <View>
        <Text className="text-lg font-semibold mb-2">Recent Chats</Text>
        {recentChats.map((chat) => (
          <View key={chat.id} className="flex-row items-center justify-between bg-white p-3 border-b border-gray-100">
            <View className="flex-row items-center space-x-3">
              <Image source={{ uri: chat.avatar }} className="w-10 h-10 rounded-full" />
              <View>
                <Text className="font-medium">{chat.name}</Text>
                <Text className="text-xs text-gray-500">{chat.message}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#aaa" />
          </View>
        ))}
      </View>

      {/* Missed Calls */}
      <View>
        <Text className="text-lg font-semibold mb-2">Missed Calls</Text>
        {missedCalls.map((call) => (
          <View key={call.id} className="flex-row items-center justify-between bg-red-50 p-3 rounded-xl">
            <View className="flex-row items-center space-x-3">
              <Image source={{ uri: call.avatar }} className="w-10 h-10 rounded-full" />
              <View>
                <Text className="font-medium">{call.name}</Text>
                <Text className="text-xs text-red-500">{call.time}</Text>
              </View>
            </View>
            <MaterialIcons name="call-missed" size={24} color="#DC2626" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
