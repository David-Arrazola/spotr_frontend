import { StyleSheet } from "react-native";
import { SpotrColors, SpotrRadii, SpotrSpacing } from "@/constants/spotr-theme";
import { serifTitle } from "@/utils/fonts";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: SpotrColors.cream },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: SpotrSpacing.screenHorizontal,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: SpotrColors.surface,
    borderRadius: SpotrRadii.card,
    padding: SpotrSpacing.cardPadding,
    marginBottom: 16,
  },

  cardTitleRow: { flexDirection: "row", alignItems: "center" },
  cardTitle: { fontSize: 17, fontWeight: "700" },

  milesBadge: {
    backgroundColor: SpotrColors.sageSoft,
    paddingHorizontal: 10,
    borderRadius: SpotrRadii.pill,
  },

  milesBadgeText: { fontWeight: "700" },

  sliderTouch: { height: 40, justifyContent: "center" },
  sliderGroove: { height: 6, backgroundColor: SpotrColors.tan },
  sliderFillBar: {
    position: "absolute",
    height: 6,
    backgroundColor: SpotrColors.brown,
  },
  sliderThumb: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: SpotrColors.brown,
  },

  radioRow: { padding: 12 },
  radioRowActive: { backgroundColor: SpotrColors.sageSoft },

  radioLabel: { fontSize: 16 },

  searchInput: {
    borderWidth: 1,
    borderColor: SpotrColors.border,
    padding: 10,
  },

  promptQuestion: {
    fontFamily: serifTitle(),
    fontSize: 18,
    marginBottom: 10,
  },

  promptInput: {
    backgroundColor: SpotrColors.tanCard,
    padding: 12,
    minHeight: 80,
  },

  avatarWrap: {
    width: 130,
    height: 130,
    borderRadius: SpotrRadii.avatar,
    overflow: "hidden",
    alignSelf: "center",
    marginBottom: 13,
  },

  avatar: { width: "100%", height: "100%" },
});

export default styles;
