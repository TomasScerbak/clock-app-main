const express = require("express");
const router = express.Router();
const needle = require("needle");

// Env vars
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_KEY_NAME = process.env.REACT_APP_API_KEY_NAME;
const API_KEY_VALUE = process.env.REACT_APP_API_KEY_VALUE;

router.get("/", async (req, res) => {
  try {
    const apiRes = await needle(
      "get",
      `${API_BASE_URL}?${API_KEY_NAME}${API_KEY_VALUE}`
    );
    const data = apiRes.body;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
