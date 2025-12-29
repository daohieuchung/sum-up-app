import express from 'express';
import cors from 'cors';
import morgan from 'morgan';


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

function parseNumeric(value) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const n = Number(value);
    return Number.isFinite(n) ? n : NaN;
  }
  return NaN;
}

app.post('/api/sum', (req, res) => {
  const { a, b } = req.body || {};
  const aNum = parseNumeric(a);
  const bNum = parseNumeric(b);

  if (!Number.isFinite(aNum) || !Number.isFinite(bNum)) {
    return res.status(400).json({ error: 'Invalid input. Expect two numbers.' });
  }
  return res.json({ sum: aNum + bNum });
});

export default app;
