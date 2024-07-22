
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {Request, Response,NextFunction} from 'express'

const checkAndCreateDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    console.log(dir)
    fs.mkdirSync(dir, { recursive: true });
  }
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    let uploadPath = '../../uploads/others'; // Default upload path

    const mime = file.mimetype;
    
    if (mime.startsWith('image/')) {
      uploadPath = '../../public/uploads/images';
    } else if (mime.startsWith('video/')) {
      uploadPath = '../../public/uploads/videos';
    } else if (mime === '../../public/application/pdf') {
      uploadPath = '../../public/uploads/documents';
    }

    checkAndCreateDir(path.join(__dirname, uploadPath));
    cb(null, path.join(__dirname, uploadPath));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, 
});

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const uploadHandler = upload.fields([
      { name: 'image', maxCount: 1 }, 
      { name: 'video', maxCount: 1 }, 
      { name: 'pdf', maxCount: 1 }
    ]);
    
    uploadHandler(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading file', error: err });
      }
      next();
    });

};

export default uploadMiddleware;
