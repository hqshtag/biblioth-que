const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const connectDB = require("./db/db");

//Setup Env Variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 5000;

//Init middleware
app.use(express.json({ extended: false }));

//connectDB
connectDB();

// Set "Access-Control-Allow-Origin" header
app.use(
  cors({
    origin: (origin, cb) => {
      cb(null, origin && origin.startsWith("http://localhost:"));
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

//Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contact"));
app.use("/api/users", require("./routes/users"));
app.use("/api/books", require("./routes/books"));

app.get("/api/test", (req, res) => {
  res.json({ test: "secret data" });
});

//server static
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// Error handler
app.use((err, req, res, next) => {
  console.error("----- An error happened -----");
  console.error(err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(err.status || 500);
    // A limited amount of information sent in production
    if (process.env.NODE_ENV === "production") res.json(err);
    else
      res.json(
        JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)))
      );
  }
});

app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));
