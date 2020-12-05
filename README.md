<!--
*** I'm using markdown "reference style" links for readability.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- ! highlight and 'ctrl+shift+L' to replace all ! -->

Mark-The-Dev
theSwattr-Client
theSwattr
React, Node.js, Postgresql


<!-- ! highlight and 'ctrl+shift+L' to replace all ! -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://cap3-client-team-a.mark-the-dev.vercel.app/">
    <img src="src/images/logo-dark.png" alt="Logo" width="auto" height="100">
  </a>

  <h3 align="center">theSwattr - Client</h3>

  <p align="center">
    React, Node.js, Postgresql
    <br />
    <a href="https://github.com/Mark-The-Dev/theSwattr-Client"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Mark-The-Dev/theSwattr-Client/issues">Report Bug</a>
    ·
    <a href="https://github.com/Mark-The-Dev/theSwattr-Client/issues">Request Feature?</a>
  </p>
</p>

---

<h1 align="center"><a href="https://github.com/Mark-The-Dev/theSwattr-Client">Client Repo</a></h1>

## Summary:
> ---
> 
> This is the client for theSwattr, the development team bug tracking application with a built in ticket system. This application works to allow developers to see a sorted and organized list of bugs for their applications based on severity and status.
> 
> In addition regular users can submit bugs and see their own submitted bugs. Inside of each bug is a list of comments pertaining to the status of the bug. This is a place where the developers and end users can communicate with eachother to make sure that issue is adressed.
>
> ---

