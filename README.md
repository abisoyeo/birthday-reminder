# Birthday Email Scheduler (Node.js + Express + MongoDB)

## Description

This is a Node.js application that allows users to register with their name, email, and date of birth. The system stores this information in a MongoDB database and automatically checks every day for users whose birthday matches the current date. When a match is found, the application sends a personalized birthday email using Nodemailer. The scheduling of email delivery is handled by `node-cron`.

## Features

- Register users with name, email, and date of birth
- Store and manage user data in MongoDB
- Automatically check daily for birthdays
- Send personalized birthday emails through Gmail via Nodemailer
- Simple Express server with API endpoints

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Nodemailer (email sending)
- node-cron (daily scheduler)
- dotenv (environment variables)

## Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_gmail@example.com
EMAIL_PASS=your_app_password
CRON_SCHEDULE=0 7 * * *   # default: runs at 7AM every day
```

Note: For Gmail accounts, you must generate an App Password instead of using your normal password.

3. Start the server:

```bash
npm start
```

4. Visit `http://localhost:3000` to access the form.

## Testing Emails

To test without waiting until 7 AM, set the cron schedule to run every minute in `.env`:

```env
CRON_SCHEDULE=*/1 * * * *
```

## Assignment Note

This project was created as part of an academic assignment to demonstrate the use of task scheduling in Node.js and automated email sending with Nodemailer.
