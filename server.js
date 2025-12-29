const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./src/config/db");
const { logger, errorHandle } = require("./src/middleware");
const schemaTable = require("./src/config/schema");
const authRoute = require("./src/routes/authRoute");
const userRouter = require("./src/routes/userRoute");
const { setupSwagger } = require("./src/util/swagger");
const productRouter = require("./src/routes/productRoute");
const brandRouter = require("./src/routes/brand");
const port = 5000;

const app = express();
setupSwagger(app)
app.use(bodyParser.json());
app.use(logger);
pool
  .connect()
  .then(() => console.log("✅ //server.js => Connected to PostgreSQL"))
  .catch((err) => console.error("❌ DB connection error:", err));

// schemaTable() // For create Table postgreSQL

app.use("/v1/auth", authRoute)
app.use('/v1/users', userRouter)
app.use('/v1/brands', brandRouter)
app.use('/v1/products', productRouter)

app.use(errorHandle);
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}/api-docs`);
  console.log(`✅ Server is running on http://localhost:${port}/v1`);
  console.log(`✅ Server is running on http://localhost:${port}/`);
});
