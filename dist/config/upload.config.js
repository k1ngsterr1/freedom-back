"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfFileUploadOptions = void 0;
const multer_1 = require("multer");
exports.pdfFileUploadOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads',
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const originalName = file.originalname.split('.')[0];
            const extension = file.mimetype.split('/')[1];
            callback(null, `${originalName}-${uniqueSuffix}.${extension}`);
        },
    }),
    fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'application/pdf') {
            return callback(new Error('Only PDF files are allowed!'), false);
        }
        callback(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
};
//# sourceMappingURL=upload.config.js.map