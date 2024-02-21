# `Stack overflow clone using MERN stack`

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [API Endpoints](#api-endpoints)

## General info
<!--- ![Stack Overflow](https://github.com/Magar0/StackOverflow-clone-MERN/assets/35245789/173f1fa7-65c4-42ed-b9f1-fa8fec9ce6a5) --->
<img src="https://github.com/Magar0/StackOverflow-clone-MERN/assets/35245789/173f1fa7-65c4-42ed-b9f1-fa8fec9ce6a5" height="350" >

* Developed a feature-rich Q&A platform similar to Stack Overflow using the MERN stack (MongoDB, Express.js, React.js, Node.js)
* Developed a responsive platform accross all devices including mobiles & tablets.
* Implemented secure user authentication and authorization with sign-up, login, password management, and JWT-based tokens.
* Enabled extensive user interaction with question asking, editing, deletion, voting, answering, and profile management.
* Integrated Stripe for secure payment processing for different subscription.
* Integrated an AI chatbot for interactive learning and engagement, with email verification for secure access.
* Enhanced user experience with dynamic theme personalization (day/night mode, auto-theme based on time/weather).
* Leveraged Node.js, Express.js, Bcrypt.js, and other technologies for a robust and scalable backend foundation.
* Employed Redux Toolkit for efficient state management and data flow.
* Incorporated Axios for simplified API communication.

## Technologies
* MERN stack
* React JS
* Redux Toolkit, React Router,Axios.
* Node JS., Express JS.
* Bcrypt js, Json Web Token (JWT).
* Stripe Payment.
* Geolocation , weather api , Open AI
	
## Setup
1. Set up environment variables:
   - Create a `.env` file in the `client` directory.
   - Add the following variables to the `.env` file, replacing the placeholder values with your actual credentials:
     ```
     REACT_APP_SHARE_URL="Your Website URL" (optional, default value "http://localhost:3000")
     REACT_APP_URL="your backend URL" (default value "http://localhost:4000")
     REACT_APP_API_KEY="Open weather API key"
     REACT_APP_STRIPE_PUBLISHABLE_KEY="Your stripe publishable key"
     ```

   - Create a `.env` file in the `server` directory.
   - Add the following variables to the `.env` file, replacing the placeholder values with your actual credentials:
     ```
     PORT="port number on which you want to run" (default value "4000")
     MONGODB_URI="your_mongo_uri"
     JWT_SECRET="your_secret_key"
     SMTP_HOST="smtp.gmail.com"
     SMTP_PORT=587
     SMTP_MAIL="your email"
     SMTP_PASSWORD= "your email app key"
     OPEN_AI_KEY= "your open AI key"
     STRIPE_SECRET_KEY="your Stripe secret Key"
     ```
2. Install dependencies:
#### Frontend
```
 cd ../client
 npm install
 npm start
```
#### Backend
```
cd ../server
npm install
npm start
```

## API Endpoints

## API Endpoints

| Endpoint | Description | Method | Request Body | Response Format (Example) | Authentication |
|----------|-------------|--------|--------------|----------------------------|----------------|
| `/` | Welcome message | GET | None | JSON (message: string) | None |
| `/user/signup` | User signup | POST | `{ name: string, email: string, password: string }` | JSON (user details and authentication token) | None |
| `/user/login` | User login | POST | `{ email: string, password: string }` | JSON (user details and authentication token) | None |
| `/user/getAllUsers` | Get all users | GET | None | JSON (array of user objects) | Required |
| `/user/update` | Update user profile | PATCH | `{ name?: string, about?: string, tags?: string[], password?: string }` | JSON (updated user details) | Required |
| `/user/delete` | Delete user profile | DELETE | None | JSON (message: string) | Required |
| `/questions` | Get all questions | GET | None | JSON (array of question objects) | None |
| `/questions` | Post a question | POST | `{ questionTitle: string, questionBody: string, questionTags: string[] }` | JSON (posted question object) | Required |
| `/questions/:id` | Delete a question | DELETE | None | JSON (message: string) | Required |
| `/questions/vote/:id` | Vote (upvote/downvote) on a question | PATCH | `{ value: 'upVote' or 'downVote' }` | JSON (updated question object) | Required |
| `/answers/post/:id` | Post an answer to a question | PATCH | `{ answerBody: string, userAnswered: string, userId: string, noOfAnswers: number }` | JSON (updated question object) | Required |
| `/answers/delete/:id` | Delete an answer to a question | PATCH | `{ answerId: string, noOfAnswers: number }` | JSON (message: string) | Required |
| `/subscription` | Make payment for subscription | POST | `{ priceId: string, plan: string }` | JSON (payment session details) | Required |
| `/subscription/cancel` | Cancel subscription | PATCH | None | JSON (updated user details) | Required |
| `/subscription/:sessionId` | Update subscription plan after payment success | PATCH | None | JSON (updated user details) | None |
| `/chatai/ask` | Ask question to AI | POST | `{ question: string }` | JSON (response from AI) | Email Verification |
| `/chatai/sendotp` | Send OTP for email verification | POST | `{ email: string }` | JSON (message: string) | None |
| `/chatai/verifyotp` | Verify OTP for email verification | POST | `{ email: string, otp: string }` | JSON (authentication token) | None |


Note : For endpoints marked with "Email Verification", the email field is required in the request body.

