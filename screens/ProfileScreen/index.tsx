import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppIcon from '../../components/AppIcon';
import { useFeedPosts } from '../../contexts/FeedPostsContext';
import type { HomeTabsParamList } from '../../navigation/HomeTabs';
import colors from '../../utils/colors';
import { PROFILE_TABS, SAVED_FILTERS } from './models';
import styles from './styles';
import useController from './useController';

type ProfileScreenProps = BottomTabScreenProps<HomeTabsParamList, 'You'>;

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
  const isOwnProfile =
    route.params?.isOwnProfile === true ||
    (!route.params?.displayName && !route.params?.username);
  const {
    activeTab,
    isFollowing,
    savedFilter,
    setActiveTab,
    setSavedFilter,
    toggleFollowing,
  } = useController(isOwnProfile);
  const { posts: publishedPosts } = useFeedPosts();
  const displayName = isOwnProfile
    ? 'Quiet Comet'
    : route.params?.displayName ?? 'Moonlit Fox';
  const username = isOwnProfile
    ? 'quiet.comet'
    : route.params?.username ?? 'moonlit.fox';
  const tabs = isOwnProfile
    ? PROFILE_TABS
    : PROFILE_TABS.filter(tab => tab !== 'Saved');
  const showingSaved = isOwnProfile && activeTab === 'Saved';

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Back to Home"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => navigation.navigate('Home')}
            testID="profile-back-home"
            style={styles.backButton}
          >
            <AppIcon color={colors.text} name="back" size={21} />
          </Pressable>
          <Text style={styles.title}>
            {showingSaved
              ? 'Saved for later'
              : isOwnProfile
              ? 'Your space'
              : displayName}
          </Text>
          {isOwnProfile && !showingSaved ? (
            <Pressable
              accessibilityLabel="Appearance"
              accessibilityRole="button"
              style={styles.headerAction}
            >
              <AppIcon color={colors.textSecondary} name="sun" size={20} />
            </Pressable>
          ) : null}
        </View>

        {showingSaved ? (
          <Text style={styles.savedSubtitle}>
            Only you can see this collection
          </Text>
        ) : null}

        {!showingSaved ? (
          <View style={styles.profile}>
            <View style={[styles.avatar, isOwnProfile && styles.ownAvatar]}>
              <AppIcon color={colors.dark} name="face" size={38} />
            </View>
            <Text style={styles.displayName}>{displayName}</Text>
            <Text style={styles.username}>@{username}</Text>
            <Text style={styles.bio}>
              {isOwnProfile
                ? 'Anonymous by design. Human by nature.'
                : 'Collecting moments, sharing a little light.'}
            </Text>

            <View style={styles.stats}>
              <Stat label="posts" value={isOwnProfile ? '18' : '42'} />
              <Stat
                label="followers"
                value={isOwnProfile ? '248' : isFollowing ? '1.3k' : '1.2k'}
              />
              <Stat label="following" value={isOwnProfile ? '92' : '180'} />
            </View>

            {isOwnProfile ? (
              <Pressable
                accessibilityRole="button"
                style={styles.editProfileButton}
              >
                <Text style={styles.editProfileLabel}>
                  Edit anonymous profile
                </Text>
                <AppIcon color={colors.text} name="arrow" size={18} />
              </Pressable>
            ) : (
              <View style={styles.actions}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: isFollowing }}
                  onPress={toggleFollowing}
                  style={[
                    styles.followButton,
                    isFollowing && styles.followingButton,
                  ]}
                  testID="profile-follow"
                >
                  <Text
                    style={[
                      styles.followLabel,
                      isFollowing && styles.followingLabel,
                    ]}
                  >
                    {isFollowing ? 'Following · Tap to unfollow' : 'Follow'}
                  </Text>
                  <AppIcon
                    color={isFollowing ? colors.text : colors.dark}
                    name="arrow"
                    size={18}
                  />
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  style={styles.messageButton}
                >
                  <Text style={styles.messageLabel}>Message</Text>
                  <AppIcon color={colors.text} name="arrow" size={18} />
                </Pressable>
              </View>
            )}
          </View>
        ) : null}

        {!showingSaved ? (
          <View style={styles.tabs}>
            {tabs.map(tab => {
              const selected = activeTab === tab;
              return (
                <Pressable
                  accessibilityRole="tab"
                  accessibilityState={{ selected }}
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  testID={`profile-tab-${tab}`}
                  style={[styles.tab, selected && styles.activeTab]}
                >
                  <Text
                    style={[styles.tabLabel, selected && styles.activeTabLabel]}
                  >
                    {tab}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}

        {showingSaved ? (
          <View>
            <View style={styles.savedFilters}>
              {SAVED_FILTERS.map(filter => {
                const selected = savedFilter === filter;
                return (
                  <Pressable
                    accessibilityRole="tab"
                    accessibilityState={{ selected }}
                    key={filter}
                    onPress={() => setSavedFilter(filter)}
                    testID={`profile-saved-filter-${filter}`}
                    style={[
                      styles.savedFilter,
                      selected && styles.activeSavedFilter,
                    ]}
                  >
                    <Text
                      style={[
                        styles.savedFilterLabel,
                        selected && styles.activeSavedFilterLabel,
                      ]}
                    >
                      {filter}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {savedFilter !== 'Reels' ? <SavedPostCard /> : null}
            {savedFilter === 'All' ? (
              <Pressable
                accessibilityRole="button"
                style={styles.savedCollection}
              >
                <AppIcon color={colors.accent} name="bookmark" size={20} />
                <View style={styles.postIdentity}>
                  <Text style={styles.postAuthor}>Little reminders</Text>
                  <Text style={styles.postMeta}>12 saved thoughts</Text>
                </View>
                <AppIcon color={colors.textSecondary} name="arrow" size={17} />
              </Pressable>
            ) : null}
            {savedFilter === 'Reels' ? (
              <View style={styles.reelGrid}>
                {['A quieter morning', 'Small moments'].map((title, index) => (
                  <ReelTile index={index} key={title} title={title} />
                ))}
              </View>
            ) : null}
          </View>
        ) : null}

        {!showingSaved && activeTab === 'Posts' ? (
          <View>
            {isOwnProfile
              ? publishedPosts.map(post => (
                  <ProfilePost
                    author={post.author}
                    key={post.id}
                    username={post.handle.replace(/^@/, '')}
                    caption={post.content}
                    meta="now"
                    tags="#smallwins #realthoughts"
                  />
                ))
              : null}
            <ProfilePost
              author={displayName}
              username={username}
              caption="You can start again. As many times as you need."
              meta="2h"
              tags="#smallwins #realthoughts"
            />
            <ProfilePost
              author={displayName}
              username={username}
              caption="Found a little quiet in the chaos."
              meta="1d"
              tags="#slowdays #somewherebeautiful"
            />
          </View>
        ) : null}

        {!showingSaved && activeTab === 'Reels' ? (
          <View style={styles.reelGrid}>
            {[
              'A softer morning',
              'Take the scenic route',
              'One small win',
              'Quiet moments',
            ].map((title, index) => (
              <ReelTile index={index} key={title} title={title} />
            ))}
          </View>
        ) : null}

        {!showingSaved && activeTab === 'Shared' ? (
          <View style={styles.emptyState}>
            <AppIcon color={colors.textSecondary} name="share" size={25} />
            <Text style={styles.emptyLabel}>Shared posts will appear here</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.stat}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

type ProfilePostProps = {
  author: string;
  caption: string;
  meta: string;
  tags: string;
  username: string;
};

const ProfilePost = ({
  author,
  caption,
  meta,
  tags,
  username,
}: ProfilePostProps) => (
  <View style={styles.postCard}>
    <View style={styles.postHeader}>
      <View style={styles.postAvatar}>
        <AppIcon color={colors.dark} name="face" size={20} />
      </View>
      <View style={styles.postIdentity}>
        <Text style={styles.postAuthor}>{author}</Text>
        <Text style={styles.postMeta}>
          @{username} · {meta}
        </Text>
      </View>
      <AppIcon color={colors.textSecondary} name="more" size={19} />
    </View>
    <Text style={styles.postCaption}>{caption}</Text>
    <Text style={styles.postTags}>{tags}</Text>
  </View>
);

const SavedPostCard = () => (
  <View style={styles.postCard}>
    <View style={styles.postHeader}>
      <View style={styles.postAvatar}>
        <AppIcon color={colors.dark} name="face" size={20} />
      </View>
      <View style={styles.postIdentity}>
        <Text style={styles.postAuthor}>Moonlit Fox</Text>
        <Text style={styles.postMeta}>@moonlit.fox · 2h</Text>
      </View>
      <AppIcon color={colors.textSecondary} name="more" size={19} />
    </View>
    <View style={styles.savedArtwork}>
      <View style={styles.savedArtworkSun} />
      <View style={styles.savedHillBack} />
      <View style={styles.savedHillFront} />
      <View style={styles.savedPath} />
    </View>
    <Text style={styles.savedCaption}>Found a little quiet in the chaos.</Text>
    <Text style={styles.postTags}>#slowdays #somewherebeautiful</Text>
    <View style={styles.savedActions}>
      <AppIcon color={colors.textSecondary} name="heart" size={17} />
      <Text style={styles.postMeta}>128</Text>
      <AppIcon color={colors.textSecondary} name="chat" size={17} />
      <Text style={styles.postMeta}>24</Text>
      <AppIcon color={colors.textSecondary} name="share" size={17} />
      <AppIcon color={colors.accent} name="bookmark" size={17} />
      <View style={styles.savedTip}>
        <Text style={styles.savedTipLabel}>Tip</Text>
        <AppIcon color={colors.dark} name="sparkle" size={14} />
      </View>
    </View>
  </View>
);

const ReelTile = ({ index, title }: { index: number; title: string }) => (
  <Pressable
    accessibilityLabel={`Play reel: ${title}`}
    accessibilityRole="button"
    style={[styles.reelTile, index % 2 === 1 && styles.alternateReelTile]}
  >
    <View style={styles.reelSun} />
    <View style={styles.reelHillBack} />
    <View style={styles.reelHillFront} />
    <View style={styles.reelPath} />
    <View style={styles.reelPlayIcon}>
      <Svg height={14} viewBox="0 0 16 16" width={14}>
        <Path
          d="M4 2.5v11l9-5.5z"
          fill="none"
          stroke={colors.text}
          strokeWidth={1.5}
        />
      </Svg>
    </View>
  </Pressable>
);

export default ProfileScreen;
