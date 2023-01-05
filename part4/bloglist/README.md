# Blog list

## Overview

This repository aims to build a Blog List application,that allows users to save information about interesting blogs they have stumbled across on the internet. For each listed blog contains the author, title, URL, and amount of upvotes from users of the application.

The **nodemon** tool was installed in order to automatically restart the node application when file changes in the repository are detected.

The following npm-script was added:
 ```
 "dev": "nodemon index.js"
 ```
 to run the application with nodemon.

 The Visual Studio Code **REST client** plugin was installed to send HTTP requests and view the response in Visual Studio Code directly.

 The HTTP requests are located in `.http` files within the `requests` directory and must follow the standard RFC 2616 that including request method, headers, and body. The HTTP requests can be sent by using the shortcut Ctrl+Alt+R(Cmd+Alt+R for macOS), by right-clicking in the editor and then selecting Send Request in the menu, or by pressing F1 and then typing Rest Client: Send Request, the response will be previewed in a separate webview panel of Visual Studio Code.

## Directory structure

 This repository separates the different responsabilites into separate modules and is structured as follows:

```
├── index.js
├── app.js
├── build
│   └── ...
├── controllers
│   └── blog.js
├── models
│   └── blog.js
├── package-lock.json
├── package.json
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js
```

The `controllers` directory defines the route handling functions.
The `models` directory defines the Mongoose schema for blog entries.
The `utils` directory defines the environment variables, middlewares, and the logging functions.
The `index.js` file imports the actual application from the `app.js` file and then starts the application.
The `app.js` file establishes the connection to the database and loads the middlewares to the application.

## Database

The **MongoDB Atlas** cloud data platform was used to built the MongoDB database.

The **Mongoose** library was installed to provide schema validation, and to map objects in the code into documents in MongoDB.

Errors are handled by the **error-handler middleware**. E.g.: if the id query parameter is invalid, the error handler will send a response to the browser with the response object passed as a parameter.
```
{ error: 'malformatted id' }
```

## Schema

A blog entry has the following schema:

```
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})
```

The `toJSON` option was set in the Blog schema to transform the JSON object that will be returned when sending a response.

## Linting

The **ESlint** package was installed as a development dependency.

The ESlint default configuration was run with the command:

```
npx eslint --init
```

After answering the questions, the `.eslintrc.js` configuration file was created.

The following npm script `"lint": "eslint ."`  was added to check every file in the project by ESlint.

The `build` directory was ignored by ESlint by creating a `.eslintignore` file in the project's root.

The VSCode ESlint plugin was installed in order to run the linter continuously and see errors (which are underlined with a red line) in the code immediately.

## Resources

- [Router - Express](https://expressjs.com/en/api.html#router)
- [toJSON schema option - Mongoose](https://mongoosejs.com/docs/guide.html#toJSON)
