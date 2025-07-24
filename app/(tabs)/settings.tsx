import { View, Text, Switch } from "react-native";
import { useState } from "react";

export default function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-4">⚙️ Settings</Text>
      <View className="flex-row items-center">
        <Text className="mr-2 text-lg">Enable Dark Mode</Text>
        <Switch
          value={isEnabled}
          onValueChange={setIsEnabled}
        />
      </View>
    </View>
  );
}
