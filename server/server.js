require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

const port = 4445 || process.env.PORT;

app.use(express.json());

const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/api",apiRoutes);
app.use("/auth",authRoutes);

// DB Initialization
mongoose.connect('mongodb+srv://rajagopalgajula520:raja123@cluster0.swlko.mongodb.net/sguShop?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('DB Connected'))
.catch((e)=>console.log(e));

// Default ROute
app.get('/', (req, res) => {
  res.send('Welcome to SGU Shop API!');
});


app.listen(port,()=>{
    console.log(`Server running at ${port}`);
}) 