import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Image } from "expo-image";
import { SpotrColors } from "@/constants/spotr-theme";
import styles from "./styles";

type Level = "beginner" | "intermediate" | "pro";

const DEFAULT_GYMS = ["Equinox - Kensington", "Third Space - Soho"];

const PROMPTS = [
  {
    key: "1",
    label: "PROMPT ONE",
    question: "My non-negotiable gym rule is...",
    defaultAnswer: "Always re-rack the weights and wipe down the bench.",
  },
  {
    key: "2",
    label: "PROMPT TWO",
    question: "The song that always gets one more rep out of me is...",
    defaultAnswer: "Anything with a heavy baseline before leg day.",
  },
  {
    key: "3",
    label: "PROMPT THREE",
    question: "After a great session I usually...",
    defaultAnswer: "Stretch for ten minutes and grab an electrolyte drink.",
  },
];

export default function ProfileScreen() {
  const [radiusMi, setRadiusMi] = useState(25);
  const [trackW, setTrackW] = useState(0);

  const [level, setLevel] = useState<Level>("intermediate");

  const [gymQuery, setGymQuery] = useState("");
  const [gyms, setGyms] = useState<string[]>(DEFAULT_GYMS);

  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    Object.fromEntries(PROMPTS.map((p) => [p.key, p.defaultAnswer])),
  );

  const ratio = (radiusMi - 1) / 99;
  const thumbX =
    trackW > 0 ? Math.min(trackW - 24, Math.max(0, ratio * (trackW - 24))) : 0;

  const AVATAR_URI =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop";

  return (
    <View style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.avatarWrap}>
          <Image source={{ uri: AVATAR_URI }} style={styles.avatar} />
        </Pressable>

        {/* Workout region */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <MaterialIcons name="place" size={22} color={SpotrColors.brown} />
            <Text style={styles.cardTitle}>Workout region</Text>

            <View style={styles.milesBadge}>
              <Text style={styles.milesBadgeText}>{radiusMi} miles</Text>
            </View>
          </View>

          <Pressable
            style={styles.sliderTouch}
            onLayout={(e) => setTrackW(e.nativeEvent.layout.width)}
            onPress={(e) => {
              const x = e.nativeEvent.locationX;
              setRadiusMi(
                Math.round(1 + Math.min(1, Math.max(0, x / trackW)) * 99),
              );
            }}
          >
            <View style={styles.sliderGroove} />
            <View
              style={[styles.sliderFillBar, { width: `${ratio * 100}%` }]}
            />
            <View style={[styles.sliderThumb, { left: thumbX }]} />
          </Pressable>
        </View>

        {/* Fitness level */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fitness level</Text>

          {(["beginner", "intermediate", "pro"] as const).map((opt) => (
            <Pressable
              key={opt}
              style={[styles.radioRow, level === opt && styles.radioRowActive]}
              onPress={() => setLevel(opt)}
            >
              <Text style={styles.radioLabel}>{opt}</Text>
            </Pressable>
          ))}
        </View>

        {/* Gyms */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Gym affiliations</Text>

          <TextInput
            style={styles.searchInput}
            value={gymQuery}
            onChangeText={setGymQuery}
            placeholder="Search gym..."
          />

          {gyms.map((g) => (
            <Text key={g}>{g}</Text>
          ))}
        </View>

        {/* Prompts */}
        {PROMPTS.map((p) => (
          <View key={p.key} style={styles.card}>
            <Text style={styles.promptQuestion}>{p.question}</Text>

            <TextInput
              style={styles.promptInput}
              multiline
              value={answers[p.key]}
              onChangeText={(t) => setAnswers((a) => ({ ...a, [p.key]: t }))}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
