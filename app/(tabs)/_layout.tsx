import { useAppTheme } from '@/hooks/AppThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { Platform, Pressable } from 'react-native';
import { Player } from '../types';
import AddPlayerScreen from './add-player';
import HomeScreen from './home';
import StatsScreen from './stats';

const Tab = createBottomTabNavigator();

const ThemeToggle = () => {
  const { colors, isDark, toggleTheme } = useAppTheme();

  return (
    <Pressable
    onPress={toggleTheme}
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
      }
      
      }>
      <Ionicons
        name={isDark ? 'sunny' : 'moon'}
        size={18}
        color={colors.primary}
      />
    </Pressable>
  );
};

export default function TabLayout() {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (player: Player) => {
    setPlayers((prev) => [...prev, player]);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: true,
        headerStyle: {
          backgroundColor: '#3b82f6',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: Platform.OS === 'ios' ? 120 : 100,
        },
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: '700',
          color: '#ffffff',
          marginTop: Platform.OS === 'ios' ? 10 : 0,
        },
        headerTitleAlign: 'center',
        headerRight: () => <ThemeToggle />,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? 35 : 20,
          paddingTop: 12,
          height: Platform.OS === 'ios' ? 100 : 85,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
          borderRadius: 50,
          marginHorizontal: 15,
          marginBottom: Platform.OS === 'ios' ? 20 : 50,
          position: 'absolute',
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          title: 'Basketball Stats',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
          tabBarLabel: 'Home',
        }}
      >
        {() => <HomeScreen players={players} setPlayers={setPlayers} />}
      </Tab.Screen>

      <Tab.Screen
        name="New Player"
        options={{
          title: 'Add New Player',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
          tabBarLabel: 'Add Player',
        }}
      >
        {() => <AddPlayerScreen addPlayer={addPlayer} />}
      </Tab.Screen>

      <Tab.Screen
        name="Stats"
        options={{
          title: 'Player Statistics',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "stats-chart" : "stats-chart-outline"}
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
          tabBarLabel: 'Statistics',
        }}
      >
        {/* {() => <AddPlayerScreen addPlayer={addPlayer} />} */}
        {() => <StatsScreen players={players} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}