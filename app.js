const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const local = require("./strategies/localStrategy");
const captchaController = require("./controllers/captchaController");
const authRoute = require("./routes/authRoute");
const articleRoute = require("./routes/articleRoute");



const app = express();


app.set('view engine', 'ejs');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')));


passport.use(local);


app.get('/', (req, res) => {
    res.render('login.ejs');
});

app.get('/captcha', captchaController.getCaptcha);
app.use('/auth', authRoute);
app.use('/article', articleRoute);





module.exports = app;