import express from 'express';
import {ENV} from './lib/env.js'

const app = express();

app.get("/",(req,res)=>{
    res.send("Hello World");
})


app.listen(ENV.PORT,()=>{
    console.log(`Started running on port ${ENV.PORT}`);
})