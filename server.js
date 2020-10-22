const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let url="mongodb://127.0.0.1:27017/candidate";
var candRoute=require("./route/candidateRoute");

app.use('/',candRoute);

let mongoClientConstructor = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(url, mongoClientConstructor, (err) => {
    if (err) {
        console.log("Error is : " + err);
    } else {
        console.log("MongoDb is successfully connected at....", url);
    }
});

app.listen(3500,()=>{
    console.log('Server is connected at port 3500...');
})