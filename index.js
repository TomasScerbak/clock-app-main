const express = require("express");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use("/api", require("./routes/ipbase"));

app.use(cors());

app.listen(PORT, () => console.log(`SERVER running on port ${PORT}`));
