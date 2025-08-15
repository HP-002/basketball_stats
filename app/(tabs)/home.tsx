import React, { useEffect } from 'react';
import { Dimensions, FlatList, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Player } from '../types';
import { loadPlayers, savePlayers, searchPlayers, sortPlayers, traits } from './filter-functionality';

type HomeScreenProps = {
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
};

export default function HomeScreen({ players, setPlayers }: HomeScreenProps) {
    useEffect(() => {
        loadPlayers().then((loadedPlayers) => setPlayers(loadedPlayers))
    }, [])

    useEffect(() => {
        savePlayers(players)
    }, [players])

    const handleSortPlayers = (trait: string) => {
        console.log(`Sorting by ${trait}`)
        const sortedPlayers = sortPlayers(players, trait as keyof Player)
        setPlayers(sortedPlayers)
    }

    const handleSearchPlayers = (query: string) => {
        if (query.trim() === '') {
            setPlayers(players)
        }

        const searchedPlayers = searchPlayers(players, query)
        setPlayers(searchedPlayers)
    }

    let numberOfColums;
    if (Platform.OS === 'web' || Platform.OS === 'macos' || Platform.OS === 'windows') {
        numberOfColums = Math.floor(Dimensions.get('window').width / 160)
    } else {
        numberOfColums = 2
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.search}
                placeholder='Search players...'
                onChangeText={(query) => handleSearchPlayers(query)}
            />

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.buttonContainer}
            >
                {traits.map((trait) => (
                    <Pressable style={styles.button} onPress={() => handleSortPlayers(trait)} >
                        <Text style={styles.buttonText}>{trait}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            <FlatList
                data={players}
                style={styles.flatlist}
                numColumns={numberOfColums}
                columnWrapperStyle={{ justifyContent: 'space-between', gap: 15 }}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image}></Image>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.substats}>Points: {item.points}</Text>
                        <Text style={styles.substats}>Rebounds: {item.rebounds}</Text>
                        <Text style={styles.substats}>Assists: {item.assists}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    search: {
        backgroundColor: '#c7c7c7c7',
        borderRadius: 25,
        marginHorizontal: 2,
        marginBottom: 10,
        paddingHorizontal: 15,
    },
    buttonContainer: {
        marginBottom: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        height: 42,
        marginHorizontal: 5,
        marginBottom:5,
        backgroundColor: '#f19898ff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    flatlist: {
        width: '100%',
        marginTop: 14,
        paddingHorizontal: 15,
        flexWrap: 'wrap',
        gap: 5,
    },
    card: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        marginVertical: 8,
        width: 150,
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 8
    },
    image: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#000000'
    },
    name: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    substats: {
        fontWeight: 'semibold'
    }
});
