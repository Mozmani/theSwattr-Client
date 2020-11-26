import React from "react";
import PrivateRoute from "../../routes/utils/privateRoute";

import { BugsContext, CommentsContext } from "../../context";
import { CommentsService } from "src/services";

const CommentsPage = (props) => {
  const { bugs } = React.useContext(BugsContext);
  const { comments, getCommentsByBug } = React.useContext(CommentsContext);
  const [commentsLoaded, setLoaded] = React.useState(false);
  const [header, setHeader] = React.useState(false);

  if (commentsLoaded === false) {
    let commentData = getCommentsByBug(props.match.params.bugId);
    setLoaded(true);
    if(comments !== null){
      setHeader(comments.comments[0].bugName)
      
    }
    
  }
  //console.log(comments)

    const mapComments = comments?
    comments.comments.map((item) => {
        
    
    return (
          <li key={item.id}>
            <h4>{`Author: ${item.userName}`}</h4>
            <p>{item.comment}</p>
            <p>{item.createdDate}</p>
          </li>
        );
      })  : null;
    
  

  return (
    <main className="main-container">
      <h3>{header}</h3>
      <ul className="comments">
  
        {mapComments}
      </ul>
    </main>
  );
};

export default CommentsPage;
