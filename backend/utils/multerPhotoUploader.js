import multer from 'multer';
import fs from 'fs';
import path from 'path';

export const multerPhotoUpload = (req, res, next) => {
	try {
		// initialize root directory
		const __dirname = path.resolve();
		const photoUploadFolder = path.join(__dirname, 'uploads', 'images');
		const storage = multer.diskStorage({
			destination: (req, file, cb) => {
				// reate folder if it does not exist
				if (!fs.existsSync(photoUploadFolder)) {
					fs.mkdirSync(photoUploadFolder);
				}
				cb(null, photoUploadFolder);
			},
			filename: (req, file, cb) => {
				const fileName = file.originalname;
				cb(null, fileName);
			},
		});
		const upload = multer({ storage: storage });
		upload.single('image')(req, res, (error) => {
			if (error) {
				return res.status(500).json({ error, success: false });
			} else {
				next();
			}
		});
	} catch (error) {
		return res.status(500).json({ error, success: false });
	}
};
