import { Db, MongoClient, ObjectId } from "mongodb";
import Item from "./item.model";
import { connectToDatabase } from "../helpers/db";

let client: MongoClient;

export const closeClient = () => {
    client.close();
}

export const findAll = async(): Promise<Item[]> => {
    try {
        client = await connectToDatabase();
    } catch (error) {
        throw new Error("Connection impossible, request failed")
    }
    const db: Db = client.db();
    return JSON.parse(JSON.stringify(db.collection<Item>('inventory').find().toArray()));
}

export const findById = async(id: string): Promise<Item> => {
    try {
        client = await connectToDatabase();
    } catch (error) {
        throw new Error("Connection impossible, request failed")
    }
    const db: Db = client.db();
    return JSON.parse(JSON.stringify(db.collection<Item>('inventory').findOne({_id: new ObjectId(id)})));
}

export const create = async(newItem: Item): Promise<Item> => {
    try {
        client = await connectToDatabase();
    } catch (error) {
        throw new Error("Connection impossible, request failed")
    }
    const db: Db = client.db();

    try {
        await db.collection<Item>('inventory').insertOne(newItem)
    } catch (error) {
        throw new Error("Something went wrong during the insertion of the new item.");
    }
    return newItem;
}

export const update = async(id: string, item: Item): Promise<Item> => {
    try {
        client = await connectToDatabase();
    } catch (error) {
        throw new Error("Connection impossible, request failed")
    }
    const db: Db = client.db();

    const existingItem: Item = JSON.parse(JSON.stringify(db.collection<Item>('inventory').findOne({_id: new ObjectId(id)})));
    if(existingItem){
        try{
            db.collection<Item>('inventory').updateOne(
                { _id: new ObjectId(id)},
                { $set: { name: item.name, description: item.description } }
            )
        } catch (error) {
            throw new Error("Something when wrong during item update.")
        }
    } else {
        throw new Error("Target item doesn't exist.")
    }
    return item;
}

export const remove = async(id: string): Promise<void> => {
    try {
        client = await connectToDatabase();
    } catch (error) {
        throw new Error("Connection impossible, request failed")
    }
    const db: Db = client.db();

    const existingItem: Item = JSON.parse(JSON.stringify(db.collection<Item>('inventory').findOne({_id: new ObjectId(id)})));
    if(!existingItem) {
        throw new Error("Item with provided id doesn't exist.")
    }

    try {
        await db.collection('inventory').deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
        throw new Error("Something wetn wrong during item delete.")
    }
}
