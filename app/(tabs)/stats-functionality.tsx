import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Player } from '../types';

type TopPerformerCardProps = {
    title: string;
    player?: {
        image: string;
        name: string;
    } | null;
    stat: string;
    statValue: number | string;
    color: string;
    icon: React.ReactNode;
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


function TopPerformerCard({ title, player, stat, statValue, color, icon }: TopPerformerCardProps) {


    if (!player) {
        return (
            <View style={[styles.topPerformerCard, { borderLeftColor: color }]}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.noDataText}>No players yet</Text>
            </View>
        );
    }

    return (
        <View style={[styles.topPerformerCard, { borderLeftColor: color }]}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={[styles.statBadge, { backgroundColor: color }]}>{icon}</Text>
            </View>
            <View style={styles.playerInfo}>
                <Image source={{ uri: player.image }} style={styles.playerImage} />
                <View style={styles.playerDetails}>
                    <Text style={styles.playerName}>{player.name}</Text>
                    <Text style={styles.playerStat}>{statValue} {stat}</Text>
                </View>
            </View>
        </View>
    );
};


function TeamStatsCard({avgPoints, avgRebounds, avgAssists}: TeamStatCardProps) {
    return (
        < View style={styles.teamStatsCard} >
            <Text style={styles.sectionTitle}>Team Averages</Text>
            <View style={styles.averagesGrid}>
                <View style={styles.averageItem}>
                    <Text style={styles.averageValue}>{avgPoints}</Text>
                    <Text style={styles.averageLabel}>Points</Text>
                </View>
                <View style={styles.averageItem}>
                    <Text style={styles.averageValue}>{avgRebounds}</Text>
                    <Text style={styles.averageLabel}>Rebounds</Text>
                </View>
                <View style={styles.averageItem}>
                    <Text style={styles.averageValue}>{avgAssists}</Text>
                    <Text style={styles.averageLabel}>Assists</Text>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e4e4e7',
        paddingBottom: Platform.OS === 'ios' ? 120 : 105,
    },
    section: {
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 16,
        marginTop: 8,
    },
    topPerformerCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        shadowColor: '#000',
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
        color: '#374151',
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
        borderColor: '#e5e7eb',
    },
    playerDetails: {
        flex: 1,
    },
    playerName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
    },
    playerStat: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
        marginTop: 2,
    },
    noDataText: {
        fontSize: 14,
        color: '#9ca3af',
        fontStyle: 'italic',
    },
    teamStatsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
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
        color: '#3b82f6',
    },
    averageLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6b7280',
        marginTop: 4,
    },
    chartContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        alignItems: 'center',
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
    },
    chartLegend: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 12,
        gap: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 6,
    },
    legendText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6b7280',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyStateTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#374151',
        marginBottom: 8,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
    },
});

export { calculateAverage, getTopPerformer, playerStats, TeamStatsCard, TopPerformerCard };
