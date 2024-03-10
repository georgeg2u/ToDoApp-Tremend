require("dotenv").config();
const express = require("express");

const connection = require("./db/mongoose");
const todoRoutes = require("./routes/todoRoutes");
const registerRoutes = require("./routes/registerRoutes");
const authenticationRoutes = require("./routes/authRoutes");
connection();

const app = express();
app.use(express.json());

app.use("/todos", todoRoutes);
app.use("/register", registerRoutes);
app.use("/login", authenticationRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
