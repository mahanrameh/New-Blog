const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const {userModel} = require("./../db");




module.exports = new localStrategy(async (username, password, done) => {
    const user = await userModel.findOne({
        where: {
            username
        },
        raw: true
    });

    if (!userModel) return done(null, false);


    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return done(null, false);
    }

    return done(null, user); //req.user = user
});