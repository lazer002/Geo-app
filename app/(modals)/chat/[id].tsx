import { View, Text, TextInput, FlatList, Pressable, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

export default function ChatScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();

  const [messages, setMessages] = useState([
    { id: "1", text: "Hey, how are you?", sender: "friend", time: "10:01" },
    { id: "2", text: "I’m good! What about you?", sender: "me", time: "10:02" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: `${Date.now()}-${Math.random()}`,
      text: input,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([newMsg, ...messages]);
    setInput("");
  };

  // Fake typing simulation
  useEffect(() => {
    if (messages[0]?.sender === "me") {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleLongPress = (msg: any) => {
    Haptics.selectionAsync();
    alert(`Options for: "${msg.text}"\n\n👉 Delete | Copy | Forward`);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
        <View className="flex-row items-center space-x-3">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </Pressable>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
            className="w-10 h-10 rounded-full"
          />
          <View>
            <Text className="font-bold text-lg">{name || `Friend ${id}`}</Text>
            <Text className="text-xs text-green-600">
              {isTyping ? "typing..." : "Online"}
            </Text>
          </View>
        </View>
        <View className="flex-row space-x-4">
          <Ionicons name="call" size={22} color="#007AFF" />
          <Ionicons name="videocam" size={22} color="#007AFF" />
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onLongPress={() => handleLongPress(item)}>
            <View
              className={`max-w-[75%] rounded-2xl px-4 py-2 m-2 shadow-sm ${
                item.sender === "me"
                  ? "self-end bg-blue-500"
                  : "self-start bg-white"
              }`}
            >
              <Text
                className={`${
                  item.sender === "me" ? "text-white" : "text-gray-900"
                }`}
              >
                {item.text}
              </Text>
              <Text
                className={`text-xs mt-1 ${
                  item.sender === "me" ? "text-blue-100" : "text-gray-400"
                }`}
              >
                {item.time} ✓
              </Text>
            </View>
          </Pressable>
        )}
      />

      {/* Input */}
      <View className="flex-row items-center bg-white border-t border-gray-200 px-3 py-2">
        <Ionicons name="happy-outline" size={24} color="gray" />
        <Ionicons name="attach" size={24} color="gray" className="ml-2" />
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
          className="flex-1 mx-2 px-3 py-2 bg-gray-100 rounded-full"
        />
        {input.trim() ? (
          <Pressable onPress={sendMessage}>
            <Ionicons name="send" size={26} color="#007AFF" />
          </Pressable>
        ) : (
          <Pressable>
            <MaterialIcons name="keyboard-voice" size={26} color="gray" />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
