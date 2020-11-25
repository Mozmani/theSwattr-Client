import React from 'react';

import { CommentsService } from 'src/services';

const CommentsContext = React.createContext(null);

const CommentsProvider = ({ children }) => {
  const [comments, setComments] = React.useState(null);
  const [error, setError] = React.useState(null);

  // React.useEffect(() => {
  //   const getComments = async () => {
  //     const commData = await CommentsService.getAllComments();

  //     if (!commData || 'error' in commData) {
  //       console.error(commData.error);
  //       setError(commData.error);
  //     } else setComments(commData);
  //   };

  //   getComments();
  // }, []);
  const getCommentsByBug = async (bug) => {
    const thisBug = CommentsService.getAllCommentsBug(bug);

    setComments(thisBug)
  }




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
