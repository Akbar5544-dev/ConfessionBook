import colors from '../../utils/colors';

type FeedFilter = 'For you' | 'Following' | 'Reels';
type HomeView = 'feed' | 'reels';
type FeedReaction = 'like' | null;

type FeedReply = {
    author: string;
    message: string;
    color: string;
    likes: number;
};

const HOME_FILTERS: FeedFilter[] = ['For you', 'Following', 'Reels'];

const INITIAL_REPLIES: FeedReply[] = [
    {
        author: 'Quiet Comet',
        message: 'Needed this today. Thank you for putting it into words.',
        color: colors.accent,
        likes: 12,
    },
    {
        author: 'Silver Echo',
        message: 'One small step at a time.',
        color: colors.lavender,
        likes: 0,
    },
];

export type { FeedFilter, FeedReaction, FeedReply, HomeView };
export { HOME_FILTERS, INITIAL_REPLIES };
