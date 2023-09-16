/* ---------------------------------- Core ---------------------------------- */
const fs = require("fs");
const path = require("path");

/* ---------------------------------- Tools --------------------------------- */
const TypeTool = require("./type.tool");

exports.logError = (section, error) => {
    return new Promise(async (resolve, reject) => {
        console.log(`************** ${section} ******************`);
        console.log(error);

        if (!fs.existsSync(path.join(__dirname, "../logs"))) {
            fs.mkdirSync(path.join(__dirname, "../logs"), { recursive: true });
        }
        if (!fs.existsSync(path.join(__dirname, "../logs/errors"))) {
            fs.mkdirSync(path.join(__dirname, "../logs/errors"), { recursive: true });
        }
        fs.appendFile(
            path.join(
                __dirname,
                "../logs/errors",
                `${TypeTool.date(Date.now(), "Y-M-D")}-error.log`
            ),
            `************** ${section} ******************\n${error.stack}\n\n\n`,
            (err) => {
                console.log(err);
            }
        );

        return resolve();
    });
};

exports.getSqlQueryLogger = (name) => {
    return {
        benchmark: true,
        logging: (sql, timing) => this.logSqlQuery(sql, timing, name),
    };
};
exports.logSqlQuery = (sql, timing, name = "default") => {
    try {
        if (typeof name !== "string") {
            name = "default";
        }

        if (process.env.NODE_ENV === "development") {
            console.log(timing, sql);
        }

        if (!fs.existsSync(path.join(__dirname, "../logs"))) {
            fs.mkdirSync(path.join(__dirname, "../logs"), { recursive: true });
        }

        if (!fs.existsSync(path.join(__dirname, "../logs/query"))) {
            fs.mkdirSync(path.join(__dirname, "../logs/query"), { recursive: true });
        }
        fs.appendFile(
            path.join(
                __dirname,
                "../logs/query",
                `${TypeTool.date(Date.now(), "Y-M-D")}-sql.log`
            ),
            `${TypeTool.date(
                Date.now(),
                "Y-M-D H:i:s"
            )} - ${name} - ${timing}ms - ${sql}\n`,
            (err) => {
                if (err) {
                    this.logError("logSqlQuery_appendFile", err);
                }
            }
        );
    } catch (err) {
        this.logError("logSqlQuery", err);
    }
};
