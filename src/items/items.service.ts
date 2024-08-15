import express, { Request, Response, Router } from "express";
import Item from "./item.model";
import { Db, MongoClient } from "mongodb";
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
    return items;
})
