const express = require("express");
const router = express.Router();
const axios = require("axios");

require("dotenv").config();

router.get('/oauth/facebook', async (req, res) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `https://www.facebook.com/v13.0/dialog/oauth?client_id=${process.env.CLIENT_ID}&redirect_uri=https://bugu-esports.ml/login/facebook&scope=public_profile,email`,
      maxRedirects: 0
    });
  } catch (e) {
    return res.status(200).json({url: e.response.headers.location});
  }
  
  res.send(process.env.CLIENT_ID);
});

module.exports = router;