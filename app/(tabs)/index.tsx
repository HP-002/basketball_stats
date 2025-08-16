import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { Player } from '../types';
import AddPlayerScreen from './add-player';
import HomeScreen from './home';
import StatsScreen from './stats';

export type RootTabParamList = {
  Home: undefined;
  AddPlayer: undefined;
  Stats: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'Warning: Text strings must be rendered within a <Text> component'
]);

console.warn = () => {};
console.error = () => {};

export default function App() {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (player: Player) => {
    setPlayers((prev) => [...prev, player]);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Home') {
              return <Ionicons name="home" size={size} color={color} />;
            }
            if (route.name === 'AddPlayer') {
              return <Ionicons name="add-circle" size={size + 8} color={color} />;
            }
            if (route.name === 'Stats') {
              return <Ionicons name="stats-chart" size={size} color={color} />;
            }
            return null;
          },
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="Home">
          {() =>
            <HomeScreen players={players} setPlayers={setPlayers} />
          }
        </Tab.Screen>
        <Tab.Screen name="AddPlayer">
          {() =>
            <AddPlayerScreen addPlayer={addPlayer} />
          }
        </Tab.Screen>
        <Tab.Screen name="Stats">
          {() =>
            <StatsScreen players={players} />
          }
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
