const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");

//middlewares
app.use(cors());

//imported routes
const loginRoute = require("./routes/login");
const oauthRoute = require("./routes/oauth");

//use routes
app.use('/api', loginRoute);
app.use('/api', oauthRoute);

//routes
app.get('/', (req, res) => {
  res.send("Hello World!");
});


server.listen(8080, () => console.log('Backend was running on port 8080...'));