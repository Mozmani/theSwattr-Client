import React from "react";

import "./commentsPage.scss";

import { CommentFields } from "src/helpers/formFields";
import { CommentsService } from "src/services";
import { CommentsContext, UserContext } from "src/context";
import useFormState from "src/hooks/useFormState";

const CommentsPage = ({ match, history }) => {
  const [header, setHeader] = React.useState("");
  const [, setError] = React.useState(null);
  const [commentsLoaded, setLoaded] = React.useState(false);
  const [bugName, setBugName] = React.useState(null)

  const id = match.params.bugId;

  const { userData } = React.useContext(UserContext);
  const {
    bugComments,
    addNewComment,
    getCommentsByBug,
  } = React.useContext(CommentsContext);

  const { formFields, handleOnChange } = useFormState({
    bug_id: match.params.bugId,
    comment: "",
  });

  

  
  const loadPage = async () => {
  
    await getCommentsByBug(id);
    if (bugComments !== null) {
      if (bugComments[0].message) {
        setHeader(bugComments[0].message);
        setBugName(bugComments[0].bugName)
      } else {
        setHeader(bugComments[0].bugName);
      }

      setLoaded(true);
    }
  };

  if (commentsLoaded === false) {
    loadPage();

  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    formFields.user_name = userData.userName;
    const res = await CommentsService.postNewComment(formFields);

    if (res.error) {
      console.error(res);
      setError(res.error);
      return;
    }

    await addNewComment(match.params.bugId);
    formFields.comment = "";

     console.log('bugcomas', bugComments[0].bugName)
      if (header !== bugComments[0].bugName){
       
       setHeader(bugName)
      }
    
     
  };

  const openEdit = () => {
    if (userData.dev === true) {
      return (
        <div className="edit-button-holder">
          <button
            className="edit-button"
            onClick={() => {
              history.push(`/dashboard/edit/${match.params.bugId}`);
            }}
          >
            Edit bug
          </button>
        </div>
      );
    }
  };

  const goBack = () => {
    history.goBack();
  };

 
  const renderComments =
    bugComments && !bugComments[0].message
      ? bugComments.map((comment) => {
          return (
            <li className="comment-item" key={comment.id}>
              <div className="auth-and-comm">
                <p className="comment-author">{`Author: ${comment.userName}`}</p>
                <p className="comment-content">
                  {`"`}
                  {comment.comment}
                  {`"`}
                </p>
              </div>
              <div className="comment-time">
                <p>{comment.createdDate}</p>
              </div>
            </li>
          );
        })
      : null;

  const commentField = CommentFields.getInputFields(formFields, handleOnChange);

  
  return (
    <div className="comments-container">
      <button onClick={() => goBack()} className="go-back-button">
        Back to Bugs
      </button>
      <h3 className="welcome">{header}</h3>
      {openEdit()}
      <ul className="comments">{renderComments}</ul>
      <form onSubmit={handleSubmit} className="new-comment-form">
        <h3 className="welcome">Add A Comment</h3>
        {commentField}
        <footer className="form-footer">
          <button type="submit" className="new-comment-submit">
            Submit
          </button>
        </footer>
      </form>
    </div>
  );
};
export default CommentsPage;
