const express = require("express");
const Task = require("./models/taskModel");
const tasks = require("./routes/tasksRoute");
require("dotenv").config();

const connectDB = require("./db/connect");

const app = express();

// Middleware
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Task Manager App");      
});

app.use("/api/v1/tasks", tasks);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}...`);
        });
    } catch (error) {
        console.error("❌ Error starting the server:", error);
    }
}

start();