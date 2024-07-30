const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your-secret-key-here'); // get secret key and paste it here

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/charge', async (req, res) => {
    try {
        const { token, amount } = req.body;

        const charge = await stripe.charges.create({
            amount: amount * 399, 
            currency: 'usd',
            source: token,
            description: 'Test Charge',
        });

        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
