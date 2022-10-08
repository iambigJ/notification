/* ---------------------------------- Core ---------------------------------- */
const path = require("path");

/* -------------------- Setting up Environment variables -------------------- */
require("dotenv").config({ path: path.join(__dirname, "../.env") });

/* ------------------------------ Import Configs ----------------------------- */
const db = require("./db.configs");
const session = require("./session.config");
const mail = require("./mail.config");

global.appConfigs = {
    DB: db,
    Mail: mail,
    SESSION: session,
    
    NODE_ENV: process.env.NODE_ENV,

    APP_HOST: process.env.APP_HOST || "localhost",
    APP_PORT: process.env.APP_PORT || 3000,
    APP_PROTOCOL: process.env.APP_PROTOCOL,
    APP_URL: `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}`,

    HTTPS_CERT_FILE: process.env.HTTPS_CERT_FILE,
    HTTPS_KEY_FILE: process.env.HTTPS_KEY_FILE,

    SHOW_LOG: process.env.SHOW_LOG,

    JWT_SECRET: process.env.JWT_SECRET,

    /* ---------------------------- Push notification --------------------------- */
    title: '',
    message: '',
    PUBLIC_VAPID_KEY: process.env.PUBLIC_VAPID_KEY,
    PRIVATE_VAPID_KEY: process.env.PRIVATE_VAPID_KEY,
    MAIL_TO: process.env.MAIL_TO
};
