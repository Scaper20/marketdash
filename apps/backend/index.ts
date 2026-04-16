import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// API Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'market-dash-backend', time: new Date() });
});

app.listen(port, () => {
  console.log(`Backend service listening on port ${port}`);
});
