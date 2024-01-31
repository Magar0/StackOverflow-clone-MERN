# `Stack overflow clone using MERN stack`

## Table of contents
* [General info](#general-info)
* [Features](#features)
* [Technologies](#technologies)
* [Setup](#setup)
* [API Endpoints](#api-endpoints)

## General info
![Stack Overflow](https://github.com/Magar0/StackOverflow-clone-MERN/assets/35245789/173f1fa7-65c4-42ed-b9f1-fa8fec9ce6a5)
A clone of stackoverflow website where one can ask questions or answer a question.
## Features
<ul>
  <li> User can sign up or log in. </li>
  <li> User can post new question or vote, answer other's question </li>
  <li> User can edit their profile or change password. </li>
</ul>


## Technologies
* MERN stack
* React JS
* Redux Toolkit, React Router,Axios.
* Node JS.
* Express JS.
* Bcrypt js, Json Web Token (JWT).
	
## Setup
To run this project, install it locally using npm:
#### Frontend
```
 cd ../client
 npm install
 npm start
```
#### Backend
1. Install dependencies:
```
   cd ../server
   npm install
```
2. Set up environment variables:
   - Create a `.env` file in the `server` directory.
   - Add the following variables to the `.env` file, replacing the placeholder values with your actual credentials:
     ```
     MONGODB_URI="your_mongo_uri"
     JWT_SECRET="your_secret_key"
     ```
3. Start the backend server:
 ```
  npm start
```

## API Endpoints

## API Endpoints

| Endpoint | Method | URL Path | Request Body | Response Format | Authentication |
|---|---|---|---|---|---|
| User Signup | POST | /user/signup | { "name": "string", "email": "string", "password": "string" } | JSON (user details and authentication token) | No |
| User Login | POST | /user/login | { "email": "string", "password": "string" } | JSON (user details and authentication token) | No |
| Get All Users | GET | /user/all | - | JSON (array of user objects) | Yes |
| Update User Profile | PATCH | /user/update | { "name": "string", "email": "string", "about": "string", "tags": ["string"] } | JSON (updated user details) | Yes |
| Delete User Account | DELETE | /user/delete | - | JSON (message) | Yes |
| Create Question | POST | /questions | { "questionTitle": "string", "questionBody": "string", "questionTags": ["string"] } | JSON (question details) | Yes |
| Get All Questions | GET | /questions | - | JSON (array of question objects) | No |
| Get Question Details | GET | /questions/:id | - | JSON (question details) | No |
| Delete Question | DELETE | /questions/:id | - | JSON (message) | Yes |
| Upvote/Downvote Question | PATCH | /questions/:id/vote | { "value": "upVote" or "downVote" } | JSON (updated question details) | Yes |
| Post Answer | PATCH | /answers/:id | { "answerBody": "string" } | JSON (updated question details with answer) | Yes |
| Delete Answer | PATCH | /answers/:id/delete | - | JSON (message) | Yes |
