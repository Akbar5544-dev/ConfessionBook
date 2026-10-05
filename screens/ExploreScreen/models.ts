export const CONVERSATIONS = [
    { tag: '#late-night-thoughts', voices: '2.8k voices', query: 'late night thoughts' },
    { tag: '#smallwins', voices: '1.4k voices', query: 'small wins' },
    { tag: '#creative-corner', voices: '920 voices', query: 'creative corner' },
];

export const MOODS = ['Reflective', 'Funny', 'Creative', 'Support'];
export const RESULT_TYPES = ['Posts', 'Reels', 'People'] as const;
export type ResultType = (typeof RESULT_TYPES)[number];
