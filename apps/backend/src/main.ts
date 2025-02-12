import express from 'express';
import * as path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

// Handle all other routes by serving the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
