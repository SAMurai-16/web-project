const express = require("express")
const {connectToMongoDB} = require("./connect")
const app = express()
const path  = require("path")
const PORT = 8002
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");




//connection
connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/webkriti").then(() =>
    console.log("Mongodb connected")
  );


app.set("view engine" , "ejs")
app.set("views",path.resolve("./views"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRoute);
app.use("/", staticRoute);

app.listen(PORT,()=> console.log(`sever started at port ${PORT}`))