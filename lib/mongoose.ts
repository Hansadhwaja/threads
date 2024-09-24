import mongoose from 'mongoose'


type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {};

export const connectToDB = async () => {

    if (!process.env.MONGODB_URL)
        return console.log('MONGODB_URL not found');
    if (connection.isConnected) {
        console.log('Already Connected to DB');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL);
        connection.isConnected = db.connections[0].readyState;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting DB:', error);
        process.exit(1);

    }
}