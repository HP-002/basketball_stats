import { useAppTheme } from "@/hooks/AppThemeContext"
import { Pressable, StyleSheet, Text } from "react-native"


export default function FilterButton({ index, trait, handleSortPlayers}: { index: number, trait: string, handleSortPlayers: (trait: string) => void}) {
    const colors = useAppTheme().colors

    return (
        <Pressable
            key={index}
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: colors.buttonBackground, shadowColor: colors.shadowColor },
                pressed && styles.buttonPressed
            ]}
            onPress={() => handleSortPlayers(trait)}
        >
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>{trait}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        marginRight: 12,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
})