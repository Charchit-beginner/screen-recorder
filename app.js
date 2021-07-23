const express = require("express")
const fs = require("fs")
const path = require("path")
const app = express()

const port = 80


app.use(express.static('static'))
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("index")
})   

app.listen(port , ()=>{
    console.log(`the application started successfully on port ${port}`)
})   