import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { PublishedPost } from '../models/PublishedPost';

type FeedPostsContextValue = {
    posts: PublishedPost[];
    publishPost: (post: PublishedPost) => void;
};

const FeedPostsContext = createContext<FeedPostsContextValue | null>(null);

const FeedPostsProvider = ({ children }: { children: ReactNode }) => {
    const [posts, setPosts] = useState<PublishedPost[]>([]);

    const publishPost = (post: PublishedPost) => {
        setPosts(currentPosts => [post, ...currentPosts]);
    };

    return (
        <FeedPostsContext.Provider value={{ posts, publishPost }}>
            {children}
        </FeedPostsContext.Provider>
    );
};

const useFeedPosts = () => {
    const context = useContext(FeedPostsContext);
    if (!context) {
        throw new Error('useFeedPosts must be used within FeedPostsProvider');
    }
    return context;
};

export { FeedPostsProvider, useFeedPosts };
