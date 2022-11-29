const express = require("express");
const app = express();
const port = 8000;
const routerApi = require("./api/routes");
const db = require("./db/index");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {
  respondInternalError,
  respondNoResourceFound,
} = require("./middleware/errorController");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("mi inmobiliaria");
});

routerApi(app);

// MIDDLEWARE DE ERROR CON DESCRIPCION DE ERROR

app.use(respondInternalError);
app.use(respondNoResourceFound);

//DB
//{ force: true }
db.sync({ force: false }).then(() => {
  console.log("DataBase Connected");
  app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
  });
});
