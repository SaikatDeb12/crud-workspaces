import express from "express";
import { authRouter } from "./routes/authRoutes.js";
import { workspaceRouter } from "./routes/workspaceRoutes.js";
import { config } from "./configs.js";

const app = express();
const PORT = config.port;

// Parse incoming JSON requests
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", workspaceRouter);

app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
});
