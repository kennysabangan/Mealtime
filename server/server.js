require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 80;
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "*" }));

require("./config/mongoose.config");
require("./routes/user.routes")(app);
require("./routes/recipe.routes")(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
