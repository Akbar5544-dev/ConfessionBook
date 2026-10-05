import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { HomeTabsParamList } from './HomeTabs';

export type RootStackParamList = {
	OnboardingScreen: undefined;
	HomeScreen: NavigatorScreenParams<HomeTabsParamList> | undefined;
};

const NavKeys = {
	OnboardingScreen: 'OnboardingScreen' as const,
	HomeScreen: 'HomeScreen' as const,
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type { NavigationProp };
export default NavKeys;
