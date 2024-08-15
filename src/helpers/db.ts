import { MongoClient } from "mongodb";

export async function connectToDatabase() {
    const URL: string = "mongodb+srv://benjaminbourgouin:P4ssw0rdForChallenge@benjaminbourgouincoding.wbyn7.mongodb.net/?retryWrites=true&w=majority&appName=BenjaminBourgouinCodingChallenge"
    const client: MongoClient = await MongoClient.connect(URL)
    return client;
}