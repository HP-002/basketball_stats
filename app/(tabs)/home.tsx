import React from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Player } from '../types';

type HomeScreenProps = {
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
};

export default function HomeScreen({ players, setPlayers }: HomeScreenProps) {
    const sortPlayers = () => {
        const sorted = [...players].sort((a, b) => b.points - a.points);
        setPlayers(sorted);
    };

    return (
        <View style={styles.container}>
            <Button title="Sort by Points" onPress={sortPlayers} />
            <FlatList
                data={players}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image}}></Image>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text>Points: {item.points}</Text>
                        <Text>Rebounds: {item.rebounds}</Text>
                        <Text>Assists: {item.assists}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        padding: 20 
    },
    card: { 
        backgroundColor: '#f0f0f0', 
        padding: 15, 
        marginVertical: 8, 
        borderRadius: 8 
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#000000'
    },
    name: { 
        fontSize: 18, 
        fontWeight: 'bold' 
    },
    substats: {
        
    }
});
