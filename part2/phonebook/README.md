# Phonebook

The web application aims to create a simple phonebook.

If the person's information is already in the phonebook, the application will display a dialog where the user can confirm whether to replace the old number with the new number.

A search field was implemented to allow users to filter the list of people by name.

The `toLowerCase()` method was used in the _search_ and _name_ variables to convert those values to lower case. This allow us to apply a case-insensitive filtering logic.

The phonebook data is stored in the _db.json_ file located at the root of the proyect. The _json-server_ package is used to simulate fetching data from a server during the development phase.

The following script was added to the _package.json_ to start the json-server.

```json
"server": "json-server -p3001 --watch db.json"
```

The code that handles the communication with the backend was extracted into its own module `./src/services/person.js˚`.

A green notification that lasts for a few seconds is shown after a successful operation is executed (a person is added, a number is changed or a person is deleted).

A red notification is shown when the operation does not succeed (information has already been removed from the server).

## Resources

[String.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes?qs=incl)

[String.prototype.toLowerCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)

[json-server](https://github.com/typicode/json-server)

[Axios](https://axios-http.com/docs/intro)

[useEffect hook](https://reactjs.org/docs/hooks-reference.html#useeffect)

[Window.confirm()](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)

[Inline Styles](https://react-cn.github.io/react/tips/inline-styles.html)

[Conditional Styling in React JS](https://dev.to/salehmubashar/conditional-styling-in-react-js-3h52)
