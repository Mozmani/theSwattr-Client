/*
|--------------------------------------------------------------------------
| BARREL EXPORT FILE
|--------------------------------------------------------------------------
| How-To barrel-export components:
| export { default as Comp1 } from './comp1/comp1.js' (omit .js)
|
| Why? Readability and (to an extent) testing:
| import { Comp1, Comp2, Comp3, Comp4 } from './components'
| import { Route1, Route2, Route3, Route4 } from './routes'
*/
export { default as BugsContainer } from './bugsContainer/bugsContainer';
export { default as Header } from './header/header';
export { default as LoginForm } from './loginForm/loginForm';
export { default as RegistrationForm } from './registrationForm/registrationForm';
export { default as MainContainer } from './mainContainer/mainContainer';
export { default as CommentsPage } from './commentsPage/commentsPage';
export { default as AddBugs } from './addBugs/addBugs';
export { default as ToggleDev } from './toggleDev/toggleDev';
export { default as EditBugs } from './editBugs/editBugs';
