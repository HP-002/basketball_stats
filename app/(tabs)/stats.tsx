import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import { Player } from '../types';
import { calculateAverage, getTopPerformer, playerStats, TeamStatsCard, TopPerformerCard } from './stats-functionality';

type StatsScreenProps = {
    players: Player[];
};

export default function StatsScreen({ players }: StatsScreenProps) {
    // Calculate top performers
    console.log('HI')

    const avgPoints = calculateAverage(players, 'points');
    const avgRebounds = calculateAverage(players, 'rebounds');
    const avgAssists = calculateAverage(players, 'assists');

    // Prepare data for charts
    const pointsData = players.slice(0, 8).map((player, index) => ({
        value: player.points,
        label: player.name.split(' ')[0],
        frontColor: '#ef4444',
    }));

    const lineChartData = players.slice(0, 6).map(player => ({
        value: player.points,
        dataPointText: player.points.toString(),
    }));

    const reboundsLineData = players.slice(0, 6).map(player => ({
        value: player.rebounds,
        dataPointText: player.rebounds.toString(),
    }));

    const assistsLineData = players.slice(0, 6).map(player => ({
        value: player.assists,
        dataPointText: player.assists.toString(),
    }));

    // Screen width for responsive charts
    const screenWidth = Dimensions.get('window').width;
    const chartWidth = screenWidth - 60;

    if (players.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateTitle}>No Statistics Available</Text>
                    <Text style={styles.emptyStateText}>Add some players to view statistics</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container} >
            <View
                style={styles.scrollContainer}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                        paddingHorizontal: 5,
                    }}
                >
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Top Performers</Text>

                        {
                            playerStats.map((stat) => {
                                const topPerformer = getTopPerformer(players, stat as keyof Player)
                                return (
                                    <TopPerformerCard
                                        title="Leading Scorer"
                                        player={topPerformer}
                                        stat={stat}
                                        statValue={topPerformer ? topPerformer[stat as keyof Player] : 0}
                                        color="#ef4444"
                                        icon="🏀"
                                    />
                                )
                            })
                        }
                    </View>

                    {/* Team Stats Section */}
                    <View style={styles.section}>
                        <TeamStatsCard
                            avgPoints={avgPoints}
                            avgRebounds={avgRebounds}
                            avgAssists={avgAssists}
                        />
                    </View>

                    {/* Charts Section */}
                    {players.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Player Comparison</Text>

                            {/* Points Bar Chart */}
                            <View style={styles.chartContainer}>
                                <Text style={styles.chartTitle}>Points per Player</Text>
                                <BarChart
                                    data={pointsData}
                                    width={chartWidth - 85}
                                    height={200}
                                    barBorderRadius={4}
                                    noOfSections={5}
                                    yAxisThickness={1}
                                    xAxisThickness={1}
                                    yAxisColor="#9ca3af"
                                    xAxisColor="#9ca3af"
                                    yAxisTextStyle={{ color: '#6b7280', fontSize: 12 }}
                                    xAxisLabelTextStyle={{ color: '#6b7280', fontSize: 10 }}
                                    maxValue={Math.max(...pointsData.map(d => d.value)) + 5}
                                />
                            </View>

                            {/* Multi-stat Line Chart */}
                            <View style={styles.chartContainer}>
                                <Text style={styles.chartTitle}>Stats Comparison</Text>
                                <LineChart
                                    data={lineChartData}
                                    data2={reboundsLineData}
                                    data3={assistsLineData}
                                    width={chartWidth - 100}
                                    height={200}
                                    color1="#ef4444"
                                    color2="#22c55e"
                                    color3="#3b82f6"
                                    thickness1={3}
                                    thickness2={3}
                                    thickness3={3}
                                    dataPointsColor1="#ef4444"
                                    dataPointsColor2="#22c55e"
                                    dataPointsColor3="#3b82f6"
                                    yAxisColor="#9ca3af"
                                    xAxisColor="#9ca3af"
                                    yAxisTextStyle={{ color: '#6b7280', fontSize: 12 }}
                                    noOfSections={5}
                                    maxValue={Math.max(
                                        ...lineChartData.map(d => d.value),
                                        ...reboundsLineData.map(d => d.value),
                                        ...assistsLineData.map(d => d.value)
                                    ) + 3}
                                />

                                {/* Chart Legend */}
                                <View style={styles.chartLegend}>
                                    <View style={styles.legendItem}>
                                        <View style={[styles.legendDot, { backgroundColor: '#ef4444' }]} />
                                        <Text style={styles.legendText}>Points</Text>
                                    </View>
                                    <View style={styles.legendItem}>
                                        <View style={[styles.legendDot, { backgroundColor: '#22c55e' }]} />
                                        <Text style={styles.legendText}>Rebounds</Text>
                                    </View>
                                    <View style={styles.legendItem}>
                                        <View style={[styles.legendDot, { backgroundColor: '#3b82f6' }]} />
                                        <Text style={styles.legendText}>Assists</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>

                {/* Top blur gradient */}
                <LinearGradient
                    colors={['#e4e4e7', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.topBlur}
                    pointerEvents="none"
                />

                {/* Bottom blur gradient */}
                <LinearGradient
                    colors={['transparent', '#e4e4e7']}
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
    scrollContainer: {
        position: 'relative',
        flex: 1,
        paddingBottom: 30,
    },
    topBlur: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 20,
        zIndex: 10,
    },
    bottomBlur: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        height: 15,
        zIndex: 1,
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