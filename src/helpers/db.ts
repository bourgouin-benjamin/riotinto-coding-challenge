import { MongoClient } from "mongodb";

export async function connectToDatabase() {
    const URL: string = "mongodb+srv://benjaminbourgouin:NAfikEht6IuNguMx@benjaminbourgouincoding.wbyn7.mongodb.net/coding-store?retryWrites=true&w=majority&appName=BenjaminBourgouinCodingChallenge"
    const client: MongoClient = await MongoClient.connect(URL)
    return client;
}