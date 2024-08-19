const express = require("express");
const { dbConnect } = require("./config/connect");
const authRoute = require("./routes/authRoute");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const {authMiddleware}  = require("./middleware/authMiddleware")
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 6000; // Use environment variable for PORT
const app = express();
const cookieParser = require("cookie-parser")
const productRoute = require("./routes/productRoute")

// Connect to the database
dbConnect();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

// Define your routes
app.use("/api/user", authRoute);
app.use("/api/product",productRoute)


// Test route (if needed)
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start the server
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
