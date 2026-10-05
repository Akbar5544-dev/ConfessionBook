import { useState } from 'react';
import type { AITool, CreateStage } from './models';
import { AI_SUGGESTIONS, AI_TOOLS, INITIAL_THOUGHT } from './models';

const useController = () => {
    const [stage, setStage] = useState<CreateStage>('compose');
    const [thought, setThought] = useState(INITIAL_THOUGHT);
    const [suggestion, setSuggestion] = useState(AI_SUGGESTIONS.Refine);
    const [activeTool, setActiveTool] = useState<AITool>('Refine');
    const [anonymous, setAnonymous] = useState(true);
    const [blurFaces, setBlurFaces] = useState(true);
    const [removeLocation, setRemoveLocation] = useState(true);
    const [mediaAdded, setMediaAdded] = useState(false);
    const [followersOnly, setFollowersOnly] = useState(false);

    const chooseAITool = (tool: AITool) => {
        setActiveTool(tool);
        setSuggestion(AI_SUGGESTIONS[tool]);
    };

    const tryAnotherSuggestion = () => {
        const nextIndex = (AI_TOOLS.indexOf(activeTool) + 1) % AI_TOOLS.length;
        chooseAITool(AI_TOOLS[nextIndex]);
    };

    const useSuggestion = () => {
        setThought(suggestion);
        setStage('compose');
    };

    const resetComposer = () => {
        setThought(INITIAL_THOUGHT);
        setStage('compose');
    };

    const goBack = () => {
        setStage('compose');
    };

    return {
        activeTool,
        anonymous,
        blurFaces,
        chooseAITool,
        followersOnly,
        goBack,
        mediaAdded,
        removeLocation,
        resetComposer,
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
    };
};

export default useController;
