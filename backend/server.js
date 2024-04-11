import express from 'express';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();


import router from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";


import connectToMongoDB from "./db/connectToMongoDB.js";


const app = express();
app.use(express.json()); // This line is crucial
//ye hame request.body se sari value extract
// karne me madat karega jaise ki name username password etc
app.use(cookieParser());

const port = process.env.PORT || 3000;


app.use("/api/auth", router);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  connectToMongoDB()
  console.log(`Server is running on port ${port}`);
});
