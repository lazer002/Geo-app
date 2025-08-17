import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Switch, Text, View } from "react-native";
import Header from "../../components/Header";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [locationSharingEnabled, setLocationSharingEnabled] = useState(true);
  const [autoLocationEnabled, setAutoLocationEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const handleNotificationPress = () => {
    Alert.alert("Notifications", "You have 1 new notification");
  };

  const handleProfilePress = () => {
    Alert.alert("Profile", "Profile settings coming soon!");
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => Alert.alert("Logged out") }
      ]
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Header 
        variant="default"
        title="Settings"
        onNotificationPress={handleNotificationPress}
        onProfilePress={handleProfilePress}
      />
      
      <ScrollView className="flex-1 px-4 py-4 space-y-6">

        {/* 🔔 Notification Settings */}
        <View className="bg-gray-100 rounded-2xl p-4 space-y-4">
          <View className="flex-row items-center space-x-2 mb-2">
            <Ionicons name="notifications" size={20} color="#F59E0B" />
            <Text className="text-lg font-semibold">Notifications</Text>
          </View>

          <View className="space-y-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-medium">App Notifications</Text>
                <Text className="text-gray-500 text-sm">Receive push updates</Text>
              </View>
              <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
            </View>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-medium">Sound</Text>
                <Text className="text-gray-500 text-sm">Play notification sounds</Text>
              </View>
              <Switch value={soundEnabled} onValueChange={setSoundEnabled} />
            </View>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-medium">Vibration</Text>
                <Text className="text-gray-500 text-sm">Vibrate on notifications</Text>
              </View>
              <Switch value={vibrationEnabled} onValueChange={setVibrationEnabled} />
            </View>
          </View>
        </View>

        {/* 🎨 Appearance */}
        <View className="bg-gray-100 rounded-2xl p-4 space-y-4">
          <View className="flex-row items-center space-x-2 mb-2">
            <Ionicons name="color-palette" size={20} color="#8B5CF6" />
            <Text className="text-lg font-semibold">Appearance</Text>
          </View>

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
          <View className="flex-row items-center space-x-2 mb-2">
            <Ionicons name="shield-checkmark" size={20} color="#10B981" />
            <Text className="text-lg font-semibold">Privacy & Location</Text>
          </View>

          <View className="space-y-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-medium">Location Sharing</Text>
                <Text className="text-gray-500 text-sm">Allow others to see your location</Text>
              </View>
              <Switch value={locationSharingEnabled} onValueChange={setLocationSharingEnabled} />
            </View>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-medium">Auto Location</Text>
                <Text className="text-gray-500 text-sm">Update location automatically</Text>
              </View>
              <Switch value={autoLocationEnabled} onValueChange={setAutoLocationEnabled} />
            </View>

            <Link href="/settings/blocked-users" asChild>
              <Pressable className="flex-row justify-between items-center">
                <Text className="font-medium">Blocked Users</Text>
                <Ionicons name="chevron-forward" size={20} color="gray" />
              </Pressable>
            </Link>
          </View>
        </View>

        {/* 👤 Account Section */}
        <View className="bg-gray-100 rounded-2xl p-4 space-y-2">
          <View className="flex-row items-center space-x-2 mb-3">
            <Ionicons name="person" size={20} color="#007AFF" />
            <Text className="text-lg font-semibold">Account</Text>
          </View>

          <Link href="/settings/preferences" asChild>
            <Pressable className="flex-row justify-between items-center py-3 border-b border-gray-300">
              <View className="flex-row items-center space-x-3">
                <Ionicons name="settings" size={18} color="#6B7280" />
                <Text className="font-medium">Preferences</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="gray" />
            </Pressable>
          </Link>

          <Link href="/settings/security" asChild>
            <Pressable className="flex-row justify-between items-center py-3 border-b border-gray-300">
              <View className="flex-row items-center space-x-3">
                <Ionicons name="shield-checkmark" size={18} color="#6B7280" />
                <Text className="font-medium">Security</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="gray" />
            </Pressable>
          </Link>

          <Link href="/settings/delete-account" asChild>
            <Pressable className="flex-row justify-between items-center py-3">
              <View className="flex-row items-center space-x-3">
                <MaterialIcons name="delete-outline" size={18} color="#EF4444" />
                <Text className="text-red-500 font-medium">Delete Account</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#EF4444" />
            </Pressable>
          </Link>
        </View>

        {/* 🚪 Logout */}
        <View className="bg-gray-100 rounded-2xl">
          <Pressable 
            onPress={handleLogout}
            className="flex-row justify-between items-center p-4"
          >
            <View className="flex-row items-center space-x-3">
              <Feather name="log-out" size={18} color="#EF4444" />
              <Text className="font-medium text-red-500">Logout</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#EF4444" />
          </Pressable>
        </View>

        {/* App Info */}
        <View className="bg-gray-50 rounded-2xl p-4">
          <View className="items-center space-y-2">
            <Text className="text-gray-500 text-sm">Geo App</Text>
            <Text className="text-gray-400 text-xs">Version 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
