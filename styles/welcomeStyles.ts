import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F7F3EE",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 12,
    color: "#2C1E14",
  },

  subtitle: {
    fontSize: 16,
    color: "#6B5A4D",
    marginBottom: 40,
    lineHeight: 22,
  },

  buttonContainer: {
    gap: 12,
  },

  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  primaryButton: {
    backgroundColor: "#2C1E14",
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#2C1E14",
  },

  primaryText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },

  secondaryText: {
    color: "#2C1E14",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default styles;
