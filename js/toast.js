// Toast Notification System
class ToastNotification {
    constructor() {
        this.init();
    }

    init() {
        // Create toast container if it doesn't exist
        if (!document.querySelector('.toast-container')) {
            const container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
    }

    show({ type = 'success', title, message, duration = 5000 }) {
        const container = document.querySelector('.toast-container');
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast-message ${type}`;
        
        // Create toast content
        toast.innerHTML = `
            <div class="toast-icon">
                ${type === 'success' 
                    ? '<i class="fas fa-check-circle"></i>' 
                    : '<i class="fas fa-exclamation-circle"></i>'}
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-description">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close">
                <i class="fas fa-times"></i>
            </button>
            <div class="toast-progress">
                <div class="toast-progress-bar"></div>
            </div>
        `;

        // Add to container
        container.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Setup progress bar
        const progressBar = toast.querySelector('.toast-progress-bar');
        progressBar.style.width = '100%';
        setTimeout(() => {
            progressBar.style.width = '0%';
        }, 10);

        // Setup close button
        const closeButton = toast.querySelector('.toast-close');
        closeButton.addEventListener('click', () => this.dismiss(toast));

        // Auto dismiss
        setTimeout(() => this.dismiss(toast), duration);
    }

    dismiss(toast) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }

    success(title, message) {
        this.show({ type: 'success', title, message });
    }

    error(title, message) {
        this.show({ type: 'error', title, message });
    }
}

// Create global toast instance
window.toast = new ToastNotification();
