import express from "express";
import dotenv from "dotenv";
dotenv.config();

// router imports
import router from "./routes/mainRouter";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.use(router);

app.listen(PORT, () => console.log(`Server działa na porcie ${PORT}`));
