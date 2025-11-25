// Contact form submission handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    if (!form) {
        console.error('Contact form not found');
        return;
    }

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
            message: form.message.value
        };

        console.log('Sending form data:', formData);

        try {
            console.log('Submitting form data:', formData);
            
            // Use relative path so this works when the site is hosted under a subdirectory
            const endpoint = 'php/contact.php';
            console.log('Contact endpoint:', endpoint);
            // Submit to PHP endpoint
            const response = await fetch(endpoint, {
                method: 'POST',
                mode: 'cors',
                cache: "no-cache",
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
                    title: 'Message Sent!',
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
