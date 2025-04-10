import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./db/db.config.js";
import errorHandler from "./middleware/errorHandler.js";
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});


app.use(errorHandler);
// Start server function
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error while connecting to the database:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

(async function startServer2(){
     await connectDB().then(()=>{
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
     }).catch((err)=>{
        console.error("Error while connecting to the database:", err.message);
        process.exit(1); // Exit the process with failure
     })
}
)();

// Start the server
// startServer();
