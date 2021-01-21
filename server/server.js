require('dotenv/config');
const express = require('express');

const PORT = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h1>Olá Mundo!</h1>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
})