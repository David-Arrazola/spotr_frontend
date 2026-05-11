import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { SpotrColors, SpotrRadii } from '@/constants/spotr-theme';


type SpotrHeaderProps = {
  onPressFilter?: () => void;

};

export function SpotrHeader({ onPressFilter }: SpotrHeaderProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.logo}>Spotr</Text>
      <Pressable onPress={onPressFilter} style={styles.iconBtn} hitSlop={8}>
        <MaterialIcons name="tune" size={26} color={SpotrColors.brown} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: SpotrColors.cream,
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: SpotrRadii.avatar,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: SpotrColors.border,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  logo: {
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      default: 'Georgia, serif',
    }),
    fontSize: 26,
    color: SpotrColors.brown,
    letterSpacing: 0.5,
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});