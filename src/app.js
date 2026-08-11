const express = require('express')
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.routes")



const app = express()



// middleware express
app.use(express.json())
// middleware cookieparser
app.use(cookieParser())

app.use("/api/auth", authRouter)


module.exports = app