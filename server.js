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
const categoryRouter = require("./src/routes/categoryRoutes");
const cardRouter = require("./src/routes/cardRoute");
const { upload } = require("./src/middleware/upload");
const port = process.env.PORT || 6000;

const app = express();
setupSwagger(app)
app.use(bodyParser.json());
app.use(logger);
pool
  .connect()
  .then(() => console.log("✅ // => Connected to PostgreSQL - server.js:22"))
  .catch((err) => console.error("❌ DB connection error: - server.js:23", err));

schemaTable() // For create Table postgreSQL


// app.use("/uploads", express.static("uploads"));
app.use("/v1/auth", authRoute)
app.use('/v1/users', userRouter)
app.use('/v1/brands', brandRouter)
app.use('/v1/category', categoryRouter)
app.use('/v1/products', productRouter)
app.use('/v1/card', cardRouter)
app.post("/uploads", upload, (req, res) => {
  // Upload File Image
  console.log(req.file);
  if (req.file == undefined) {
    throw new Error("No file founded");
  } else {
    return res.json(res.file);
  }
});
app.use(errorHandle);
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}/apidocumentation - server.js:46`);
  console.log(`✅ Server is running on http://localhost:${port}/v1 - server.js:47`);
  console.log(`✅ Server is running on http://localhost:${port}/ - server.js:48`);
});
