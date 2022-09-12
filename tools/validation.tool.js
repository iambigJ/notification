/* -------------------------------- Packages -------------------------------- */
const { validationResult } = require("express-validator");

/* ---------------------------------- Tools --------------------------------- */
const { badRequest } = require("../tools/error.tool");

/** this tool helps returning errors of middleware validation checks made by express-validator */
exports.handleValidationErrors = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    next(badRequest(errors.array()));
};