![dev-view](https://github.com/thinkful-ei-rabbit/Cap3_Client_Team_A/blob/master/public/dev-view.png?raw=true)


###### This README will systematically go over the entire app from the top level to the bottom layer, so I'll provide links to various sections for convenience.



---

## public

The Public folder is nothing special, besides the custom favicon and (as I'll note later) some imported CDNs in the head of index.html for a few Google Fonts.

_As an aside, it's actually faster (from a runtime perspective) to import fonts via CDNs, as apposed to importing them directly into stylesheets_

---

# src:

## config.js, index.js, and setupTests.js

**[ config.js ]** - this is essentially where I store "environment" variables. One important thing to know is that React has a built-in `NODE_ENV` variable that is set automatically when running scripts:

1. Run **Start**: `NODE_ENV = developement`
1. Run **Build**: `NODE_ENV = production`
   > Knowing this, you can take advantage and set up conditionals based on the already-available `NODE_ENV`. A major advantage is setting up API urls. When exporting like this...
   >
   > ```js
   > export default { ...config };
   > ```
   >
   > ... you can access variables like this...
   >
   > ```js
   > import config from '.../config.js';
   > ...
   >   await fetch(config.API_ENDPOINT)
   > ```
   >
   > **[ index.js ]** - bog-standard React App-wrapper using BrowserRouter
   > **[ setupTests.js ]** - configuration for Enzyme testing

---

## styles:

Fairly straight-forward Sass setup, with a simple reset and global stylesheet imported into the root index file. I won't get into Sass here, but know that I broke-out individual mixins to be used as imports in isolated **[ .scss ]** files

---

###### _I'll briefly cover some global-level stuff before breaking down the App itself_

### jsconfig.json:

This is at the root level, but it's use is important in understanding the syntax used throughout the app. I won't go too in-depth, but essentially what's going on is it's creating a global alias for the **[ src/ ]** file directory. The side effect is that you can re-factor local imports:

```js
/* someComponent.js */
import { PostService } from '../../../../../src/services';
...to...
import { PostService } from 'src/services';
```

For more info on the `jsconfig.json`, check out the docs [_*HERE!*_][jsconfig-docs]

### constants:

Not strictly necessary, but this can help prevent typos, along with making changes to the database less tedious to update throughout the app.

<!-- ### services:

This is where the logic for interfacing with the server lives. Each "method" has been broken-out into it's own file. [ token.service.js ] is for handling Auth-token processes. -->

<!-- ### hooks:

This is where I keep custom hooks used by multiple components, though I only needed 1 for now. This hook handles every form in the app, recieving and updating piped-in form-fields. The major benefit of this kind of hook is that it minimizes the use of `useState` hooks throughout the app. -->

<!-- ### context:

Because the scale of this app is so small, I've only created a single context. This is the "hook" way of doing context, both creating the context...

```js
export const DatabaseContext = createContext();
```

...and provider...

```js
<DatabaseContext.Provider value={value}>
  {props.children}
</DatabaseContext.Provider>
```

...in the same file. To use, you import the provider at the top level...

```js
import DatabaseContextProvider from '.../databaseContext';
...
<DatabaseContextProvider>
  (...insert components here!)
</DatabaseContextProvider>
```

...then invoke inside a component and _just use it_:

```js
import { useContext } from 'react';
import { DatabaseContext } from '.../databaseContext';
...
const { data, functions, andMore } = useContext(DatabaseContext);
``` -->

### Barrels...

You may have already noticed that there are actually many [ index.js ] files peppered throughout the app. These are known as "barrel" exports, and have a few advantages when dealing with a complex file-directory. The index file in the [ components ] folder has a short explanation, but I'll also put it here:

```js
/*
|------------------------------------------------------
| BARREL EXPORT FILE
|------------------------------------------------------
| How-To barrel-export components:
| export { default as Comp1 } from './comp1/comp1.js' (omit .js)
|
| Why? Readability and (to an extent) testing:
| import { Comp1, Comp2, Comp3, Comp4 } from './components'
| import { Route1, Route2, Route3, Route4 } from './routes'
*/
export { default as LoginForm } from './loginForm/loginForm'
export { default as Header } from './header/header'
etc...
```

You can see this in action in **[ app.js ]**:


```js
import {
  HomeRoute,
  DashboardRoute,
  LoginRoute,
  RegisterRoute,
  PrivateRoute,
  PublicRoute,
} from 'src/routes';
```

> _Note that the import doesn't point to the index file. Node perceives **[ index.js ]** files as points of entry and the default file to grab exports from, essentially making it an implicit file in import statements_

---

## app:

<!-- **useState**: `userName` is passed down to context and the Header, working as a boolean switch to control the behavior of the app. "If there isn't a name, don't display nav-bar links". This state is also controlled by both... -->

<!-- **useEffect**: Basic "on mount" fetcher that checks local storage for an auth token, improving UX -->

<!-- **Helper Functions**: `handleLoginSuccess` and `handleLogout` do what you'd expect by the name. Once a name is set to _State_, this fires off the context provider to proceed with fetching data from the server and sending the user to the home page. -->

---

## routes:

There's not much to say here, these essentially just import and render components, acting as entry points to component trees. However, I'll briefly cover...

#### utils:

**1. Private/Public-Routes**: This serves as a UX enhancement, both preventing users not logged in from accessing the app, and already logged in users from accessing the Login page.
**1. PageNotFound**: Standard inclusion, and in the case of this version, you can access this page vie the "Gigs" page as this is a feature not yet implemented.

---

<!-- ## components:

###### _I won't cover every component individually, but take a more broad-stroke approach, mentioning any note-worthy features when necessary_ -->

<!-- ##### PropTypes:

I decided to use PropType validation throughout, and would say that I'm glad I did. PropTypes can really help with early debugging by throwing errors in the console that you wouldn't have caught normally until much later testing. On such example would be if you had a required prop that was, say, a function, if it wasn't properly passed down (by parents, context, conditionals, etc...), then the console would ask why your required function is "undefined", even when you haven't iomplemented said function yet. -->

<!-- ##### utils: -->

---

## <!-- CONTACT -->
## Contact Mark:

#### Github - [theSwattr-Client](https://github.com/theSwattr-Client)

#### LinkedIn - [Mark Marcello](https://www.linkedin.com/in/mark-marcello/)


## Contact Derek:

#### Github - [musicMan1337][github]

#### LinkedIn - [Derek-8Bit-Nellis][linkedin]

#### Facebook - [Derek Nellis][facebook]

#### Instagram - [@derek.8bit.nellis][instagram]



## Contact Russell:

#### Github - [Russjames92](https://github.com/Russjames92)

#### LinkedIn - [Russell Champlain](https://www.linkedin.com/in/russell-champlain/)

<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Mark-The-Dev/theSwattr-Client.svg?style=flat-square
[contributors-url]: https://github.com/Mark-The-Dev/theSwattr-Client/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Mark-The-Dev/theSwattr-Client.svg?style=flat-square
[forks-url]: https://github.com/Mark-The-Dev/theSwattr-Client/network/members
[stars-shield]: https://img.shields.io/github/stars/Mark-The-Dev/theSwattr-Client.svg?style=flat-square
[stars-url]: https://github.com/Mark-The-Dev/theSwattr-Client/stargazers
[issues-shield]: https://img.shields.io/github/issues/Mark-The-Dev/theSwattr-Client.svg?style=flat-square
[issues-url]: https://github.com/Mark-The-Dev/theSwattr-Client/issues
[license-shield]: https://img.shields.io/github/license/Mark-The-Dev/theSwattr-Client.svg?style=flat-square
[license-url]: https://github.com/Mark-The-Dev/theSwattr-Client/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: www.linkedin.com/in/derek-8bit-nellis
[jsconfig-docs]: https://code.visualstudio.com/docs/languages/jsconfig

<!-- project links -->

<!-- links to social media accounts -->

[twitter]: http://www.twitter.com/userName
[facebook]: http://www.facebook.com/derek.nellis.9
[googleplus]: https://plus.google.com/+userName
[tumblr]: http://userName.tumblr.com
[dribble]: http://dribbble.com/userName
[linkedin]: https://www.linkedin.com/in/derek-8bit-nellis/
[github]: http://www.github.com/musicMan1337
[instagram]: https://www.instagram.com/derek.8bit.nellis/?hl=en
