import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import styles from "../../styles/welcomeStyles";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Spotr</Text>

      <Text style={styles.subtitle}>
        Find training partners, track gyms, and level up your fitness journey.
      </Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.primaryButton]}
          onPress={() => router.push("./login")}
        >
          <Text style={styles.primaryText}>Log In</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.secondaryButton]}
          onPress={() => router.push("./register")}
        >
          <Text style={styles.secondaryText}>Create Account</Text>
        </Pressable>
      </View>
    </View>
  );
}
