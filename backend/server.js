import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDB from './db/connectToDB.js';
import photoRouter from './routers/photo.router.js';
import caseRouter from './routers/case.router.js';
import authRouter from './routers/auth.router.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();
const options = {
	credentials: true,
	origin: ['https://accounts.google.com', 'http://localhost:3000', 'https://people.googleapis.com'],
};

app.use(express.json());
app.use(cors(options));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/photo', photoRouter);
app.use('/case', caseRouter);
app.use('/auth', authRouter);
// route to serve static files form 'uploads' folder
app.use('/uploads', express.static('uploads'));

app.listen(PORT, (error) => {
	if (error) {
		console.log(error);
		return;
	} else {
		connectToDB();
	}
});
