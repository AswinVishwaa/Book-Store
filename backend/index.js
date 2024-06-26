import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./Model/bookModel.js"; 
import bookrouter from "./router/bookrouter.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res) =>{
    console.log(req);
    return res.status(224).send("welcome to the store");
});

app.use("/book",bookrouter);
mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("database is successfully connected");
        app.listen(PORT, () => {
            console.log(`this server is successfully running on the port ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    })