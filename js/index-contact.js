// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
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

                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();

                if (response.ok) {
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
                // Show error toast
                window.toast.error(
                    'Submission Failed',
                    error.message || 'There was a problem sending your message. Please try again.'
                );
            } finally {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});
