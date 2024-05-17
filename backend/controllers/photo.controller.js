import fs from 'fs';
import path from 'path';

export const uploadPhoto = (req, res) => {
	try {
		return new Promise(() => {
			setTimeout(() => {
				return res.status(200).json({ success: true });
			}, 2000);
		});
	} catch (error) {
		return res.status(500).json({ error, success: false });
	}
};

export const isPhotoExist = (req, res) => {
	try {
		return new Promise(() => {
			setTimeout(() => {
				const { id } = req.body;
				const __dirname = path.resolve();
				const uploadsFolder = path.join(__dirname, 'uploads');
				const imagesFolder = path.join(uploadsFolder, 'images');
				const allImages = fs.readdirSync(imagesFolder);
				const image = allImages.find((image) => image.startsWith(id));
				if (image) {
					return res.status(200).json({ success: true, image: image });
				} else {
					return res.status(404).json({ success: false });
				}
			}, 2000);
		});
	} catch (error) {
		return res.status(500).json({ error, success: false });
	}
};
