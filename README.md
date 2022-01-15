# MyReads React Fundamentals Project | React NanoDegree

### Description:
This "Would You Rather?" Project is a web app that lets a user play the “Would You Rather?” game - where a user is asked a question in the form: “Would you rather [option A] or [option B] ?” - and they select one OR the other.

* See Live Demo: https://react-nd-would-you-rather.herokuapp.com/


### App Functionalities:
> In this app, users will be able to:
* login to a list of existing user profiles,
* post a question,
* answer questions,
* see which questions they haven’t answered,
* see how other people have voted,
* and see the ranking of users on a leaderboard.


### Technical Specifications:
> The app was built using React Redux fundamentals following guidance from the React Nanodegree Programme on [Udacity](https://www.udacity.com/course/react-nanodegree--nd019).

* the **majority** of the UI/UX components used in my project were from the [React Bootstrap Library](https://react-bootstrap.github.io/) and a few components from the [React Semantic UI Library](https://react.semantic-ui.com/).
* the icons used were acquired from [FontAwesome](https://fontawesome.com/).
* and all the Matrix-related images were acquired from various sources resulting from a Google Search. Examples include: [subpng](https://www.subpng.com/png-k1h1lh/),  [icon-icons](https://icon-icons.com/icon/trinity-avatar/90829) and [icon-finder](https://www.iconfinder.com/)


---


## Installation:
> To run the project, once in the project directory, you can run:

* ##### ```npm install``` or ```yarn install```
* This will install all project dependencies to your local environment.

* ##### ```npm start``` or ```yarn start```
* This runs the app in the development mode.
* Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


---


### Useful Files:
> The project consists of a _DATA.js file, which  represents a fake database and methods that let you access the data.

#### Data

There are two types of objects stored in our database:

* Users
* Questions

#### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

#### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

#### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|


---


## Acknowledgements:

> The _DATA.JS contains starter code provided by the Udacity instructors.

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


---


## Author:
> Yakubu Shehu - [Github](https://github.com/YakubuShehu/), [Website](https://yakubushehu.com)