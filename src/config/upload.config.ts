import { diskStorage } from 'multer';

export const pdfFileUploadOptions = {
  storage: diskStorage({
    destination: './uploads', // Path where files will be stored
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
