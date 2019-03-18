# How To use the API Request library

First of all, import the JS File as following, at the top of the file where you are going to use the library.

```js
import Requests from './requests.js'
```

When using a method of the API Request librarby you have to use the keyword `then`. This is because the API requests are asynchronous methods. When using the library your code should have this pattern:
```js
// getData() returns an object.
Requests.someMethod(argument1,argument2).then(data => {
        // do something with the data object.
});
```

***

## Get request

To get Data use the `getdata(url)` method. As arguments you need to supply the url. As a reply you'll get a JSON object. 
```js
// getData() returns the data json object.
Requests.getData("example.com").then(data => {
        // do something with the data object.
});
```

***

## Post request

You can also Post JSON data by using the `postData(url,JSON)` method. Again, you have to supply the url, obviously... and the json data. When implementing this method, it should look like this:
```js
// the postData() method may return nothing.
Requests.postData("example.com",{testData:42}).then(data => {
        // do something with the data object.
});
```


