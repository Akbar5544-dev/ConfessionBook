import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import NavKeys, { RootStackParamList } from './NavKeys';

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationStack = () => (
    <Stack.Navigator
        initialRouteName={NavKeys.OnboardingScreen}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen
            name={NavKeys.OnboardingScreen}
            component={OnboardingScreen}
        />
    </Stack.Navigator>
);

export default NavigationStack;
