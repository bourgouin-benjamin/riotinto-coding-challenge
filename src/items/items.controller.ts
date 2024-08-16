import express, { Request, Response, Router } from "express";
import Item from './item.model';
import * as ItemService from "./items.service"

export const itemsRouter: Router = express.Router();

// Retrieve a list of all items.
itemsRouter.get("/items", async(req: Request, res: Response) => {
    try {
        const items: Item[] | undefined = await ItemService.findAll();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send((<Error>error).message);
    }
    ItemService.closeClient();
})

// Retrieve a single item by its ID.
itemsRouter.get("/items/:id", async(req: Request, res: Response) => {
    const id: string = req.params.id;
    try{
        const item: Item = await ItemService.findById(id);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send((<Error>error).message)
    }
    ItemService.closeClient();
})

// Create a new item in the database.
itemsRouter.post("/items", async(req: Request, res: Response) => {
    const newItem: Item = req.body;
    try{
        const addedItem: Item = await ItemService.create(newItem);
        res.status(200).send(`Item ${addedItem.name} added successfully`)
    } catch (error) {
        res.status(500).send((<Error>error).message)
    }
    ItemService.closeClient();
})

// Update an existing item by its ID.
itemsRouter.put("items/:id", async(req: Request, res: Response) => {
    const id: string = req.params.id;
    const item: Item = req.body;
    try {
        const updatedItem: Item = await ItemService.update(id, item);
        res.status(200).send(`Item '${updatedItem.name}' updated successfully`);
    } catch (error) {
        res.status(500).send((<Error>error).message)
    }
    ItemService.closeClient();
})

// Update an existing item by its ID.
itemsRouter.delete("/items/:id", async(req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        await ItemService.remove(id);
        res.status(200).send("Item deleted successfully");
    } catch (error) {
        res.status(500).send((<Error>error).message);
    }
    ItemService.closeClient();
})

