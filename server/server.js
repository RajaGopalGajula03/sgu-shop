require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

app.use(cors());

const port = 4445 || process.env.PORT;

app.use(express.json());

// DB Initialization
mongoose.connect('mongodb+srv://rajagopalgajula520:raja123@cluster0.swlko.mongodb.net/sguShop?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('DB Connected'))
.catch((e)=>console.log(e));

app.get('/', (req, res) => {
  res.send('Welcome to SGU Shop API!');
});


app.listen(port,()=>{
    console.log(`Server running at ${port}`);
}) 