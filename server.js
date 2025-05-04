
const express = require('express');
const stripe = require('stripe')('sk_test_51RKzfX015lI67bHh9te9vdNhJGnng9fZwa0JzS990IBVxLveFMKmEfikVBqvSw8kRWhtXg05KL96kiwqVBdh7pSJ00kRAx1Xcq');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('.'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: { name: 'VÆLINE Test Produkt' },
        unit_amount: 2000,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel'
  });
  res.json({ id: session.id });
});

app.listen(10000, () => console.log('Server beží na http://localhost:10000'));
