import React from 'react';

import { CommentsService } from 'src/services';

const CommentsContext = React.createContext(null);

const CommentsProvider = ({ children }) => {
  const [bugComments, setBugComments] = React.useState(null);
  const [error, setError] = React.useState(null);

  const setCommentsByBugId = async (bugId) => {
    if (bugId === undefined) {
      setBugComments(null);
      return;
    }

    const res = await CommentsService.getAllBugComments(bugId);

    if (!res || 'error' in res) {
      console.error(res.error);
      setError(res.error);
    } else setBugComments(res.bugComments);
  };

  const addNewComment = (newComment) => {
    setBugComments((prev) => [...(prev || []), newComment]);
  };

  const value = {
    bugComments,
    error,
    setCommentsByBugId,
    addNewComment,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};

export { CommentsContext, CommentsProvider };
