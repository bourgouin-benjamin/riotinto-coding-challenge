import express, { Request, Response, Router } from "express";
import { BaseItem, Item } from './item.model';
import * as ItemService from "./items.service"

export const itemsRouter: Router = express.Router();

// Retrieve a list of all items.
itemsRouter.get("/", async(req: Request, res: Response) => {
    try {
        const items: Item[] = await ItemService.findAll();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send((<Error>error).message);
    } finally {
        ItemService.closeClient();
    }
})

// Retrieve a single item by its ID.
itemsRouter.get("/:id", async(req: Request, res: Response) => {
    const id: string = req.params.id;
    try{
        const item: Item = await ItemService.findById(id);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send((<Error>error).message)
    } finally {
        ItemService.closeClient();
    }
})

// Create a new item in the database.
itemsRouter.post("/", async(req: Request, res: Response) => {
    const newItem: BaseItem = {name: <string>req.body.name, description: <string>req.body.description}
    try{
        if(typeof newItem.name !== 'string'
            || newItem.name === ''
            || typeof newItem.description !== 'string'
            || newItem.name === ''
        ) {
            throw new Error("You must provide a name and a description to create a new item")
        }

        await ItemService.create(newItem);
        res.status(201).send(`Item '${newItem.name}' created successfully`)
    } catch (error) {
        res.status(500).send((<Error>error).message)
    } finally {
        ItemService.closeClient();
    }
})

// Update an existing item by its ID.
itemsRouter.put("/:id", async(req: Request, res: Response) => {
    const id: string = req.params.id;
    const updatedItem: BaseItem = {name: <string>req.body.name, description: <string>req.body.description};
    try {
        if(typeof id !== 'string' || id === ''){
            throw new Error("You must provide the id of the item you want to update.")
        }
        
        if(typeof updatedItem.name !== 'string'
            || updatedItem.name === ''
            || typeof updatedItem.description !== 'string'
            || updatedItem.name === ''
        ) {
            throw new Error("You must provide a name and a description to update an item.")
        }

        await ItemService.update(id, updatedItem);
        res.status(200).send(`Item '${updatedItem.name}' updated successfully`);
    } catch (error) {
        res.status(500).send((<Error>error).message)
    } finally {
        ItemService.closeClient();
    }
})

// Update an existing item by its ID.
itemsRouter.delete("/:id", async(req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        if(typeof id !== 'string' || id === ''){
            throw new Error("You must provide the id of the item you want to delete.")
        }

        await ItemService.remove(id);
        res.status(204).send("Item deleted successfully");
    } catch (error) {
        res.status(500).send((<Error>error).message);
    } finally {
        ItemService.closeClient();
    }
})

