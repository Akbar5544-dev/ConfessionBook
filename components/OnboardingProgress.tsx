import { StyleSheet, View } from 'react-native';
import colors from '../utils/colors';

type OnboardingProgressProps = {
    activeIndex: number;
    count: number;
};

const OnboardingProgress = ({
    activeIndex,
    count,
}: OnboardingProgressProps) => (
    <View
        accessibilityLabel={`Onboarding page ${activeIndex + 1} of ${count}`}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 1, max: count, now: activeIndex + 1 }}
        style={styles.container}>
        {Array.from({ length: count }, (_, index) => (
            <View
                key={index}
                style={[
                    styles.dot,
                    index === activeIndex ? styles.activeDot : styles.inactiveDot,
                ]}
            />
        ))}
    </View>
);

const styles = StyleSheet.create({
    container: {
        minHeight: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 35,
    },
    dot: {
        height: 6,
        borderRadius: 3,
    },
    activeDot: {
        width: 14,
        backgroundColor: colors.accent,
    },
    inactiveDot: {
        width: 6,
        backgroundColor: colors.border,
    },
});

export default OnboardingProgress;
