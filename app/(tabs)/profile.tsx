/**
 * Profile tab: “your account” settings that drive Explore — discovery filters (radius, level, gyms)
 * plus Hinge-style prompts. All data here is local state (mock); later you’ll load/save via API.
 */
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Image } from 'expo-image';
import { SpotrColors, SpotrRadii, SpotrSpacing } from '@/constants/spotr-theme';

/** Single-select fitness tier; maps to radio UI and would filter match ranking server-side. */
type Level = 'beginner' | 'intermediate' | 'pro';

/** Seed chips so the screen isn’t empty before search/autocomplete exists. */
const DEFAULT_GYMS = ['Equinox - Kensington', 'Third Space - Soho'];

/** Static prompt definitions; keys tie answers in `answers` state to the right card. */
const PROMPTS = [
  {
    key: '1',
    label: 'PROMPT ONE',
    question: 'My non-negotiable gym rule is...',
    defaultAnswer: 'Always re-rack the weights and wipe down the bench.',
  },
  {
    key: '2',
    label: 'PROMPT TWO',
    question: 'The song that always gets one more rep out of me is...',
    defaultAnswer: 'Anything with a heavy baseline before leg day.',
  },
  {
    key: '3',
    label: 'PROMPT THREE',
    question: 'After a great session I usually...',
    defaultAnswer: 'Stretch for ten minutes and grab an electrolyte drink.',
  },
];

/** Serif stack for headings to match the Spotr mock (Georgia on iOS, generic serif elsewhere). */
function serifTitle() {
  return Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'Georgia, serif',
  });
}

