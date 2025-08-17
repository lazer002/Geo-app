import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router"; // 👈 router for navigation
import FriendCard from "../../components/FriendCard";
import Header from "../../components/Header";

const friends: Array<{
  id: number;
  name: string;
  status: 'Online' | 'Offline' | 'Away' | 'Busy';
  avatar: string;
  lastMessage: string;
  lastSeen: string;
  distance: string;
  isFavorite?: boolean;
  mutualFriends: number;
}> = [
  { id: 1, name: "Alex", status: "Online", avatar: "https://i.pravatar.cc/150?img=1", lastMessage: "See you soon!", lastSeen: "2 min ago", distance: "0.5 km away", isFavorite: true, mutualFriends: 12 },
  { id: 2, name: "Sasha", status: "Offline", avatar: "https://i.pravatar.cc/150?img=2", lastMessage: "Sent you the file.", lastSeen: "1 hour ago", distance: "2.1 km away", mutualFriends: 8 },
  { id: 3, name: "Jordan", status: "Online", avatar: "https://i.pravatar.cc/150?img=3", lastMessage: "🔥🔥🔥", lastSeen: "Just now", distance: "1.3 km away", isFavorite: true, mutualFriends: 15 },
  { id: 4, name: "Sam", status: "Away", avatar: "https://i.pravatar.cc/150?img=4", lastMessage: "Let's catch up!", lastSeen: "30 min ago", distance: "3.7 km away", mutualFriends: 5 },
  { id: 5, name: "Maya", status: "Busy", avatar: "https://i.pravatar.cc/150?img=5", lastMessage: "In a meeting", lastSeen: "15 min ago", distance: "0.8 km away", mutualFriends: 20 },
  { id: 6, name: "Ravi", status: "Online", avatar: "https://i.pravatar.cc/150?img=6", lastMessage: "Coffee later?", lastSeen: "Just now", distance: "1.9 km away", mutualFriends: 7 },
];

export default function FriendsScreen() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'online' | 'favorites'>('all');
  const router = useRouter();

  const filteredFriends = friends.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'online' && f.status === 'Online') ||
      (selectedFilter === 'favorites' && f.isFavorite);
    return matchesSearch && matchesFilter;
  });

  const onlineFriends = friends.filter(f => f.status === "Online");
  const favoriteFriends = friends.filter(f => f.isFavorite);

  const handleNotificationPress = () => {
    Alert.alert("Notifications", "You have 3 new notifications");
  };

  const openChat = (friend: typeof friends[0]) => {
    router.push({
      pathname: "/(modal)/chat/[id]",
      params: { id: friend.id.toString(), name: friend.name },
    });
  };

  const openProfile = (friend: typeof friends[0]) => {
    router.push({
      pathname: "/(modals)/friends/profile",
      params: { 
        id: friend.id.toString(),
        name: friend.name,
        lat: "28.6142",
        lng: "77.2024",
        avatar: friend.avatar
      },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        variant="friends"
        showSearch={true}
        onSearchChange={setSearch}
        onNotificationPress={handleNotificationPress}
      />

      <ScrollView className="flex-1 px-4 py-4 space-y-6">

        {/* Filter Tabs */}
        <View className="flex-row space-x-2 mb-4">
          {[
            { key: 'all', label: 'All', count: friends.length },
            { key: 'online', label: 'Online', count: onlineFriends.length },
            { key: 'favorites', label: 'Favorites', count: favoriteFriends.length }
          ].map((filter) => (
            <Pressable
              key={filter.key}
              onPress={() => setSelectedFilter(filter.key as any)}
              className={`px-4 py-2 rounded-full flex-row items-center space-x-1 ${selectedFilter === filter.key ? 'bg-blue-500' : 'bg-gray-100'}`}
            >
              <Text className={`text-sm font-medium ${selectedFilter === filter.key ? 'text-white' : 'text-gray-600'}`}>{filter.label}</Text>
              <View className={`px-2 py-0.5 rounded-full ${selectedFilter === filter.key ? 'bg-blue-400' : 'bg-gray-200'}`}>
                <Text className={`text-xs ${selectedFilter === filter.key ? 'text-white' : 'text-gray-500'}`}>{filter.count}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Online Now */}
        {onlineFriends.length > 0 && selectedFilter === 'all' && (
          <View>
            <Text className="font-semibold text-base mb-3 text-gray-700">Online Now</Text>
            <FlatList
              horizontal
              data={onlineFriends}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              className="mb-4"
              renderItem={({ item }) => (
                <Pressable onPress={() => openProfile(item)} className="items-center mr-4">
                  <Image source={{ uri: item.avatar }} className="w-14 h-14 rounded-full border-2 border-green-500" />
                  <Text className="text-xs mt-1 font-medium">{item.name}</Text>
                  <Text className="text-xs text-green-600">{item.status}</Text>
                </Pressable>
              )}
            />
          </View>
        )}

        {/* Friends List */}
        <View className="space-y-3">
          {filteredFriends.map((friend) => (
            <Pressable
              key={friend.id}
              onPress={() => openChat(friend)} // Entire row opens chat
            >
              <FriendCard
                friend={friend}
                showDistance={true}
                variant="default"
              />
            </Pressable>
          ))}
        </View>

        {filteredFriends.length === 0 && (
          <View className="items-center py-8">
            <Ionicons name="people-outline" size={64} color="#9CA3AF" />
            <Text className="text-gray-500 text-lg font-medium mt-4">No friends found</Text>
            <Text className="text-gray-400 text-sm text-center mt-2">
              Try adjusting your search or filters
            </Text>
          </View>
        )}

      </ScrollView>
    </View>
  );
}
