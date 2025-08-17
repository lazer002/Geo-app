import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Header from "../../components/Header";
import MapMarker from "../../components/MapMarker";

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapType, setMapType] = useState('standard');

  // Sample friends data for map
  const nearbyFriends = [
    {
      id: 1,
      name: "Alex",
      coordinate: { latitude: 28.6142, longitude: 77.2024 },
      status: "online" as const,
      avatar: "https://i.pravatar.cc/150?img=1",
      distance: "0.5 km"
    },
    {
      id: 2,
      name: "Jordan",
      coordinate: { latitude: 28.6132, longitude: 77.2014 },
      status: "online" as const,
      avatar: "https://i.pravatar.cc/150?img=3",
      distance: "1.2 km"
    },
    {
      id: 3,
      name: "Maya",
      coordinate: { latitude: 28.6152, longitude: 77.2034 },
      status: "away" as const,
      avatar: "https://i.pravatar.cc/150?img=5",
      distance: "0.8 km"
    }
  ];

  // Sample places data
  const nearbyPlaces = [
    {
      id: 1,
      name: "Central Park",
      coordinate: { latitude: 28.6162, longitude: 77.2044 },
      type: "park",
      distance: "0.3 km"
    },
    {
      id: 2,
      name: "Coffee Shop",
      coordinate: { latitude: 28.6122, longitude: 77.2004 },
      type: "cafe",
      distance: "0.7 km"
    }
  ];

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Location permission denied.");
          setLoading(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
        setRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setLoading(false);
      } catch (err) {
        setErrorMsg("Error getting location.");
        setLoading(false);
      }
    })();
  }, []);

  const handleNotificationPress = () => {
    Alert.alert("Notifications", "You have 2 new notifications");
  };

  const handleProfilePress = () => {
    Alert.alert("Profile", "Profile settings coming soon!");
  };

  const handleMarkerPress = (marker: any) => {
    setSelectedMarker(marker);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="text-gray-500 mt-3 text-base">Getting your location...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.loadingContainer}>
        <Text className="text-red-500 font-semibold">{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header 
        variant="map" 
        showSearch={true}
        onNotificationPress={handleNotificationPress}
        onProfilePress={handleProfilePress}
      />
      
      <MapView 
        style={StyleSheet.absoluteFillObject} 
        region={region}
        mapType={mapType}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {/* User's location marker */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
          >
            <MapMarker
              type="user"
              title="You"
              coordinate={location}
              userAvatar="https://i.pravatar.cc/150?img=8"
              status="online"
            />
          </Marker>
        )}

        {/* Friends markers */}
        {nearbyFriends.map((friend) => (
          <Marker
            key={`friend-${friend.id}`}
            coordinate={friend.coordinate}
            title={friend.name}
            onPress={() => handleMarkerPress(friend)}
          >
            <MapMarker
              type="friend"
              title={friend.name}
              coordinate={friend.coordinate}
              userAvatar={friend.avatar}
              status={friend.status}
              distance={friend.distance}
              isSelected={selectedMarker?.id === friend.id}
            />
          </Marker>
        ))}

        {/* Places markers */}
        {nearbyPlaces.map((place) => (
          <Marker
            key={`place-${place.id}`}
            coordinate={place.coordinate}
            title={place.name}
            onPress={() => handleMarkerPress(place)}
          >
            <MapMarker
              type="place"
              title={place.name}
              coordinate={place.coordinate}
              description={place.distance}
              isSelected={selectedMarker?.id === place.id}
            />
          </Marker>
        ))}
      </MapView>

      {/* Map Controls */}
      <View className="absolute top-20 right-4 space-y-2">
        <Pressable 
          onPress={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
          className="bg-white p-3 rounded-full shadow-lg"
        >
          <Ionicons 
            name={mapType === 'standard' ? 'map' : 'map-outline'} 
            size={20} 
            color="#374151" 
          />
        </Pressable>
        <Pressable 
          onPress={() => Alert.alert("Layers", "Map layers coming soon!")}
          className="bg-white p-3 rounded-full shadow-lg"
        >
          <Ionicons name="layers" size={20} color="#374151" />
        </Pressable>
      </View>

      {/* Selected Marker Info */}
      {selectedMarker && (
        <View className="absolute bottom-20 left-4 right-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="font-bold text-lg">{selectedMarker.name}</Text>
              <Text className="text-gray-500">{selectedMarker.distance}</Text>
            </View>
            <Pressable 
              onPress={() => setSelectedMarker(null)}
              className="bg-gray-100 p-2 rounded-full"
            >
              <Ionicons name="close" size={16} color="#6B7280" />
            </Pressable>
          </View>
          <View className="flex-row space-x-2 mt-3">
            <Pressable className="flex-1 bg-blue-500 py-2 rounded-lg">
              <Text className="text-white text-center font-medium">Navigate</Text>
            </Pressable>
            <Pressable className="flex-1 bg-gray-100 py-2 rounded-lg">
              <Text className="text-gray-700 text-center font-medium">Details</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
