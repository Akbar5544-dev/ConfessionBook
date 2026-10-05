import { Pressable, StyleSheet, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import colors from '../utils/colors';

type OnboardingButtonProps = {
    label: string;
    onPress: () => void;
};

const OnboardingButton = ({ label, onPress }: OnboardingButtonProps) => (
    <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
        ]}>
        <Text style={styles.label}>{label}</Text>
        <Svg
            accessibilityElementsHidden
            height={20}
            width={20}
            viewBox="0 0 24 24">
            <Path
                d="M4.75 12h14.5m-6-6 6 6-6 6"
                fill="none"
                stroke={colors.dark}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
            />
        </Svg>
    </Pressable>
);

const styles = StyleSheet.create({
    button: {
        minHeight: 52,
        borderRadius: 15,
        backgroundColor: colors.accent,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonPressed: {
        opacity: 0.82,
    },
    label: {
        color: colors.dark,
        fontSize: 14,
        fontWeight: '700',
    },
});

export default OnboardingButton;
