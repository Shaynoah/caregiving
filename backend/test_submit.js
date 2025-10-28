const fetch = require('node-fetch');

async function submit() {
  const payload = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '0712345678',
    service_type: 'Personal Care Assistance',
    message: 'This is a test'
  };

  const res = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log('Response:', res.status, data);
}

submit().catch(err => console.error(err));
