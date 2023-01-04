# Full Stack Open 2022

## Overview
This repository contains the exercise submissions for the Full Stack Open 2022 course, held by University of Helsinki.

This course serves as an introduction to modern web application development with JavaScript. The main focus is on building single page applications with ReactJS that use REST APIs built with Node.js. The course also contains a section on GraphQL, a modern alternative to REST APIs.

The course covers testing, configuration and environment management, and the use of MongoDB for storing the application’s data.

## Exercises
- [Part 0 - Fundamentals of Web apps](https://github.com/alffonti/fullstackopen/tree/master/part0)
- [Part 1 - Introduction to React](https://github.com/alffonti/fullstackopen/tree/master/part1)
- [Part 2 - Communicating with server](https://github.com/alffonti/fullstackopen/tree/master/part2)
- [Part 3 - Programming a server with NodeJS and Express](https://github.com/alffonti/fullstackopen/tree/master/part3)
- [Part 4 - Testing Express servers, user administration](https://github.com/alffonti/fullstackopen/tree/master/part4)
- [Part 5 - Testing React apps](https://github.com/alffonti/fullstackopen/tree/master/part5)
- [Part 6 - State management with Redux](https://github.com/alffonti/fullstackopen/tree/master/part6)
- [Part 7 - React router, custom hooks, styling app with CSS and webpack](https://github.com/alffonti/fullstackopen/tree/master/part7)
- [Part 8 - GraphQL](https://github.com/alffonti/fullstackopen/tree/master/part8)
- [Part 9 - TypeScript](https://github.com/alffonti/fullstackopen/tree/master/part9)
- [Part 10 - React Native](https://github.com/alffonti/fullstackopen/tree/master/part10)
- [Part 11 - CI/CD](https://github.com/alffonti/fullstackopen/tree/master/part11)
- [Part 12 - Containers](https://github.com/alffonti/fullstackopen/tree/master/part12)
- [Part 13 - Using relational databases](https://github.com/alffonti/fullstackopen/tree/master/part13)


## Directory Structure

For each part of the course there is a directory, which further branches into directories containing a series of exercises, like "unicafe" for part 1.

This repository is structured as follows

```
part0
part1
  courseinfo
  unicafe
  anecdotes
part2
  phonebook
  countries
```

For each web application for a series of exercises, it is recommended to commit all files relating to that application, except for the directory node_modules.


For each web application a React App was created using the following command:

```shell
cd Desktop/fullstackopen/part1/courseinfo
npx create-react-app .
npm start
```

The space and period at the end of the command are important because it tells the computer to create a new React application in that existing folder.

### Terminal
Once in the project directory, I used the following commands:

### `rm -rf .git`

Removes the Git repository at the root of your application.
create-react-app will automatically turn your project into a git-repository.

### `rm -rf node_modules/ && npm i`

Removes the node_modules directory and install the dependencies again.

#### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Commit Message Structure

The commit message is structured as follows:

```
<exercise>: <directory> <step>

[optional body]
```

The following commad was added to change the text editor to VS Code. This option allows me to include a message body in the commit message.

```
git config --global core.editor "code --wait"
```

If the -m option is omitted, then Git will open the VS Code.
