import FilterButton from '@/components/FilterButton';
import PlayerCard from '@/components/PlayerCard';
import { useAppTheme } from '@/hooks/AppThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions, FlatList, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { loadPlayers, savePlayers, searchPlayers, sortPlayers, traits } from '../../components/filter-functionality';
import { Player } from '../types';

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
        const sortedPlayers = sortPlayers(players, trait as keyof Player)
        setPlayers(sortedPlayers)
    }

    const handleSearchPlayers = (query: string) => {
        if (query.trim() === '') {
            loadPlayers().then((loadedPlayers) => setPlayers(loadedPlayers))
            return;
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

    const colors = useAppTheme().colors

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <TextInput
                style={[styles.search, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, shadowColor: colors.shadowColor }]}
                placeholder='Search players...'
                placeholderTextColor={colors.inputPlaceholder}
                onChangeText={(query) => handleSearchPlayers(query)}
            />

            <View style={styles.scrollContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.buttonContainer}
                    contentContainerStyle={styles.buttonContentContainer}
                >
                    {traits.map((trait, index) => (
                        <FilterButton
                            key={index}
                            index={index}
                            trait={trait}
                            handleSortPlayers={handleSortPlayers}
                        ></FilterButton>
                    ))}
                </ScrollView>
                
                {/* Left blur gradient */}
                <LinearGradient
                    colors={[colors.linearGradient, 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.leftBlur}
                    pointerEvents="none"
                />
                
                {/* Right blur gradient */}
                <LinearGradient
                    colors={['transparent', colors.linearGradient]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.rightBlur}
                    pointerEvents="none"
                />
            </View>

            {/* Wrapper for the FlatList blur effect */}
            <View style={styles.flatListContainer}>
                <FlatList
                    data={players}
                    style={styles.flatlist}
                    numColumns={numberOfColums}
                    columnWrapperStyle={numberOfColums > 1 ? { justifyContent: 'space-around', gap: 15 } : null}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <PlayerCard player={item} />
                    )}
                />
                
                {/* Top blur gradient */}
                <LinearGradient
                    colors={[colors.linearGradient, 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.topBlur}
                    pointerEvents="none"
                />
                
                {/* Bottom blur gradient */}
                <LinearGradient
                    colors={['transparent', colors.linearGradient]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.bottomBlur}
                    pointerEvents="none"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 120 : 105,
    },
    search: {
        height: 45,
        borderRadius: 20,
        marginHorizontal: 5,
        marginBottom: 15,
        paddingHorizontal: 20,
        fontSize: 16,
        borderWidth: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    scrollContainer: {
        position: 'relative',
        marginBottom: 15,
        height: 60,
    },
    buttonContainer: {
        flex: 1,
        paddingVertical: 5,
    },
    buttonContentContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    leftBlur: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 15,
        zIndex: 1,
    },
    rightBlur: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 15,
        zIndex: 1,
    },
    flatListContainer: {
        position: 'relative',
        flex: 1,
        paddingBottom: 30,
    },
    flatlist: {
        flex: 1,
        paddingHorizontal: 5,
    },
    topBlur: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 15,
        zIndex: 1,
    },
    bottomBlur: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        height: 15,
        zIndex: 1,
    },
});