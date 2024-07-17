const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const { encrypt, decrypt } = require("./EncyrptionHandler");

app.use(cors());
app.use(express.json());

const PORT = 3001;
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "passwordmanager",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected");
});

app.post("/addpassword", (req, res) => {
  const { password, website } = req.body;
  try {
    const { iv, password: encryptedPassword } = encrypt(password); // Correctly destructure the returned object
    const query =
      "INSERT INTO password (password, website, iv) VALUES (?, ?, ?)";
    db.query(query, [encryptedPassword, website, iv], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data");
        return;
      }
      res.send("Success");
    });
  } catch (err) {
    console.error("Error processing request:", err);
    res.status(500).send("Error processing request");
  }
});

app.get("/showpasswords", (req, res) => {
  db.query("select * from password", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/decryptpassword", (req, res) => {
  const { password, iv } = req.body;
  try {
    const decryptedPassword = decrypt(password, iv);
    res.send(decryptedPassword);
  } catch (error) {
    console.error("Error decrypting password:", error);
    res.status(500).send("Error decrypting password");
  }
});

app.get("/", (req, res) => {
  res.send("<h1>hello world</h1>");
});

app.listen(PORT, () => {
  console.log("listening on port");
});
