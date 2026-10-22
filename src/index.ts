import express from "express";
import dotenv from "dotenv";
import { registerUser } from "./controllers/authController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON requests
app.use(express.json());

app.post("/api/signup", registerUser);

app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
});
