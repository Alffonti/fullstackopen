# Countries

This web application aims to provide data for different countries.

The country to be shown is found by typing a search query into the search field.

Depending on user input, the following results can be shown:

- If there are too many (over 10) countries that match the query, then the user is prompted to make their query more specific.

- If there are ten or fewer countries, but more than one, then all countries matching the query are shown.

- When there is only one country matching the query, then the basic data of the country (eg. capital and area), its flag and the languages spoken there, are shown.

When the names of multiple countries are shown on the page there is a button next to the name of the country, which when pressed shows the view for that country.

The weather report for the capital is provided using the OpenWeather API - https://openweathermap.org.

An API key is required to use the OpenWeather API.

The `REACT_APP_API_KEY` environment variable was defined in the *.env* file located at the root of the project and is exposed in the application as `process.env.REACT_APP_API_KEY`.

## Resources

[Axios](https://axios-http.com/docs/intro)

[useEffect hook](https://reactjs.org/docs/hooks-reference.html#useeffect)

[Custom environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env)

[OpenWeather - Current weather data API Doc](https://openweathermap.org/current)

[OpenWeather- Weather icons](https://openweathermap.org/weather-conditions#Icon-list)
