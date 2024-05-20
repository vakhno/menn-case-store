import mongoose, { Schema } from 'mongoose';

const CaseSchema = new Schema({
	color: {
		type: String,
		required: true,
	},
	model: {
		type: String,
		required: true,
	},
	material: {
		type: String,
		required: true,
	},
	finish: {
		type: String,
		required: true,
	},
	originalImage: {
		type: String,
		required: true,
	},
	croppedImage: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Case', CaseSchema);
