import { useCallback, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import type { NavigationProp } from '../../navigation/NavKeys';
import NavKeys from '../../navigation/NavKeys';
import { ONBOARDING_PAGES } from './models';

const useController = () => {
    const navigation = useNavigation<NavigationProp>();
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const touchStart = useRef<{ pageX: number; pageY: number } | null>(null);
    const currentPage = ONBOARDING_PAGES[currentPageIndex];

    const onContinue = useCallback(() => {
        if (currentPageIndex < ONBOARDING_PAGES.length - 1) {
            setCurrentPageIndex(index => index + 1);
            return;
        }

        navigation.replace(NavKeys.HomeScreen);
    }, [currentPageIndex, navigation]);

    const onPrevious = useCallback(() => {
        setCurrentPageIndex(index => Math.max(index - 1, 0));
    }, []);

    const onSkip = useCallback(
        () => navigation.replace(NavKeys.HomeScreen),
        [navigation],
    );

    const onTouchStart = useCallback(
        (event: NativeSyntheticEvent<NativeTouchEvent>) => {
            touchStart.current = {
                pageX: event.nativeEvent.pageX,
                pageY: event.nativeEvent.pageY,
            };
        },
        [],
    );

    const onTouchEnd = useCallback(
        (event: NativeSyntheticEvent<NativeTouchEvent>) => {
            const start = touchStart.current;
            touchStart.current = null;

            if (!start) {
                return;
            }

            const dx = event.nativeEvent.pageX - start.pageX;
            const dy = event.nativeEvent.pageY - start.pageY;

            if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy) * 1.2) {
                return;
            }

            if (dx < 0) {
                onContinue();
            } else {
                onPrevious();
            }
        },
        [onContinue, onPrevious],
    );

    return {
        currentPage,
        currentPageIndex,
        onContinue,
        onPrevious,
        onSkip,
        onTouchEnd,
        onTouchStart,
        pageCount: ONBOARDING_PAGES.length,
    };
};

export default useController;
