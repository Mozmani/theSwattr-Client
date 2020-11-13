import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

//? import layout: modules(\n\n) styles(\n\n) locals(\n\n)
import './styles/global-styles.scss';

//? paths: './' when able, if not use alias 'src/components'
import App from './app/app';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

/*
* File/Directory Structure

? index, config, and setupTests are only files in src/

? styles/ holds global typography + sass modules (vars, mixins)

? app/ should only contain the 'App' component

? routes/ should only contain route entry-points, rendering child components
  * routes/utils/ for Private/PublicOnly and/or PageNotFound components

? services/ are anything server-related, aka async fetches/data processing

? optional:
  * constants/ for endpoints, schemas, etc - mainly to prevent typos
  * hooks/ for custom hooks
  * context/ specifically for useContext hooks/providers
  * helpers/ any off-loaded logic functions

? components/ basically everything else
  ! all files should use camel-case!
  * all components should be withing their own folder containing:
    * compName.js
    * compName.test.js
    * compName.scss
  * all component exports should be 'default' and piped into a barrel (index.js)
  * component construction convention:
    ! const CompName = ({ prop1, prop2 }) => {}
    ! export default CompName

  ! Barrels: if you have < 3 or 4 files, don't use one! (...or do 🤷‍♂️)
    > for more info on how they work, just ask!
    > TL;DR Node reads index.js by default when pointed at a folder
*/
