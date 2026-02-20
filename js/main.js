// js/main.js - JAVASCRIPT FÜR ALLE SEITEN

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU =====
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }
    
    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked if wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ===== OPEN/CLOSED STATUS BUTTON =====
    function updateStatus() {
        const statusBtn = document.getElementById('statusBtn');
        const statusText = document.getElementById('statusText');
        
        if (!statusBtn || !statusText) return;
        
        const now = new Date();
        const day = now.getDay(); // 0 = Sonntag, 1 = Montag, ...
        const hour = now.getHours();
        const minute = now.getMinutes();
        const time = hour + minute / 60;
        
        // Öffnungszeiten: Mo-So 11:30 - 22:00
        const openTime = 11.5; // 11:30
        const closeTime = 22;  // 22:00
        
        const isOpen = time >= openTime && time < closeTime;
        
        statusBtn.classList.remove('open', 'closed');
        
        if (isOpen) {
            statusBtn.classList.add('open');
            statusText.textContent = 'Jetzt geöffnet';
        } else {
            statusBtn.classList.add('closed');
            statusText.textContent = 'Geschlossen';
        }
    }
    
    // Update status immediately and every minute
    updateStatus();
    setInterval(updateStatus, 60000);
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(17, 17, 17, 0.98)';
        } else {
            navbar.style.background = 'rgba(17, 17, 17, 0.95)';
        }
    });
    
    // ===== FORM HANDLING =====
    const kontaktForm = document.getElementById('kontaktForm');
    
    if (kontaktForm) {
        kontaktForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Hier könnte die Formular-Verarbeitung stehen
            // Z.B. mit fetch() an einen Server senden
            
            alert('Vielen Dank für deine Nachricht! Wir melden uns bald bei dir.');
            kontaktForm.reset();
        });
    }
    
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .highlight-item, .feature-item, .info-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================================
// SPEISEKARTE MODAL FUNKTIONEN
// ============================================

function openSpeisekarte() {
    document.getElementById('speisekarteModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Verhindert Scrollen im Hintergrund
}

function closeSpeisekarte() {
    document.getElementById('speisekarteModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Scrollen wieder erlauben
}

// Schließen wenn außerhalb des Bildes geklickt wird
window.onclick = function(event) {
    var modal = document.getElementById('speisekarteModal');
    if (event.target == modal) {
        closeSpeisekarte();
    }
}

// Schließen mit ESC-Taste
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSpeisekarte();
    }
});