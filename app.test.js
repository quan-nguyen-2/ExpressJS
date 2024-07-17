const request = require('supertest');
const app = require('../app');

describe('Statistical Operations API', () => {
    describe('/mean', () => {
        it('should return the mean of given numbers', async () => {
            const response = await request(app).get('/mean?nums=1,2,3,4,5');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ operation: 'mean', value: 3 });
        });

        it('should handle non-number inputs', async () => {
            const response = await request(app).get('/mean?nums=1,foo,3');
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('foo is not a number.');
        });

        it('should handle missing nums parameter', async () => {
            const response = await request(app).get('/mean');
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('nums are required.');
        });
    });

    describe('/median', () => {
        it('should return the median of given numbers', async () => {
            const response = await request(app).get('/median?nums=1,2,3,4,5');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ operation: 'median', value: 3 });
        });

        it('should handle non-number inputs', async () => {
            const response = await request(app).get('/median?nums=1,foo,3');
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('foo is not a number.');
        });

        it('should handle missing nums parameter', async () => {
            const response = await request(app).get('/median');
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('nums are required.');
        });
    });

    describe('/mode', () => {
        it('should return the mode of given numbers', async () => {
            const response = await request(app).get('/mode?nums=1,2,2,3,3,3,4,5');
            expect(response.status).toBe(
