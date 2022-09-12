class Result {
    isError = false;
    errorCodes = [];
    result = {};

    constructor(isError, errorCodes, result) {
        this.isError = isError;
        this.errorCodes = errorCodes;
        this.result = result;
    }

    static success(result) {
        return new Result(false, [], result);
    }

    static error(errorCodes) {
        if (!Array.isArray(errorCodes)) {
            errorCodes = [errorCodes];
        }

        return new Result(true, errorCodes, null);
    }
}

module.exports = Result;
