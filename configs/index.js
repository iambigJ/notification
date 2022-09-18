/* ---------------------------------- Core ---------------------------------- */
const path = require("path");

/* -------------------- Setting up Environment variables -------------------- */
require("dotenv").config({ path: path.join(__dirname, "../.env") });

/* ------------------------------ Import Configs ----------------------------- */
const db = require("./db.configs");
const session = require("./session.config");
// const redis = require("./redis.config");

/* ----------- Global variable to use in whole Express environment ---------- */
global.appConfigs = {
    /* ---------------------------- Environment Type ---------------------------- */
    NODE_ENV: process.env.NODE_ENV,

    /* ------------------------------- App Configs ------------------------------ */
    APP_HOST: process.env.APP_HOST || "localhost",
    APP_PORT: process.env.APP_PORT || 3000,
    APP_PROTOCOL: process.env.APP_PROTOCOL,
    APP_URL: `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}`,

    /* ---------------------------------- HTTPS --------------------------------- */
    HTTPS_CERT_FILE: process.env.HTTPS_CERT_FILE,
    HTTPS_KEY_FILE: process.env.HTTPS_KEY_FILE,

    /* --------------------------------- Logging -------------------------------- */
    SHOW_LOG: process.env.SHOW_LOG,

    /* -------------------------------- Security -------------------------------- */
    JWT_SECRET: process.env.JWT_SECRET,
    SESSION: session,

    /* ---------------------------------- DB's ---------------------------------- */
    DB: db,
    // REDIS: redis,
    /* ---------------------------- Push notification --------------------------- */
    title: '',
    message: '',
    publicVapidKey: process.env.publicVapidKey,
    privateVapidKeys: process.env.privateVapidKeys
};
