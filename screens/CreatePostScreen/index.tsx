import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
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
import type { HomeTabsParamList } from '../../navigation/HomeTabs';
import { useFeedPosts } from '../../contexts/FeedPostsContext';
import colors from '../../utils/colors';
import styles from './styles';
import useController from './useController';
import { AI_TOOLS } from './models';

const CreatePostScreen = () => {
    const navigation =
        useNavigation<BottomTabNavigationProp<HomeTabsParamList>>();
    const { publishPost } = useFeedPosts();
    const {
        activeTool,
        anonymous,
        blurFaces,
        chooseAITool,
        followersOnly,
        goBack,
        mediaAdded,
        resetComposer,
        removeLocation,
        setAnonymous,
        setBlurFaces,
        setFollowersOnly,
        setMediaAdded,
        setRemoveLocation,
        setStage,
        setThought,
        stage,
        suggestion,
        thought,
        tryAnotherSuggestion,
        useSuggestion,
    } = useController();
    const isThoughtValid = thought.trim().length > 0;

    const onBack = () => {
        if (stage === 'compose') {
            navigation.navigate('Home');
        } else {
            goBack();
        }
    };

    const screenTitle = {
        compose: "What's on your mind?",
        privacy: 'Before you share',
        ai: 'A little help with words',
        preview: 'Ready to share?',
    }[stage];

    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <>
                        <View style={styles.header}>
                            <Pressable
                                accessibilityLabel="Back"
                                accessibilityRole="button"
                                hitSlop={10}
                                onPress={onBack}
                                style={styles.backButton}>
                                <AppIcon color={colors.text} name="back" size={21} />
                            </Pressable>
                            <Text style={styles.heading}>{screenTitle}</Text>
                        </View>

                        {stage === 'compose' ? (
                            <ComposeStage
                                anonymous={anonymous}
                                mediaAdded={mediaAdded}
                                onAnonymousChange={setAnonymous}
                                onMediaPress={() => setStage('privacy')}
                                onPreview={() => setStage('preview')}
                                onTextChange={setThought}
                                onWriteWithAI={() => setStage('ai')}
                                thought={thought}
                                valid={isThoughtValid}
                            />
                        ) : null}

                        {stage === 'privacy' ? (
                            <PrivacyStage
                                blurFaces={blurFaces}
                                onBlurFacesChange={setBlurFaces}
                                onLocationChange={setRemoveLocation}
                                onUseMedia={() => {
                                    setMediaAdded(true);
                                    setStage('compose');
                                }}
                                removeLocation={removeLocation}
                            />
                        ) : null}

                        {stage === 'ai' ? (
                            <AIStage
                                activeTool={activeTool}
                                onChooseTool={chooseAITool}
                                onTryAnother={tryAnotherSuggestion}
                                onUseSuggestion={useSuggestion}
                                suggestion={suggestion}
                                thought={thought}
                            />
                        ) : null}

                        {stage === 'preview' ? (
                            <PreviewStage
                                anonymous={anonymous}
                                followersOnly={followersOnly}
                                mediaAdded={mediaAdded}
                                onAudiencePress={() =>
                                    setFollowersOnly(value => !value)
                                }
                                onKeepEditing={goBack}
                                onPublish={() => {
                                    publishPost({
                                        id: `${Date.now()}`,
                                        author: anonymous ? 'Quiet Comet' : 'Moonlit Fox',
                                        handle: anonymous ? '@quiet.comet' : '@moonlit.fox',
                                        anonymous,
                                        content: thought.trim(),
                                        mediaAdded,
                                    });
                                    resetComposer();
                                    navigation.navigate('Home');
                                }}
                                thought={thought}
                            />
                        ) : null}
                </>
            </ScrollView>
        </SafeAreaView>
    );
};

type ComposeStageProps = {
    anonymous: boolean;
    mediaAdded: boolean;
    onAnonymousChange: (value: boolean) => void;
    onMediaPress: () => void;
    onPreview: () => void;
    onTextChange: (value: string) => void;
    onWriteWithAI: () => void;
    thought: string;
    valid: boolean;
};

