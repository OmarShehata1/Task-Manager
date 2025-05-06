const express = require("express");
const tasks = require("./routes/tasksRoute");
const morgan = require("morgan");
const errorHandler = require("./Middlewares/errorHandler");
require("dotenv").config();

const connectDB = require("./db/connect");

const app = express();

// Middleware
app.use(express.json());
app.use(express.static("./public"));
app.use(morgan("dev"));

app.use("/api/v1/tasks", tasks);
app.use(errorHandler);

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