document.addEventListener('DOMContentLoaded', () => {
    // Mobile navbar toggling: close menu when a link is clicked
    const navLinks = document.querySelectorAll('#navbarNav .nav-link, #navbarNav .btn');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');
    
    if (navbarCollapse && navbarToggler) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // Smooth scroll for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

        // Interactive submission alert for the service request form
    const contactForm = document.querySelector('#service-request-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission
            
            // Gather form data
            const name = document.getElementById('form-name').value;
            const company = document.getElementById('form-company').value;
            const phone = document.getElementById('form-phone').value;
            const email = document.getElementById('form-email').value;
            const shipmentType = document.getElementById('form-shipment').value || 'Not specified';
            const origin = document.getElementById('form-origin').value;
            const destination = document.getElementById('form-destination').value;
            const message = document.getElementById('form-message').value;

                        // Construct WhatsApp message
            let whatsappMessage = `New Service Request\n\n`;
            whatsappMessage += `Name: ${name}\n`;
            if (company) whatsappMessage += `Company: ${company}\n`;
            whatsappMessage += `Telephone: ${phone}\n`;
            whatsappMessage += `Email: ${email}\n`;
            whatsappMessage += `Type of Shipment: ${shipmentType}\n`;
            if (origin) whatsappMessage += `Origin: ${origin}\n`;
            if (destination) whatsappMessage += `Destination: ${destination}\n`;
            if (message) whatsappMessage += `\nMessage / Details:\n${message}`;

            // URL encode the message
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // WhatsApp phone number
            const whatsappNumber = '233244768691';
            
            // Construct the final URL (works on both mobile and desktop)
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Show alert indicating management has received the inquiry
            alert('Thank you for your enquiry. You will now be redirected to WhatsApp to submit your request.');
            
            // Redirect to WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Optionally reset the form fields
            contactForm.reset();
        });
    }
});