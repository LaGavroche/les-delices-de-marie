// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Animation douce du défilement pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Bouton "Retour en haut" qui apparaît lors du défilement
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'back-to-top';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.display = 'none';
        button.style.padding = '10px 15px';
        button.style.backgroundColor = '#e75a7c';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '50%';
        button.style.cursor = 'pointer';
        button.style.fontSize = '1.2rem';
        button.style.zIndex = '999';
        button.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(button);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });
    };
    
    createBackToTopButton();
    
    // Navigation active en fonction de la page courante
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Si on est sur la page de contact, ajouter la validation du formulaire
    if (currentPage === 'contact.html' || document.querySelector('#contact-form')) {
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validation simple
                const name = document.querySelector('#name').value;
                const email = document.querySelector('#email').value;
                const message = document.querySelector('#message').value;
                
                let isValid = true;
                let errorMessage = '';
                
                if (!name.trim()) {
                    isValid = false;
                    errorMessage += 'Le nom est requis.\n';
                }
                
                if (!email.trim() || !email.includes('@')) {
                    isValid = false;
                    errorMessage += 'Une adresse email valide est requise.\n';
                }
                
                if (!message.trim()) {
                    isValid = false;
                    errorMessage += 'Le message est requis.\n';
                }
                
                if (isValid) {
                    // Ici, vous ajouterez plus tard le code pour envoyer le formulaire
                    // Pour l'instant, nous affichons juste un message de succès
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Merci pour votre message ! Nous vous contacterons bientôt.';
                    successMessage.style.backgroundColor = '#d4edda';
                    successMessage.style.color = '#155724';
                    successMessage.style.padding = '1rem';
                    successMessage.style.borderRadius = '5px';
                    successMessage.style.marginBottom = '1rem';
                    
                    contactForm.prepend(successMessage);
                    contactForm.reset();
                    
                    // Faire disparaître le message après 5 secondes
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        successMessage.style.transition = 'opacity 1s';
                        
                        setTimeout(() => {
                            successMessage.remove();
                        }, 1000);
                    }, 5000);
                } else {
                    alert('Veuillez corriger les erreurs suivantes :\n' + errorMessage);
                }
            });
        }
    }
    
    // Animation simple pour les éléments lors du défilement
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature, .gallery-item, .about-preview');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    };
    
    // Appliquer les animations si IntersectionObserver est pris en charge par le navigateur
    if ('IntersectionObserver' in window) {
        animateOnScroll();
    }
});