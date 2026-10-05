import type { ImageSourcePropType } from 'react-native';

type OnboardingPage = {
    artwork: ImageSourcePropType;
    artworkLabel: string;
    buttonLabel: string;
    description: string;
    title: string;
};

const ONBOARDING_PAGES: OnboardingPage[] = [
    {
        artwork: require('../../assets/images/Confession1.png'),
        artworkLabel: 'An anonymous face surrounded by orbiting dots',
        buttonLabel: 'Continue',
        title: 'Be yourself.\nStay unknown.',
        description:
            'Share your thoughts without sharing your identity. No name, email or login needed.',
    },
    {
        artwork: require('../../assets/images/Confession2.png'),
        artworkLabel: 'An anonymous face with a conversation card',
        buttonLabel: 'Continue',
        title: 'Real thoughts.\nReal connections.',
        description:
            'Find your people through posts, reels and conversations that feel like you.',
    },
    {
        artwork: require('../../assets/images/Confession3.png'),
        artworkLabel: 'An anonymous face surrounded by orbiting dots',
        buttonLabel: 'Enter VEIL',
        title: 'Your voice.\nA little amplified.',
        description:
            'Create with AI, support voices you love and make this space your own.',
    },
];

export type { OnboardingPage };
export { ONBOARDING_PAGES };
