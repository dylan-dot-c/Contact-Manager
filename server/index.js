import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";
import contactRouter from "./routes/contactRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());



app.use("/user",userRouter);
app.use("/auth",authRouter);
app.use("/contacts",contactRouter)

app.listen(3000)