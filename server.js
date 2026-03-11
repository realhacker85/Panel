
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const DB_FILE = "database.json";

function readDB(){
  if(!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeDB(data){
  fs.writeFileSync(DB_FILE, JSON.stringify(data,null,2));
}

app.get("/bots",(req,res)=>{
  res.json(readDB());
});

app.post("/addbot",(req,res)=>{
  const {name} = req.body;
  if(!name) return res.status(400).send("Bot name required");
  const bots = readDB();
  bots.push({name, status:"stopped"});
  writeDB(bots);
  res.send("Bot added");
});

app.post("/deletebot",(req,res)=>{
  const {name} = req.body;
  let bots = readDB().filter(b=>b.name!==name);
  writeDB(bots);
  res.send("Bot deleted");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log("Panel running on port " + PORT);
});
