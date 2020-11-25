import React from 'react';

import { CommentsService } from 'src/services';

const CommentsContext = React.createContext(null);

const CommentsProvider = ({ children }) => {
  const [comments, setComments] = React.useState(null);
  const [error, setError] = React.useState(null);

  const getCommentsByBug = async (bugId) => {
    const thisBug = await CommentsService.getAllCommentsBug(bugId);

    setComments(thisBug);
  };

  const value = {
    comments,
    error,
    getCommentsByBug,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};

export { CommentsContext, CommentsProvider };
