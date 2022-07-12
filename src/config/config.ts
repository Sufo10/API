import dotenv from "dotenv";
dotenv.config();

export const DB: string = process.env.DB!;
export const JWT_KEY = process.env.JWT_KEY!;
