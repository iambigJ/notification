const ErrorResult = require("../tools/error.tool");
const generalTool = require("../tools/general.tool");

class BaseController {
    static ok(res, result = {}, statusCode = 200) {
        return res.status(statusCode).json(generalTool.respond(result));
    }

    static fail(res, err, statusCode = 400, name) {
        if (err instanceof ErrorResult) {
            statusCode = err.statusCode;
            name = err.name;
            err = err.message;
        }

        return res
            .status(statusCode)
            .json(generalTool.errorResponse(err, name, statusCode));
    }
}

module.exports = BaseController;
