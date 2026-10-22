import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/authRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON requests
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
});
