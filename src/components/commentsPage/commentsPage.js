import React from 'react';

import { CommentsService } from 'src/services';
import { CommentsContext, UserContext } from 'src/context';

const CommentsPage = ({ match }) => {
  const [commentsLoaded, setLoaded] = React.useState(false);
  const [header, setHeader] = React.useState(false);
  const [newComment, setComment] = React.useState(null);

  const { userData } = React.useContext(UserContext);
  const { comments, getCommentsByBug } = React.useContext(
    CommentsContext,
  );

  if (commentsLoaded === false) {
    const commentData = getCommentsByBug(match.params.bugId);
    console.log(commentData);
    setLoaded(true);
    if (comments !== null) {
      setHeader(comments.comments[0].bugName);
    }
  }

  //console.log(comments)
  const mapComments =
    comments && !comments.comments[0].message
      ? comments.comments.map((item) => {
          return (
            <li key={item.id}>
              <h4>{`Author: ${item.userName}`}</h4>
              <p>{item.comment}</p>
              <p>{item.createdDate}</p>
            </li>
          );
        })
      : null;

  const addComment = async (ev) => {
    ev.preventDefault();
    let newCom = {
      user_name: userData.userName,
      bug_id: match.params.bugId,
      comment: newComment,
    };
    await CommentsService.postNewComment(newCom);
    setLoaded(false);
  };
  //console.log(comments)

  const addform = () => {
    return (
      <form
        onSubmit={(ev) => {
          addComment(ev);
        }}
      >
        <label htmlFor="newComment">Add a comment!</label>
        <textarea
          id="newComment"
          onChange={(ev) => {
            setComment(ev.currentTarget.value);
          }}
        ></textarea>
        <button>Submit</button>
      </form>
    );
  };
  //console.log(userData.userName)
  return (
    <main className="main-container">
      <h3>{header}</h3>
      <ul className="comments">{mapComments}</ul>
      {addform()}
    </main>
  );
};
export default CommentsPage;
