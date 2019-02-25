# How To use the API Request library

First of all, import the JS File as following.

```js
import Requests from './requests.js'
```

When using a method of the API Request librarby you have to use the keyword `then`. This is because the API requests are asynchronous methods.
```js
// getTestData() returns the movies json object
Requests.getTestData().then(movies => {
        // do something with the data object
    });
```

