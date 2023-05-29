const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const app = express();
require("dotenv").config();
const URL = process.env.LINK;
const DB = process.env.DB;

app.use(express.json());
app.use(
  cors({
    origin: "https://lystloc-contact-form.netlify.app",
  })
);

app.get("/", function (req, res) {
  res.send("<h1>Full stack Project...</h1>");
});

app.post("/user/register", async (req, res) => {
  try {
    // Connect the Database
    const connection = await mongoclient.connect(URL);

    // Select the DB
    const db = connection.db(DB);
    // Do operation (CRUD)
    await db.collection("users").insertOne(req.body);

    // Close the connection
    await connection.close();

    res.json({ message: "User created Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


app.listen(process.env.PORT || 5000);
