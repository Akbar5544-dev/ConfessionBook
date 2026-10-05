import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppIcon, { type IconName } from './AppIcon';
import colors from '../utils/colors';

const tabIcons: Record<string, IconName> = {
    Home: 'home',
    Explore: 'search',
    Create: 'plus',
    AI: 'sparkle',
    You: 'face',
};

const HomeTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <View style={styles.bar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    typeof options.tabBarLabel === 'string'
                        ? options.tabBarLabel
                        : options.title ?? route.name;
                const isFocused = state.index === index;
                const tint = isFocused ? colors.accent : colors.textMuted;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!event.defaultPrevented && route.name === 'You') {
                        navigation.navigate('You', {
                            displayName: undefined,
                            isOwnProfile: true,
                            username: undefined,
                        });
                    } else if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return (
                    <Pressable
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        accessibilityRole="tab"
                        accessibilityState={{ selected: isFocused }}
                        key={route.key}
                        onPress={onPress}
                        style={styles.tab}>
                        {route.name === 'Create' ? (
                            <View style={styles.createIcon}>
                                <AppIcon color={colors.dark} name="plus" size={24} />
                            </View>
                        ) : (
                            <AppIcon
                                color={tint}
                                name={tabIcons[route.name]}
                                size={21}
                            />
                        )}
                        <Text
                            style={[
                                styles.label,
                                { color: isFocused ? colors.accent : colors.textMuted },
                            ]}>
                            {label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.background,
    },
    bar: {
        minHeight: 68,
        marginHorizontal: 18,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tab: {
        flex: 1,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
    },
    createIcon: {
        width: 40,
        height: 40,
        marginTop: -13,
        borderRadius: 13,
        backgroundColor: colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 10,
        lineHeight: 13,
    },
});

export default HomeTabBar;
