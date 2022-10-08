/* ---------------------------------- core ---------------------------------- */
const fs = require("fs");

/* -------------------------------- Packages -------------------------------- */
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const DeviceDetector = require("node-device-detector");
const deviceDetector = new DeviceDetector();

/* ----------------------------------- DB ----------------------------------- */
// const Redis = require("../tools/redis.tool");

/* ---------------------------------- Tools --------------------------------- */
const ErrorResult = require("./error.tool");
const TypeTool = require("./type.tool");
const { logError } = require("./log.tool");
const BaseController = require("../controllers/Base.controller");
const { findMessage } = require("../messages/message");



exports.respond = (result = "", status = 200) => {
    return {
        status,
        result,
    };
};
exports.errorResponse = (message = "", name = "BAD_REQUEST", status = 400) => {
    if (!Array.isArray(message)) {
        message = [message];
    }

    return {
        status,
        name,
        message,
    };
};

exports.sendMail_tool = async (to, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            secure: false,
            service: appConfigs.MAIL_SERVICE,
            auth: {
                user: appConfigs.MAIL_ADDRESS,
                pass: appConfigs.MAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: appConfigs.MAIL_ADDRESS,
            to,
            subject,
            text,
            html,
        });
    } catch (err) {
        throw ErrorResult.internal(err, null, "sendMail_tool");
    }
};

/* ------------------------- generating random code ------------------------- */
exports.generateRandomCode = (codeLength = 10) => {
    // random 4 digits number
    return (
        Math.floor(Math.random() * (9 * Math.pow(10, codeLength - 1))) +
        Math.pow(10, codeLength - 1)
    );
};

exports.makeSlug = (str) => {
    return str.trim().split(" ").join("_");
};

exports.createKeyIdObject = (arr) => {
    let object = {};
    arr.forEach((item) => (object[id] = item));
    return object;
};

exports.base64ToObject = (stringValue) => {
    const keyValuePairList = stringValue.split(",");
    return keyValuePairList.reduce((metadata, keyValuePair) => {
        let [key, base64Value] = keyValuePair.split(" ");
        metadata[key] = new Buffer(base64Value, "base64").toString("ascii");
        return metadata;
    }, {});
};

/* ---------------------------- create server url --------------------------- */
exports.createServerUrl = (path) => {
    if (path) {
        if (path.includes("http")) {
            return path;
        } else {
            return appConfigs.APP_URL + path;
        }
    } else {
        return null;
    }
};

/* ------------------------------ moving files ------------------------------ */
exports.moveFileTo = (from, to) => {
    return new Promise((resolve, reject) => {
        fs.rename(from, to, function (err) {
            if (err) {
                logError("moveFileTo", err);
                return resolve(false);
            }
            return resolve(true);
        });
    });
};

/* ---------------- creating pagination for sequelize queries --------------- */
exports.createPaginationQuery = (query, page, take) => {
    if (page < 1) page = 1;

    if (take !== null && page !== null && page > 0 && take > 0) {
        query.offset = parseInt((page - 1) * take);
        query.limit = parseInt(take);
    }
    return query;
};

exports.sortArrayAsArray = (data, sortByArray, key) => {
    try {
        let sortedContent = [];
        TypeTool.array(sortByArray).forEach((item) => {
            let content = data.find((c) => TypeTool.compare(c[key], item));
            if (content) {
                sortedContent.push(content);
            }
        });

        return sortedContent;
    } catch (err) {
        throw ErrorResult.internal(err, null, "sortArrayAsArray");
    }
};

/* ------------------------- get devices ip and info ------------------------ */
exports.getDeviceAndIpInfo = async (req, data = {}) => {
    let result = {};

    const { needDevice = true, needIp = true } = data;

    if (needDevice)
        result.device = deviceDetector.detect(req.headers["user-agent"]);
    if (needIp) result.ip = req.clientIp;

    return result;
};

/* ---------------- extracting authorization token of request --------------- */
exports.extractTokenFromRequest = (req) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
};

/* -------------------------- find a token in redis ------------------------- */
exports.extractTokenFromRedis_Tool = async (token) => {
    const value = await Redis.get(token);
    if (!TypeTool.boolean(value)) {
        return { decoded: await jwt.verify(token, appConfigs.JWT_SECRET) };
    }

    return { deviceInRedis: JSON.parse(value) };
};

/* --------------------------- add data to request -------------------------- */
exports.addDataToRequest = async (req, ...data) => {
    data.forEach((data) => {
        Object.keys(data).forEach((key) => (req[key] = data[key]));
    });
};

/* ---------------------------- set data in redis --------------------------- */
exports.setInRedis_tool = async (
    key,
    data,
    expiration = null,
    newData = false
) => {
    try {
        let inRedis = await Redis.get(key);

        let lastData = JSON.parse(inRedis);
        if (!TypeTool.boolean(lastData)) {
            lastData = {};
        } else if (newData) {
            lastData = { ...data };
        }

        await Redis.set(key, JSON.stringify({ ...lastData, ...data }));

        if (expiration) {
            await Redis.expire(key, expiration);
        }

        return true;
    } catch (err) {
        return ErrorResult.internal(err, null, "setInRedis_tool");
    }
};

/* -------------------------- update data in redis -------------------------- */
exports.updateRedis_tool = async (key, data, expiration = null) => {
    try {
        let inRedis = await Redis.get(key);
        if (!TypeTool.boolean(inRedis)) {
            return "notFound";
        }

        let lastData = JSON.parse(inRedis);
        if (!TypeTool.boolean(lastData)) {
            lastData = {};
        }

        await Redis.set(key, JSON.stringify({ ...lastData, ...data }));
        await Redis.expire(key, expiration);

        return true;
    } catch (err) {
        return ErrorResult.internal(err, null, "updateRedis_tool");
    }
};

/* --------------------- extract data from requset query -------------------- */
exports.getDataFromReqQuery = (reqQuery) => {
    let data = {};

    if (!reqQuery) return data;

    for (const key in reqQuery) {
        try {
            data[key] = JSON.parse(reqQuery[key]);
        } catch (err) {
            data[key] = reqQuery[key];
        }
    }

    return data;
};

/* ---------------------- simple key existing validator --------------------- */
exports.validateNecessaryKeys = (keys, data) => {
    let errors = [];

    keys.forEach((key) => {
        if (!data[key]) errors.push(`${key} field is required!`);
    });

    if (errors.length > 0) throw ErrorResult.badRequest(errors);
    return true;
};

/* --------------------------- generate timestamp --------------------------- */
exports.generateTimestamp = () =>
    new Date().toISOString().slice(0, 19).replace("T", " ");
