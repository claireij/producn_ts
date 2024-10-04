# Producn: A Musician's Problem Solver

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Usage](#usage)
- [API](#api)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Project Overview

**Producn** is a web application designed to assist musicians in solving various problems they may encounter. The application features a **question tree** that guides users through a series of questions, leading to tailored solutions. In addition, it includes a **blog** section where users can read articles on various topics related to music and a **FAQs** page for quick answers to common inquiries.

## Features

- **Question Tree**: An interactive tool that helps musicians identify and solve specific issues by answering a series of guided questions.
- **Blog**: A collection of articles covering a wide range of topics, tips, and advice for musicians.
- **FAQs Page**: A dedicated page answering common questions to help users quickly find the information they need.
- **User-Friendly Interface**: Built with Next.js to ensure a seamless and responsive user experience.
- **Data Management**: Utilizes Sequelize and MySQL for efficient data storage and retrieval.

## Technologies Used

- **Frontend**: 
  - [Next.js](https://nextjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
- **Backend**:
  - [Node.js](https://nodejs.org/)
  - [Sequelize](https://sequelize.org/) (ORM for MySQL)
  - [MySQL](https://www.mysql.com/)
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/)
  - Some vanilla CSS to showcase skills
- **State Management**: [Tanstack Query](https://tanstack.com/)
- **Testing**: Will be added soon
- **Others**: 
    - [Axios](https://axios-http.com/) (for API calls)
    - [NextAuth](https://next-auth.js.org/) (for authentication)
    - [@paypal/react-paypal-js](https://www.npmjs.com/package/@paypal/react-paypal-js) (for payment handling)

## Deployement

You can find the app under producn.com

## Usage
- Navigate to the Question Tree to start solving problems.
- Visit the Blog to read articles and insights.
- Check out the FAQs page for quick answers to common questions.
- Go to the profil of the your user and change some personal information

## API

### Auth Endpoints

- **Endpoint**: `/api/auth/check-user/[email]`
    - **METHOD**: GET
    - **DESCRIPTION**: Gets if user with given email exists

- **Endpoint**: `/api/auth/[...nextauth]`
    - **METHOD**: POST
    - **DESCRIPTION**: This endpoint provides user authentication via credentials (email and password) using NextAuth.js.

- **Endpoint**: `/api/auth/check-user-credentials`
    - **METHOD**: POST
    - **DESCRIPTION**: Authenticates a user by verifying their email and password. Returns user details if the authentication is successful.
    - **REQUEST BODY**: 
        - `email` (string, required): The email address of the user attempting to log in.
        - `password` (string, required): The password associated with the user's email address.

### Blog Endpoints

- **Endpoint**: `/api/blog/categories`
    - **METHOD**: GET
    - **DESCRIPTION**: Retrieves all blog categories

 - **Endpoint**: `/api/articles/index`
    - **METHOD**: GET
    - **DESCRIPTION**: Retrieves a paginated list of blog articles. The articles can be filtered based on search terms and categories, providing users with a more tailored content experience.
    - **QUERY PARAMETERS**: 
        - `categories` (string, optional): A comma-separated list of category IDs to filter the articles.
        - `searchTerm` (string, optional): A term to search for in the article titles or content.
        - `page` (number, optional): The page number for pagination (defaults to 1).

- **Endpoint**: `/api/articles/[id]`
    - **METHOD**: GET
    - **DESCRIPTION**: Retrieves a blog article based on the given id

### Emails Endpoints

- **Endpoint**: `/api/emails/email-verification`
    - **METHOD**: POST
    - **DESCRIPTION**: Sends a confirmation email to a user after they register. The email contains a link for the user to confirm their email address, which is essential for account activation.
    - **REQUEST BODY**: 
        - `firstname` (string, required): The first name of the user to personalize the email.
        - `emailConfirmationString` (string, required): A unique string used to create a confirmation link for the user.

### FAQS Endpoints

- **Endpoint**: `/api/faqs/categories`
    - **METHOD**: GET
    - **DESCRIPTION**: Retrieves all faq categories

- **Endpoint**: `/api/faqs/index`
    - **METHOD**: GET
    - **DESCRIPTION**: Retrieves all faqs

### Paypal Endpoints

- **Endpoint**: `/api/paypal/pause`
    - **METHOD**: POST
    - **DESCRIPTION**: Cancels an active PayPal subscription for a user based on their user ID. This endpoint checks if the user has an active subscription before attempting to cancel it through the PayPal API.
    - **RESQUEST BODY**: 
        - `user_id` (string, required): The ID of the user whose subscription is to be cancelled.

### Questiontree Endpoints

- **Endpoint**: `/api/questiontree/answers/[question_id]`
    - **METHOD**: GET
    - **DESCRIPTION**: Retrieves answers that belong to the question id provided

- **Endpoint**: `/api/questiontree/questions/[question_id]`
    - **METHOD**: GET
    - **DESCRIPTION**: Retrieves the question with the corresponding question id

- **Endpoint**: `/api/questiontree/results/[result_id]`
    - **METHOD**: GET
    - **DESCRIPTION**: Retrieves the result with the corresponding result id

### Subscriptions Endpoints

- **Endpoint**: `/api/subscriptions/prices`
    - **METHOD**: GET
    - **DESCRIPTION**: Retrieves the prices of the subscriptions

### UserSubscription Endpoints

- **Endpoint**: `/api/userSubscription/getActiveSubscription/[user_id]`
    - **METHOD**: GET
    - **DESCRIPTION**: Gets the active user subscription based on the user id

- **Endpoint**: `/api/userSubscription/create`
    - **METHOD**: POST
    - **DESCRIPTION**: Creates a new user subscription

### User Endpoints

- **Endpoint**: `/api/users/confirm-email/[email_confirmation_string]`
    - **METHOD**: PATCH
    - **DESCRIPTION**: Updates user to set the email confirmation to true, if the correct email confirmation string is provided

- **Endpoint**: `/api/users/get/[user_email]`
    - **METHOD**: GET
    - **DESCRIPTION**: Retrieves user based on user email

- **Endpoint**: `/api/users/create`
    - **METHOD**: POST
    - **DESCRIPTION**: Creates user

- **Endpoint**: `/api/users/updates`
    - **METHOD**: PATCH
    - **DESCRIPTION**: Updates user information based on the provided email. Accepts various fields to update, including password, articles_read and problems_solved.



## Database Schema

- `User`: stores all information about the user
- `UserSubscription`: stores all the subscription orders (active and inactive) of users.

- `Subscription`: stores all possible subscriptions in Producn (e.g. Pro monthly)

- `BlogArticle`: stores blog articles answers.
- `BlogCategory`: categorizes blog articles for better organization and retrieval.

- `Faq`: stores frequently asked questions and their corresponding answers.
- `FaqCategory`: categorizes FAQs for better organization and retrieval.

- `Question`: stores all the questions of the questiontree.
- `Result`: stores all the results of the questiontree.
- `Answer`: stores all the answers of the questiontree.
