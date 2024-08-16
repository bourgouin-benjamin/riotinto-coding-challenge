import request from 'supertest';
import app from "../src/index";
import * as itemService from "../src/items/items.service";
import { Item } from "../src/items/item.model";

const API_URL = '/api/items'

jest.mock('../src/items/items.service.ts')

describe('Items Controller', () => {

    describe('GET /items', () => {
        it('should return a list of items', async () => {
            const mockItems: Item[] = [
                { id: 'abc', name: "First item", description: "First description"},
                { id: 'def', name: "Second item", description: "Second description"}
            ];
            (itemService.findAll as jest.Mock).mockResolvedValue(mockItems);

            const response = await request(app).get(API_URL);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockItems);
        });
    });

    describe('GET /items/:id', () => {
        it('should return the item corresponding to the provided id', async () => {
            const mockItem: Item = { id: 'abc', name: "First item", description: "First description"};
            (itemService.findById as jest.Mock).mockResolvedValue(mockItem);

            const response = await request(app).get(`${API_URL}/abc`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockItem);
        });
    });

    describe('POST /items', () => {
        it('should create a new item', async () => {
            const newItem: Item = { id: 'ghi', name: "Third item", description: "Third description"};
            (itemService.create as jest.Mock).mockResolvedValue(newItem);

            const response = await request(app).post(API_URL).send(newItem);

            expect(response.status).toBe(201);
            expect(response.text).toEqual(`Item 'Third item' created successfully`);
        })
    });

    describe('PUT /items/:id', () => {
        it('should update the item corresponding to the provided id', async () => {
            const updatedItem = { id: 'ghi', name: "3rd item", description: "3rd item"};
            (itemService.update as jest.Mock).mockResolvedValue(updatedItem);

            const response = await request(app).put(`${API_URL}/ghi`).send(updatedItem);

            expect(response.status).toBe(200);
            expect(response.text).toEqual("Item '3rd item' updated successfully");
        });
    });

    describe('DELETE /items/:id', () => {
        it('should delete the item corresponding to the provided id', async () => {
            const deletedItem = { id: 'ghi', name: "3rd item", description: "3rd item"};
            (itemService.remove as jest.Mock).mockResolvedValue(deletedItem);

            const response = await request(app).delete(`${API_URL}/ghi`);

            expect(response.status).toBe(204);
        });
    });
})
