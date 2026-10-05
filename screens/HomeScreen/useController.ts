import { useRef, useState } from 'react';
import type { ComponentRef } from 'react';
import { ScrollView } from 'react-native';
import colors from '../../utils/colors';
import type { FeedFilter, FeedReaction, FeedReply, HomeView } from './models';
import { INITIAL_REPLIES } from './models';

const useController = () => {
    const [activeFilter, setActiveFilter] = useState<FeedFilter>('For you');
    const [activeView, setActiveView] = useState<HomeView>('feed');
    const [search, setSearch] = useState('');
    const [reaction, setReaction] = useState<FeedReaction>(null);
    const [repliesOpen, setRepliesOpen] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [replies, setReplies] = useState<FeedReply[]>(INITIAL_REPLIES);
    const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);
    const shouldScrollToReplies = useRef(false);

    const openReplies = () => {
        shouldScrollToReplies.current = !repliesOpen;
        setRepliesOpen(!repliesOpen);
    };

    const onRepliesLayout = (offset: number) => {
        if (!shouldScrollToReplies.current) {
            return;
        }

        shouldScrollToReplies.current = false;
        scrollRef.current?.scrollTo({
            y: Math.max(offset - 12, 0),
            animated: true,
        });
    };

    const submitReply = () => {
        const message = replyText.trim();
        if (!message) {
            return;
        }

        setReplies(current => [
            ...current,
            { author: 'You', message, color: colors.accent, likes: 0 },
        ]);
        setReplyText('');
    };

    const openReels = () => setActiveView('reels');
    const returnToFollowing = () => {
        setActiveFilter('Following');
        setActiveView('feed');
    };

    return {
        activeFilter,
        setActiveFilter,
        activeView,
        openReels,
        returnToFollowing,
        search,
        setSearch,
        reaction,
        setReaction,
        repliesOpen,
        replyText,
        setReplyText,
        replies,
        setReplies,
        scrollRef,
        openReplies,
        onRepliesLayout,
        submitReply,
    };
};

export default useController;
