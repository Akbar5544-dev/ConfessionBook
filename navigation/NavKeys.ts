import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
	OnboardingScreen: undefined;
};

const NavKeys = {
	OnboardingScreen: 'OnboardingScreen' as const,
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type { NavigationProp };
export default NavKeys;
