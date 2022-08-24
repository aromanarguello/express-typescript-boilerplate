import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import httpStatus from "http-status";

import config from "./config/config";
import logger from "./config/logger";
import morgan from "./config/morgan";
import { errorConverter, errorHandler } from "./midlewares/error";
import routes from "./routes/v1";
import { ApiError } from "./utils/error";

const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(express.json());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/v1/", routes);

app.use((_, __, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

const PORT = config.port;

app.use(errorConverter);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
