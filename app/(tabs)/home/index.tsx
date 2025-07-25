import { View, Text, ScrollView, Image } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white px-4 py-6 space-y-6">
      {/* Greeting Section */}
      <View>
        <Text className="text-2xl font-semibold">Hello, Ajit 👋</Text>
        <Text className="text-gray-500">Welcome back!</Text>
      </View>

      {/* Quick Stats */}
      <View className="flex-row justify-between bg-gray-100 p-4 rounded-xl">
        <View className="items-center">
          <Ionicons name="location" size={24} color="#4B5563" />
          <Text className="text-xs mt-1 text-gray-500">Places Visited</Text>
          <Text className="text-lg font-semibold">12</Text>
        </View>
        <View className="items-center">
          <Ionicons name="people" size={24} color="#4B5563" />
          <Text className="text-xs mt-1 text-gray-500">Friends Nearby</Text>
          <Text className="text-lg font-semibold">4</Text>
        </View>
        <View className="items-center">
          <Ionicons name="notifications" size={24} color="#4B5563" />
          <Text className="text-xs mt-1 text-gray-500">Alerts</Text>
          <Text className="text-lg font-semibold">3</Text>
        </View>
      </View>

      {/* Recent Locations */}
      <View>
        <Text className="text-lg font-medium mb-2">Recent Locations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
          {["Park", "Cafe", "Mall", "Station"].map((place, i) => (
            <View key={i} className="w-32 h-32 bg-gray-100 rounded-xl p-3 justify-between">
              <Text className="font-semibold">{place}</Text>
              <Text className="text-xs text-gray-500">2 km away</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Suggested Friends */}
      <View>
        <Text className="text-lg font-medium mb-2">People You May Know</Text>
        <View className="space-y-3">
          {[1, 2].map((id) => (
            <View key={id} className="flex-row items-center justify-between bg-gray-100 p-3 rounded-xl">
              <View className="flex-row items-center space-x-3">
                <Image
                  source={{ uri: `https://i.pravatar.cc/150?img=${id}` }}
                  className="w-10 h-10 rounded-full"
                />
                <Text className="font-medium">User {id}</Text>
              </View>
              <Link href="/friends/profile">
                <Text className="text-blue-500">View</Text>
              </Link>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
