const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin'); 
const userRouter = require('./routes/user');  
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000; 


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err)); 

app.use(bodyParser.json()); 


app.use("/admin", adminRouter); 
app.use("/user", userRouter);  



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});
