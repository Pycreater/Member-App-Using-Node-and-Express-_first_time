const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const members = require("./Members");

const app = express();

// Body parser middleware
app.use(express.json());

// Handlebars - middleware
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Homepage route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
    members,
  })
);

app.use(express.urlencoded({ extended: false }));

// Set static folder
// app.use(express.static(path.join(__dirname, "public")));

// Members API routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
