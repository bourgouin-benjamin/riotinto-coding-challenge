"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsRouter = void 0;
const express_1 = __importDefault(require("express"));
const ItemService = __importStar(require("./items.service"));
exports.itemsRouter = express_1.default.Router();
exports.itemsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield ItemService.findAll();
        res.status(200).send(items);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
    finally {
        ItemService.closeClient();
    }
}));
exports.itemsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const item = yield ItemService.findById(id);
        res.status(200).send(item);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
    finally {
        ItemService.closeClient();
    }
}));
exports.itemsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = { name: req.body.name, description: req.body.description };
    try {
        if (typeof newItem.name !== 'string'
            || newItem.name === ''
            || typeof newItem.description !== 'string'
            || newItem.name === '') {
            throw new Error("You must provide a name and a description to create a new item");
        }
        yield ItemService.create(newItem);
        res.status(201).send(`Item '${newItem.name}' created successfully`);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
    finally {
        ItemService.closeClient();
    }
}));
exports.itemsRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedItem = { name: req.body.name, description: req.body.description };
    try {
        if (typeof id !== 'string' || id === '') {
            throw new Error("You must provide the id of the item you want to update.");
        }
        if (typeof updatedItem.name !== 'string'
            || updatedItem.name === ''
            || typeof updatedItem.description !== 'string'
            || updatedItem.name === '') {
            throw new Error("You must provide a name and a description to update an item.");
        }
        yield ItemService.update(id, updatedItem);
        res.status(200).send(`Item '${updatedItem.name}' updated successfully`);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
    finally {
        ItemService.closeClient();
    }
}));
exports.itemsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (typeof id !== 'string' || id === '') {
            throw new Error("You must provide the id of the item you want to delete.");
        }
        yield ItemService.remove(id);
        res.status(204).send("Item deleted successfully");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
    finally {
        ItemService.closeClient();
    }
}));
