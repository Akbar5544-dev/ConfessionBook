type ProfileParams = {
  displayName?: string;
  isOwnProfile?: boolean;
  username?: string;
};

type ProfileTab = 'Posts' | 'Reels' | 'Shared' | 'Saved';
type SavedFilter = 'All' | 'Posts' | 'Reels';

const PROFILE_TABS: ProfileTab[] = ['Posts', 'Reels', 'Shared', 'Saved'];
const SAVED_FILTERS: SavedFilter[] = ['All', 'Posts', 'Reels'];

export type { ProfileParams, ProfileTab, SavedFilter };
export { PROFILE_TABS, SAVED_FILTERS };
