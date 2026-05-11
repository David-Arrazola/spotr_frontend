import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SpotrHeader } from '@/components/spotr-header';
import { SpotrColors, SpotrRadii, SpotrSpacing } from '@/constants/spotr-theme';

const MATCHES = [
  { id: '1', name: 'Marcus', uri: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&fit=crop' },
  { id: '2', name: 'Sienna', uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&fit=crop' },
  { id: '3', name: 'Jordan', uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&fit=crop' },
];

const CONVERSATIONS = [
  {
    id: '1',
    name: 'Marcus',
    time: '2m ago',
    preview: 'Hey! Are you hitting the gy...',
    bold: true,
    unread: true,
    uri: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&fit=crop',
  },
  {
    id: '2',
    name: 'Sienna',
    time: '1h ago',
    preview: 'That healthy lunch spot sou...',
    bold: false,
    unread: false,
    uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&fit=crop',
  },
  {
    id: '3',
    name: 'Alex',
    time: 'Yesterday',
    preview: 'You: Great form today on th...',
    bold: false,
    unread: false,
    uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&fit=crop',
  },
  {
    id: '4',
    name: 'Elena',
    time: 'Mon',
    preview: 'See you at the run club at 6 ...',
    bold: false,
    unread: false,
    uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&fit=crop',
  },
];

function serifSemiBold() {
  return Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'Georgia, serif',
  });
}

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <SpotrHeader />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Matches</Text>
          <Text style={styles.sectionBadge}>6 NEW</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.matchesRow}
          style={styles.matchesScroll}>
          {MATCHES.map((m) => (
            <Pressable key={m.id} style={styles.matchItem} onPress={() => {}}>
              <Image source={{ uri: m.uri }} style={styles.matchAvatar} contentFit="cover" />
              <Text style={styles.matchName}>{m.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={[styles.sectionHeader, { marginTop: 28 }]}>
          <Text style={styles.sectionTitle}>Conversations</Text>
          <Pressable hitSlop={12}>
            <MaterialIcons name="search" size={24} color={SpotrColors.brown} />
          </Pressable>
        </View>

        {CONVERSATIONS.map((c) => (
          <Pressable key={c.id} style={styles.convCard} onPress={() => {}}>
            <View style={styles.convAvatarWrap}>
              <Image source={{ uri: c.uri }} style={styles.convAvatar} contentFit="cover" />
              {c.unread ? <View style={styles.unreadDot} /> : null}
            </View>
            <View style={styles.convBody}>
              <View style={styles.convTop}>
                <Text style={styles.convName}>{c.name}</Text>
                <Text style={styles.convTime}>{c.time}</Text>
              </View>
              <Text style={[styles.convPreview, c.bold && styles.convPreviewBold]} numberOfLines={1}>
                {c.preview}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
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
    paddingHorizontal: SpotrSpacing.screenHorizontal,
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: serifSemiBold(),
    fontSize: 22,
    fontWeight: '600',
    color: SpotrColors.text,
  },
  sectionBadge: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: SpotrColors.brown,
  },
  matchesScroll: {
    marginHorizontal: -SpotrSpacing.screenHorizontal,
    marginBottom: 4,
  },
  matchesRow: {
    paddingHorizontal: SpotrSpacing.screenHorizontal,
    gap: 20,
    paddingBottom: 4,
  },
  matchItem: {
    alignItems: 'center',
    width: 76,
  },
  matchAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: SpotrColors.brown,
  },
  matchName: {
    marginTop: 8,
    fontSize: 13,
    color: SpotrColors.text,
    fontWeight: '500',
  },
  convCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SpotrColors.surface,
    borderRadius: SpotrRadii.card,
    padding: 14,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
      default: {},
    }),
  },
  convAvatarWrap: {
    position: 'relative',
    marginRight: 14,
  },
  convAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: SpotrColors.tan,
  },
  unreadDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: SpotrColors.brown,
    borderWidth: 2,
    borderColor: SpotrColors.surface,
  },
  convBody: {
    flex: 1,
    minWidth: 0,
  },
  convTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  convName: {
    fontSize: 17,
    fontWeight: '600',
    color: SpotrColors.text,
  },
  convTime: {
    fontSize: 13,
    color: SpotrColors.textMuted,
  },
  convPreview: {
    fontSize: 15,
    color: SpotrColors.textMuted,
  },
  convPreviewBold: {
    fontWeight: '700',
    color: SpotrColors.text,
  },
});
