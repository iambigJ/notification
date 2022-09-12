/* -------------------------------- Packages -------------------------------- */
const { Server, FileStore, EVENTS } = require("tus-node-server");

exports.uploader = (options = { uploadPath: "/" }) => {
    const uploader = new Server();
    uploader.datastore = new FileStore({
        path: options["uploadPath"],
    });
    return uploader;
};

exports.completeUploadListener = (uploader, callback) => {
    uploader.on(EVENTS.EVENT_UPLOAD_COMPLETE, callback);
};
