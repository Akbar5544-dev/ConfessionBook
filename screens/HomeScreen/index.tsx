import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
    Pressable,
    Share,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    View,
    useWindowDimensions,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppIcon, { type IconName } from '../../components/AppIcon';
import { useFeedPosts } from '../../contexts/FeedPostsContext';
import colors from '../../utils/colors';
import type { PublishedPost } from '../../models/PublishedPost';
import type { HomeTabsParamList } from '../../navigation/HomeTabs';
import styles, { reelsStyles } from './styles';
import useController from './useController';
import { HOME_FILTERS } from './models';

const HomeScreen = () => {
    const navigation =
        useNavigation<BottomTabNavigationProp<HomeTabsParamList>>();
    const {
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
        scrollRef,
        openReplies,
        onRepliesLayout,
        submitReply,
    } = useController();
    const filters = HOME_FILTERS;
    const { posts: publishedPosts } = useFeedPosts();

    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            {activeView === 'reels' ? (
                <ReelsContent
                    onFollowingPress={returnToFollowing}
                    onOpenProfile={() =>
                        navigation.navigate('You', {
                            displayName: 'Moonlit Fox',
                            isOwnProfile: false,
                            username: 'moonlit.fox',
                        })
                    }
                />
            ) : (
                <ScrollView
                    ref={scrollRef}
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <View style={styles.brand}>
                            <View style={styles.brandMark}>
                                <AppIcon color={colors.dark} name="face" size={23} />
                            </View>
                            <View>
                                <Text style={styles.brandName}>VEIL</Text>
                                <Text style={styles.tagline}>
                                    Your world, unfiltered.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.headerActions}>
                            <Pressable
                                accessibilityLabel="Messages"
                                accessibilityRole="button"
                                hitSlop={10}>
                                <AppIcon color={colors.text} name="chat" size={22} />
                            </Pressable>
                            <Pressable
                                accessibilityLabel="Appearance"
                                accessibilityRole="button"
                                hitSlop={10}>
                                <AppIcon color={colors.text} name="sun" size={22} />
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.searchBox}>
                        <AppIcon color={colors.textSecondary} name="search" />
                        <TextInput
                            accessibilityLabel="Search thoughts, reels, aliases"
                            onChangeText={setSearch}
                            placeholder="Search thoughts, reels, aliases"
                            placeholderTextColor={colors.textSecondary}
                            returnKeyType="search"
                            style={styles.searchInput}
                            value={search}
                        />
                    </View>

                    <View style={styles.filters}>
                        {filters.map(filter => {
                            const selected = filter === activeFilter;

                            return (
                                <Pressable
                                    accessibilityRole="tab"
                                    accessibilityState={{ selected }}
                                    key={filter}
                                    onPress={() => {
                                        if (filter === 'Reels') {
                                            openReels();
                                        } else {
                                            setActiveFilter(filter);
                                        }
                                    }}
                                    style={[
                                        styles.filter,
                                        selected && styles.selectedFilter,
                                    ]}>
                                    <Text
                                        style={[
                                            styles.filterLabel,
                                            selected && styles.selectedFilterLabel,
                                        ]}>
                                        {filter}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>

                    {publishedPosts.map(post => (
                        <PublishedPostCard
                            key={post.id}
                            onOpenProfile={() =>
                                navigation.navigate('You', {
                                    displayName: post.author,
                                    isOwnProfile: false,
                                    username: post.handle.replace(/^@/, ''),
                                })
                            }
                            post={post}
                        />
                    ))}

                    <View style={styles.post}>
                        <View style={styles.postHeader}>
                            <Pressable
                                accessibilityRole="button"
                                onPress={() =>
                                    navigation.navigate('You', {
                                        displayName: 'Moonlit Fox',
                                        isOwnProfile: false,
                                        username: 'moonlit.fox',
                                    })
                                }
                                style={styles.author}>
                                <View style={styles.authorAvatar}>
                                    <AppIcon color={colors.dark} name="face" size={22} />
                                </View>
                                <View>
                                    <Text style={styles.authorName}>Moonlit Fox</Text>
                                    <Text style={styles.authorMeta}>
                                        @moonlit.fox · 2h
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable
                                accessibilityLabel="More post options"
                                accessibilityRole="button"
                                hitSlop={8}>
                                <AppIcon color={colors.textSecondary} name="more" />
                            </Pressable>
                        </View>

                        <PostArtwork />

                        <Text style={styles.postCaption}>
                            Found a little quiet in the chaos.
                        </Text>
                        <Text style={styles.postTags}>
                            #slowdays #somewherebeautiful
                        </Text>

                        <View style={styles.postActions}>
                            <View style={styles.socialActions}>
                                <PostAction
                                    active={reaction === 'like'}
                                    icon="thumbUp"
                                    label={String(128 + (reaction === 'like' ? 1 : 0))}
                                    onPress={() =>
                                        setReaction(current =>
                                            current === 'like' ? null : 'like',
                                        )
                                    }
                                    testID="post-like"
                                />
                                <PostAction
                                    icon="chat"
                                    label="24"
                                    onPress={openReplies}
                                    accessibilityLabel="Comments"
                                    testID="post-comments"
                                />
                                <PostAction
                                    accessibilityLabel="Share post"
                                    icon="share"
                                    onPress={() =>
                                        Share.share({
                                            message:
                                                'Found a little quiet in the chaos. #slowdays #somewherebeautiful',
                                            title: 'Share this post',
                                        })
                                    }
                                    testID="post-share"
                                />
                                <Pressable
                                    accessibilityLabel="Save post"
                                    accessibilityRole="button"
                                    hitSlop={6}>
                                    <AppIcon
                                        color={colors.textSecondary}
                                        name="bookmark"
                                        size={21}
                                    />
                                </Pressable>
                            </View>
                            <Pressable
                                accessibilityRole="button"
                                style={styles.tipButton}>
                                <Text style={styles.tipLabel}>Tip</Text>
                                <AppIcon color={colors.dark} name="sparkle" size={16} />
                            </Pressable>
                        </View>
                    </View>

                    {repliesOpen ? (
                        <View
                            onLayout={event =>
                                onRepliesLayout(event.nativeEvent.layout.y)
                            }
                            style={styles.repliesSection}>
                            <Text style={styles.repliesHeading}>
                                {`${24 + replies.length - 2} replies`}
                            </Text>
                            <View style={styles.repliesList}>
                                {replies.map((reply, index) => (
                                    <ReplyItem
                                        author={reply.author}
                                        color={reply.color}
                                        key={`${reply.author}-${index}`}
                                        likes={reply.likes}
                                        message={reply.message}
                                        onAuthorPress={() =>
                                            navigation.navigate('You', {
                                                displayName: reply.author,
                                                isOwnProfile: false,
                                                username: reply.author
                                                    .toLowerCase()
                                                    .replace(/\s+/g, '.'),
                                            })
                                        }
                                        showReplyAction={index === 0}
                                    />
                                ))}
                            </View>
                            <View style={styles.replyComposer}>
                                <TextInput
                                    accessibilityLabel="Add a kind reply"
                                    onChangeText={setReplyText}
                                    onSubmitEditing={submitReply}
                                    placeholder="Add a kind reply..."
                                    placeholderTextColor={colors.textSecondary}
                                    returnKeyType="send"
                                    style={styles.replyInput}
                                    value={replyText}
                                />
                                <Pressable
                                    accessibilityLabel="Send reply"
                                    accessibilityRole="button"
                                    onPress={submitReply}
                                    testID="send-reply"
                                    hitSlop={8}>
                                    <AppIcon
                                        color={colors.accent}
                                        name="arrow"
                                        size={23}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    ) : null}

                    <Pressable
                        accessibilityRole="button"
                        style={styles.aiCard}>
                        <AppIcon color={colors.accent} name="sparkle" size={23} />
                        <View style={styles.aiCopy}>
                            <Text style={styles.aiTitle}>
                                A thought worth sharing?
                            </Text>
                            <Text style={styles.aiDescription}>
                                Let AI help you find the words.
                            </Text>
                        </View>
                    </Pressable>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const PublishedPostCard = ({
    onOpenProfile,
    post,
}: {
    onOpenProfile: () => void;
    post: PublishedPost;
}) => (
    <View style={styles.post}>
        <View style={styles.postHeader}>
            <Pressable
                accessibilityRole="button"
                onPress={onOpenProfile}
                style={styles.author}>
                <View style={styles.authorAvatar}>
                    <AppIcon color={colors.dark} name="face" size={22} />
                </View>
                <View>
                    <Text style={styles.authorName}>{post.author}</Text>
                    <Text style={styles.authorMeta}>{post.handle} · now</Text>
                </View>
            </Pressable>
            <Pressable
                accessibilityLabel="More post options"
                accessibilityRole="button"
                hitSlop={8}>
                <AppIcon color={colors.textSecondary} name="more" />
            </Pressable>
        </View>
        {post.mediaAdded ? <PostArtwork /> : null}
        <Text style={styles.postCaption}>{post.content}</Text>
        <Text style={styles.postTags}>#smallwins #realthoughts</Text>
        <View style={styles.postActions}>
            <View style={styles.socialActions}>
                <PostAction icon="thumbUp" label="0" />
                <PostAction icon="chat" label="0" />
                <PostAction icon="share" />
                <AppIcon color={colors.textSecondary} name="bookmark" size={21} />
            </View>
            <View style={styles.tipButton}>
                <Text style={styles.tipLabel}>Tip</Text>
                <AppIcon color={colors.dark} name="sparkle" size={16} />
            </View>
        </View>
    </View>
);

const PostArtwork = () => (
    <View
        accessible
        accessibilityLabel="Shared photo or video"
        style={styles.postArtwork}>
        <Svg
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 320 170"
            width="100%">
            <Path d="M0 0h320v170H0z" fill={colors.teal} />
            <Circle cx="244" cy="43" r="20" fill={colors.accent} />
            <Path
                d="M0 116c35-43 62-65 98-58 34 6 49 44 78 44 34 0 57-33 92-33 21 0 38 10 52 21v80H0Z"
                fill="#526F6C"
            />
            <Path
                d="M0 131c50-27 89-31 124-21 31 9 56 21 83 16 37-7 73-37 113-33v77H0Z"
                fill="#183231"
            />
            <Path
                d="M164 112c18 3 23 14 15 24-8 9-24 14-38 21"
                fill="none"
                stroke={colors.accentMuted}
                strokeLinecap="round"
                strokeWidth="10"
            />
        </Svg>
    </View>
);

type ReelsContentProps = {
    onFollowingPress: () => void;
    onOpenProfile: () => void;
};

const ReelsContent = ({
    onFollowingPress,
    onOpenProfile,
}: ReelsContentProps) => {
    const { width } = useWindowDimensions();
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const orbSize = Math.min(width * 0.44, 204);

    return (
        <SafeAreaView edges={['top']} style={reelsStyles.safeArea}>
            <StatusBar barStyle="light-content" />
            <View style={reelsStyles.stage}>
                <Svg
                    pointerEvents="none"
                    preserveAspectRatio="none"
                    style={reelsStyles.background}
                    viewBox="0 0 400 750">
                    <Path d="M0 0h400v750H0z" fill={colors.reelBackground} />
                    <Path
                        d="M0 750V505c38-145 77-292 133-292 52 0 72 131 116 218 40-67 72-120 116-120 14 0 26 7 35 17v422Z"
                        fill={colors.reelHill}
                    />
                    <Path
                        d="M0 750V573c52-58 91-84 137-85 58-1 92 49 128 76 43-61 86-103 135-99v285Z"
                        fill={colors.reelHillShadow}
                    />
                    <Path
                        d="M206 750c43-69 82-128 66-172-4-12-13-21-23-29"
                        fill="none"
                        stroke={colors.reelPath}
                        strokeLinecap="round"
                        strokeWidth="12"
                    />
                </Svg>

                <View style={reelsStyles.topBar}>
                    <Text style={reelsStyles.heading}>Reels</Text>
                    <Pressable
                        accessibilityRole="button"
                        onPress={onFollowingPress}
                        style={reelsStyles.followingChip}>
                        <Text style={reelsStyles.followingLabel}>Following</Text>
                    </Pressable>
                </View>

                <View
                    pointerEvents="none"
                    style={[
                        reelsStyles.orb,
                        {
                            width: orbSize,
                            height: orbSize,
                            borderRadius: orbSize / 2,
                        },
                    ]}
                />

                <View style={reelsStyles.actionRail}>
                    <ReelAction
                        active={liked}
                        icon="heart"
                        label={liked ? '1.3k' : '1.2k'}
                        onPress={() => setLiked(value => !value)}
                    />
                    <ReelAction icon="chat" label="86" />
                    <ReelAction icon="share" label="Share" />
                    <ReelAction
                        active={saved}
                        icon="bookmark"
                        label={saved ? 'Saved' : 'Save'}
                        onPress={() => setSaved(value => !value)}
                    />
                </View>

                <View style={reelsStyles.captionBlock}>
                    <Text style={reelsStyles.title}>Take the scenic route.</Text>
                    <Pressable
                        accessibilityRole="button"
                        onPress={onOpenProfile}
                        style={reelsStyles.creatorRow}>
                        <View style={reelsStyles.avatar}>
                            <AppIcon color={colors.dark} name="face" size={22} />
                        </View>
                        <View style={reelsStyles.creatorCopy}>
                            <Text style={reelsStyles.creatorName}>Moonlit Fox</Text>
                            <Text style={reelsStyles.creatorDescription}>
                                Original sound · quiet moments
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable
                        accessibilityRole="button"
                        style={({ pressed }) => [
                            reelsStyles.tipButton,
                            pressed && reelsStyles.tipButtonPressed,
                        ]}>
                        <Text style={reelsStyles.tipLabel}>Tip creator</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

type ReelActionProps = {
    active?: boolean;
    icon: IconName;
    label: string;
    onPress?: () => void;
};

const ReelAction = ({
    active = false,
    icon,
    label,
    onPress,
}: ReelActionProps) => {
    const content = (
        <>
            <AppIcon
                color={active ? colors.accent : colors.text}
                name={icon}
                size={27}
                strokeWidth={1.7}
            />
            <Text style={reelsStyles.actionLabel}>{label}</Text>
        </>
    );

    if (!onPress) {
        return <View style={reelsStyles.action}>{content}</View>;
    }

    return (
        <Pressable
            accessibilityLabel={label}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={onPress}
            style={reelsStyles.action}>
            {content}
        </Pressable>
    );
};

type PostActionProps = {
    accessibilityLabel?: string;
    active?: boolean;
    icon: IconName;
    label?: string;
    onPress?: () => void;
    testID?: string;
};

const PostAction = ({
    accessibilityLabel,
    active = false,
    icon,
    label,
    onPress,
    testID,
}: PostActionProps) => (
    <Pressable
        accessibilityLabel={accessibilityLabel ?? (label ? `${icon}, ${label}` : icon)}
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
        onPress={onPress}
        testID={testID}
        style={styles.postAction}>
        <AppIcon
            color={active ? colors.accent : colors.textSecondary}
            name={icon}
            size={20}
        />
        {label ? <Text style={styles.actionCount}>{label}</Text> : null}
    </Pressable>
);

type ReplyItemProps = {
    author: string;
    color: string;
    likes: number;
    message: string;
    onAuthorPress: () => void;
    showReplyAction: boolean;
};

const ReplyItem = ({
    author,
    color,
    likes,
    message,
    onAuthorPress,
    showReplyAction,
}: ReplyItemProps) => (
    <View style={styles.replyItem}>
        <View style={[styles.replyAvatar, { backgroundColor: color }]}>
            <AppIcon color={colors.dark} name="face" size={19} />
        </View>
        <View style={styles.replyContent}>
            <Pressable
                accessibilityRole="button"
                onPress={onAuthorPress}>
                <Text style={styles.replyAuthor}>{author}</Text>
            </Pressable>
            <Text style={styles.replyMessage}>{message}</Text>
            {showReplyAction ? (
                <Pressable accessibilityRole="button" style={styles.replyAction}>
                    <Text style={styles.replyActionText}>
                        Reply · {likes} likes
                    </Text>
                </Pressable>
            ) : null}
        </View>
    </View>
);

export default HomeScreen;
