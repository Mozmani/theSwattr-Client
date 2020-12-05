import React from 'react';

import { CommentsService } from 'src/services';

const CommentsContext = React.createContext(null);
//comments context provider
const CommentsProvider = ({ children }) => {
  const [bugComments, setBugComments] = React.useState(null);
  const [error, setError] = React.useState(null);

  //gets comments by bug id
  const getCommentsByBug = async (bugId) => {
    const res = await CommentsService.getAllBugComments(bugId);

    if (!res || 'error' in res) {
      console.error(res.error);
      setError(res.error);
    } else setBugComments(res.bugComments);
  };

  //calls get comments on new comment
  const addNewComment = (id) => {
    getCommentsByBug(id)
  };

  const value = {
    bugComments,
    error,
    getCommentsByBug,
    addNewComment,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};

export { CommentsContext, CommentsProvider };