export default function ProfileScreen() {
  // --- Discovery: search radius (1–100 mi) ---
  const [radiusMi, setRadiusMi] = useState(25);
  /** Slider track width from layout; used to map tap X → miles and to position the thumb. */
  const [trackW, setTrackW] = useState(0);

  const [level, setLevel] = useState<Level>('intermediate');

  // --- Gyms: search box string + list of selected club names (chips) ---
  const [gymQuery, setGymQuery] = useState('');
  const [gyms, setGyms] = useState<string[]>(DEFAULT_GYMS);

  // --- Prompts: one string per PROMPTS[].key ---
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    Object.fromEntries(PROMPTS.map((p) => [p.key, p.defaultAnswer]))
  );

  /** Normalized 0–1 position of the thumb between 1 and 100 miles (inclusive range). */
  const ratio = (radiusMi - 1) / 99;
  /** Thumb’s left offset in px so it stays inside the track (24px-wide thumb). */
  const thumbX = trackW > 0 ? Math.min(trackW - 24, Math.max(0, ratio * (trackW - 24))) : 0;

  const AVATAR_URI =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop';

  return (
    <View style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        // Lets taps on chips/buttons register while the keyboard is open (e.g. after editing a prompt).
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        <Pressable style={styles.avatarWrap} hitSlop={8}>
          <Image source={{ uri: AVATAR_URI }} style={styles.avatar} contentFit="cover" />
        </Pressable>

        {/* ---------- Workout region: radius + map placeholders ---------- */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <MaterialIcons name="place" size={22} color={SpotrColors.brown} />
            <Text style={styles.cardTitle}>Workout region</Text>

            <View style={styles.milesBadge}>
              <Text style={styles.milesBadgeText}>{radiusMi} miles</Text>
            </View>
          </View>

          <View style={styles.sliderLabels}>
            <Text style={styles.sliderEdge}>1 mi</Text>
            <Text style={styles.sliderEdge}>100 mi</Text>
          </View>

          {/*
            Custom slider: tap anywhere on the bar to set miles. `onLayout` captures width;
            `locationX` / width gives a 0–1 ratio → mapped to 1..100. Thumb + fill are purely visual.
          */}
          <Pressable
            style={styles.sliderTouch}
            onLayout={(e) => setTrackW(e.nativeEvent.layout.width)}
            onPress={(e) => {
              const w = trackW;
              if (w <= 0) return;
              const x = e.nativeEvent.locationX;
              setRadiusMi(Math.round(1 + Math.min(1, Math.max(0, x / w)) * 99));
            }}>
            <View style={styles.sliderGroove} />
            <View style={[styles.sliderFillBar, { width: `${ratio * 100}%` }]} />
            <View style={[styles.sliderThumb, { left: thumbX }]} pointerEvents="none" />
          </Pressable>

          <View style={styles.mapPreview}>
            <MaterialIcons name="map" size={40} color={SpotrColors.textMuted} />
            <Text style={styles.mapHint}>Map preview</Text>
          </View>

          <Pressable style={styles.mapBtn} onPress={() => {}}>
            <Text style={styles.mapBtnText}>Center on Current Location</Text>
          </Pressable>
        </View>

        {/* ---------- Fitness level: exclusive choice (radio pattern) ---------- */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <MaterialIcons name="bolt" size={22} color={SpotrColors.brown} />
            <Text style={styles.cardTitle}>Fitness level</Text>
          </View>

          <Text style={styles.cardHelp}>
            We use this to prioritize compatible training partners in Explore.
          </Text>

          {(
            [
              { id: 'beginner' as const, label: 'Beginner' },
              { id: 'intermediate' as const, label: 'Intermediate' },
              { id: 'pro' as const, label: 'Pro / Athlete' },
            ] as const
          ).map((opt) => (
            <Pressable
              key={opt.id}
              style={[styles.radioRow, level === opt.id && styles.radioRowActive]}
              onPress={() => setLevel(opt.id)}>

              <View style={[styles.radioOuter, level === opt.id && styles.radioOuterActive]}>
                {level === opt.id ? <View style={styles.radioInner} /> : null}
              </View>

              <Text style={styles.radioLabel}>{opt.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* ---------- Gyms: search to append chips; X removes a gym ---------- */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <MaterialIcons name="fitness-center" size={22} color={SpotrColors.brown} />
            <Text style={styles.cardTitle}>Gym affiliations</Text>
          </View>

          <View style={styles.searchField}>
            <MaterialIcons name="search" size={20} color={SpotrColors.textMuted} />

            <TextInput
              style={styles.searchInput}
              placeholder="Search for your gym..."
              placeholderTextColor={SpotrColors.textMuted}
              value={gymQuery}
              onChangeText={setGymQuery}
              onSubmitEditing={() => {
                const q = gymQuery.trim();
                if (q) {
                  setGyms((g) => [...g, q]);
                  setGymQuery('');
                }
              }}
              returnKeyType="done"
            />
          </View>

          <View style={styles.chipWrap}>
            {gyms.map((g) => (
              <View key={g} style={styles.chip}>
                <Text style={styles.chipText}>{g}</Text>
                <Pressable
                  hitSlop={8}
                  onPress={() => setGyms((prev) => prev.filter((x) => x !== g))}>
                  <MaterialIcons name="close" size={18} color={SpotrColors.brown} />
                </Pressable>
              </View>
            ))}
          </View>

          <Pressable style={styles.addClub} onPress={() => {}}>
            <Text style={styles.addClubText}>+ Add New Club</Text>
          </Pressable>
        </View>

        {/* ---------- Profile prompts (copy from PROMPTS + answers state) ---------- */}
        <View style={styles.promptsHeader}>
          <Text style={styles.pageTitle}>Profile Prompts</Text>
          <View style={styles.completedBadge}>
            <Text style={styles.completedBadgeText}>3 of 3 Completed</Text>
          </View>
        </View>

        {PROMPTS.map((p) => (
          <View key={p.key} style={styles.card}>
            <Text style={styles.promptLabel}>{p.label}</Text>
            <Text style={styles.promptQuestion}>{p.question}</Text>

            <TextInput
              style={styles.promptInput}
              multiline
              value={answers[p.key]}
              onChangeText={(t) => setAnswers((a) => ({ ...a, [p.key]: t }))}
              placeholder="Write your answer..."
              placeholderTextColor={SpotrColors.textMuted}
            />
          </View>
        ))}

        {/* Primary / secondary actions — wire to API + reset handlers later. */}
        <Pressable style={styles.primaryBtn} onPress={() => {}}>
          <Text style={styles.primaryBtnText}>Save All Changes</Text>
        </Pressable>

        <Pressable style={styles.secondaryBtn} onPress={() => {}}>
          <Text style={styles.secondaryBtnText}>Reset to Default</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

/** Styles follow the same vertical order as the screen: layout → discovery cards → prompts → CTAs. */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: SpotrColors.cream,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SpotrSpacing.screenHorizontal,
    paddingBottom: 40,
  },
  pageTitle: {
    fontFamily: serifTitle(),
    fontSize: 28,
    fontWeight: '600',
    color: SpotrColors.brown,
    marginTop: 8,
  },
  pageSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: SpotrColors.textSecondary,
    marginTop: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: SpotrColors.surface,
    borderRadius: SpotrRadii.card,
    padding: SpotrSpacing.cardPadding,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: SpotrColors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: { elevation: 2 },
      default: {},
    }),
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  cardTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: SpotrColors.text,
  },
  milesBadge: {
    backgroundColor: SpotrColors.sageSoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SpotrRadii.pill,
  },
  milesBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: SpotrColors.brown,
  },
  /* --- Radius slider visuals --- */
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sliderEdge: {
    fontSize: 12,
    color: SpotrColors.textMuted,
  },
  sliderTouch: {
    height: 40,
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  sliderGroove: {
    height: 6,
    borderRadius: 3,
    backgroundColor: SpotrColors.tan,
    width: '100%',
  },
  sliderFillBar: {
    position: 'absolute',
    left: 0,
    top: 17,
    height: 6,
    borderRadius: 3,
    backgroundColor: SpotrColors.brown,
    opacity: 0.35,
    maxWidth: '100%',
  },
  sliderThumb: {
    position: 'absolute',
    top: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: SpotrColors.brown,
    borderWidth: 3,
    borderColor: SpotrColors.surface,
  },
  /* --- Map CTA (replace mapPreview with real map when ready) --- */
  mapPreview: {
    height: 120,
    borderRadius: 16,
    backgroundColor: SpotrColors.mapPlaceholder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    opacity: 0.85,
  },
  mapHint: {
    marginTop: 4,
    fontSize: 12,
    color: SpotrColors.textMuted,
  },
  mapBtn: {
    backgroundColor: SpotrColors.brown,
    borderRadius: SpotrRadii.button,
    paddingVertical: 14,
    alignItems: 'center',
  },
  mapBtnText: {
    color: SpotrColors.surface,
    fontSize: 15,
    fontWeight: '600',
  },
  /* --- Fitness level: helper text + custom radio rows --- */
  cardHelp: {
    fontSize: 14,
    color: SpotrColors.textMuted,
    marginBottom: 12,
    lineHeight: 20,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: SpotrColors.border,
  },
  radioRowActive: {
    backgroundColor: SpotrColors.sageSoft,
    borderColor: SpotrColors.sage,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: SpotrColors.textMuted,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: SpotrColors.brown,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: SpotrColors.brown,
  },
  radioLabel: {
    fontSize: 16,
    color: SpotrColors.text,
    fontWeight: '500',
  },
  /* --- Gym search + chips --- */
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: SpotrColors.cream,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: SpotrColors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: SpotrColors.text,
    padding: 0,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SpotrColors.sage,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: SpotrRadii.pill,
  },
  chipText: {
    fontSize: 14,
    color: SpotrColors.text,
    fontWeight: '500',
    maxWidth: 220,
  },
  addClub: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: SpotrColors.brown,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addClubText: {
    fontSize: 15,
    fontWeight: '600',
    color: SpotrColors.brown,
  },
  /* --- Prompt section + inputs --- */
  promptsHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 12,
    marginBottom: 8,
  },
  completedBadge: {
    backgroundColor: SpotrColors.sageSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: SpotrRadii.pill,
    marginTop: 6,
  },
  completedBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: SpotrColors.brown,
  },
  promptLabel: {
    fontSize: 11,
    letterSpacing: 1,
    fontWeight: '700',
    color: SpotrColors.textMuted,
    marginBottom: 8,
  },
  promptQuestion: {
    fontFamily: serifTitle(),
    fontSize: 18,
    fontWeight: '600',
    color: SpotrColors.text,
    marginBottom: 12,
  },
  promptInput: {
    backgroundColor: SpotrColors.tanCard,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: SpotrColors.text,
    minHeight: 88,
    textAlignVertical: 'top',
  },
  /* --- Footer actions --- */
  primaryBtn: {
    backgroundColor: SpotrColors.brownButton,
    borderRadius: SpotrRadii.button,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  primaryBtnText: {
    color: SpotrColors.surface,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryBtn: {
    borderWidth: 1.5,
    borderColor: SpotrColors.brown,
    borderRadius: SpotrRadii.button,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: SpotrColors.brown,
    fontSize: 16,
    fontWeight: '700',
  },
  avatarWrap: {
    width: 130,
    height: 130,
    borderRadius: SpotrRadii.avatar,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: SpotrColors.border,
    alignSelf: "center",
    marginBottom: 13
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
});
