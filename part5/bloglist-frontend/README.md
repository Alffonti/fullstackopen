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

The user's login information is saved in the browser's local storage keeping it persistent even when the page is re-rendered.

An effect hook was used to check if user details of a logged-in user can already be found on the local storage.

A conditional rendering of the login form was implemented so that it is visible only if a user is not logged-in. On the other hand, the name of the user and a list of blogs is shown if a user is logged-in.

The token stored in the the application's state `user` is set in a `token` variable in the `./src/services/blogs.js˚` file so that it can be used when making HTTP POST requests.

```javascript
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
```

## Creating a new blog

Logged-in user are allowed to add new blogs using the `token` set using the setToken() helper function from the `./src/services/blogs.js˚` file.

The HTTP Authorization request header (containing the user access token) is declared in the `config` variable which is passed as a third argument when making a POST request.

```javascript
const create = newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}
```

## Notifications

Notifications that inform the user about successful and unsuccessful operations were implemented at the top of the page.

```javascript
  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }
```

Some styles were added to the notification component to identify informational messages and error messages.

```javascript
  const style = {
    color: notification.type === 'alert' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
```

## Resources

- [Conditional rendering](https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator)

-[Handling Multiple Inputs](https://reactjs.org/docs/forms.html#handling-multiple-inputs)

- [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage)

- [How to send the authorization header using Axios](https://flaviocopes.com/axios-send-authorization-header/)
