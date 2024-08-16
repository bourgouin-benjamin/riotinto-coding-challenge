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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../src/index"));
const itemService = __importStar(require("../src/items/items.service"));
const API_URL = '/api/items';
jest.mock('../src/items/items.service.ts');
describe('Items Controller', () => {
    describe('GET /items', () => {
        it('should return a list of items', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockItems = [
                { id: 'abc', name: "First item", description: "First description" },
                { id: 'def', name: "Second item", description: "Second description" }
            ];
            itemService.findAll.mockResolvedValue(mockItems);
            const response = yield (0, supertest_1.default)(index_1.default).get(API_URL);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockItems);
        }));
    });
    describe('GET /items/:id', () => {
        it('should return the item corresponding to the provided id', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockItem = { id: 'abc', name: "First item", description: "First description" };
            itemService.findById.mockResolvedValue(mockItem);
            const response = yield (0, supertest_1.default)(index_1.default).get(`${API_URL}/abc`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockItem);
        }));
    });
    describe('POST /items', () => {
        it('should create a new item', () => __awaiter(void 0, void 0, void 0, function* () {
            const newItem = { id: 'ghi', name: "Third item", description: "Third description" };
            itemService.create.mockResolvedValue(newItem);
            const response = yield (0, supertest_1.default)(index_1.default).post(API_URL).send(newItem);
            expect(response.status).toBe(201);
            expect(response.text).toEqual(`Item 'Third item' created successfully`);
        }));
    });
    describe('PUT /items/:id', () => {
        it('should update the item corresponding to the provided id', () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedItem = { id: 'ghi', name: "3rd item", description: "3rd item" };
            itemService.update.mockResolvedValue(updatedItem);
            const response = yield (0, supertest_1.default)(index_1.default).put(`${API_URL}/ghi`).send(updatedItem);
            expect(response.status).toBe(200);
            expect(response.text).toEqual("Item '3rd item' updated successfully");
        }));
    });
    describe('DELETE /items/:id', () => {
        it('should delete the item corresponding to the provided id', () => __awaiter(void 0, void 0, void 0, function* () {
            const deletedItem = { id: 'ghi', name: "3rd item", description: "3rd item" };
            itemService.remove.mockResolvedValue(deletedItem);
            const response = yield (0, supertest_1.default)(index_1.default).delete(`${API_URL}/ghi`);
            expect(response.status).toBe(204);
        }));
    });
});
