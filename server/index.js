// server/index.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); 
require('dotenv').config(); 
const connectDB = require('./db'); 
const authRoutes = require('./routes/authRoutes'); 
const Message = require('./models/Message'); // Import Message model

// Connect to the database
connectDB(); 

// ---------------------------------------------
// EXPRESS APP SETUP
// ---------------------------------------------
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001; 

// Middleware
app.use(cors()); 
app.use(express.json()); 

// API Routes
app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
  res.send('Chat Server is Running!');
});

// ---------------------------------------------
// SOCKET.IO REAL-TIME SETUP
// ---------------------------------------------

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // 1. Handle JOIN ROOM event (sent from client when logged in)
  socket.on('join_room', async (ROOM_ID) => { 
    socket.join(ROOM_ID); // User joins the dynamic DM room
    console.log(`User ${socket.id} joined room: ${ROOM_ID}`);

    // --- LOAD CHAT HISTORY FROM MONGODB ---
    try {
        // Query for messages belonging ONLY to the specific room ID (e.g., "bob_shashank")
        const messageHistory = await Message.find({ room: ROOM_ID })
                                            .sort({ createdAt: 1 })
                                            .limit(100); 

        // Send history ONLY to the user who just joined
        socket.emit('message_history', messageHistory); 
    } catch (error) {
        console.error('Error fetching message history:', error);
    }
  });


  // 2. Handle incoming messages from this user
  socket.on('send_message', async (data) => { 
    
    // Broadcast the message ONLY to the specific room ID
    io.to(data.room).emit('receive_message', data); 
    
    // --- SAVE MESSAGE TO MONGODB ---
    try {
        await Message.create({
            room: data.room,
            author: data.author,
            message: data.message,
            time: data.time,
        });
    } catch (error) {
        console.error('Error saving message:', error);
    }
  });
  
  // 3. Handle disconnection
  socket.on('disconnect', () => {
    console.log("User Disconnected", socket.id);
  });
});


// ---------------------------------------------
// START SERVER
// ---------------------------------------------

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
