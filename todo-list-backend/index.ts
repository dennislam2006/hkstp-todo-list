import express from "express";
import cors from "cors";
import todoRoutes from "./routes";
import { errorHandler } from "./middleware";

const app = express();
const PORT = process.env.PORT || 3001;
const VERSION = process.env.VERSION || "v1";

app.use(cors());
app.use(express.json());
app.use(`/api/${VERSION}/todos`, todoRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running with ${PORT}`);
});
