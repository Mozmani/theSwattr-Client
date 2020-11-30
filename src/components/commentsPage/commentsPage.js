import React from 'react';

import { CommentsService } from 'src/services';
import { CommentsContext, UserContext } from 'src/context';
import useFormState from 'src/hooks/useFormState';

const CommentsPage = ({ match }) => {
  const [header, setHeader] = React.useState('');
  const [, setError] = React.useState(null);

  const { userData } = React.useContext(UserContext);
  const {
    bugComments,
    getCommentsByBug,
    addNewComment,
  } = React.useContext(CommentsContext);

  const { formFields, handleOnChange } = useFormState({
    bug_id: match.params.bugId,
    comment: '',
  });

  const [commentsLoaded, setLoaded] = React.useState(false);

  if (commentsLoaded === false) {
    let commentData = getCommentsByBug(match.params.bugId);
    setLoaded(true);
    if (bugComments !== null) {
      setHeader(bugComments[0].bugName);
    }
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

    await addNewComment(res.newComment);
  };

  // React.useEffect(() => {
  //   const fetchComments = async () => {
  //     await getCommentsByBug(match.params.bugId);
  //   };

  //   if (bugComments && !header) {
  //     if (bugComments[0].message) {
  //       setError(bugComments[0].message);
  //     } else setHeader(bugComments[0].bugName);
  //   }

  //   if (!bugComments) {
  //     fetchComments();
  //   }
  // }, [getCommentsByBug, match.params.bugId, header, bugComments]);



  const renderComments =
    bugComments && !bugComments[0].message
      ? bugComments.map((comment) => {
          return (
            <li key={comment.id}>
              <h4>{`Author: ${comment.userName}`}</h4>
              <p>{comment.comment}</p>
              <p>{comment.createdDate}</p>
            </li>
          );
        })
      : null;

  const commentField = (
    <label htmlFor="newComment" className="new-comment-label">
      <textarea
        required
        id="newComment"
        value={formFields.comment}
        onChange={handleOnChange('comment')}
        className="comment-input"
      />
    </label>
  );
    console.log(bugComments)
  return (
    <div className="comments-container">
      <h3>{header}</h3>
      <ul className="comments">{renderComments}</ul>
      <form onSubmit={handleSubmit} className="new-comment-form">
        {commentField}
        <footer>
          <button type="submit" className="new-comment-submit">
            Submit
          </button>
        </footer>
      </form>
    </div>
  );
};
export default CommentsPage;
