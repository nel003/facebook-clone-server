const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");

router.get('/login/facebook', async (req, res) => {
  try {
    const code = req.query.code;
    //Get access token
    const res1 = await axios({
      method: 'GET',
      url: `https://graph.facebook.com/v13.0/oauth/access_token?client_id=${process.env.CLIENT_ID}&redirect_uri=https://bugu-esports.ml/login/facebook&client_secret=${process.env.CLIENT_SECRET}&code=${code}`,
      maxRedirects: 0
    });
    
    //token
    const access_token = res1.data.access_token;
    
    //Get user data
    const res2 = await axios({
      method: 'GET',
      url: `https://graph.facebook.com/me?access_token=${access_token}&fields=id,email,name,picture`,
      maxRedirects: 0
    });
    
    const respData = res2.data;
    const id = respData.id;
    const email = respData.email;
    const picture = respData.picture.data.url;
    let name = {};
    //parsing the name
    const splitedName = respData.name.split(" ");
    if (splitedName.length === 3) {
      name.first = splitedName[0];
      name.middle = splitedName[1];
      name.last = splitedName[2];
    } else {
      name.first = splitedName[0];
      name.last = splitedName[1];
    }
    
    //User data
    const userdata = {id, email, picture, name};
    const usernopic = {id, email, name};
    
    const token = jwt.sign(usernopic, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    return res.status(200).json({success: true, token});
  } catch (e) {
    return res.status(400).json({success: false, msg: 'Something went wrong while loggin in.'});
  }
  
  res.send("fb login");
});

module.exports = router;