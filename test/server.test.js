const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = require('../server'); // Assuming server.js exports the app

describe('Authentication and Role-based Access', () => {
    it('should login and return a token', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'admin', password: 'adminpass' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should access landing page as Admin', async () => {
        const token = jwt.sign({ id: 1, role: 'Admin' }, 'secretkey');
        const response = await request(app)
            .get('/landing')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome Admin');
    });

    it('should access landing page as Client', async () => {
        const token = jwt.sign({ id: 2, role: 'Client' }, 'secretkey');
        const response = await request(app)
            .get('/landing')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome Client');
    });

    it('should access landing page as User', async () => {
        const token = jwt.sign({ id: 3, role: 'User' }, 'secretkey');
        const response = await request(app)
            .get('/landing')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome User');
    });
});
