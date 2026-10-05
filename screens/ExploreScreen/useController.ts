import { useState } from 'react';
import type { ResultType } from './models';

const useController = () => {
    const [query, setQuery] = useState('');
    const [submittedQuery, setSubmittedQuery] = useState('');
    const [activeMood, setActiveMood] = useState('Reflective');
    const [resultType, setResultType] = useState<ResultType>('Posts');
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    const openSearch = (value: string) => {
        const normalizedQuery = value.trim();
        if (!normalizedQuery) {
            return;
        }

        setQuery(normalizedQuery);
        setSubmittedQuery(normalizedQuery);
        setResultType('Posts');
    };

    const goBack = () => {
        setSubmittedQuery('');
        setResultType('Posts');
    };

    return {
        query,
        setQuery,
        submittedQuery,
        openSearch,
        goBack,
        activeMood,
        setActiveMood,
        resultType,
        setResultType,
        liked,
        toggleLike: () => setLiked(value => !value),
        saved,
        toggleSaved: () => setSaved(value => !value),
    };
};

export default useController;
