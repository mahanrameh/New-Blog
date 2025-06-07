const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const svgCaptcha = require("svg-captcha");
const redis = require("./../redis");
const configs = require("./../configs");
const {userModel} = require("./../db");





exports.register = async (req, res, next) => {
    try {
        const {name, password, username, email} = req.body;


        const hashedPassword = await bcrypt.hash(password, 12);


        const user = await userModel.create({
            name, 
            password: hashedPassword, 
            username, 
            email
        });


        const accessToken = jwt.sign(
            {id: user.id, role: user.role},
            configs.auth.accessTokenSecretKey,
            {expiresIn: configs.auth.accessTokenExpireTime + 'S'}
        );
        const refreshToken = jwt.sign(
            {id: user.id, role: user.role},
            configs.auth.refreshTokenSecretKey,
            {expiresIn: configs.auth.refreshTokenExpireTime + 'S'}
        );

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

        res.cookie('access-token', accessToken, {
            maxAge: 900000,
            httpOnly: true
        });
        res.cookie('refresh-token', hashedRefreshToken, {
            maxAge: 900000,
            httpOnly: true
        });

        await redis.set(
            `refreshToken: ${userModel.id}`, 
            hashedRefreshToken, 
            'EX', 
            configs.auth.refreshTokenExpireTime
        );


        return res.status(201).json
        ({
            accessToken,
            refreshToken: hashedRefreshToken
        });

    } catch (err) {
        next(err);
    }


};

exports.login = async (req, res, next) => {
    const user = req.user;

    const accessToken = jwt.sign(
        {id: user.id, role: user.role},
        configs.auth.accessTokenSecretKey,
        {expiresIn: configs.auth.accessTokenExpireTime + 'S'}
    );
    const refreshToken = jwt.sign(
        {id: user.id, role: user.role},
        configs.auth.refreshTokenSecretKey,
        {expiresIn: configs.auth.refreshTokenExpireTime + 'S'}
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    await redis.set(
        `refreshToken: ${userModel.id}`, 
        hashedRefreshToken, 
        'EX', 
        configs.auth.refreshTokenExpireTime
    );

    return res.status(200).json
    ({
        accessToken,
        refreshToken: hashedRefreshToken
    });
};
