import { View, Text, ScrollView, Switch, Pressable } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [locationSharingEnabled, setLocationSharingEnabled] = useState(true);

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6 space-y-6">
      <Text className="text-2xl font-bold">Settings</Text>

      {/* 🔔 Notification Settings */}
      <View className="bg-gray-100 rounded-2xl p-4 space-y-4">
        <Text className="text-lg font-semibold">Notifications</Text>

        <View className="flex-row justify-between items-center">
          <View>
            <Text className="font-medium">App Notifications</Text>
            <Text className="text-gray-500 text-sm">Receive push updates</Text>
          </View>
          <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
        </View>
      </View>

      {/* 🎨 Appearance */}
      <View className="bg-gray-100 rounded-2xl p-4 space-y-4">
        <Text className="text-lg font-semibold">Appearance</Text>

        <View className="flex-row justify-between items-center">
          <View>
            <Text className="font-medium">Dark Mode</Text>
            <Text className="text-gray-500 text-sm">Reduce eye strain</Text>
          </View>
          <Switch value={darkModeEnabled} onValueChange={setDarkModeEnabled} />
        </View>
      </View>

      {/* 🔐 Privacy Settings */}
      <View className="bg-gray-100 rounded-2xl p-4 space-y-4">
        <Text className="text-lg font-semibold">Privacy</Text>

        <View className="flex-row justify-between items-center">
          <View>
            <Text className="font-medium">Location Sharing</Text>
            <Text className="text-gray-500 text-sm">Allow others to see your location</Text>
          </View>
          <Switch value={locationSharingEnabled} onValueChange={setLocationSharingEnabled} />
        </View>

        <Link href="/settings/blocked-users" asChild>
          <Pressable className="flex-row justify-between items-center mt-2">
            <Text className="font-medium">Blocked Users</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </Pressable>
        </Link>
      </View>

      {/* 👤 Account Section */}
      <View className="bg-gray-100 rounded-2xl p-4 space-y-2">
        <Text className="text-lg font-semibold mb-2">Account</Text>

        <Link href="/settings/preferences" asChild>
          <Pressable className="flex-row justify-between items-center py-3 border-b border-gray-300">
            <Text className="font-medium">Preferences</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </Pressable>
        </Link>

        <Link href="/settings/security" asChild>
          <Pressable className="flex-row justify-between items-center py-3 border-b border-gray-300">
            <Text className="font-medium">Security</Text>
            <Ionicons name="shield-checkmark" size={20} color="gray" />
          </Pressable>
        </Link>

        <Link href="/settings/delete-account" asChild>
          <Pressable className="flex-row justify-between items-center py-3">
            <Text className="text-red-500 font-medium">Delete Account</Text>
            <MaterialIcons name="delete-outline" size={20} color="#EF4444" />
          </Pressable>
        </Link>
      </View>

      {/* 🚪 Logout */}
      <View className="bg-gray-100 rounded-2xl">
        <Pressable className="flex-row justify-between items-center p-4">
          <Text className="font-medium text-red-500">Logout</Text>
          <Feather name="log-out" size={20} color="#EF4444" />
        </Pressable>
      </View>
    </ScrollView>
  );
}
