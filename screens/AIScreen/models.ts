type PromptSuggestion = {
    title: string;
    description: string;
    prompt: string;
    response: string;
};

type AIMessage = {
    id: number;
    role: 'user' | 'assistant';
    text: string;
};

const PROMPT_SUGGESTIONS: PromptSuggestion[] = [
    {
        title: 'Help me express a feeling',
        description: 'Turn a rough thought into a post',
        prompt: 'Help me express a feeling',
        response:
            'Start with the feeling as it is. You could write: “I have been carrying a lot lately, and I am learning to give myself room to feel it.” What part of that feels closest to your experience?',
    },
    {
        title: 'Find my creative spark',
        description: 'Ideas for your next reel',
        prompt: 'Find my creative spark',
        response:
            'Try a quiet, simple moment: show one small thing that made today feel lighter, then pair it with a line about why it mattered.',
    },
    {
        title: 'Reflect on my day',
        description: 'A gentle prompt to start writing',
        prompt: 'Reflect on my day',
        response:
            'Here is a gentle place to begin: what is one moment from today you want to remember, even if it seemed small?',
    },
];

const getAssistantResponse = (message: string) => {
    const normalized = message.toLowerCase();

    if (normalized.includes('feel')) {
        return 'You do not have to find perfect words right away. Try naming what you feel, what brought it up, and what you need next.';
    }

    if (normalized.includes('idea') || normalized.includes('creative')) {
        return 'Look for a small detail from your day—a sound, a place, or a kind gesture—and build your next post around that.';
    }

    if (normalized.includes('day') || normalized.includes('reflect')) {
        return 'Take a breath and think back: what challenged you today, and what is one thing you did well despite it?';
    }

    return 'I’m here to help you explore that. What feels like the most important part to put into words?';
};

export type { AIMessage, PromptSuggestion };
export { getAssistantResponse, PROMPT_SUGGESTIONS };
