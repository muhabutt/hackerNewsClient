import React from 'react';

// All Best news ids context. Which are fetched from hacker news, and save inside StoryIdsContext
// This context is available for all screens.
const StoryIdsContext = React.createContext<Array<number>>([]);

export default StoryIdsContext;
