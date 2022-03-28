const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

require("./config/mongoose.config");
require("./routes/user.routes")(app);
require("./routes/recipe.routes")(app);
require("dotenv").config();

app.listen(port, () => console.log(`Listening on port: ${port}`));
