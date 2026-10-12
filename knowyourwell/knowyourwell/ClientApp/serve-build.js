const express = require("express");
const path = require("path");

const app = express();

// reuse the same API proxy rules that npm start uses
require("./src/setupProxy")(app);

app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "build", "index.html"))
);

app.listen(5000, () => console.log("Production build at http://localhost:5000"));