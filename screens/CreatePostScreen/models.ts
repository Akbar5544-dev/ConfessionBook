type CreateStage = 'compose' | 'privacy' | 'ai' | 'preview';
type AITool = 'Refine' | 'Shorten' | 'Translate';

const INITIAL_THOUGHT =
    'Today I realised that small progress still counts.';

const AI_TOOLS: AITool[] = ['Refine', 'Shorten', 'Translate'];

const AI_SUGGESTIONS: Record<AITool, string> = {
    Refine: 'Small steps still move you forward. Today, that was enough.',
    Shorten: 'Small progress still counts.',
    Translate: 'Today, I learned that even small progress matters.',
};

export type { AITool, CreateStage };
export { AI_SUGGESTIONS, AI_TOOLS, INITIAL_THOUGHT };
