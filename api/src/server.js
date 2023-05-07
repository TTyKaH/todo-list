const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
// TODO: move to another place? and initial
const Role = db.role;

const app = express();

db.sequelize.sync();
// sync with tables dropping
// db.sequelize.sync({ force: true })
//   .then(() => {
//     console.log("Drop and re-sync db.");
//     initial()
//   });

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:8081"],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple welcome route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to your api server" });
});
// routes
require('./routes/auth/auth.routes')(app);
require('./routes/auth/user.routes')(app);
require("./routes/todo.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`-----# Server is running on port ${PORT} #-----`);
});

// ===== ===== ===== ===== =====

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
  Role.create({
    id: 2,
    name: "moderator"
  });
  Role.create({
    id: 3,
    name: "admin"
  });
}
