##ABOUT THE PROJECT
📦 How to Run This Project Locally
Prerequisites

Make sure you have the following installed on your machine:

Node.js (v18+ recommended)
👉 https://nodejs.org

npm (comes with Node.js)

MongoDB (local or cloud e.g. MongoDB Atlas)

1️⃣ Clone the Repository
git clone https://github.com/Michaelchilaka12/work-task.git
cd work-task

2️⃣ Install Dependencies

Run the following command to install all required packages:

npm install


This will install dependencies such as:

Express

Mongoose

JWT

bcrypt

dotenv

Nodemon

3️⃣ Create Environment Variables

Create a .env file in the root directory and add the following:

PORT=3000
DATABASE=mongodb://your-database-connection-string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d


⚠️ If you are using MongoDB Atlas, replace DATABASE with your Atlas connection string.

4️⃣ Start the Server
Development mode (recommended)
npm run dev


This uses nodemon, so the server restarts automatically on file changes.

Production mode
npm start

5️⃣ Access the API

Once the server is running, the API will be available at:

http://localhost:3000


You can test endpoints using Postman.

6️⃣ API Documentation

Postman documentation for this project is available here:

👉 [https://documenter.getpostman.com/view/50790776/2sB3dTrnaX]

🛠 Scripts Available
Command	Description
npm start:	Run server in production mode
npm run dev:	Run server with nodemon
npm test:	Run tests (not configured)
📂 Project Stack

Node.js

Express

MongoDB & Mongoose

JWT Authentication

bcrypt for password hashing

Postman for API testing


