document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const formData = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            service: form.service.value,
            message: form.message.value,
            source: 'contact'
        };

        console.log('Sending form data:', formData);

        const API_URL = window.location.hostname === 'localhost' 
            ? 'http://localhost:5000'
            : 'https://carebridge-kenya-api.onrender.com';
        console.log('Sending to:', `${API_URL}/api/contact`);

        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                new ToastNotification().show({
                    type: 'success',
                    title: 'Success!',
                    message: 'Thank you for your message. We will get back to you soon!'
                });
                form.reset();
            } else {
                new ToastNotification().show({
                    type: 'error',
                    title: 'Error',
                    message: data.message || 'Something went wrong. Please try again.'
                });
            }
        } catch (error) {
            new ToastNotification().show({
                type: 'error',
                title: 'Connection Error',
                message: 'Could not submit form. Please check your connection and try again.'
            });
        }

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

