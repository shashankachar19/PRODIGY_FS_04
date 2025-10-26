# Real-Time Chat Application 

This is a full-stack, real-time direct messaging application built as part of the MERN stack development curriculum. It mimics a modern DM interface, providing instant message exchange and persistent chat history between two users ("shashank" and "bob").

##  Features

* **Real-Time Messaging:** Instant message delivery using **Socket.IO**.
* **Persistent History:** All messages are stored in **MongoDB** and loaded upon joining a chat.
* **User Authentication:** Secure Login and Registration using **JWTs (JSON Web Tokens)**.
* **DM Logic:** Dynamic chat room creation using a combination of user IDs, ensuring a private, two-way conversation.
* **Modern Aesthetic:** Polished, full-screen UI resembling popular social media direct messaging interfaces.
* **Branding:** Includes the watermark "DEVELOPED BY SHASHANK S."

##  Tech Stack

* **Frontend:** React.js, React Hooks, CSS (Custom Styling)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (using Mongoose ODM)
* **Real-Time Communication:** Socket.IO
* **Authentication:** JSON Web Tokens (JWT)

##  Getting Started (Installation & Setup)

Follow these steps to set up and run the application locally.

### Prerequisites

You must have the following installed:

* Node.js (LTS version recommended)
* MongoDB (Running locally or accessible via a remote URI)

### 1. Database Configuration

1.  Navigate into the `server` directory: `cd server`
2.  Create a file named **`.env`** in the `server` directory.
3.  Add your MongoDB connection string and the server port:

    ```env
    # .env file in /server directory
    MONGO_URI="mongodb://localhost:27017/chatApp" 
    PORT=3001
    JWT_SECRET="YOUR_SECRET_KEY_HERE"
    ```

### 2. Install Dependencies

You must install dependencies for both the server and the client.

| Directory | Command |
| :--- | :--- |
| **Server** (`/server`) | `npm install` |
| **Client** (`/client`) | `npm install` |

### 3. Running the Application

The server and client must be run in **two separate terminal windows**.

#### Terminal 1: Start the Backend Server

```bash
# Navigate to the server folder
cd server
# Start the server (using nodemon for development)
npm run dev
(The server should confirm it is running on http://localhost:3001)
```
#### 4. Terminal 2 : Start the Frontend Client
```bash
# Navigate to the client folder
cd client
# Start the server (using nodemon for development)
npm start
(The client should open automatically in your browser at http://localhost:3000)
```
### Testing the Chat
```
Open two separate browser windows (or one normal and one incognito window).

In the first window, Register and Login as "shashank".

In the second window, Register and Login as "bob".

Send messages back and forth to test real-time communication and persistent history.```


Note this project can only communicate with Bob ( user ) , as this is a small scale project. you can login as yourself and bob only.

###Developed By SHASHANK S
