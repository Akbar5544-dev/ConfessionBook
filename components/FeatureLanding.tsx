import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppIcon, { type IconName } from './AppIcon';
import type { HomeTabsParamList } from '../navigation/HomeTabs';
import colors from '../utils/colors';

type FeatureScreenProps = {
    description: string;
    icon: IconName;
    title: string;
};

const FeatureScreen = ({
    description,
    icon,
    title,
}: FeatureScreenProps) => {
    const navigation = useNavigation<BottomTabNavigationProp<HomeTabsParamList>>();

    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.brandMark}>
                        <AppIcon color={colors.dark} name="face" size={23} />
                    </View>
                    <Text style={styles.brandName}>VEIL</Text>
                </View>
                <View style={styles.message}>
                    <View style={styles.icon}>
                        <AppIcon color={colors.accent} name={icon} size={30} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => navigation.navigate('Home')}
                        style={styles.backButton}>
                        <Text style={styles.backLabel}>Back to your feed</Text>
                        <AppIcon color={colors.dark} name="arrow" size={18} />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 11,
    },
    brandMark: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.accent,
    },
    brandName: {
        color: colors.text,
        fontSize: 21,
        fontWeight: '800',
    },
    message: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 68,
        height: 68,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface,
        marginBottom: 20,
    },
    title: {
        color: colors.text,
        fontSize: 26,
        fontWeight: '800',
        textAlign: 'center',
    },
    description: {
        color: colors.textSecondary,
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'center',
        marginTop: 10,
        maxWidth: 300,
    },
    backButton: {
        minHeight: 46,
        paddingHorizontal: 17,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
        backgroundColor: colors.accent,
        marginTop: 25,
    },
    backLabel: {
        color: colors.dark,
        fontSize: 13,
        fontWeight: '700',
    },
});

export default FeatureScreen;
