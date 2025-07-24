import { View, ScrollView, Text } from "react-native";
import { Link } from "expo-router";
import { Ionicons, MaterialIcons, Entypo, FontAwesome } from "@expo/vector-icons";
import '../../global.css'
export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-red px-4 pt-10 pb-20">
      {/* Header */}
      <View className="mb-6 items-center bg-red-700">
        <Ionicons name="person-circle" size={60} color="#1D4ED8" />
        <Text className="text-2xl font-bold mt-2 text-red-500">Welcome Back!</Text>
        <Text className="text-slate-500">Tracking your device and friends</Text>
      </View>

      {/* Device Summary */}
      <View className="bg-slate-100 p-4 rounded-2xl mb-6">
        <Text className="text-lg font-semibold mb-2 text-slate-700">📱 Device Summary</Text>
        <View className="flex-row justify-between mb-1">
          <Text className="text-slate-500">Battery:</Text>
          <Text className="text-slate-800">🔋 82%</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-slate-500">Network:</Text>
          <Text className="text-slate-800">📶 Connected (Wi-Fi)</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-slate-500">Location:</Text>
          <Text className="text-slate-800">📍 New Delhi</Text>
        </View>
      </View>

      {/* Friends Section */}
      <View className="mb-6">
        <Text className="text-lg font-semibold text-slate-700 mb-3">👥 Friends Nearby</Text>
        {[
          { name: "Ajay", status: "Online", icon: "user" },
          { name: "Neha", status: "Battery Low", icon: "battery-quarter" },
          { name: "Ravi", status: "Location Off", icon: "location-off" }
        ].map((friend, index) => (
          <View key={index} className="flex-row items-center justify-between bg-slate-50 py-3 px-4 rounded-xl mb-2">
            <View className="flex-row items-center">
              <FontAwesome name={friend.icon as any} size={20} color="#3B82F6" />
              <Text className="ml-3 text-base text-slate-700">{friend.name}</Text>
            </View>
            <Text className="text-slate-500 text-sm">{friend.status}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View className="mb-4">
        <Text className="text-lg font-semibold text-slate-700 mb-3">🚀 Quick Access</Text>
        <View className="flex-row justify-around">
          <Link
            href="/map"
            className="bg-blue-600 rounded-xl px-4 py-3 text-white text-center text-sm w-32"
          >
            🗺️ Map View
          </Link>
          <Link
            href="/settings"
            className="bg-gray-600 rounded-xl px-4 py-3 text-white text-center text-sm w-32"
          >
            ⚙️ Settings
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
