import { View, Text, ScrollView, Image, Pressable, TextInput, FlatList } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const friends = [
  { id: 1, name: "Alex", status: "Online", avatar: "https://i.pravatar.cc/150?img=1", lastMessage: "See you soon!" },
  { id: 2, name: "Sasha", status: "Offline", avatar: "https://i.pravatar.cc/150?img=2", lastMessage: "Sent you the file." },
  { id: 3, name: "Jordan", status: "Online", avatar: "https://i.pravatar.cc/150?img=3", lastMessage: "🔥🔥🔥" },
  { id: 4, name: "Sam", status: "Offline", avatar: "https://i.pravatar.cc/150?img=4", lastMessage: "Let's catch up!" },
];

export default function FriendsScreen() {
  const [search, setSearch] = useState("");

  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const onlineFriends = friends.filter(f => f.status === "Online");

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6 space-y-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-2xl font-bold">Friends</Text>
        <Pressable className="flex-row items-center space-x-1 bg-blue-500 px-3 py-1 rounded-full">
          <Ionicons name="person-add" size={16} color="white" />
          <Text className="text-white text-sm">Add Friend</Text>
        </Pressable>
      </View>

      {/* Search Bar */}
      <View className="bg-gray-100 rounded-full px-4 py-2 flex-row items-center">
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          placeholder="Search friends"
          className="ml-2 flex-1 text-sm"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Online Now */}
      {onlineFriends.length > 0 && (
        <View>
          <Text className="font-semibold text-base mb-2 text-gray-700">Online Now</Text>
          <FlatList
            horizontal
            data={onlineFriends}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            className="mb-4"
            renderItem={({ item }) => (
              <View className="items-center mr-4">
                <Image source={{ uri: item.avatar }} className="w-14 h-14 rounded-full border-2 border-green-500" />
                <Text className="text-xs mt-1">{item.name}</Text>
              </View>
            )}
          />
        </View>
      )}

      {/* Friends List */}
      <View className="space-y-3">
        {filteredFriends.map((friend) => (
          <Pressable
            key={friend.id}
            className="flex-row items-center justify-between bg-white p-3 rounded-2xl border border-gray-200 shadow-sm"
          >
            <View className="flex-row items-center space-x-3">
              <Image source={{ uri: friend.avatar }} className="w-12 h-12 rounded-full" />
              <View>
                <Text className="font-semibold text-base">{friend.name}</Text>
                <Text
                  className={`text-xs ${
                    friend.status === "Online" ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {friend.lastMessage}
                </Text>
              </View>
            </View>
      <Link
  href={{
    pathname: "/(modals)/friends/profile",
    params: {
      id: friend.id.toString(),
      name: friend.name,
      lat: "28.6142",      // Replace with actual lat
      lng: "77.2024",      // Replace with actual lng
      avatar: friend.avatar,
    },
  }}
>
  <Text className="text-blue-500 text-sm">View</Text>
</Link>

          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
