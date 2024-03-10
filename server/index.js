require("dotenv").config();
const express = require("express");

const connection = require("./db/mongoose");
const todoRoutes = require("./routes/todoRoutes");
const registerRoutes = require("./routes/registerRoutes");
const authenticationRoutes = require("./routes/authRoutes");
connection();

const app = express();
app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/login", authenticationRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
