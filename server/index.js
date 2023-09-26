import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from './db';
import { getData } from './routes/getData';

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.get('/',(req,res)=>{
    res.send('<h1>DAMN !!</h1>')
})
app.get('/data', getData);

app.listen(process.env.PORT,()=>{
    console.log("app listening on the server port 8080");
})

connectDb();