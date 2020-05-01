require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const connectDB = require("./db/connectDB");
const error = require("./middlewares/error");
// DB
connectDB();

// ROUTES
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const cellGroupRoutes = require("./routes/cellGroupRoutes");
const cellMemberRoutes = require("./routes/cellMemberRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/cellgroup", cellGroupRoutes);
app.use("/api/v1/cellmember", cellMemberRoutes);
app.use(error);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}...`)
);
