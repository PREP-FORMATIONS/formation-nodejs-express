const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    const languages = [
        "Javascript",
        "HTML 5",
        "CSS 3",
        "React.js",
        "Node.js & Express",
        "Nest.JS"
    ];
    res.render("index", { languages });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/create", (req, res) => {
    console.log("body : ", req.body);
    res.redirect("/");
});

const port = 3000;
app.listen(port, () => console.log(`Le serveur écoute sur le port ${port}`));
