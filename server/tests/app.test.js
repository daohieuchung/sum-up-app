import request from 'supertest';
import app from '../src/app.js';

describe('POST /api/sum', () => {
  it('returns the sum of two numbers', async () => {
    const res = await request(app).post('/api/sum').send({ a: 15, b: 3 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ sum: 18 });
  });

  it('accepts numeric strings test', async () => {
    const res = await request(app).post('/api/sum').send({ a: '1.5', b: '2.5' });
    expect(res.status).toBe(200);
    expect(res.body.sum).toBe(4);
  });

  it('rejects invalid inputs', async () => {
    const res = await request(app).post('/api/sum').send({ a: 'foo', b: 2 });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Invalid input/i);
  });
});