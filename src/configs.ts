import dotenv from "dotenv";
dotenv.config();

const jwtSecretKey = process.env.SECRET_KEY;
if (!jwtSecretKey) {
    throw new Error("jwt secret key not provided");
}

const PORT = Number(process.env.PORT || 8000);

export const config = { port: PORT, jwtSecret: jwtSecretKey };
