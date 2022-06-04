const express = require("express");
const { register } = require("../model/User.model");
const router = express.Router();

router.post("/register", (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  register(data,res)
});
