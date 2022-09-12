/* -------------------------------- Packages -------------------------------- */
const express = require("express");
const router = express.Router()
const api = require('./api')
/* ---------------------------------- Tools --------------------------------- */
const BaseController = require("../controllers/Base.controller");
const ErrorResult = require("../tools/error.tool");
/* --------------------------------- Routes --------------------------------- */
// api routes
router.use('/api', api)
/* ----------------------------------- 404 ---------------------------------- */
router.use("*", (req, res, next) => {
    return BaseController.fail(res, ErrorResult.notFound());
});

module.exports = router;
