const express = require("express");
const sequelize = require("./database/database");
const { User } = require("./User");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/sendChosenIcecream", async (req, res) => {
  const { name, email, getSingleIcecream } = req.body;
  const userData = await User.create({
    name,
    email,
    chosenIcecream: getSingleIcecream,
  });
  res.redirect("/");
});

app.get("/getTop", async (req, res) => {
  const topList = await User.findAll({
    attributes: ["name", "email", "chosenIcecream"],
  });
  console.log(topList);
  res.render("topList", { topList });
});

app.get("/goToMainPage", (req, res) => {
  res.redirect("/");
});

User.sync({ force: true }).then(() => {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
