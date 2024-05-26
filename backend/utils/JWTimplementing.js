import jwt from 'jsonwebtoken';

export const JWTimplementing = (id, res) => {
	const token = jwt.sign(
		{
			_id: id,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '1',
		},
	);
	res.cookie('token', token, { HttpOnly: true, secure: false });
};
