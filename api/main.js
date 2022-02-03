import express from 'express';
import mongoose from "mongoose";
import heroesRouter from "./Routes/heroesRouter.js";
import filtersRouter from "./Routes/filtersRouter.js";
import cors from 'cors'

const PORT = 5000;
const app = express();
const DB_URL = 'mongodb+srv://sarcasm:123@cluster0.2kueb.mongodb.net/heroesDB1?retryWrites=true&w=majority'
app.use(cors())
app.use(express.json())
app.use('',heroesRouter)
app.use('',filtersRouter)



const bootstrap = async () => {
    try{
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => {
            console.log(`Server started and listening ${PORT} port `)
        })
    }catch(e){
        console.log(e)
    }
}

bootstrap()




