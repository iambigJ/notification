/* ---------------------------------- Core ---------------------------------- */
const path = require("path");

exports.findMessage = async (code, lang = process.env.LANGUAGE) => {
    const defaultError = "Error";
    try {
        const defaultLang = `${process.env.LANGUAGE}.json`;
        const needLanguage = `${lang}.json`;

        let errorFile = null;

        try {
            errorFile = require(path.join(__dirname, needLanguage));
        } catch (err) {
            try {
                errorFile = require(path.join(__dirname, defaultLang));
            } catch (err) {
                return defaultError;
            }
        }

        if (Array.isArray(code)) {
            const errors = [];
            code.forEach((c) => {
                if (errorFile[c]) errors.push(errorFile[c]);
            });

            return errors;
        }

        if (!errorFile[code]) throw "err";
        else return errorFile[code];
    } catch (err) {
        return defaultError;
    }
};
