import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';

dotenv.config()

export async function connectToDatabase() {
    const URL: string = <string>process.env.MONGODB_URI;
    const client: MongoClient = await MongoClient.connect(URL)
    return client;
}