const ErrorResult = require("./error.tool");
const TypeTool = require("./type.tool");
const BaseController = require("../controllers/Base.controller");
const { findMessage } = require("../messages/message");

/* ------------------ global try catch for our controllers ------------------ */
exports.asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        let functionName = "";
        // if (typeof fn === "function") {
        //     functionName = fn.name;
        // }

        if (
            !TypeTool.boolean(err?.message) &&
            TypeTool.boolean(err?.messageCode)
        ) {
            err.message = await findMessage(err.messageCode, req.language.code);
        }

        return BaseController.fail(
            res,
            ErrorResult.internal(err, null, functionName)
        );
    }
};