# Client React App

This project is a simple React app setup with necessary dependencies for development and testing.

## Requirements

- Node.js (v14 or later)
- npm (v6 or later)

## Setup

Follow the steps below to set up and run the app on your local machine.

### 1. Clone the repository

Clone the repository to your local machine using the following command:


git clone <repository-url>

 Install dependencies
Navigate to the project directory and install all the required dependencies:

cd client
npm install

Start the development server
Once the dependencies are installed, you can start the development server using:

npm start
This will start the app in development mode, and you can open it in your browser by navigating to http://localhost:3000.


# Server Node.js App

This project is a Node.js backend application built with Express, offering various server-side functionalities like email sending, password hashing, and file handling.

## Table of Contents

- [Requirements](#requirements)
- [Setup](#setup)
  - [Clone the repository](#1-clone-the-repository)
  - [Install dependencies](#2-install-dependencies)
  - [Set up environment variables](#3-set-up-environment-variables)
  - [Start the server](#4-start-the-server)
- [Dependencies](#dependencies)

## Requirements

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- npm (v6 or later)

## Setup

### 1. Clone the repository

Clone the repository to your local machine using the following command:

```
git clone <repository-url>
2. Install dependencies
Navigate to the project directory and install all the required dependencies:



cd server
npm install
3. Set up environment variables
Create a .env file in the root of the server directory and add your environment variables. This can include API keys, MongoDB URI, and other sensitive configurations. Example .env file:

text

SENDGRID_API_KEY=your-sendgrid-api-key
MONGO_URI=your-mongodb-uri
SECRET_KEY=your-secret-key
4. Start the server
Once the dependencies are installed and the .env file is configured, you can start the server using:



node index.js
By default, the server will run on http://localhost:5000. You can access this URL in your browser to confirm the server is running.

Dependencies
This project relies on the following key dependencies:
@sendgrid/mail: SendGrid API for sending emails.
bcryptjs: For hashing and comparing passwords.
body-parser: Middleware for parsing request bodies.
cors: Enables Cross-Origin Resource Sharing (CORS) between the server and client.
dotenv: Loads environment variables from a .env file.
express: Web framework used for building the server.
jsonwebtoken: Used for creating and verifying JSON Web Tokens (JWT).
mongoose: MongoDB object modeling for interacting with MongoDB.
multer: Middleware for handling file uploads.
