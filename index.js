const express = require("express")
require("dotenv").config()
const cors = require("cors")
const session = require("express-session")

//express definition
const app = express();
const port = 3000
//middleweres
app.use(session(
    {
        secret:"123456789",
        resave:false,
        saveUninitialized:true,
        cookie: {
            expires: new Date(Date.now() + 30 * 60 * 1000),
            maxAge: 30 * 60 * 1000 
          }
    }
))
app.use(cors())
app.use(express.json())
//mongodb connection
const connection = require("./db/connection")
connection()
//routes
const routes = require("./routes/routes")

app.get("/home", (req, res)=>{
    res.json({msg:`Olá: ${req.session.user}`})
})

app.use("/api", routes)

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})