const mongoose = require("mongoose");


const dbUrl = appConfigs.DB.DBurl_ENV;
exports.databaseConnection = async () => {
    await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};