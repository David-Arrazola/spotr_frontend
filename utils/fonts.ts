import { Platform } from "react-native";

export function serifTitle() {
  return Platform.select({
    ios: "Georgia",
    android: "serif",
    default: "Georgia",
  });
}
