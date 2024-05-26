import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
	email: {
		type: String,
		requried: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	isSocial: {
		type: Boolean,
		required: true,
		default: false,
	},
	password: {
		type: String,
		required: function () {
			return !this.isSocial;
		},
	},
	avatar: {
		type: String,
	},
});

const User = mongoose.model('User', UserSchema);

export default User;
