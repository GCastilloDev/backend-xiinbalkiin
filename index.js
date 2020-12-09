const express = require("express");
const admin = require("firebase-admin");

// Crear app de express
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log("Iniciado!", port);
});

const credentials = require("./xiinbalkiin-4b927-firebase-adminsdk-uzj70-c417f43b80.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: "https://xiinbalkiin-4b927.firebaseio.com"
});

const db = admin.firestore();

app.get("/api/v1/", (req, res) => {
  console.log(req);
  res.json("INICIADO");
});

app.get("/api/v1/bus/", (req, res) => {
  console.log(req.query);
  const data = {
      query: req.query
  }
  db.collection("pruebas")
        .add(data)
        .then(() => {
            console.log("REGISTRO EXITOSO");
        })
        .catch(err => {
            console.log(err);
        });
  res.json({
      status: "ok",
      query: req.query
  });
});
