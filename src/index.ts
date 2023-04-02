import express from "express";
import dotenv from "dotenv";
dotenv.config();

// router imports
import router from "./routes/mainRouter";

// middleware imports
import {
    errorLogger,
    errorResponder,
    invalidPathHandler,
} from "./middleware/error-handling-middleware";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.use(router);

app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

app.listen(PORT, () => console.log(`Server działa na porcie ${PORT}`));
