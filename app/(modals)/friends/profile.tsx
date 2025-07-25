import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

export default function ProfileScreen() {
  const { id, name, lat, lng, avatar } = useLocalSearchParams();

  const latitude = parseFloat(lat as string);
  const longitude = parseFloat(lng as string);

  const callUser = () => {
    Linking.openURL(`tel:+91XXXXXXXXXX`);
  };

  const messageUser = () => {
    Linking.openURL(`sms:+91XXXXXXXXXX`);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="items-center pt-10 pb-4 bg-white shadow-sm border-b border-gray-100">
        <Image source={{ uri: avatar as string }} className="w-24 h-24 rounded-full mb-2" />
        <Text className="text-xl font-bold">{name}</Text>
        <Text className="text-gray-500 text-sm">Friend ID: {id}</Text>
      </View>

      {/* Map */}
      <View style={{ flex: 1 }}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title={name as string}
            description="Current Location"
          >
            <Ionicons name="location-sharp" size={38} color="#FF3B30" />
          </Marker>
        </MapView>
      </View>

      {/* Bottom Buttons */}
      <View className="flex-row justify-around items-center bg-white py-4 border-t border-gray-200">
        <Pressable
          onPress={callUser}
          className="flex-row items-center space-x-2 bg-blue-600 px-4 py-2 rounded-full"
        >
          <Ionicons name="call" size={18} color="white" />
          <Text className="text-white font-medium">Call</Text>
        </Pressable>

        <Pressable
          onPress={messageUser}
          className="flex-row items-center space-x-2 bg-green-600 px-4 py-2 rounded-full"
        >
          <Ionicons name="chatbubbles" size={18} color="white" />
          <Text className="text-white font-medium">Message</Text>
        </Pressable>
      </View>
    </View>
  );
}
