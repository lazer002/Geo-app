import { View, Text, ScrollView, Switch } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6 space-y-6">
      <Text className="text-2xl font-bold mb-4">Settings</Text>

      {/* Notification Toggle */}
      <View className="flex-row justify-between items-center bg-gray-100 p-4 rounded-xl">
        <View>
          <Text className="font-medium">Notifications</Text>
          <Text className="text-gray-500 text-sm">Enable app notifications</Text>
        </View>
        <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
      </View>

      {/* Navigation Links */}
      <View className="bg-gray-100 rounded-xl">
        <Link href="/settings/preferences" asChild>
          <View className="flex-row justify-between items-center p-4 border-b border-gray-300">
            <Text className="font-medium">Preferences</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </View>
        </Link>

        <View className="flex-row justify-between items-center p-4">
          <Text className="font-medium text-red-500">Logout</Text>
        </View>
      </View>
    </ScrollView>
  );
}
