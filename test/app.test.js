const request = require('supertest');
const express = require('express');
const session = require('express-session');

const app = require('../src/app');

describe('Role-based Landing Pages', () => {
  it('should show Admin landing page', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'admin' });
    expect(response.status).toBe(302);

    const dashboardResponse = await request(app).get('/dashboard').set('Cookie', response.headers['set-cookie']);
    expect(dashboardResponse.text).toBe('Welcome Admin');
  });

  it('should show Client landing page', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'client' });
    expect(response.status).toBe(302);

    const dashboardResponse = await request(app).get('/dashboard').set('Cookie', response.headers['set-cookie']);
    expect(dashboardResponse.text).toBe('Welcome Client');
  });

  it('should show User landing page', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'user' });
    expect(response.status).toBe(302);

    const dashboardResponse = await request(app).get('/dashboard').set('Cookie', response.headers['set-cookie']);
    expect(dashboardResponse.text).toBe('Welcome User');
  });
});
