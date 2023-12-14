import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({ storage });

export const uploadSingle = ( filename ) => upload.single(filename);

//export const uploadArr = ( filename, maxFileNumber ) => upload.array(filename, maxFileNumber)