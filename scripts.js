document.addEventListener('DOMContentLoaded', () => {
    const stripe = Stripe('your-publishable-key-here'); //get publishable key and paste that here
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const { token, error } = await stripe.createToken(cardElement);
        if (error) {
            console.error(error);
            // Handle error here
        } else {
            // Send the token to your server
            const response = await fetch('/charge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token.id,
                    amount: document.getElementById('amount').value,
                }),
            });

            const result = await response.json();
            if (result.success) {
                alert('Payment successful!');
                // Handle success
            } else {
                alert('Payment failed!');
                // Handle failure
            }
        }
    });
});
