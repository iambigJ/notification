/* ---------------------------------- Tools --------------------------------- */
const TypeTool = require("./type.tool");

const validator = require("validator");
const { JSDOM } = require("jsdom");
const DOMPurify = require("dompurify");


const { window } = new JSDOM("<!DOCTYPE html>");
const domPurify = DOMPurify(window);

class TextTools {
    static sanitize(unsafeText) {
        return domPurify.sanitize(TypeTool.string(unsafeText));
    }

    static validateWebURL(url) {
        return validator.isURL(TypeTool.string(url));
    }

    static validateEmailAddress(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(TypeTool.string(email).toLowerCase());
    }

    static createRandomNumericString(numberDigits) {
        const chars = "0123456789";
        let value = "";

        for (let i = numberDigits; i > 0; --i) {
            value += chars[Math.round(Math.random() * (chars.length - 1))];
        }

        return value;
    }
}

module.exports = TextTools;
