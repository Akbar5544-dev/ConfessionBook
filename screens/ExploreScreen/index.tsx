import {
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppIcon, { type IconName } from '../../components/AppIcon';
import colors from '../../utils/colors';
import styles from './styles';
import useController from './useController';
import { CONVERSATIONS, MOODS, RESULT_TYPES } from './models';

type ExploreScreenProps = {
    onBackHome: () => void;
    onOpenProfile: () => void;
};

const ExploreScreen = ({ onBackHome, onOpenProfile }: ExploreScreenProps) => {
    const {
        query, setQuery, submittedQuery, openSearch, goBack, activeMood,
        setActiveMood, resultType, setResultType, liked, toggleLike, saved, toggleSaved,
    } = useController();
    const showingResults = submittedQuery.length > 0;

    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Pressable
                        accessibilityLabel={showingResults ? 'Back to Explore' : 'Back'}
                        accessibilityRole="button"
                        hitSlop={8}
                        onPress={showingResults ? goBack : onBackHome}
                        testID="explore-back"
                        style={styles.backButton}>
                        {showingResults ? (
                            <AppIcon color={colors.text} name="back" size={22} />
                        ) : null}
                    </Pressable>
                    <Text style={styles.headerTitle}>
                        {showingResults ? 'Search' : 'Find your kind of world'}
                    </Text>
                </View>

                <View style={styles.searchBox}>
                    <AppIcon color={colors.textSecondary} name="search" size={22} />
                    <TextInput
                        accessibilityLabel="Search anything"
                        onChangeText={setQuery}
                        onSubmitEditing={() => openSearch(query)}
                        placeholder="Search anything"
                        placeholderTextColor={colors.textSecondary}
                        returnKeyType="search"
                        style={styles.searchInput}
                        value={query}
                    />
                </View>

                {showingResults ? (
                    <View style={styles.results}>
                        <View style={styles.resultTabs}>
                            {RESULT_TYPES.map(type => {
                                const selected = type === resultType;
                                return (
                                    <Pressable
                                        accessibilityRole="tab"
                                        accessibilityState={{ selected }}
                                        key={type}
                                        onPress={() => setResultType(type)}
                                        testID={`explore-result-tab-${type}`}
                                        style={[
                                            styles.resultTab,
                                            selected && styles.selectedResultTab,
                                        ]}>
                                        <Text
                                            style={[
                                                styles.resultTabLabel,
                                                selected && styles.selectedResultTabLabel,
                                            ]}>
                                            {type}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>

                        {resultType === 'Posts' ? (
                            <SearchPostCard
                                liked={liked}
                                onLike={toggleLike}
                                onOpenProfile={onOpenProfile}
                                onSave={toggleSaved}
                                query={submittedQuery}
                                saved={saved}
                            />
                        ) : resultType === 'Reels' ? (
                            <SearchReelResult
                                onOpenProfile={onOpenProfile}
                                query={submittedQuery}
                            />
                        ) : (
                            <SearchPersonResult onOpenProfile={onOpenProfile} />
                        )}
                    </View>
                ) : (
                    <View>
                        <Text style={styles.sectionTitle}>
                            Trending conversations
                        </Text>
                        <View style={styles.trendingList}>
                            {CONVERSATIONS.map(item => (
                                <Pressable
                                    accessibilityRole="button"
                                    key={item.tag}
                                    onPress={() => openSearch(item.query)}
                                    style={styles.trendingCard}>
                                    <AppIcon
                                        color={colors.accent}
                                        name="sparkle"
                                        size={23}
                                    />
                                    <View style={styles.trendingCopy}>
                                        <Text style={styles.trendingTag}>
                                            {item.tag}
                                        </Text>
                                        <Text style={styles.trendingVoices}>
                                            {item.voices}
                                        </Text>
                                    </View>
                                    <AppIcon
                                        color={colors.textSecondary}
                                        name="arrow"
                                        size={20}
                                    />
                                </Pressable>
                            ))}
                        </View>

                        <Text style={[styles.sectionTitle, styles.moodHeading]}>
                            Explore by mood
                        </Text>
                        <View style={styles.moods}>
                            {MOODS.map(mood => {
                                const selected = mood === activeMood;
                                return (
                                    <Pressable
                                        accessibilityRole="tab"
                                        accessibilityState={{ selected }}
                                        key={mood}
                                        onPress={() => setActiveMood(mood)}
                                        style={[
                                            styles.moodChip,
                                            selected && styles.selectedMoodChip,
                                        ]}>
                                        <Text
                                            style={[
                                                styles.moodLabel,
                                                selected && styles.selectedMoodLabel,
                                            ]}>
                                            {mood}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

type SearchPostCardProps = {
    liked: boolean;
    onLike: () => void;
    onOpenProfile: () => void;
    onSave: () => void;
    query: string;
    saved: boolean;
};

const SearchPostCard = ({
    liked,
    onLike,
    onOpenProfile,
    onSave,
    query,
    saved,
}: SearchPostCardProps) => {
    const normalizedQuery = query.toLowerCase();
    const isSmallWins =
        normalizedQuery.includes('small') || normalizedQuery.includes('wins');
    const isLateNight = normalizedQuery.includes('night');
    const reminder = isSmallWins
        ? 'You can start again. As many times as you need.'
        : isLateNight
          ? 'It is okay to take your time becoming who you are.'
          : 'Your ideas deserve a little room to grow.';
    const category = isSmallWins
        ? 'A little reminder'
        : isLateNight
          ? 'For the quiet hours'
          : 'A thought to keep';

    return (
        <View style={styles.postCard}>
            <View style={styles.postHeader}>
                <Pressable
                    accessibilityRole="button"
                    onPress={onOpenProfile}
                    style={styles.avatar}>
                    <AppIcon color={colors.dark} name="face" size={22} />
                </Pressable>
                <Pressable
                    accessibilityRole="button"
                    onPress={onOpenProfile}
                    style={styles.authorCopy}>
                    <Text style={styles.authorName}>Moonlit Fox</Text>
                    <Text style={styles.authorMeta}>@moonlit.fox · 2h</Text>
                </Pressable>
                <Pressable accessibilityLabel="More post options" hitSlop={8}>
                    <AppIcon color={colors.textSecondary} name="more" />
                </Pressable>
            </View>

            <Text style={styles.postCategory}>{category}</Text>
            <Text style={styles.postMessage}>{reminder}</Text>
            <Text style={styles.postTags}>
                #{normalizedQuery.replace(/\s+/g, '')} #realthoughts
            </Text>

            <View style={styles.postActions}>
                <View style={styles.socialActions}>
                    <ResultAction
                        active={liked}
                        icon="heart"
                        label={liked ? '129' : '128'}
                        onPress={onLike}
                    />
                    <ResultAction icon="chat" label="24" />
                    <ResultAction icon="share" />
                    <Pressable
                        accessibilityLabel={saved ? 'Remove saved post' : 'Save post'}
                        accessibilityRole="button"
                        onPress={onSave}>
                        <AppIcon
                            color={saved ? colors.accent : colors.textSecondary}
                            name="bookmark"
                            size={20}
                        />
                    </Pressable>
                </View>
                <Pressable accessibilityRole="button" style={styles.tipButton}>
                    <Text style={styles.tipLabel}>Tip</Text>
                    <AppIcon color={colors.dark} name="sparkle" size={16} />
                </Pressable>
            </View>
        </View>
    );
};

type ResultActionProps = {
    active?: boolean;
    icon: IconName;
    label?: string;
    onPress?: () => void;
};

const ResultAction = ({
    active = false,
    icon,
    label,
    onPress,
}: ResultActionProps) => {
    const content = (
        <>
            <AppIcon
                color={active ? colors.accent : colors.textSecondary}
                name={icon}
                size={20}
            />
            {label ? <Text style={styles.actionCount}>{label}</Text> : null}
        </>
    );

    if (!onPress) {
        return <View style={styles.socialAction}>{content}</View>;
    }

    return (
        <Pressable
            accessibilityLabel={label}
            accessibilityRole="button"
            onPress={onPress}
            style={styles.socialAction}>
            {content}
        </Pressable>
    );
};

const SearchReelResult = ({
    onOpenProfile,
    query,
}: {
    onOpenProfile: () => void;
    query: string;
}) => (
    <Pressable
        accessibilityRole="button"
        style={styles.reelResult}>
        <View style={styles.reelArtwork}>
            <View style={styles.reelSun} />
            <AppIcon color={colors.text} name="sparkle" size={29} />
        </View>
        <Text style={styles.reelTitle}>A quieter kind of progress</Text>
        <Pressable accessibilityRole="button" onPress={onOpenProfile}>
            <Text style={styles.reelMeta}>
                Moonlit Fox · #{query.replace(/\s+/g, '')}
            </Text>
        </Pressable>
    </Pressable>
);

const SearchPersonResult = ({
    onOpenProfile,
}: {
    onOpenProfile: () => void;
}) => (
    <Pressable
        accessibilityRole="button"
        onPress={onOpenProfile}
        style={styles.personResult}>
        <View style={styles.avatar}>
            <AppIcon color={colors.dark} name="face" size={22} />
        </View>
        <View style={styles.authorCopy}>
            <Text style={styles.authorName}>Moonlit Fox</Text>
            <Text style={styles.authorMeta}>
                @moonlit.fox · thoughtful moments
            </Text>
        </View>
        <View style={styles.followButton}>
            <Text style={styles.followLabel}>Follow</Text>
        </View>
    </Pressable>
);

export default ExploreScreen;
