
import mongoose from 'mongoose';


type ConnectionObject = {
  isConnected?: boolean;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to DB");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);

    connection.isConnected = db.connections[0].readyState === 1;

    console.log("DB connected successfully");
  } catch (error) {
    console.log(process.env.MONGODB_URI)
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

export default dbConnect;
