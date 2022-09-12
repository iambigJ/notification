/* ---------------------------------- Core ---------------------------------- */
const path = require("path");
const fs = require("fs");

/* -------------------------------- Packages -------------------------------- */
const express = require("express");

const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const redisStore = require("connect-redis")(session);
const morgan = require("morgan");
const compression = require("compression");
const cors = require("cors");
const rfs = require("rotating-file-stream");



/* ---------------------------- Express App Setup --------------------------- */
const app = express();

/* ----------------------------- SET FIRST USER ----------------------------- */
const mongoose = require('mongoose')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(
//     session({
//         ...appConfigs.SESSION,
//         store: new redisStore({ ...appConfigs.REDIS, client: redis }),
//     })
// );
// app.use(express.static(path.join(__dirname))); // in order to serve static files on server
app.use(compression());
app.use(cors());

/* ----------------------------- Log Store Setup ---------------------------- */
if (appConfigs.SHOW_LOG === "store" || appConfigs.SHOW_LOG === "full") {
    if (!fs.existsSync(path.join(__dirname, "logs", "access"))) {
        fs.mkdirSync(path.join(__dirname, "logs", "access"));
    }

    const accessLogStream = rfs.createStream("access.log", {
        interval: "1d", // rotate daily
        path: path.join(__dirname, "logs", "access"),
    });
    app.use(
        morgan(
            ':date :method :url :status :res[content-length] - :response-time ms :remote-addr ":referrer" ":user-agent"',
            { stream: accessLogStream }
        )
    );
}
if (appConfigs.SHOW_LOG === "show" || appConfigs.SHOW_LOG === "full") {
    app.use(morgan("dev"));
}

/* ---------------------------- Middleware Setup ---------------------------- */
const errorHandler = require("./middlewares/errorHandler");

/* --------------------------------- Routes --------------------------------- */
const routes = require("./routes");
app.use("/", routes);

/* ---------------------- Express Default Error Handler --------------------- */
app.use(errorHandler, function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500).json({
        status: err.status || 500,
        name: err.name || "INTERNAL_SERVER_ERROR",
        message: err.message || "internal server error",
    });
});



module.exports = app;