const ComposeStage = ({
    anonymous,
    mediaAdded,
    onAnonymousChange,
    onMediaPress,
    onPreview,
    onTextChange,
    onWriteWithAI,
    thought,
    valid,
}: ComposeStageProps) => (
    <>
        <View style={styles.identityRow}>
            <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: anonymous }}
                onPress={() => onAnonymousChange(!anonymous)}
                style={[styles.anonymousPill, !anonymous && styles.anonymousPillOff]}>
                <Text
                    style={[
                        styles.anonymousLabel,
                        !anonymous && styles.anonymousLabelOff,
                    ]}>
                    {anonymous ? 'Anonymous' : 'Use my alias'}
                </Text>
            </Pressable>
            <View style={styles.avatar}>
                <AppIcon color={colors.dark} name="face" size={21} />
            </View>
            <Text style={styles.authorName}>
                {anonymous ? 'Quiet Comet' : 'Moonlit Fox'}
            </Text>
        </View>

        <View style={styles.composeInputCard}>
            <TextInput
                accessibilityLabel="Write your post"
                maxLength={2000}
                multiline
                onChangeText={onTextChange}
                placeholder="Write what is on your mind..."
                placeholderTextColor={colors.textSecondary}
                style={styles.thoughtInput}
                textAlignVertical="top"
                value={thought}
            />
            <Text style={styles.characterCount}>{thought.length} / 2,000</Text>
        </View>

        <OptionCard
            description={mediaAdded ? 'Media added · privacy checks enabled' : 'Show a moment, keep your identity'}
            icon="image"
            onPress={onMediaPress}
            title={mediaAdded ? 'Review media privacy' : 'Add photo or video'}
        />
        <OptionCard
            description="Your thought. A clearer expression."
            icon="sparkle"
            onPress={onWriteWithAI}
            title="Write with AI"
        />
        <View style={styles.bottomActions}>
            <PrimaryButton
                disabled={!valid}
                label="Preview post"
                onPress={onPreview}
            />
        </View>
    </>
);

type PrivacyStageProps = {
    blurFaces: boolean;
    onBlurFacesChange: (value: boolean) => void;
    onLocationChange: (value: boolean) => void;
    onUseMedia: () => void;
    removeLocation: boolean;
};

const PrivacyStage = ({
    blurFaces,
    onBlurFacesChange,
    onLocationChange,
    onUseMedia,
    removeLocation,
}: PrivacyStageProps) => (
    <>
        <Text style={styles.subtitle}>A quick check to keep your identity yours</Text>
        <View
            accessibilityLabel="Preview of selected media"
            accessible
            style={styles.landscape}>
            <View style={styles.landscapeSky} />
            <View style={styles.landscapeSun} />
            <View style={styles.hillBack} />
            <View style={styles.hillFront} />
            <View style={styles.landscapePath} />
        </View>
        <ToggleOption
            active={blurFaces}
            description="Suggested · 1 face detected"
            icon="face"
            onPress={() => onBlurFacesChange(!blurFaces)}
            title="Blur faces"
        />
        <ToggleOption
            active={removeLocation}
            description="On by default"
            icon="location"
            onPress={() => onLocationChange(!removeLocation)}
            title="Remove location metadata"
        />
        <Text style={styles.privacyNote}>
            Review visible names, signs and reflections.
        </Text>
        <View style={styles.bottomActions}>
            <PrimaryButton label="Use this media" onPress={onUseMedia} />
        </View>
    </>
);

type AIStageProps = {
    activeTool: (typeof AI_TOOLS)[number];
    onChooseTool: (tool: (typeof AI_TOOLS)[number]) => void;
    onTryAnother: () => void;
    onUseSuggestion: () => void;
    suggestion: string;
    thought: string;
};

