# Creuna Table Tennis - MEAN Stack Application

The project is under development, but feel free to use it!

This application is created for developers inside creuna, to provide a custom interface and ranking system so our table tennis players can see who is the overall best in the company!

## Uses

* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)
* [Angular](https://angular.io/)
* [NodeJS](https://nodejs.org/en/)
* [nodemon](https://nodemon.io/) - Utility monitor
* [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
* [JSON Web Token](https://jwt.io/)
* [mongoose](http://mongoosejs.com/)

## Installation

Install the dependencies in root

```sh
$ npm install
```

Run node application in root

```sh
$ nodemon
```

To install Angular check out the documentation in [angular-src](/angular-src/README.md) folder.

## Basic use after installation:

Run your MongoDB locally in a terminal in the background

```sh
$ mongod
```

To inspect your MongoDB open a terminal and type mongo and it will be ready to use

```sh
$ mongo
```

Run your node server in the root of the app folder

```sh
$ nodemon
```

Last but not least start your Angular application by `cd` to `/angular-src` and type

```sh
$ ng serve
```

## TODO:

Please assign yourself to one or more TODO's, and create a feature branch.

* Provide users with more options/profile settings
* Create endpoint and post method to update single wins - `Daniel`
* Create endpoint and post method to update double wins - `Daniel`
* Create validation method, so users can't add multiple wins without opponent to validate a win
* Create seperate view inside profile to show profile settings
* Create option for users to ask for a match by clicking a button in opponents user profile
* Create ranking table and logic (should be reactive)
* Option to search in ranking table by username
* Option to sort high/lowest ranking in ranking table
* Add scss as css-preprocessor