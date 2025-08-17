# Birthday Email Scheduler (Node.js + Express)

## Description

This is a Node.js application that allows users to register with their name, email, and date of birth.  
The system automatically checks daily for users whose birthday matches the current date and sends a personalized birthday email using Nodemailer.  

The project is implemented in **two versions**:
- **MongoDB + Mongoose** (default, `main` branch)  
- **PostgreSQL + Sequelize** (`pgsql-version` branch)  

Both versions share the same core functionality but use different databases.

## Features

- Register users with name, email, and date of birth
- Automatically check daily for birthdays
- Send personalized birthday emails through Gmail via Nodemailer
- Express server with API endpoints
- Daily scheduling with `node-cron`

## Tech Stack

- Node.js + Express  
- MongoDB + Mongoose (main branch)  
- PostgreSQL + Sequelize (pgsql-version branch)  
- Nodemailer (email sending)  
- node-cron (daily scheduler)  
- dotenv (environment variables)  

---

## Setup (MongoDB Version)

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

3. Start the server:

```bash
npm start
```

4. Visit `http://localhost:3000` to access the form.

## Setup (PostgreSQL Version)

1. Switch to the PostgreSQL branch:

```bash
git checkout pgsql-version
```

2. Create a local PostgreSQL database:

```sql
CREATE DATABASE userdb;
```

3. Update your `.env` file:

```env
PORT=3000
DATABASE_URL=postgres://username:password@localhost:5432/userdb
EMAIL_USER=your_gmail@example.com
EMAIL_PASS=your_app_password
CRON_SCHEDULE=0 7 * * *   # default: runs at 7AM every day
```

4. Start the server:

```bash
npm start
```

The Sequelize config will automatically sync the models to your PostgreSQL database.

## Testing Emails

To test without waiting until 7 AM, set the cron schedule to run every minute in `.env`:

```env
CRON_SCHEDULE=*/1 * * * *
```

# About
This project was completed as part of AltSchool Africa coursework to demonstrate the use of task scheduling in Node.js and automated email sending with Nodemailer. Both MongoDB and PostgreSQL versions were implemented to showcase different database approaches.
