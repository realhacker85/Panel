const fileUpload = require("express-fileupload")
const AdmZip = require("adm-zip")
const { spawn } = require("child_process")const fs = require("fs")
const AdmZip = require("adm-zip")
const express = require("express")
const fileUpload = require("express-fileupload")
const { spawn } = require("child_process")

const app = express()
app.use(fileUpload())
app.use(express.json())
app.use(express.static("public"))
app.use(fileUpload())

let botProcess = null
let logs = []

// START BOT
app.post("/start",(req,res)=>{

if(botProcess){
return res.send("Bot already running")
}

botProcess = spawn("node",["bot.js"])

botProcess.stdout.on("data",(data)=>{
logs.push(data.toString())
})

botProcess.on("close",()=>{
botProcess = null
})

res.send("Bot started")

})

// STOP BOT
app.post("/stop",(req,res)=>{

if(!botProcess){
return res.send("Bot not running")
}

botProcess.kill()
botProcess = null

res.send("Bot stopped")

})

// GET CONSOLE
app.get("/logs",(req,res)=>{
res.json(logs)
})

// UPLOAD FILE
app.post("/upload",(req,res)=>{

if(!req.files){
return res.send("No file uploaded")
}

let file = req.files.file
file.mv("./bot.js")

res.send("Bot uploaded")

})

app.listen(process.env.PORT || 3000,()=>{
console.log("Panel running")
})
app.post("/upload",(req,res)=>{

if(!req.files){
return res.send("No file uploaded")
}

let file = req.files.file

file.mv("./bot.zip",()=>{

let zip = new AdmZip("./bot.zip")

zip.extractAllTo("./bot",true)

res.send("Bot uploaded and extracted")
let botProcess = null

app.post("/startbot",(req,res)=>{

if(botProcess) return res.send("Bot already running")

botProcess = spawn("node",["index.js"],{
cwd:"./bot"
})

botProcess.stdout.on("data",(data)=>{
console.log(data.toString())
})

res.send("Bot started")

})

app.post("/stopbot",(req,res)=>{

if(!botProcess) return res.send("Bot not running")

botProcess.kill()

botProcess=null

res.send("Bot stopped")

})
})

})app.post("/uploadbot",(req,res)=>{

if(!req.files) return res.send("No file")

let file = req.files.file

file.mv("./bot.zip",()=>{

let zip = new AdmZip("./bot.zip")

zip.extractAllTo("./bot",true)

res.send("Bot uploaded")

})

})app.post("/editfile",(req,res)=>{

let {file,content} = req.body

fs.writeFileSync("./bot/"+file,content)

res.send("File saved")

})
