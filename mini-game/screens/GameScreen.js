import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import PrimaryButton from '../components/ui/PrimaryButton';
import NumberContainer from '../components/game/NumberContainer';
import InstructionText from '../components/ui/InstructionText';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }

    return rndNum;
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver();
        }
    }, [currentGuess, userNumber, onGameOver]);

    function nextGuessHandler(direction) {
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert(
                '거짓말하지 마세요!',
                '거짓말은 잘못된 행동이에요...',
                [
                    { text: '미안해요...', style: 'cancel' }
                ]
            );

            return;
        }

        direction === 'lower'
            ? maxBoundary = currentGuess
            : minBoundary = currentGuess + 1;

        const newRndNum = generateRandomBetween(minBoundary, maxBoundary, currentGuess);

        setCurrentGuess(newRndNum);
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText>Higher or lower?</InstructionText>
                <View>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>
                </View>
            </Card>
            <View>
                LOG ROUNDS
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
});