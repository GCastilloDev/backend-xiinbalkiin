const express = require("express");
const admin = require("firebase-admin");

// Crear app de express
const app = express();

// Configuración de cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  app.options("*", (req, res) => {
    // allowed XHR methods
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    res.send();
  });
});

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log("Iniciado!", port);
});

const credentials = require("./xiinbalkiin-4b927-firebase-adminsdk-uzj70-c417f43b80.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "https://xiinbalkiin-4b927.firebaseio.com",
});

const db = admin.firestore();

app.get("/api/v1/", (req, res) => {
  console.log(req);
  res.json("INICIADO");
});

app.get("/api/v1/bus/", (req, res) => {
  console.log(req.query);
  const data = {
    query: req.query,
  };
  db.collection("pruebas")
    .add(data)
    .then(() => {
      console.log("REGISTRO EXITOSO");
    })
    .catch((err) => {
      console.log(err);
    });
  res.json({
    status: "ok",
    query: req.query,
  });
});
