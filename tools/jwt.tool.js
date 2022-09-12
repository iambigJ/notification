const jwt = require("jsonwebtoken");

// the input variable must be object in order for expiration time to work correctly
exports.generateAccessToken = async (data) => {
    return await jwt.sign(data, appConfigs.JWT_SECRET, {
        expiresIn: `${appConfigs.JWT_EXPIRATION_TIME}s`,
    });
};

exports.decodeAccessToken = async (token) => {
    let decodedToken;

    try {
        decodedToken = await jwt.verify(token, appConfigs.JWT_SECRET);
    } catch (err) {
        decodedToken = null;
    }

    return decodedToken;
};
