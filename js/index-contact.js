// Contact Form Handler
console.log('index-contact.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    const contactForm = document.getElementById('contactForm');
    console.log('Contact form element:', contactForm);
    
    if (contactForm) {
        console.log('Adding submit listener to form');
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Save original button text and show loading state
            const originalButtonText = submitButton.textContent;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            try {
                const formData = {
                    name: contactForm.elements.name.value,
                    email: contactForm.elements.email.value,
                    phone: contactForm.elements.phone.value,
                    service: contactForm.elements.service.value,
                    message: contactForm.elements.message.value
                };

                console.log('Sending request to:', `${window.appConfig.API_URL}/api/contact`);
                console.log('Form data:', formData);
                
                const response = await fetch(`${window.appConfig.API_URL}/api/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                console.log('Response status:', response.status);
                console.log('Response headers:', Object.fromEntries(response.headers));
                
                const data = await response.json();

                if (data.success) {
                    // Show success toast
                    window.toast.success(
                        'Message Sent Successfully!',
                        `Thank you ${formData.name}! We'll get back to you soon regarding your interest in ${formData.service}.`
                    );
                    contactForm.reset();
                } else {
                    throw new Error(data.message || 'Failed to send message');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                console.error('Full error details:', {
                    message: error.message,
                    stack: error.stack,
                    response: error.response
                });
                
                // Show detailed error toast
                window.toast.error(
                    'Submission Failed',
                    `Error: ${error.message}. Please try again or contact support if the problem persists.`
                );
            } finally {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});
