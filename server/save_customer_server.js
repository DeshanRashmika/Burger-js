
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const customersPath = path.join(__dirname, '..', 'json', 'customers.json');

app.post('/save-customer', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  let customers = [];
  try {
    customers = JSON.parse(fs.readFileSync(customersPath, 'utf8') || '[]');
  } catch (err) { }

  const customer = { id: Date.now(), email, password, created: new Date().toISOString() };
  customers.push(customer);

  try {
    fs.writeFileSync(customersPath, JSON.stringify(customers, null, 2));
    return res.json({ ok: true, customer });
  } catch (err) {
    console.error('Write failed', err);
    return res.status(500).json({ error: 'failed to write customers file' });
  }
});

app.listen(3000, () => {
  console.log('Save-customer server running: http://localhost:3000');
});
