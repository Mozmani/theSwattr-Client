import React from 'react';
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from '../../routes/utils/privateRoute'
import CommentsPage from '../CommentsPage/CommentsPage'
import BugsContainer from '../bugsContainer/bugsContainer'

import { BugsContext, CommentsContext } from '../../context';
import { CommentsService } from 'src/services';

const MainContainer = () => {
  const { bugs } = React.useContext(BugsContext);
  const { comments, getCommentsByBug } = React.useContext(
    CommentsContext,
  );

  // const renderBugs = bugs
  //   ? Object.keys(bugs).map((severity) => {
  //       if (bugs[severity].length) {
  //         return bugs[severity].map((bug) => (
  //           <li
  //             key={bug.bugName}
  //             onClick={() => {
  //               getCommentsByBug(bug.id);
  //             }}
  //           >
  //             <p>{bug.bugName}</p>
  //             <p>{bug.description}</p>
  //             <p>{bug.createdDate}</p>
  //             {comments &&
  //               comments.comments.map((comm) => (
  //                 <div key={comm.id}>
  //                   <p>{comm.comment}</p>
  //                   <p>{comm.createdDate}</p>
  //                 </div>
  //               ))}
  //           </li>
  //         ));
  //       }
  //     })
  //   : null;

  // console.log({ MainContainer: { bugs, comments } });

  return (
   <>
      <Switch>
      <PrivateRoute exact path="/dashboard/bug/:bugId" component={CommentsPage} />
      <PrivateRoute exact path="/dashboard" component={BugsContainer} />
      </Switch>
      
    </>
  );
};

export default MainContainer;
