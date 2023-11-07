const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");

const response = require("./utils/response");

const userEndpoint = require("./routes/users");
const absenEndpoint = require("./routes/absen");

const sequelize = require("./utils/dbConnect");

app.use(cors());
app.use(express.json());

sequelize.sync().then(() => {
  console.log("Database connected");
});

app.get("/", (req, res) => {
  response(200, null, "Welcome to my API", res);
});

app.use("/users", userEndpoint);

app.use("/absen", absenEndpoint);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
