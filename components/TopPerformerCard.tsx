import { defaultProfile } from "@/app/types";
import { useAppTheme } from "@/hooks/AppThemeContext";
import { Image, StyleSheet, Text, View } from "react-native";

type TopPerformerCardProps = {
    title: string;
    player?: {
        image: string;
        name: string;
    } | null;
    stat: string;
    statValue: number | string;
}


export default function TopPerformerCard({ title, player, stat, statValue}: TopPerformerCardProps) {
    const colors = useAppTheme().colors

    const icon = stat === 'points' ? '🥇' : stat === 'rebounds' ? '🏀' : '🙌🏻'
    const color = stat === 'points' ? colors.chartRed : stat === 'rebounds' ? colors.chartBlue : colors.chartGreen
    if (!player) {
        return (
            <View style={[styles.topPerformerCard, { backgroundColor: colors.cardBackground, shadowColor: colors.shadowColor, borderLeftColor: color }]}>
                <Text style={[styles.cardTitle, { color: colors.cardTitle }]}>{title}</Text>
                <Text style={[styles.noDataText, { color: colors.text }]}>No players yet</Text>
            </View>
        );
    }

    let imageSource = defaultProfile
    if (player.image && (player.image.startsWith("http") || player.image.startsWith("file:") || player.image.startsWith("data:"))) {
        imageSource = { uri: player.image }
    }

    return (
        <View style={[styles.topPerformerCard, { backgroundColor: colors.cardBackground, shadowColor: colors.shadowColor, borderLeftColor: color }]}>
            <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: colors.cardTitle }]}>{title}</Text>
                <Text style={[styles.statBadge, { backgroundColor: color }]}>{icon}</Text>
            </View>
            <View style={styles.playerInfo}>
                <Image source={imageSource} style={[styles.playerImage, { borderColor: colors.imageBorder }]} />
                <View style={styles.playerDetails}>
                    <Text style={[styles.playerName, { color: colors.text }]}>{player.name}</Text>
                    <Text style={[styles.playerStat, { color: colors.text }]}>{statValue} {stat}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topPerformerCard: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    statBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 12,
    },
    playerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
        borderWidth: 2,
    },
    playerDetails: {
        flex: 1,
    },
    playerName: {
        fontSize: 18,
        fontWeight: '700',
    },
    playerStat: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 2,
    },
    noDataText: {
        fontSize: 14,
        fontStyle: 'italic',
    },
})