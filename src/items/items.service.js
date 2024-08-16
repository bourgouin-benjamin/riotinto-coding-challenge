"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findById = exports.findAll = exports.closeClient = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../helpers/db");
let client;
const closeClient = () => {
    client.close();
};
exports.closeClient = closeClient;
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        client = yield (0, db_1.connectToDatabase)();
    }
    catch (error) {
        throw new Error("Connection impossible, request failed");
    }
    const db = client.db();
    let items = [];
    yield db.collection('inventory').find({}).toArray().then(result => {
        items = JSON.parse(JSON.stringify(result));
    }).catch(error => { throw new Error("Something went wrong."); });
    return items;
});
exports.findAll = findAll;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        client = yield (0, db_1.connectToDatabase)();
    }
    catch (error) {
        throw new Error("Connection impossible, request failed");
    }
    const db = client.db();
    let item = { id: "", name: "", description: "" };
    yield db.collection('inventory').findOne({ _id: new mongodb_1.ObjectId(id) }).then(result => {
        item = JSON.parse(JSON.stringify(result));
    }).catch(error => { throw new Error("Item with provided id doesn't exist"); });
    return item;
});
exports.findById = findById;
const create = (newItem) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        client = yield (0, db_1.connectToDatabase)();
    }
    catch (error) {
        throw new Error("Connection impossible, request failed");
    }
    const db = client.db();
    try {
        yield db.collection('inventory').insertOne({ name: newItem.name, description: newItem.description });
    }
    catch (error) {
        throw new Error("Something went wront during item creation");
    }
});
exports.create = create;
const update = (id, itemUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        client = yield (0, db_1.connectToDatabase)();
    }
    catch (error) {
        throw new Error("Connection impossible, request failed");
    }
    const db = client.db();
    let existingItem = { id: "", name: "", description: "" };
    yield db.collection('inventory').findOne({ _id: new mongodb_1.ObjectId(id) }).then(result => {
        existingItem = JSON.parse(JSON.stringify(result));
    });
    if (existingItem) {
        yield db.collection('inventory').updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { name: itemUpdate.name, description: itemUpdate.description } }).catch(error => { throw new Error("Something went wrong during item update."); });
    }
    else {
        throw new Error("Target item doesn't exist.");
    }
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        client = yield (0, db_1.connectToDatabase)();
    }
    catch (error) {
        throw new Error("Connection impossible, request failed");
    }
    const db = client.db();
    let existingItem = { id: "", name: "", description: "" };
    ;
    yield db.collection('inventory').findOne({ _id: new mongodb_1.ObjectId(id) }).then(result => {
        existingItem = JSON.parse(JSON.stringify(result));
    });
    if (!existingItem) {
        throw new Error("Item with provided id doesn't exist.");
    }
    yield db.collection('inventory').deleteOne({ _id: new mongodb_1.ObjectId(id) }).catch(error => {
        throw new Error("Something wetn wrong during item delete.");
    });
});
exports.remove = remove;
