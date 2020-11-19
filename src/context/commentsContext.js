import React from 'react';

const CommentsContext = React.createContext(null);

const CommentsProvider = ({ children }) => {
  const value = {
    checker: 'comment context',
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};

export { CommentsContext, CommentsProvider };
