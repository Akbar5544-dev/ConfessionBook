import {
    Image,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingButton from '../../components/OnboardingButton';
import OnboardingProgress from '../../components/OnboardingProgress';
import useController from './useController';
import styles from './styles';

const OnboardingScreen = () => {
    const { width } = useWindowDimensions();
    const {
        currentPage,
        currentPageIndex,
        onContinue,
        onSkip,
        onTouchEnd,
        onTouchStart,
        pageCount,
    } = useController();
    const artworkSize = Math.min(width - 32, 350);

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <StatusBar barStyle="light-content" />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.logo}>VEIL</Text>
                    <Pressable
                        accessibilityRole="button"
                        onPress={onSkip}
                        hitSlop={8}>
                        <Text style={styles.skip}>Skip</Text>
                    </Pressable>
                </View>

                <View
                    onTouchEnd={onTouchEnd}
                    onTouchStart={onTouchStart}
                    testID="onboarding-slide"
                    style={styles.main}>
                    <Image
                        accessibilityLabel={currentPage.artworkLabel}
                        accessible
                        resizeMode="contain"
                        source={currentPage.artwork}
                        style={[
                            styles.artwork,
                            { width: artworkSize, height: artworkSize },
                        ]}
                    />

                    <View style={styles.copy}>
                        <Text style={styles.title}>{currentPage.title}</Text>
                        <Text style={styles.description}>
                            {currentPage.description}
                        </Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <OnboardingProgress
                        activeIndex={currentPageIndex}
                        count={pageCount}
                    />
                    <OnboardingButton
                        label={currentPage.buttonLabel}
                        onPress={onContinue}
                    />
                    <Text style={styles.footnote}>
                        No login. Just a new perspective.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OnboardingScreen;
