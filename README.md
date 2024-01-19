# Konkat

A simple contact directory built with React, NodeJS and MongoDB

## Task
The exercise involves developing a simple contact directory using React for the frontend, Node.js for the backend, and MongoDB for data storage.

Key features of this application include:

1. Users should be able to add contacts, complete with their photo.
2. Each time a contact is viewed, the view count should be stored in the database.

## Installation
- Install backend dependencies
  - Navigate into the backend directory and run npm install (You need to have NodeJS and Redis installed on your machine)
  - Replace the connection string in storage/db.js with the connection string to your mongo database.
  - Start backend server (make sure redis is running): "npm run dev"
  - The API will be running on port 5000
  - Install the frontend dependencies: Navigate to the frontend directory and run "npm install"

- Setup database
  - Install mysql-server: "apt install mysql-server"
  - Setup database tables: From the project root directory, run "cat setupDatabase.sql | mysql

- Start Backend Server
  - Start the backend server by running "BASECAMP_USER=basecamp_dev BASECAMP_PWD=basecamp_dev_pwd BASECAMP_HOST=localhost BASECAMP_DB=basecamp_db python3 -m api.v1.app"

- Start Frontend Server
  - Navigate to the Frontend directory and run "npm run"

- Visit http://127.0.0.1:3000 on your browser
