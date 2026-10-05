import { useState } from 'react';
import type { AIMessage } from './models';
import { getAssistantResponse, PROMPT_SUGGESTIONS } from './models';

const useController = () => {
    const [draft, setDraft] = useState('');
    const [messages, setMessages] = useState<AIMessage[]>([]);

    const sendMessage = (text: string) => {
        const message = text.trim();
        if (!message) {
            return;
        }

        setMessages(current => [
            ...current,
            { id: Date.now(), role: 'user', text: message },
            {
                id: Date.now() + 1,
                role: 'assistant',
                text: getAssistantResponse(message),
            },
        ]);
        setDraft('');
    };

    const chooseSuggestion = (prompt: string) => {
        const suggestion = PROMPT_SUGGESTIONS.find(item => item.prompt === prompt);
        if (!suggestion) {
            return;
        }

        setMessages(current => [
            ...current,
            { id: Date.now(), role: 'user', text: suggestion.prompt },
            {
                id: Date.now() + 1,
                role: 'assistant',
                text: suggestion.response,
            },
        ]);
    };

    return {
        chooseSuggestion,
        draft,
        messages,
        sendMessage,
        setDraft,
    };
};

export default useController;
