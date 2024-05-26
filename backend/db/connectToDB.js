import mongoose from 'mongoose';

const connectToDB = () => {
	mongoose.connect(process.env.MONGO_DB_URI).then(() => {
		console.log('CONNECTED TO DB');
	});
};

export default connectToDB;
