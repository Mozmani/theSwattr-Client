import React from 'react';

const commentsContext = React.createContext(null);

const CommentsProvider = ({ children }) => {
  const value = {};

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};

const CommentsContext = React.useContext(commentsContext);

export { CommentsContext, CommentsProvider };