const AIStage = ({
    activeTool,
    onChooseTool,
    onTryAnother,
    onUseSuggestion,
    suggestion,
    thought,
}: AIStageProps) => (
    <>
        <Text style={styles.subtitle}>AI suggestions · you stay in control</Text>
        <View style={styles.originalCard}>
            <Text style={styles.cardEyebrow}>Your original thought</Text>
            <Text style={styles.originalText}>{thought}</Text>
        </View>
        <View style={styles.toolRow}>
            {AI_TOOLS.map(tool => {
                const selected = tool === activeTool;
                return (
                    <Pressable
                        accessibilityRole="tab"
                        accessibilityState={{ selected }}
                        key={tool}
                        onPress={() => onChooseTool(tool)}
                        style={[styles.tool, selected && styles.activeTool]}>
                        <Text
                            style={[
                                styles.toolLabel,
                                selected && styles.activeToolLabel,
                            ]}>
                            {tool}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
        <View style={styles.suggestionCard}>
            <AppIcon color={colors.accent} name="sparkle" size={19} />
            <Text style={styles.suggestionText}>{suggestion}</Text>
        </View>
        <Text style={styles.footnote}>
            AI can make mistakes. Review before sharing.
        </Text>
        <PrimaryButton label="Use this version" onPress={onUseSuggestion} />
        <SecondaryButton label="Try another" onPress={onTryAnother} />
    </>
);

type PreviewStageProps = {
    anonymous: boolean;
    followersOnly: boolean;
    mediaAdded: boolean;
    onAudiencePress: () => void;
    onKeepEditing: () => void;
    onPublish: () => void;
    thought: string;
};

const PreviewStage = ({
    anonymous,
    followersOnly,
    mediaAdded,
    onAudiencePress,
    onKeepEditing,
    onPublish,
    thought,
}: PreviewStageProps) => (
    <>
        <Text style={styles.subtitle}>
            {anonymous ? 'Anonymous post · visible under your alias' : 'Public post · visible under your alias'}
        </Text>
        <View style={styles.previewCard}>
            <View style={styles.previewHeader}>
                <View style={styles.previewAvatar}>
                    <AppIcon color={colors.dark} name="face" size={20} />
                </View>
                <View style={styles.previewMeta}>
                    <Text style={styles.previewName}>
                        {anonymous ? 'Quiet Comet' : 'Moonlit Fox'}
                    </Text>
                    <Text style={styles.previewHandle}>
                        {anonymous ? '@quiet.comet' : '@moonlit.fox'} · now
                    </Text>
                </View>
                <AppIcon color={colors.textSecondary} name="more" size={18} />
            </View>
            {mediaAdded ? (
                <View style={styles.landscape}>
                    <View style={styles.landscapeSky} />
                    <View style={styles.landscapeSun} />
                    <View style={styles.hillBack} />
                    <View style={styles.hillFront} />
                    <View style={styles.landscapePath} />
                </View>
            ) : null}
            <Text style={styles.cardEyebrow}>A little reminder</Text>
            <Text style={styles.previewCaption}>{thought}</Text>
            <Text style={styles.previewTags}>#smallwins #realthoughts</Text>
            <View style={styles.previewActions}>
                <AppIcon color={colors.textSecondary} name="heart" size={18} />
                <Text style={styles.optionDescription}>128</Text>
                <AppIcon color={colors.textSecondary} name="chat" size={18} />
                <Text style={styles.optionDescription}>24</Text>
                <AppIcon color={colors.textSecondary} name="share" size={18} />
                <AppIcon color={colors.textSecondary} name="bookmark" size={18} />
            </View>
        </View>
        <Pressable
            accessibilityRole="button"
            onPress={onAudiencePress}
            style={styles.audience}>
            <AppIcon color={colors.accent} name="face" size={19} />
            <View style={styles.optionCopy}>
                <Text style={styles.optionTitle}>Audience</Text>
                <Text style={styles.optionDescription}>
                    {followersOnly ? 'People you follow' : 'Everyone in VEIL'}
                </Text>
            </View>
            <AppIcon color={colors.textSecondary} name="arrow" size={18} />
        </Pressable>
        <PrimaryButton label="Publish post" onPress={onPublish} />
        <SecondaryButton label="Keep editing" onPress={onKeepEditing} />
    </>
);

type OptionCardProps = {
    description: string;
    icon: IconName;
    onPress: () => void;
    title: string;
};

const OptionCard = ({ description, icon, onPress, title }: OptionCardProps) => (
    <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={styles.optionCard}>
        <View style={styles.optionIcon}>
            <AppIcon color={colors.accent} name={icon} size={19} />
        </View>
        <View style={styles.optionCopy}>
            <Text style={styles.optionTitle}>{title}</Text>
            <Text style={styles.optionDescription}>{description}</Text>
        </View>
        <AppIcon color={colors.textSecondary} name="arrow" size={17} />
    </Pressable>
);

type ToggleOptionProps = {
    active: boolean;
    description: string;
    icon: IconName;
    onPress: () => void;
    title: string;
};

const ToggleOption = ({
    active,
    description,
    icon,
    onPress,
    title,
}: ToggleOptionProps) => (
    <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: active }}
        onPress={onPress}
        style={styles.optionCard}>
        <View style={styles.optionIcon}>
            <AppIcon color={colors.accent} name={icon} size={19} />
        </View>
        <View style={styles.optionCopy}>
            <Text style={styles.optionTitle}>{title}</Text>
            <Text style={styles.optionDescription}>{description}</Text>
        </View>
        <AppIcon
            color={active ? colors.textSecondary : colors.border}
            name={active ? 'check' : 'plus'}
            size={18}
        />
    </Pressable>
);

type ActionButtonProps = {
    disabled?: boolean;
    label: string;
    onPress: () => void;
};

const PrimaryButton = ({ disabled = false, label, onPress }: ActionButtonProps) => (
    <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
            styles.primaryButton,
            disabled && styles.primaryButtonDisabled,
            pressed && !disabled && styles.primaryButtonDisabled,
        ]}>
        <Text style={styles.primaryLabel}>{label}</Text>
        <AppIcon color={colors.dark} name="arrow" size={19} />
    </Pressable>
);

const SecondaryButton = ({ label, onPress }: ActionButtonProps) => (
    <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={styles.secondaryButton}>
        <Text style={styles.secondaryLabel}>{label}</Text>
        <AppIcon color={colors.text} name="arrow" size={18} />
    </Pressable>
);

export default CreatePostScreen;
