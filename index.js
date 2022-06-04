const express = require("express");
const app = express();

const port = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("*", (req, res) => {
  res.status(400).send({ message: "Page Not Found" }).end();
});

app.listen(port, () => console.log(`Server Running at port ${port}`));
