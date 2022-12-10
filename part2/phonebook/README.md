# Phonebook

The web application aims to create a simple phonebook.

The user is prevented from being able to add names that already exist in the phonebook.

A search field was implemented to allow users to filter the list of people by name.

The `toLowerCase()` method was used in the *search* and *name* variables to convert those values to lower case. This allow us to apply a case-insensitive filtering logic.

The phonebook data is stored in the *db.json* file located at the root of the proyect. The *json-server* package is used to simulate fetching data from a server during the development phase.

The following script was added to the *package.json* to start the json-server.

```json
"server": "json-server -p3001 --watch db.json"
```

## Resources

[String.prototype.includes()
](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes?qs=incl)

[String.prototype.toLowerCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)

[json-server](https://github.com/typicode/json-server)

[Axios](https://axios-http.com/docs/intro)

[useEffect hook](https://reactjs.org/docs/hooks-reference.html#useeffect)
