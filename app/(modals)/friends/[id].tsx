import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import MapView, { Marker } from "react-native-maps";
import MapMarker from "../../../components/MapMarker";

export default function FriendProfileScreen() {
  const { id, name, lat, lng, avatar } = useLocalSearchParams();
  const router = useRouter();

  const latitude = parseFloat(lat as string);
  const longitude = parseFloat(lng as string);

  const callUser = () => {
    Linking.openURL(`tel:+91XXXXXXXXXX`);
  };

  const videoCallUser = () => {
    Alert.alert("Video Call", `Starting video call with ${name}...`);
  };

  const messageUser = () => {
    router.push({
      pathname: "/(modals)/chat/[id]",
      params: { id, name, avatar },
    });
  };

  const shareLocation = () => {
    Alert.alert("Share Location", "Location sharing feature coming soon!");
  };

  const addToFavorites = () => {
    Alert.alert("Added to Favorites", `${name} has been added to your favorites!`);
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Back Button */}
      <View className="absolute top-12 left-4 z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-white/80 p-2 rounded-full shadow-md"
        >
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
      </View>

      {/* Header Section */}
      <View className="items-center pt-16 pb-6">
        <Image
          source={{ uri: avatar as string }}
          className="w-32 h-32 rounded-full mb-3 border-4 border-white shadow-xl"
        />
        <Text className="text-2xl font-bold text-gray-900">{name}</Text>
        <Text className="text-gray-500 text-sm">Online • 0.5 km away</Text>
        <Text className="text-gray-400 text-xs mt-1">Friend ID: {id}</Text>
      </View>

      {/* Quick Actions with Blur */}
      <BlurView
        intensity={60}
        tint="light"
        className="flex-row justify-around items-center mx-4 rounded-2xl py-4 shadow-md"
      >
        <Pressable onPress={callUser} className="items-center space-y-1">
          <View className="bg-blue-100 p-3 rounded-full">
            <Ionicons name="call" size={22} color="#007AFF" />
          </View>
          <Text className="text-xs text-gray-600">Call</Text>
        </Pressable>

        <Pressable onPress={videoCallUser} className="items-center space-y-1">
          <View className="bg-pink-100 p-3 rounded-full">
            <Ionicons name="videocam" size={22} color="#EC4899" />
          </View>
          <Text className="text-xs text-gray-600">Video</Text>
        </Pressable>

        <Pressable onPress={messageUser} className="items-center space-y-1">
          <View className="bg-green-100 p-3 rounded-full">
            <Ionicons name="chatbubbles" size={22} color="#10B981" />
          </View>
          <Text className="text-xs text-gray-600">Chat</Text>
        </Pressable>

        <Pressable onPress={shareLocation} className="items-center space-y-1">
          <View className="bg-purple-100 p-3 rounded-full">
            <Ionicons name="location" size={22} color="#8B5CF6" />
          </View>
          <Text className="text-xs text-gray-600">Share</Text>
        </Pressable>

        <Pressable onPress={addToFavorites} className="items-center space-y-1">
          <View className="bg-red-100 p-3 rounded-full">
            <Ionicons name="heart" size={22} color="#EF4444" />
          </View>
          <Text className="text-xs text-gray-600">Fav</Text>
        </Pressable>
      </BlurView>

      {/* Map Section */}
      <View
        style={{ flex: 1, marginTop: 12, borderRadius: 20, overflow: "hidden" }}
      >
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title={name as string}
            description="Current Location"
          >
            <MapMarker
              type="friend"
              title={name as string}
              coordinate={{ latitude, longitude }}
              userAvatar={avatar as string}
              status="online"
              distance="0.5 km"
            />
          </Marker>
        </MapView>
      </View>

      {/* Bottom Info */}
      <BlurView
        intensity={80}
        tint="light"
        className="mx-4 mb-4 rounded-2xl overflow-hidden shadow-lg"
      >
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="font-semibold text-base">Location Details</Text>
            <Ionicons name="information-circle" size={20} color="#6B7280" />
          </View>
          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Distance</Text>
              <Text className="font-medium">0.5 km away</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Last Updated</Text>
              <Text className="font-medium">2 minutes ago</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Status</Text>
              <Text className="font-medium text-green-600">Online</Text>
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
}
