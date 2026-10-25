import express from "express";
import { authRouter } from "./routes/authRoutes.js";
import { workspaceRouter } from "./routes/workspaceRoutes.js";
import { config } from "./configs.js";
import { taskRouter } from "./routes/taskRoutes.js";

const app = express();
const PORT = config.port;

// Parse incoming JSON requests
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/workspaces", workspaceRouter);
app.use("/api/tasks", taskRouter);

app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
});
