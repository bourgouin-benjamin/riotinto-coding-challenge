import express, { Request, Response, Router } from "express";
import Item from "./item.model";
import { Db, MongoClient, ObjectId } from "mongodb";
import { connectToDatabase } from "../helpers/db";

export const router: Router = express.Router();

// Retrieve a list of all items.
router.get("/items", async(req: Request, res: Response) => {
    let client: MongoClient;
    try {
        client = await connectToDatabase();
    } catch (error) {
        res.status(500).send("Request failed");
        return;
    }
    const db: Db = client.db();

    const items: Item[] = JSON.parse(JSON.stringify(db.collection<Item>('inventory').find().toArray()));
    client.close();
    return items;
})

// Retrieve a single item by its ID.
router.get("/items/:id", async(req: Request, res: Response) => {
    const id: string = req.params.id;

    let client: MongoClient;
    try {
        client = await connectToDatabase();
    } catch (error) {
        res.status(500).send("Request failed");
        return;
    }
    const db: Db = client.db();

    const item: Item = JSON.parse(JSON.stringify(db.collection('inventory').findOne({_id: new ObjectId(id)})));
    client.close();
    return item;
})

// Create a new item in the database.
router.post("/", async(req: Request, res: Response) => {
    const item: Item = req.body;

    let client: MongoClient;
    try {
        client = await connectToDatabase();
    } catch (error) {
        res.status(500).send("Request failed");
        return;
    }
    const db: Db = client.db();

    try {
        await db.collection('inventory').insertOne(item)
    } catch (error) {
        res.status(500).send("Request failed");
        return;
    }

    // Success 
    client.close()
    res.status(200).send(`Item ${item.name} added successfully`)
})

// Update an existing item by its ID.
router.put("items/:id", async(req: Request, res: Response) => {
    const id: string = req.params.id;
    const item: Item = req.body;
    
    let client: MongoClient;
    try {
        client = await connectToDatabase();
    } catch (error) {
        res.status(500).send("Request failed");
        return;
    }
    const db: Db = client.db();

    const existingItem: Item = JSON.parse(JSON.stringify(db.collection('inventory').findOne({_id: new ObjectId(id)})));
    if(existingItem){
        try{
            db.collection('inventory').updateOne(
                { _id: new ObjectId(id)},
                { $set: { name: item.name, description: item.description } }
            )
        } catch (error) {
            res.status(500).send("Request failed");
            client.close();
            return;
        }

        // Success 
        client.close();
        res.status(200).send(`Item ${item.name} updated successfully`);
    }
})

// Update an existing item by its ID.
router.delete("/items/:id", async(req: Request, res: Response) => {
    const id: string = req.params.id;

    let client: MongoClient;
    try {
        client = await connectToDatabase();
    } catch (error) {
        res.status(500).send("Request failed");
        return;
    }
    const db: Db = client.db();

    try {
        await db.collection('inventory').deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
        res.status(500).send("Impossible to delete this item");
    }

    // Success 
    client.close();
    res.status(200).send("Item deleted successfully");
})

