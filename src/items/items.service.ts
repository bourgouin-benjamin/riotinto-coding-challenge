import { Db, MongoClient, ObjectId } from "mongodb";
import { BaseItem, Item } from "./item.model";
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
    let items: Item[] = [];
    await db.collection('inventory').find({}).toArray().then(result => {
        items = JSON.parse(JSON.stringify(result));
    }).catch(error => {throw new Error("Something went wrong.")});
    return items;
}

export const findById = async(id: string): Promise<Item> => {
    try {
        client = await connectToDatabase();
    } catch (error) {
        throw new Error("Connection impossible, request failed")
    }
    const db: Db = client.db();
    let item: Item = {id: "", name: "", description: ""};
    await db.collection('inventory').findOne({_id: new ObjectId(id)}).then(result => {
        item = JSON.parse(JSON.stringify(result));
    }).catch(error => {throw new Error("Item with provided id doesn't exist")});
    return item;
}

export const create = async(newItem: BaseItem): Promise<void> => {
    try {
        client = await connectToDatabase();
    } catch (error) {
        throw new Error("Connection impossible, request failed")
    }
    const db: Db = client.db();

    try{
        await db.collection('inventory').insertOne({name: newItem.name, description: newItem.description})
    } catch(error) {
        throw new Error("Something went wront during item creation")
    }
}

export const update = async(id: string, itemUpdate: BaseItem): Promise<void> => {
    try {
        client = await connectToDatabase();
    } catch (error) {
        throw new Error("Connection impossible, request failed")
    }
    const db: Db = client.db();

    let existingItem: Item = {id: "", name: "", description: ""};
    await db.collection('inventory').findOne({_id: new ObjectId(id)}).then(result => {
        existingItem = JSON.parse(JSON.stringify(result));
    });
    if(existingItem){
        await db.collection('inventory').updateOne(
            { _id: new ObjectId(id)},
            { $set: { name: itemUpdate.name, description: itemUpdate.description } }
        ).catch(error => {throw new Error("Something went wrong during item update.")})
    } else {
        throw new Error("Target item doesn't exist.")
    }
}

export const remove = async(id: string): Promise<void> => {
    try {
        client = await connectToDatabase();
    } catch (error) {
        throw new Error("Connection impossible, request failed")
    }
    const db: Db = client.db();

    let existingItem: Item = {id: "", name: "", description: ""};;
    await db.collection<Item>('inventory').findOne({_id: new ObjectId(id)}).then(result => {
        existingItem = JSON.parse(JSON.stringify(result));
    });
    if(!existingItem) {
        throw new Error("Item with provided id doesn't exist.")
    }

    await db.collection('inventory').deleteOne({ _id: new ObjectId(id) }).catch(error => {
        throw new Error("Something wetn wrong during item delete.");
    })
}
