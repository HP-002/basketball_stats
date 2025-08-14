import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { Player } from '../types';
import AddPlayerScreen from './add-player';
import HomeScreen from './home';
import StatsScreen from './stats';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (player: Player) => {
    setPlayers((prev) => [...prev, player]);
  };

  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      >
        {() => <HomeScreen players={players} setPlayers={setPlayers} />}
      </Tab.Screen>
      <Tab.Screen
        name="add-player"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size + 8} color={color} />,
        }}
      >
        {() => <AddPlayerScreen addPlayer={addPlayer} />}
      </Tab.Screen>
      <Tab.Screen
        name="stats"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart" size={size} color={color} />,
        }}
      >
        {() => <StatsScreen players={players} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}