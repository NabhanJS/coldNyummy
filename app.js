const express = require("express");
const sequelize = require("./database/database");
const { User, Smaker } = require("./User");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/sendChosenIcecream", async (req, res) => {
  const { name, email, getSingleIcecream } = req.body;

  const duplicateUser = await User.findOne({ where: { email: email } });
  if (!duplicateUser) {
    const userData = await User.create({
      name,
      email,
      chosenIcecream: getSingleIcecream,
      smakerId: Smaker.id,
    });
    res.redirect("/");
  } else {
    res.render("error");
  }
});

app.get("/getTop", async (req, res) => {
  const topList = await User.findAll({
    attributes: ["name", "email", "chosenIcecream"],
  });
  res.render("topList", { topList });
});

app.get("/goToMainPage", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`i am running at port number ${PORT}`);
});
