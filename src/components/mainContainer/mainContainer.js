import React from 'react';
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from '../../routes/utils/privateRoute'
import CommentsPage from '../CommentsPage/CommentsPage'
import BugsContainer from '../bugsContainer/bugsContainer'
import AddBugs from '../AddBugs/addBugs'
import {Link} from 'react-router-dom'

import { BugsContext, CommentsContext } from '../../context';
import { CommentsService } from 'src/services';

const MainContainer = () => {
  const { bugs } = React.useContext(BugsContext);
  const { app} = React.useContext(BugsContext);
  const { comments, getCommentsByBug } = React.useContext(
    CommentsContext,
  );

  const addBugsButton =() => {
    if (app !== null){
      return (
      
      
      <button>
        <Link to='/dashboard/add'>
        Add a bug!
        </Link>
        
      </button>

     
      
      )
    } else {
      return
    }
  }
  /*
  <Route
  path='/dashboard'
  render={(props) => (
    <BugsContainer {...props} addBugsButton={addBugsButton} />
  )}
/>
  */

  return (
   <>
      <Switch>
      <Route exact path="/dashboard/bug/:bugId" component={CommentsPage} />
      <Route exact path="/dashboard/add" component={AddBugs} />
      <Route
  path='/dashboard'
  render={(props) => (
    <BugsContainer {...props} addBugsButton={addBugsButton} />
  )}
/>
      
      </Switch>
      
    </>
  );
};

export default MainContainer;
