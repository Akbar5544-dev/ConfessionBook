import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppIcon from '../../components/AppIcon';
import type { HomeTabsParamList } from '../../navigation/HomeTabs';
import colors from '../../utils/colors';
import { PROMPT_SUGGESTIONS } from './models';
import styles from './styles';
import useController from './useController';

const AIScreen = () => {
    const navigation =
        useNavigation<BottomTabNavigationProp<HomeTabsParamList>>();
    const { chooseSuggestion, draft, messages, sendMessage, setDraft } =
        useController();
    const hasConversation = messages.length > 0;

    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.screen}>
                <View style={styles.header}>
                    <Pressable
                        accessibilityLabel="Back to Home"
                        accessibilityRole="button"
                        hitSlop={8}
                        onPress={() => navigation.navigate('Home')}
                        style={styles.backButton}>
                        <AppIcon color={colors.text} name="back" size={21} />
                    </Pressable>
                    <Text style={styles.title}>Your thought partner</Text>
                </View>
                <Text style={styles.subtitle}>
                    Private AI space · not a public post
                </Text>

                {!hasConversation ? (
                    <ScrollView
                        contentContainerStyle={[
                            styles.content,
                            styles.emptyContent,
                        ]}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}>
                        <CompanionMark />
                        <Text style={styles.welcome}>
                            What’s on your mind today?
                        </Text>
                        <View style={styles.suggestionList}>
                            {PROMPT_SUGGESTIONS.map(suggestion => (
                                <Pressable
                                    accessibilityRole="button"
                                    key={suggestion.title}
                                    onPress={() =>
                                        chooseSuggestion(suggestion.prompt)
                                    }
                                    style={styles.suggestion}>
                                    <AppIcon
                                        color={colors.accent}
                                        name="sparkle"
                                        size={22}
                                    />
                                    <View style={styles.suggestionCopy}>
                                        <Text style={styles.suggestionTitle}>
                                            {suggestion.title}
                                        </Text>
                                        <Text
                                            style={styles.suggestionDescription}>
                                            {suggestion.description}
                                        </Text>
                                    </View>
                                    <AppIcon
                                        color={colors.textSecondary}
                                        name="arrow"
                                        size={18}
                                    />
                                </Pressable>
                            ))}
                        </View>
                    </ScrollView>
                ) : (
                    <ScrollView
                        contentContainerStyle={styles.conversation}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}>
                        <CompanionMark compact />
                        {messages.map(message => (
                            <View
                                key={message.id}
                                style={[
                                    styles.message,
                                    message.role === 'user'
                                        ? styles.userMessage
                                        : styles.assistantMessage,
                                ]}>
                                <Text style={styles.messageText}>
                                    {message.text}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                )}

                <View style={styles.composer}>
                    <TextInput
                        accessibilityLabel="Message VEIL AI"
                        onChangeText={setDraft}
                        onSubmitEditing={() => sendMessage(draft)}
                        placeholder="Ask VEIL AI..."
                        placeholderTextColor={colors.textSecondary}
                        returnKeyType="send"
                        style={styles.composerInput}
                        value={draft}
                    />
                    <Pressable
                        accessibilityLabel="Send message"
                        accessibilityRole="button"
                        disabled={!draft.trim()}
                        onPress={() => sendMessage(draft)}
                        testID="ai-send-message"
                        hitSlop={8}>
                        <AppIcon
                            color={draft.trim() ? colors.accent : colors.textMuted}
                            name="arrow"
                            size={22}
                        />
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const CompanionMark = ({ compact = false }: { compact?: boolean }) => (
    <View
        accessibilityLabel="VEIL AI companion"
        accessible
        style={[styles.companion, compact && styles.compactCompanion]}>
        <View style={[styles.companionRing, compact && styles.compactRing]}>
            <View style={[styles.companionFace, compact && styles.compactFace]}>
                <View style={styles.eyeRow}>
                    <View style={[styles.eye, compact && styles.compactEye]} />
                    <View style={[styles.eye, compact && styles.compactEye]} />
                </View>
                <View style={[styles.mouth, compact && styles.compactMouth]} />
            </View>
        </View>
        <View style={[styles.orbitDot, compact && styles.compactOrbitDot]} />
        <View style={[styles.smallDot, compact && styles.compactSmallDot]} />
    </View>
);

export default AIScreen;
