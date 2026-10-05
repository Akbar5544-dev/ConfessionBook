import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { FeedPostsProvider } from '../contexts/FeedPostsContext';
import HomeTabBar from '../components/HomeTabBar';
import CreatePostScreen from '../screens/CreatePostScreen';
import AIScreen from '../screens/AIScreen';
import ExploreScreen from '../screens/ExploreScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import type { ProfileParams } from '../screens/ProfileScreen/models';

type HomeTabsParamList = {
    AI: undefined;
    Create: undefined;
    Explore: undefined;
    Home: undefined;
    You: ProfileParams | undefined;
};

const Tab = createBottomTabNavigator<HomeTabsParamList>();

const ExploreTabScreen = () => {
    const navigation =
        useNavigation<BottomTabNavigationProp<HomeTabsParamList>>();

    return (
        <ExploreScreen
            onBackHome={() => navigation.navigate('Home')}
            onOpenProfile={() =>
                navigation.navigate('You', {
                    displayName: 'Moonlit Fox',
                    isOwnProfile: false,
                    username: 'moonlit.fox',
                })
            }
        />
    );
};

const renderHomeTabBar = (props: BottomTabBarProps) => (
    <HomeTabBar {...props} />
);

const HomeTabs = () => (
    <FeedPostsProvider>
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{ animation: 'none', headerShown: false }}
            tabBar={renderHomeTabBar}>
            <Tab.Screen component={HomeScreen} name="Home" />
            <Tab.Screen component={ExploreTabScreen} name="Explore" />
            <Tab.Screen component={CreatePostScreen} name="Create" />
            <Tab.Screen component={AIScreen} name="AI" />
            <Tab.Screen component={ProfileScreen} name="You" />
        </Tab.Navigator>
    </FeedPostsProvider>
);

export type { HomeTabsParamList };
export default HomeTabs;
