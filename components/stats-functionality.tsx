import { Player } from '../app/types';

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


export { calculateAverage, getTopPerformer, playerStats };

