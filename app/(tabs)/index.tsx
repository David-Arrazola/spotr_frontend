import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { SpotrColors, SpotrRadii, SpotrSpacing } from '@/constants/spotr-theme';

const SARAH_IMG =
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f17b?w=800&q=80';
const MARCUS_IMG =
  'https://images.unsplash.com/photo-1567013127542-490d757e51fa?w=800&q=80';

function serifTitle() {
  return Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'Georgia, serif',
  });
}

export default function ExploreScreen() {
  return (
    <View style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <Image source={{ uri: SARAH_IMG }} style={styles.heroImage} contentFit="cover" />
          <View style={styles.heroFade} pointerEvents="none" />
          <View style={styles.heroTextBlock}>
            <Text style={styles.heroName}>Sarah, 28</Text>
            <View style={styles.tagRow}>
              {['HIIT Enthusiast', 'Pilates', 'Marathon Runner', 'Yoga'].map((t) => (
                <View key={t} style={styles.tag}>
                  <Text style={styles.tagText}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.actionRow}>
            <Pressable style={[styles.actionBtn, styles.passBtn]} onPress={() => {}}>
              <MaterialIcons name="close" size={32} color="#4A4A4A" />
            </Pressable>
            <Pressable style={[styles.actionBtn, styles.likeBtn]} onPress={() => {}}>
              <MaterialIcons name="favorite" size={28} color={SpotrColors.surface} />
            </Pressable>
          </View>
        </View>

        <View style={[styles.promptCard, { backgroundColor: SpotrColors.tanCard }]}>
          <Text style={styles.promptLabel}>GYM PET PEEVE</Text>
          <Text style={styles.promptQuote}>
            &ldquo;My gym pet peeve is... people who don&apos;t re-rack weights.&rdquo;
          </Text>
          <View style={styles.promptFooter}>
            <MaterialIcons name="fitness-center" size={18} color={SpotrColors.brown} />
            <Text style={styles.promptFooterText}>Sarah&apos;s personal philosophy</Text>
          </View>
        </View>

        <View style={[styles.heroWrap, { marginTop: SpotrSpacing.sectionGap }]}>
          <Image source={{ uri: MARCUS_IMG }} style={styles.heroImage} contentFit="cover" />
          <View style={styles.heroFade} pointerEvents="none" />
          <View style={styles.heroTextBlock}>
            <Text style={styles.heroName}>Marcus, 31</Text>
            <View style={styles.tagRow}>
              {['Marathon Runner', 'Yoga', 'Strength'].map((t) => (
                <View key={t} style={styles.tag}>
                  <Text style={styles.tagText}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.actionRow}>
            <Pressable style={[styles.actionBtn, styles.passBtn]} onPress={() => {}}>
              <MaterialIcons name="close" size={32} color="#4A4A4A" />
            </Pressable>
            <Pressable style={[styles.actionBtn, styles.likeBtn]} onPress={() => {}}>
              <MaterialIcons name="favorite" size={28} color={SpotrColors.surface} />
            </Pressable>
          </View>
        </View>

        <View style={[styles.promptCard, { backgroundColor: SpotrColors.greenCard }]}>
          <Text style={styles.promptLabel}>IDEAL WORKOUT</Text>
          <Text style={styles.promptQuote}>
            &ldquo;A long run followed by a slow stretch session and a protein shake.&rdquo;
          </Text>
          <View style={styles.promptFooter}>
            <MaterialIcons name="timer" size={18} color={SpotrColors.brown} />
            <Text style={styles.promptFooterText}>Marcus&apos;s workout vibe</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: SpotrColors.cream,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
    paddingHorizontal: SpotrSpacing.screenHorizontal,
  },
  heroWrap: {
    borderRadius: SpotrRadii.card,
    overflow: 'hidden',
    backgroundColor: SpotrColors.surface,
    marginBottom: 28,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: { elevation: 6 },
      default: {},
    }),
  },
  heroImage: {
    width: '100%',
    aspectRatio: 3 / 4.1,
    backgroundColor: SpotrColors.mapPlaceholder,
  },
  heroFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 200,
    backgroundColor: 'rgba(0,0,0,0.38)',
    borderBottomLeftRadius: SpotrRadii.card,
    borderBottomRightRadius: SpotrRadii.card,
  },
  heroTextBlock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 56,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  heroName: {
    fontFamily: serifTitle(),
    fontSize: 32,
    fontWeight: '600',
    color: SpotrColors.surface,
    marginBottom: 10,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: SpotrColors.tagPill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SpotrRadii.pill,
  },
  tagText: {
    color: SpotrColors.surface,
    fontSize: 12,
    fontWeight: '500',
  },
  actionRow: {
    position: 'absolute',
    bottom: -22,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 28,
  },
  actionBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
      default: {},
    }),
  },
  passBtn: {
    backgroundColor: SpotrColors.surface,
    borderWidth: 1,
    borderColor: SpotrColors.border,
  },
  likeBtn: {
    backgroundColor: SpotrColors.like,
  },
  promptCard: {
    marginTop: 36,
    borderRadius: SpotrRadii.card,
    padding: SpotrSpacing.cardPadding,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
      default: {},
    }),
  },
  promptLabel: {
    fontSize: 11,
    letterSpacing: 1.2,
    fontWeight: '700',
    color: SpotrColors.textMuted,
    marginBottom: 10,
  },
  promptQuote: {
    fontFamily: serifTitle(),
    fontSize: 22,
    lineHeight: 30,
    color: SpotrColors.text,
    marginBottom: 16,
  },
  promptFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  promptFooterText: {
    fontSize: 13,
    color: SpotrColors.textSecondary,
  },
});
