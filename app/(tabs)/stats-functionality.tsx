import { useAppTheme } from '@/hooks/AppThemeContext';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Player } from '../types';

type TopPerformerCardProps = {
    title: string;
    player?: {
        image: string;
        name: string;
    } | null;
    stat: string;
    statValue: number | string;
}

type TeamStatCardProps = {
    avgPoints: string | number;
    avgRebounds: string | number;
    avgAssists: string | number;
}

const playerStats = ["points", "rebounds", "assists"]

function getTopPerformer(players: Player[], stat: keyof Player): Player | null {
    if (players.length === 0) return null;
    return players.reduce((top, player) =>
        player[stat] > top[stat] ? player : top
    )
}

function calculateAverage(players: Player[], stat: keyof Player) {
    if (players.length === 0) return 0
    const total = players.reduce((sum, player) => sum + Number(player[stat]), 0)
    return (total / players.length).toFixed(1)
};


function TopPerformerCard({ title, player, stat, statValue}: TopPerformerCardProps) {
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

    return (
        <View style={[styles.topPerformerCard, { backgroundColor: colors.cardBackground, shadowColor: colors.shadowColor, borderLeftColor: color }]}>
            <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: colors.cardTitle }]}>{title}</Text>
                <Text style={[styles.statBadge, { backgroundColor: color }]}>{icon}</Text>
            </View>
            <View style={styles.playerInfo}>
                <Image source={{ uri: player.image }} style={[styles.playerImage, { borderColor: colors.imageBorder }]} />
                <View style={styles.playerDetails}>
                    <Text style={[styles.playerName, { color: colors.text }]}>{player.name}</Text>
                    <Text style={[styles.playerStat, { color: colors.text }]}>{statValue} {stat}</Text>
                </View>
            </View>
        </View>
    );
};


function TeamStatsCard({avgPoints, avgRebounds, avgAssists}: TeamStatCardProps) {
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

export { calculateAverage, getTopPerformer, playerStats, TeamStatsCard, TopPerformerCard };

