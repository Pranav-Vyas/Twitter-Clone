const express = require("express");
const dotenv = require("dotenv");
const port = 5000;
const app = express();
var cors = require("cors");
// const middleware = require("./middleware.js");
const session = require("express-session");

dotenv.config({path: './config.env'});

require("./database");
const secret = process.env.SECRET;

app.use(cors());
app.use(express.json());
app.use(session(
    {
        secret: secret,
        resave: true,
        saveUninitialized: false,
        proxy: true,
        withCredentials: true,
        cookie: { secure: false },
    }
))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use("/login", require("./routes/loginRoute"));
app.use("/signup", require("./routes/RegisterRoute"));
app.use("/logout", require("./routes/logoutRoute"));
app.use("/profileRoute", require("./routes/profileRoute"));
app.use("/postRoute", require("./routes/postRoute"));
app.use("/exploreRoute", require("./routes/exploreRoute"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/follow", require("./routes/api/follow"));
app.use("/api/upload", require("./routes/api/fileUpload"));
app.use("/api/conversation", require("./routes/api/conversation"));
app.use("/api/message", require("./routes/api/message"));
app.use("/", require("./routes/auth"));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})