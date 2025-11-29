/*
 * Simple Express server to accept POST /save-customer and append/save to json/customers.json
 * Usage:
 * 1) Install dependencies:
 *    npm init -y
 *    npm install express body-parser
 * 2) Start server from the project root: node server/save_customer_server.js
 * 3) From browser side, POST to http://localhost:3000/save-customer with JSON body { email, password }
 */

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
  } catch (err) { /* file may not exist */ }

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
