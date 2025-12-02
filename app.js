import express from "express";
import cors from "cors";
import usersRoutes from "./routes/usersRoutes.js"
import booksRoutes from "./routes/booksRoutes.js"

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", usersRoutes);
app.use("/api/books", booksRoutes);

app.use((err, req, res, next)=>{
    if(err){
        res.status(500).json({message: err.message});
    }
});

app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
});
