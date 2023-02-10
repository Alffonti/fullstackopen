# Bloglist - Frontend

Application's link: https://bloglist.cyclic.app/

## Overview

This repository aims to build a Blog List application,that allows users to save information about interesting blogs they have stumbled across on the internet. Each listed blog contains the author, title, URL, and amount of upvotes from users of the application.

Blog posts are listed by the number of likes.

Each blog has a button which controls whether all of the details about the blog are shown or not.

The backend of the application was developed in the [part 4](https://github.com/Alffonti/fullstackopen/tree/main/part4/bloglist) of the course.

The backend can be started with `npm run dev` in its own directory. This will run the backend on port 3003.

The initial state of the application was cloned from GitHub
```shell
git clone https://github.com/fullstack-hy2020/bloglist-frontend
```
and the git configuration of the cloned application was removed
```shell
cd bloglist-frontend   // go to cloned repository
rm -rf .git
```

The frontend can be started with `npm start` in its own directory. This will run the frontend on port 3000.


## HTTP requests

The code that handles the communication with the backend was extracted into its own module `./src/services/blogs.js˚`.

## Proxy

A **proxy** field was added to `package.json` in order to tell the development server (backend) to proxy any unknown HTTP requests to the API server in **development mode**.

```json
"proxy": "http://localhost:3003",
```

If the frontend application makes an HTTP request to a server address at `http://localhost:3000` not managed by the React application itself (i.e. when requests are not about fetching a static asset such as the CSS or JavaScript of the application), the request will be **redirected** to the server at `http://localhost:3003`.

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

After a blog is created, the server returns only the user's ID. The logged-in `user object` need to be added to the newly created blog in order to display the name of the user even when `the browser is not reloaded`.

```javascript
const addBlog = async blogObject => {
  const returnedBlog = await blogService.create(blogObject)
  setBlogs(blogs.concat({ ...returnedBlog, user }))
  //
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

## Toggleable

The `Toggleable` component was created to add the visibility toggling functionality on both the login and note's creation form.

`props.children` is used to render the elements defined between the opening and closing tags of the component.

```javascript
<Toggleable buttonLabel="new note">
  <BlogForm createNote={addNote} />
</Toggleable>
```

## Likes

The handleLike function was created to add a like every time the like button is clicked.

An HTTP PUT request is made to the server by passing the changed blog as the second parameter.

```javascript
const returnedBlog = await blogService.update(id, changedBlog)
```

The blog router for handling HTTP PUT request was updated in the backend in order to change the user reference (in the database, the `user` field of a blog document is a string, which represents the user ID, not an object).

```javascript
router.put('/:id', async (request, response) => {
  //
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { ...blog, user: blog.user.id },
    //
  )
})
```

## Deleting a blog

The `user` state was passed as props to the Blog component in order to show the delete button only if the blog post was added by the user.

```javascript
{user.username === blog.user.username && (
  <button style={buttonStyle} onClick={handleDelete}>
    delete
  </button>
)}
```

## PropTypes

The `prop-types` library was installed in order to validate the types of properties passed to components. When an invalid value is provided for a prop, a warning will be shown in the JavaScript console. For performance reasons, propTypes is only checked in development mode.

## ESlint

Eslint is installed by default to applications created with `create-react-app`.

Base configuration file is extendend by adding the following ESlint configuration in `package.json`.

```json
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
}
```

A `.eslintrc.js` file was created in order to override the default ESlint configuration with my desired configuration.

The `eslint-plugin-jest` package was installed in order to avoid undesired and irrelevant linter errors while testing the frontend.

The `.eslintignore` file was created in order to skip the `build` and `node_modules` directories when linting.

## React Testing Library

The `react-testing-library` was installed in order to test React components by simulating the ways that users interact with DOM nodes.

Jest is installed by default to applications created with `create-react-app`.

The `jest-dom` was installed in order to provide a set of custom jest matchers to write tests that assert various things about the state of a DOM.

Unit test files are located in the same directory as the component being tested.

Tests are run, by default, in `watch` mode with the `npm test` command in applications created with `create-react-app`.

Components are rendered in a format that is suitable for testting using the `render` function provided by the react-testing-library:

```
render(<Blog/>)
```

A rendered component can be accessed using the `screen` object.

The [query priority guide](https://testing-library.com/docs/queries/about#priority) was used in order to test the code in the most accessible way.

The `getByText` method is used to find non-interactive elements (like divs, spans, and paragraphs) with the text content passed as argument.

```
const element = screen.getByText('React patterns by Michael Chan')
```

The `user-event` library was installed in order to simulate **user interactions** by dispatching the **events** that would happen if the interaction took place in a browser.

The `userEvent.setup()` is used to start a session which mocks the UI layer to simulate user interactions like they would happen in the browser.

```
const user = userEvent.setup()
```

**Mock functions** were used in order to replace dependencies (event handlers) of the components being tested. Mocks make it possible to return hardcoded responses, and to verify the number of times the mock functions are called and with what parameters.

```
const mockHandler = jest.fn()
```

A test coverage can be generated with the following command:

```
CI=true npm test -- --coverage
```

## End to End Testing

The **Cypress** library was installed as a development dependency in order to test the web application as a whole.

The following script to the backend repository in order to start the backend in test mode.

```javascript
{
  // ...
  "scripts": {
    // ...
    "start:test": "NODE_ENV=test node index.js"
  },
  // ...
}
```

The `testing` router was created in the backend in order to reset the database before each test is run when making a HTTP POST request to the `/api/testing/reset` endpoint.

The `cypress:open": "cypress open"` script was added to the `package.json`.

The `cypress` directory and the `cypress.config.js` file are automatically created after selecting the test type (E2E) in the Cypress Dashboard.

Cypress global variables were added to the `eslintrc.js` configuration file.

The Cypress ESlint plugin was installed as a development dependency in order to follow recommended Cypress rules.

```javascript
module.exports = {
  env: {
    // ...
    'cypress/globals': true,
  },
  extends: [
    // ...
    'plugin:cypress/recommended',
  ],
  // ...
  plugins: ['cypress'],
  // ...
}
```

<!-- The `cypress.config.js` file was added to the `.eslintignore` -->

The [`baseUrl` global variable](https://docs.cypress.io/guides/references/best-practices#Setting-a-global-baseUrl) was defined in the Cypress configuration file in order to prefix the origin (domain under test) to any URL provided to commands like `cy.visit()` and `cy.request()`.

The `BACKEND` environment variable was defined in the Cypress configuration file in order to reference the server address when using the `cy.request()` command. The server addess can be accessed within the tests using the [`Cypress.env()` syntax](https://docs.cypress.io/api/cypress-api/env).

Anonymous function declarations were used instead of arrow functions in the E2E test files as recommended by [Mocha](https://mochajs.org/#arrow-functions) which Cypress relies on.

## Resources

- [Conditional rendering](https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator)

- [Handling Multiple Inputs](https://reactjs.org/docs/forms.html#handling-multiple-inputs)

- [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage)

- [How to send the authorization header using Axios](https://flaviocopes.com/axios-send-authorization-header/)

- [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

- [@testing-library/jest-dom](https://github.com/testing-library/jest-dom)

- [Cypress Docs](https://docs.cypress.io/guides/overview/why-cypress)

- [eslint-plugin-cypress](https://github.com/cypress-io/eslint-plugin-cypress)
