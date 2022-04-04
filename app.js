const express = require("express");
const sequelize = require("./database/database");
const { User, Smaker } = require("./User");
const { items } = require("./database/test");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home", { items });
});

app.post("/sendChosenIcecream", async (req, res) => {
  const { name, email, getSingleIcecream } = req.body;

  const duplicateUser = await User.findOne({ where: { email: email } });
  if (!duplicateUser) {
    const userData = await User.create({
      name,
      email,
      chosenIcecream: getSingleIcecream,
    });
    res.redirect("/");
  } else {
    res.render("error");
  }
});

app.get("/getTop", async (req, res) => {
  const users = await User.findAll({
    attributes: ["name", "email", "chosenIcecream"],
  });

  const testObj = {};
  for (let user of users) {
    if (testObj[user.chosenIcecream]) {
      testObj[user.chosenIcecream]++;
    } else {
      testObj[user.chosenIcecream] = 1;
    }
  }
  const topList = Object.entries(testObj);
  topList.sort((a, b) => b[1] - a[1]);
  console.log(topList);

  res.render("topList", { topList });
});

app.get("/goToMainPage", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`i am running at port number ${PORT}`);
});
