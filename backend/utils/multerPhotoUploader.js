import multer from 'multer';
import fs from 'fs';
import path from 'path';

export const multerPhotoUpload = (req, res, next) => {
	try {
		const __dirname = path.resolve();
		const uploadsFolder = path.join(__dirname, 'uploads');
		const imagesFolder = path.join(uploadsFolder, 'images');

		if (!fs.existsSync(uploadsFolder)) {
			fs.mkdirSync(uploadsFolder);
		}

		if (!fs.existsSync(imagesFolder)) {
			fs.mkdirSync(imagesFolder);
		}

		const storage = multer.diskStorage({
			destination: (req, file, cb) => {
				cb(null, imagesFolder);
			},
			filename: (req, file, cb) => {
				const id = req.body.id;
				let fileName = id + path.extname(file.originalname);
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
