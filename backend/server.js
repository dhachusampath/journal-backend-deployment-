require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");

const path = require("path");

const session = require("express-session");

const passport = require("passport");

require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const journalRoutes = require("./routes/journalRoutes");
const contactRoutes = require("./routes/contactRoutes");
const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());

app.use(passport.session());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/contacts", contactRoutes);

app.listen(5000, () => {
  console.log(`Server running port on 5000`);
});
