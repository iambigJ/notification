/* ---------------------------------- Tools --------------------------------- */
const ErrorResult = require("../tools/error.tool");

module.exports = (err, req, res, next) => {
    if (err instanceof ErrorResult)
        return res.status(err.statusCode).json({
            status: err.statusCode,
            name: err.name,
            message: err.message,
        });
    next(err);
};
