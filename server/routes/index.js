const express = require("express");

const router = express.Router();

// Prevent favicon.ico requests
router.get('/favicon.ico', (req, res) => res.status(204));

/* GET home page. */
router.get("/", (req, res) => {
  res.json({
    title: "Express",
  });
});

module.exports = router;
