import axios from 'axios';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { JWTimplementing } from '../utils/JWTimplementing.js';
import jwtr from 'jwt-redis';

export const Google = (req, res) => {
	try {
		const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.AUTH_GOOGLE_ID}&redirect_uri=${process.env.AUTH_REDIRECT_URI}&response_type=code&scope=profile email`;
		return res.status(200).json({ success: true, url });
	} catch (error) {
		return res.status(500).json({ error, success: false });
	}
};

export const GoogleCallback = async (req, res) => {
	try {
		const { code } = req.query;
		// Exchange authorization code for access token
		const { data } = await axios.post('https://oauth2.googleapis.com/token', {
			client_id: process.env.AUTH_GOOGLE_ID,
			client_secret: process.env.AUTH_GOOGLE_SECRET,
			code,
			redirect_uri: process.env.AUTH_REDIRECT_URI,
			grant_type: 'authorization_code',
		});
		const { access_token } = data;

		// Use access_token or id_token to fetch user profile
		// prompt=consent param to immediate redirection
		const { data: googleUser } = await axios.get(
			'https://www.googleapis.com/oauth2/v1/userinfo?prompt=consent',
			{
				headers: { Authorization: `Bearer ${access_token}` },
			},
		);
		const { email, name, picture } = googleUser;
		const existingUser = await UserModel.findOne({ email });
		let user = {};
		if (existingUser) {
			user = existingUser;
		} else {
			const newUser = new UserModel({
				email,
				name,
				isSocial: true,
				avatar: picture,
			});
			await newUser.save();
			user = newUser;
		}
		console.log('USER', user);
		// const token = jwt.sign(
		// 	{
		// 		_id: user._id,
		// 	},
		// 	process.env.JWT_SECRET,
		// 	{
		// 		expiresIn: '1m',
		// 	},
		// );
		// res.cookie('token', token, { HttpOnly: true, secure: false });
		JWTimplementing(user._id, res);
		res.redirect(process.env.AUTH_SUCCESS_REDIRECT);
	} catch (error) {
		res.redirect('http://localhost:3000/auth/signin');
		return res.status(500).json({ error, success: false });
	}
};

export const SignIn = async (req, res) => {
	try {
		const { password, email } = req.body;
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			const { password: userPassword, isSocial } = existingUser._doc;
			const isPasswordMatch = await bcrypt.compare(password, userPassword);
			if (isPasswordMatch && !isSocial) {
				JWTimplementing(existingUser._id, res);
				return res.status(200).json({ token, success: true, user: existingUser });
			} else {
				return res.status(400).json({ success: false });
			}
		} else {
			return res.status(400).json({ success: false });
		}
	} catch (error) {
		return res.status(500).json({ error, success: false });
	}
};

export const SignUp = async (req, res) => {
	try {
		const { password, email, name } = req.body;
		const ifUserAlreadyExist = await UserModel.findOne({ email });
		if (ifUserAlreadyExist) {
			return res.status(400).json({ success: false });
		} else {
			const salt = await bcrypt.genSalt(12);
			const hashedPassword = await bcrypt.hash(password, salt);
			const newUser = new UserModel({
				email,
				password: hashedPassword,
				name,
				isSocial: false,
				avatar: '',
			});
			const createdUser = await newUser.save();
			JWTimplementing(createdUser._id, res);
			return res.status(200).json({ token, success: true, user: createdUser });
		}
	} catch (error) {
		return res.status(500).json({ error, success: false });
	}
};

export const Logout = (req, res) => {
	try {
		return res.status(200).clearCookie('token').json({ success: true });
	} catch (error) {
		return res.status(500).json({ error, success: false });
	}
};
