const express = require("express")
require("dotenv").config()
const {connection} = require("./db")
const {UserRouter} = require("./routes/user.router")

var cors = require('cors')
const { PostRouter } = require("./routes/post.router")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/users", UserRouter)

app.use("/posts", PostRouter)
// =======
app.use("/books", BookRouter)
// >>>>>>> 9173d4a0994f16c314113d9d8ae6ebe3fe43b249
app.get("/",(req,res)=>{
    res.send("<h1>Welcome To My Server</h1>")
})

app.listen(process.env.port, async()=> {
    try {
        await connection;
        console.log(`server is running at port ${process.env.port}`);
        console.log("DB is connected");  
    } catch (error) {
       console.log(error); 
    }
   
})
// <<<<<<< HEAD
 
// =======
// >>>>>>> 9173d4a0994f16c314113d9d8ae6ebe3fe43b249
