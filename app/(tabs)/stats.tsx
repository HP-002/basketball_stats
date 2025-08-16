import TeamStatsCard from '@/components/TeamStatsCard';
import TopPerformerCard from '@/components/TopPerformerCard';
import { useAppTheme } from '@/hooks/AppThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import { calculateAverage, getTopPerformer, playerStats } from '../../components/stats-functionality';
import { Player } from '../types';

type StatsScreenProps = {
    players: Player[];
};

export default function StatsScreen({ players }: StatsScreenProps) {
    const colors = useAppTheme().colors

    const avgPoints = calculateAverage(players, 'points');
    const avgRebounds = calculateAverage(players, 'rebounds');
    const avgAssists = calculateAverage(players, 'assists');

    const pointsData = players.slice(0, 8).map((player, index) => ({
        value: player.points,
        label: player.name.split(' ')[0],
        frontColor: colors.chartRed,
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

    const screenWidth = Dimensions.get('window').width;
    const chartWidth = screenWidth - 60;

    if (players.length === 0) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.emptyState}>
                    <Text style={[styles.emptyStateTitle, { color: colors.text }]}>No Statistics Available</Text>
                    <Text style={[styles.emptyStateText, { color: colors.text }]}>Add some players to view statistics</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]} >
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
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Performers</Text>
                        {
                            playerStats.map((stat, index) => {
                                const topPerformer = getTopPerformer(players, stat as keyof Player)
                                return (
                                    <TopPerformerCard
                                        key={stat}
                                        title={`Leading Performer ${stat.charAt(0).toUpperCase() + stat.slice(1)}`}
                                        player={topPerformer}
                                        stat={stat}
                                        statValue={topPerformer ? topPerformer[stat as keyof Player] : 0}
                                    />
                                )
                            })
                        }
                    </View>

                    <View style={styles.section}>
                        <TeamStatsCard
                            avgPoints={avgPoints}
                            avgRebounds={avgRebounds}
                            avgAssists={avgAssists}
                        />
                    </View>

                    {players.length > 0 && (
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Player Comparison</Text>

                            <View style={[styles.chartContainer, { backgroundColor: colors.cardBackground, shadowColor: colors.shadowColor }]}>
                                <Text style={[styles.chartTitle, { color: colors.cardTitle }]}>Points per Player</Text>
                                <BarChart
                                    data={pointsData}
                                    width={chartWidth - 85}
                                    height={200}
                                    barBorderRadius={4}
                                    noOfSections={5}
                                    yAxisThickness={1}
                                    xAxisThickness={1}
                                    yAxisColor={colors.chartAxis}
                                    xAxisColor={colors.chartAxis}
                                    yAxisTextStyle={{ color: colors.chartAxis, fontSize: 12 }}
                                    xAxisLabelTextStyle={{ color: colors.chartAxis, fontSize: 10 }}
                                    maxValue={Math.max(...pointsData.map(d => d.value)) + 5}
                                />
                            </View>

                            <View style={[styles.chartContainer, { backgroundColor: colors.cardBackground, shadowColor: colors.shadowColor }]}>
                                <Text style={[styles.chartTitle, { color: colors.cardTitle }]}>Stats Comparison</Text>
                                <LineChart
                                    data={lineChartData}
                                    data2={reboundsLineData}
                                    data3={assistsLineData}
                                    width={chartWidth - 100}
                                    height={200}
                                    color1={colors.chartRed}
                                    color2={colors.chartGreen}
                                    color3={colors.chartBlue}
                                    thickness1={3}
                                    thickness2={3}
                                    thickness3={3}
                                    dataPointsColor1={colors.chartRed}
                                    dataPointsColor2={colors.chartGreen}
                                    dataPointsColor3={colors.chartBlue}
                                    yAxisColor={colors.chartAxis}
                                    xAxisColor={colors.chartAxis}
                                    yAxisTextStyle={{ color: colors.chartAxis, fontSize: 12 }}
                                    noOfSections={5}
                                    maxValue={Math.max(
                                        ...lineChartData.map(d => d.value),
                                        ...reboundsLineData.map(d => d.value),
                                        ...assistsLineData.map(d => d.value)
                                    ) + 3}
                                />

                                <View style={styles.chartLegend}>
                                    <View style={styles.legendItem}>
                                        <View style={[styles.legendDot, { backgroundColor: colors.chartRed }]} />
                                        <Text style={[styles.legendText, { color: colors.chartText }]}>Points</Text>
                                    </View>
                                    <View style={styles.legendItem}>
                                        <View style={[styles.legendDot, { backgroundColor: colors.chartGreen }]} />
                                        <Text style={[styles.legendText, { color: colors.chartText }]}>Rebounds</Text>
                                    </View>
                                    <View style={styles.legendItem}>
                                        <View style={[styles.legendDot, { backgroundColor: colors.chartBlue }]} />
                                        <Text style={[styles.legendText, { color: colors.chartText }]}>Assists</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>

                <LinearGradient
                    colors={[colors.linearGradient, 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.topBlur}
                    pointerEvents="none"
                />

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
        paddingBottom: Platform.OS === 'ios' ? 120 : 105,
    },
    section: {
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
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
    chartContainer: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        alignItems: 'center',
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: '600',
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
        marginBottom: 8,
    },
    emptyStateText: {
        fontSize: 16,
        textAlign: 'center',
    },
});