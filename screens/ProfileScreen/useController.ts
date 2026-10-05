import { useEffect, useState } from 'react';
import type { ProfileTab, SavedFilter } from './models';

const useController = (isOwnProfile: boolean) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('Posts');
  const [savedFilter, setSavedFilter] = useState<SavedFilter>('All');
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setActiveTab('Posts');
    setSavedFilter('All');
    setIsFollowing(false);
  }, [isOwnProfile]);

  return {
    activeTab,
    isFollowing,
    savedFilter,
    setActiveTab,
    setSavedFilter,
    toggleFollowing: () => setIsFollowing(value => !value),
  };
};

export default useController;
