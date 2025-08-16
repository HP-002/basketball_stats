import { useAppTheme } from "@/hooks/AppThemeContext"
import { Ionicons } from "@expo/vector-icons"
import { Image, StyleSheet, Text, View } from "react-native"
import { Player } from "../app/types"

export default function PlayerCard({ player }: { player: Player }) {
    const colors = useAppTheme().colors

    let imageSource
    if (player.image && typeof player.image === 'string' && (player.image.startsWith("http") || player.image.startsWith("file:") || player.image.startsWith("data:"))) {
        imageSource = { uri: player.image }
    }

    return (
        <View style={[styles.card, { backgroundColor: colors.cardBackground, shadowColor: colors.shadowColor }]}>
            <Image source={typeof player.image === 'number' ? player.image : imageSource} style={[styles.image, { borderColor: colors.imageBorder }]}></Image>
            <Text style={[styles.name, { color: colors.text }]}>{player.name}</Text>
            <Text style={[styles.location, { color: colors.text }]}>{player.location}</Text>
            <View
                style={styles.substatsContainer}
            >
                <View style={styles.iconAndText}>
                    <Ionicons
                        name="calendar-outline"
                        size={12}
                        color={colors.text}
                    />
                    <Text style={[styles.substats, { color: colors.text }]}>{player.age}</Text>
                </View>
                <View style={styles.iconAndText}>
                    <Ionicons
                        name="podium-outline"
                        size={12}
                        color={colors.text}
                    />
                    <Text style={[styles.substats, { color: colors.text }]}>{player.height}</Text>
                </View>
            </View>
            <Text style={[styles.substats, { color: colors.text }]}>🥇 Points: {player.points}</Text>
            <Text style={[styles.substats, { color: colors.text }]}>🏀 Rebounds: {player.rebounds}</Text>
            <Text style={[styles.substats, { color: colors.text }]}>🙌🏻 Assists: {player.assists}</Text>
            <Text style={[styles.substats, { color: colors.text }]}>⭐ Ratings: {player.ratings}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginVertical: 8,
        width: 160,
        borderRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    image: {
        width: 70,
        height: 70,
        alignSelf: 'center',
        borderRadius: 35,
        marginBottom: 8,
        borderWidth: 2,
    },
    name: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
    location: {
        alignSelf: 'center',
        fontSize: 14,
        fontWeight: '500',
        fontStyle: 'italic',
    },
    substatsContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        gap: 20,
        marginBottom: 8,
    },
    iconAndText: {
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center'
    },
    substats: {
        fontSize: 12,
        fontWeight: '700',
        marginBottom: 2,
    }
})