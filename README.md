# Running/Testing #

* To run this project:
1) npm install
2) npm start or node index.js
* To test this project: 
- npm test


# Before you start #

* Create a fork of this repository. Make sure you check the **"This is a private repository"** to make the new repository private.
* Complete the task according to the instructions below and commit your changes to the forked repository.
* When you have completed the task, transfer the forked repository to the user *tobztobz*.

# System requirements #

* Node v4
* Redis v3

# Task #

In this task you will be creating a simple API server in Node.js, based on the [express](https://www.npmjs.com/package/express) framework. The server will be composed of just 2 routes: one for accepting input and the other one for output. Incoming values in the input will be stored in [Redis](https://www.npmjs.com/package/redis) cache. The output will average successive pairs of the stored values and return the result, effectively implementing a moving average digital filter.

The task is composed of 2 parts, the first part is about implementing the server application, while the second part about writing unit tests.

### Part 1 ###

In this part, you will be implementing the server application. Instructions:

* The application should be composed of 3 source files: *index.js* (entry point), *routes.js* (route implementations) and *Cache.js* (Redis wrapper).
* Redis connection parameters are provided in *config/config.json*.
* All methods in *Cache.js* should be implemented in a ES6 class (e.g. class Cache {}).
* Route **POST /input** should be able to read an integer supplied in the request body, and store it in an array in [Redis](https://www.npmjs.com/package/redis) cache. Subsequently, it should return the same integer in the response body. You are free to choose how to store the incoming values in Redis, however it is recommended to use the *rpush* command. 
* Route **GET /output** should be able to return the moving average of all integers currently stored in Redis. For each position _i_ in the array, where _X[i]_ a value in the array and _Y[i]_ the output, the moving average is calculated as: **Y[i] = (X[i] + X[i-1]) / 2**. Obviously, for the first integer in the array, where *i==0*, then *Y[0]==X[0]*.

### Part 2 ###

In this part, you will be implementing a unit test for the above routes. A skeleton unit test is provided in *test/test.js*. The first test case should post all values defined in *test/data.json* (see "input" key) to **/input**, while the second test case will read **/output** and match the returned values to the ones defined in *test/data.json* (see "output" key). Instructions:

* You should implement the unit test using [mocha](https://www.npmjs.com/package/mocha), [chai](https://www.npmjs.com/package/chai) and [chai-http](https://www.npmjs.com/package/chai-http).
* Test cases should be as thorough as possible.
* There's no need to add more test cases than the ones provided.
* Running "npm test" should produce the exact same result as in *test/test-result.png*.

# Notes #

* You can modify the provided source files as necessary to complete the task, as long as you have followed the instructions.
* All routes should return appropriate status codes.
* Your external package dependencies should be the bare minimum required to complete the task.
* You are expected to demonstrate your knowledge of ES6, so make sure to use ES6 wherever it makes sense.
* You should **not** declare variables using the *var* keyword. If you nevertheless decide to use *var*, you are expected to **justify** your decision in a comment.
* 'use strict' at the beginning of all source files.
* All request/response bodies should be *JSON encoded*.
* You are free to use your own code style, but your code should be *clean*, *consistent* and *well documented*.
