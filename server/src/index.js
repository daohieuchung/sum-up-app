import path from 'node:path';
import fs from 'node:fs';
import express from 'express';
import open from 'open';
import app from './app.js'


const CLIENT_DIST = path.resolve(process.cwd(), 'frontend/dist');
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  app.get('*', (_, res) => {
    res.sendFile(path.join(CLIENT_DIST, 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Backend listening on http://localhost:${PORT}`);

const isStart = process.env.npm_lifecycle_event === 'start';
if (isStart && !process.env.CI && !process.env.NO_OPEN) {
    try {
      // If host is 0.0.0.0, open localhost for convenience
      const url = `http://localhost:${PORT}`;
      await open(url);
    } catch (err) {
      console.warn('Could not open browser:', err.message);
    }
  }

});

