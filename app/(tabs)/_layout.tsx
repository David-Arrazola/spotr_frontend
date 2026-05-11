import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import { SpotrHeader } from '@/components/spotr-header';
import { SpotrColors } from '@/constants/spotr-theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={{ flex: 1, backgroundColor: SpotrColors.cream }}>
      {/* One header for every tab screen (children are the tab routes below). */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: SpotrColors.cream }}>
        <SpotrHeader />
      </SafeAreaView>

      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarActiveTintColor: SpotrColors.brown,
            tabBarInactiveTintColor: SpotrColors.textMuted,
            tabBarStyle: {
              backgroundColor: isDark ? '#1a1816' : SpotrColors.surface,
              borderTopColor: SpotrColors.border,
              borderTopWidth: StyleSheet.hairlineWidth,
              height: Platform.OS === 'ios' ? 88 : 72,
              paddingTop: 8,
              paddingBottom: Platform.OS === 'ios' ? 28 : 12,
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
            },
            tabBarActiveBackgroundColor: SpotrColors.sage,
            tabBarItemStyle: {
              borderRadius: 22,
              marginHorizontal: 6,
              marginVertical: 4,
              height: 46,
            },
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Explore',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="explore" size={26} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="messages"
            options={{
              title: 'Messages',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="chat-bubble-outline" size={26} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="person-outline" size={26} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}
