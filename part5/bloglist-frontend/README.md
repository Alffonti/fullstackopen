# Bloglist - Frontend

Application's link: https://bloglist.cyclic.app/

## Overview

This repository aims to build a Blog List application,that allows users to save information about interesting blogs they have stumbled across on the internet. Each listed blog contains the author, title, URL, and amount of upvotes from users of the application.

The backend of the application was developed in the [part 4](https://github.com/Alffonti/fullstackopen/tree/main/part4/bloglist) of the course and runs on port 3003.

The initial state of the application was cloned from GitHub
```shell
git clone https://github.com/fullstack-hy2020/bloglist-frontend
```
and the git configuration of the cloned application was removed
```shell
cd bloglist-frontend   // go to cloned repository
rm -rf .git
```

## HTTP requests

The code that handles the communication with the backend was extracted into its own module `./src/services/blogs.js˚`.

## Login

The token returned with a successful login is saved to the application's state `user`.

The conditional rendering of the login form was implemented so that it is visible only if a user is not logged-in. On the other hand, the name of the user and a list of blogs is shown if the user is logged-in.


## Resources

- [Conditional rendering](https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator)

- [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage)

- [How to send the authorization header using Axios](https://flaviocopes.com/axios-send-authorization-header/)
