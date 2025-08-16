import { useAppTheme } from "@/hooks/AppThemeContext";
import { StyleSheet, Text, View } from "react-native";

type TeamStatCardProps = {
    avgPoints: string | number;
    avgRebounds: string | number;
    avgAssists: string | number;
}

export default function TeamStatsCard({avgPoints, avgRebounds, avgAssists}: TeamStatCardProps) {
    const colors = useAppTheme().colors

    return (
        < View style={[styles.teamStatsCard, { backgroundColor: colors.cardBackground, shadowColor: colors.shadowColor }]} >
            <Text style={[styles.sectionTitle, { color: colors.cardTitle }]}>Team Averages</Text>
            <View style={styles.averagesGrid}>
                <View style={styles.averageItem}>
                    <Text style={[styles.averageValue, { color: colors.avgText}]}>{avgPoints}</Text>
                    <Text style={[styles.averageLabel, { color: colors.avgLabel}]}>Points</Text>
                </View>
                <View style={styles.averageItem}>
                    <Text style={[styles.averageValue, { color: colors.avgText}]}>{avgRebounds}</Text>
                    <Text style={[styles.averageLabel, { color: colors.avgLabel}]}>Rebounds</Text>
                </View>
                <View style={styles.averageItem}>
                    <Text style={[styles.averageValue, { color: colors.avgText}]}>{avgAssists}</Text>
                    <Text style={[styles.averageLabel, { color: colors.avgLabel}]}>Assists</Text>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
        marginTop: 8,
    },
    teamStatsCard: {
        borderRadius: 12,
        padding: 20,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    averagesGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
    },
    averageItem: {
        alignItems: 'center',
    },
    averageValue: {
        fontSize: 24,
        fontWeight: '700',
    },
    averageLabel: {
        fontSize: 12,
        fontWeight: '500',
        marginTop: 4,
    },
});