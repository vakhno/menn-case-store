import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDB from './db/connectToDB.js';
import photoRouter from './routers/photo.router.js';
import caseRouter from './routers/case.router.js';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();
const options = {
	credentials: true,
	origin: true,
};

app.use(express.json());
app.use(cors(options));

app.use('/photo', photoRouter);
app.use('/case', caseRouter);
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
