import express from 'express';
import {ENV} from './lib/env.js'
import path from "path";
import { fileURLToPath } from 'url';
import {connectDB} from './lib/db.js';
import dns from 'dns';


if (ENV.NODE_ENV === 'development') {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();


app.get("/home", (req, res) => {
  res.status(200).send("Hello , welcome to the website");
});


if(ENV.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get('/*splat',(req,res)=>{
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
})

}

app.get('/{*any}',(req,res)=>{
    res.status(404).send("Page Not found");
})




const startServer = async ()=>{
  try{
    await connectDB();
    app.listen(ENV.PORT,()=>{console.log(`Started running on port ${ENV.PORT}`);})
  }catch(err){
    console.error("Error Occured while starting the server",err);
    process.exit(1);
  }
}


startServer();
