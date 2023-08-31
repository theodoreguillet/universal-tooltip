import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { CreateTooltip } from "./create-tooltip";
// import * as Tooltip from "universal-tooltip";
export function ModalScreen() {
  const [open, setOpen] = useState(false);

  return (
    <View className="flex-1 bg-gray-700 items-center pt-40">
      <Text className="font-bold text-white text-lg"></Text>
      <CreateTooltip
        title="Modal Screeen tooltip"
        text="A very long long long long long text tooltip"
        side="top"
        maxWidth={200}
      />
    </View>
  );
}
