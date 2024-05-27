import axios from 'axios';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { JWTimplementing } from '../utils/JWTimplementing.js';

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------
import { OAuth2Client } from 'google-auth-library';
import http from 'http';
import url from 'url';

const googleClient = new OAuth2Client({
	clientId: `${process.env.AUTH_GOOGLE_ID}`,
	clientSecret: `${process.env.AUTH_GOOGLE_SECRET}`,
});

export const Google = async (req, res) => {
	const { token } = req.body;
	console.log(token);
	const ticket = await googleClient.verifyIdToken({
		idToken: token,
		audient: `${process.env.AUTH_GOOGLE_ID}`,
	});

	const payload = ticket.getPayload();
	console.log('PAYLOAD', payload);
	// let user = await User.findOne({ email: payload?.email });
	// if (!user) {
	//   user = await new User({
	// 	email: payload?.email,
	// 	avatar: payload?.picture,
	// 	name: payload?.name,
	//   });

	//   await user.save();
	// }

	res.json({ user, token });
};

// export const Google = async (req, res) => {
// 	const oAuth2Client = await getAuthenticatedClient(res);
// 	// Make a simple request to the People API using our pre-authenticated client. The `request()` method
// 	// takes an GaxiosOptions object.  Visit https://github.com/JustinBeckwith/gaxios.
// 	const url = 'https://people.googleapis.com/v1/people/me?personFields=names';
// 	const result = await oAuth2Client.request({ url });
// 	console.log(result.data);

// 	// After acquiring an access_token, you may want to check on the audience, expiration,
// 	// or original scopes requested.  You can do that with the `getTokenInfo` method.
// 	const tokenInfo = await oAuth2Client.getTokenInfo(oAuth2Client.credentials.access_token);
// 	console.log(tokenInfo);
// };

// export const getAuthenticatedClient = (res) => {
// 	return new Promise((resolve, reject) => {
// 		// create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
// 		// which should be downloaded from the Google Developers Console.
// 		const oAuth2Client = new OAuth2Client(
// 			process.env.AUTH_GOOGLE_ID,
// 			process.env.AUTH_GOOGLE_SECRET,
// 			process.env.AUTH_REDIRECT_URI,
// 		);

// 		// Generate the url that will be used for the consent dialog.
// 		const authorizeUrl = oAuth2Client.generateAuthUrl({
// 			access_type: 'offline',
// 			scope: 'https://www.googleapis.com/auth/userinfo.profile',
// 		});

// 		// Open an http server to accept the oauth callback. In this simple example, the
// 		// only request to our webserver is to /oauth2callback?code=<code>
// 		const server = http.createServer(async (req, res) => {
// 			try {
// 				if (req.url.indexOf('/oauth2callback') > -1) {
// 					// acquire the code from the querystring, and close the web server.
// 					const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
// 					const code = qs.get('code');
// 					console.log(`Code is ${code}`);
// 					res.end('Authentication successful! Please return to the console.');
// 					server.destroy();

// 					// Now that we have the code, use that to acquire tokens.
// 					const r = await oAuth2Client.getToken(code);
// 					// Make sure to set the credentials on the OAuth2 client.
// 					oAuth2Client.setCredentials(r.tokens);
// 					console.info('Tokens acquired.');
// 					resolve(oAuth2Client);
// 				}
// 			} catch (e) {
// 				reject(e);
// 			}
// 		});
// 		console.log('authorizeUrl', authorizeUrl);
// 		res.send(authorizeUrl);
// 		// .listen(3000, () => {
// 		// 	// open the browser to the authorize url to start the workflow
// 		// 	open(authorizeUrl, { wait: false }).then((cp) => cp.unref());
// 		// });
// 		// destroyer(server);
// 	});
// };

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

// export const Google = (req, res) => {
// 	const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.AUTH_GOOGLE_ID}&redirect_uri=${process.env.AUTH_REDIRECT_URI}&response_type=code&scope=profile email`;
// 	return res.status(200).json({ url, success: true });
// };

// export const GoogleCallback = async (req, res) => {
// 	try {
// 		const { code } = req.query;
// 		// Exchange authorization code for access token
// 		const { data } = await axios.post('https://oauth2.googleapis.com/token', {
// 			client_id: process.env.AUTH_GOOGLE_ID,
// 			client_secret: process.env.AUTH_GOOGLE_SECRET,
// 			code,
// 			redirect_uri: process.env.AUTH_REDIRECT_URI,
// 			grant_type: 'authorization_code',
// 		});
// 		const { access_token } = data;

// 		// Use access_token or id_token to fetch user profile
// 		// prompt=consent param to immediate redirection
// 		const { data: googleUser } = await axios.get(
// 			'https://www.googleapis.com/oauth2/v1/userinfo?prompt=consent',
// 			{
// 				headers: { Authorization: `Bearer ${access_token}` },
// 			},
// 		);
// 		const { email, name, picture } = googleUser;
// 		const existingUser = await UserModel.findOne({ email });
// 		let user = {};
// 		if (existingUser) {
// 			user = existingUser;
// 		} else {
// 			const newUser = new UserModel({
// 				email,
// 				name,
// 				isSocial: true,
// 				avatar: picture,
// 			});
// 			await newUser.save();
// 			user = newUser;
// 		}
// 		console.log('USER', user);
// 		// const token = jwt.sign(
// 		// 	{
// 		// 		_id: user._id,
// 		// 	},
// 		// 	process.env.JWT_SECRET,
// 		// 	{
// 		// 		expiresIn: '1m',
// 		// 	},
// 		// );
// 		// res.cookie('token', token, { HttpOnly: true, secure: false });
// 		JWTimplementing(user._id, res);
// 		res.redirect(process.env.AUTH_SUCCESS_REDIRECT);
// 	} catch (error) {
// 		res.redirect('http://localhost:3000/auth/signin');
// 		return res.status(500).json({ error, success: false });
// 	}
// };

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
