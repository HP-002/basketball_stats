import starterPlayers from '@/assets/players.json';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Player } from '../app/types';

const PLAYERS_KEY = 'players'
let traits = ['Name', 'Age', 'Height', 'Points', 'Rebounds', 'Assists', 'Ratings']


function sortPlayers<T extends keyof Player>(players: Player[], trait: T): Player[] {
    trait = String(trait).toLowerCase() as T
    const sorted = [...players].sort((a, b) => {
        if (typeof a[trait] === 'number' && typeof b[trait] === 'number') {
            return Number(b[trait]) - Number(a[trait])
        }
        return String(a[trait]).localeCompare(String(b[trait]))
    });

    return sorted
};


function searchPlayers(players: Player[], query: string): Player[] {
    if (!query.trim()) return players

    const terms = query.toLowerCase().split(/\s+/);

    return players.filter((player) => {
        const playerName = player.name.toLowerCase();
        return terms.some((term) => playerName.includes(term))
    })
}


async function savePlayers(players: Player[]) {
    try {
        const jsonValue = JSON.stringify(players);
        await AsyncStorage.setItem(PLAYERS_KEY, jsonValue);
        console.log("Players saved successfully!");
    } catch (error) {
        console.error("Error saving players:", error);
    }
}


async function loadPlayers(): Promise<Player[]> {
    try {
    const jsonValue = await AsyncStorage.getItem(PLAYERS_KEY);

    if (jsonValue) {
      // ✅ Return previously saved players
      return JSON.parse(jsonValue) as Player[];
    }

    // ✅ If no data exists yet, use starter players
    await savePlayers(starterPlayers);
    return starterPlayers as Player[];
  } catch (error) {
    console.error("Error loading players:", error);
    return [];
  }
}


export { loadPlayers, savePlayers, searchPlayers, sortPlayers, traits };

