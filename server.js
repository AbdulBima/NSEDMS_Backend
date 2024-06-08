import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import express from "express";
import { ethers } from 'ethers';
import cookieParser from 'cookie-parser';
import employeeRoute from "./routes/employeeRoute.js";
import cors from "cors";

config();

const { PORT, FRONTEND, FRONTEND2 } = process.env;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: [FRONTEND2], credentials: true }));

app.use("/api/employee", employeeRoute);


app.use(errorMiddleware); // Corrected typo

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT} :)`);
});
