// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all channel cards
document.querySelectorAll('.channel-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe stat items
document.querySelectorAll('.stat-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease ' + (index * 0.1) + 's, transform 0.6s ease ' + (index * 0.1) + 's';
    observer.observe(item);
});

// Observe social links
document.querySelectorAll('.social-link').forEach((link, index) => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(30px)';
    link.style.transition = 'opacity 0.6s ease ' + (index * 0.1) + 's, transform 0.6s ease ' + (index * 0.1) + 's';
    observer.observe(link);
});

// Mouse follow effect for hero section
document.addEventListener('mousemove', (e) => {
    const heroVisual = document.querySelector('.hero-visual');
    if (!heroVisual) return;

    const rect = heroVisual.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cards = document.querySelectorAll('.floating-card');
    cards.forEach((card, index) => {
        const distance = 50 - index * 15;
        const moveX = (x - rect.width / 2) / rect.width * distance;
        const moveY = (y - rect.height / 2) / rect.height * distance;
        
        card.style.transform = 'translateY(' + moveY + 'px) translateX(' + moveX + 'px)';
    });
});

// Particle effect on click
document.addEventListener('click', (e) => {
    createParticles(e.clientX, e.clientY);
});

function createParticles(x, y) {
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const colors = ['#00d4ff', '#ff006e', '#8338ec'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 5 + Math.random() * 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let px = x;
        let py = y;
        let life = 1;
        
        const animate = () => {
            px += vx;
            py += vy;
            life -= 0.02;
            
            particle.style.left = px + 'px';
            particle.style.top = py + 'px';
            particle.style.opacity = life;
            
            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        document.body.appendChild(particle);
        animate();
    }
}

// Glow effect on hover for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btn.style.setProperty('--mouse-x', x + 'px');
        btn.style.setProperty('--mouse-y', y + 'px');
    });
});

// Add ripple effect to clickable elements
function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// Apply ripple effect to all links
document.querySelectorAll('.channel-link, .social-link').forEach(element => {
    addRippleEffect(element);
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = '@keyframes ripple { to { transform: scale(4); opacity: 0; } }';
document.head.appendChild(style);

// Parallax effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const scrollPosition = window.scrollY;
        const speed = element.getAttribute('data-parallax') || 0.5;
        element.style.transform = 'translateY(' + (scrollPosition * speed) + 'px)';
    });
});

// Advanced Blur Effect on Scroll
window.addEventListener('scroll', () => {
    const scrollPercent = Math.min(window.scrollY / 1000, 0.5);
    document.body.style.filter = 'blur(' + scrollPercent + 'px)';
});

// Enhanced Glow Effects
const glowStyle = document.createElement('style');
glowStyle.textContent = `
    @keyframes superGlow {
        0%, 100% {
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.4), 
                        0 0 40px rgba(0, 212, 255, 0.2),
                        inset 0 0 20px rgba(0, 212, 255, 0.1);
        }
        50% {
            box-shadow: 0 0 40px rgba(0, 212, 255, 0.8), 
                        0 0 80px rgba(0, 212, 255, 0.4),
                        inset 0 0 30px rgba(0, 212, 255, 0.2);
        }
    }
    
    @keyframes shimmer {
        0% {
            background-position: -1000px 0;
        }
        100% {
            background-position: 1000px 0;
        }
    }
    
    @keyframes neon {
        0%, 100% {
            text-shadow: 0 0 10px rgba(0, 212, 255, 0.5),
                         0 0 20px rgba(0, 212, 255, 0.3);
        }
        50% {
            text-shadow: 0 0 20px rgba(0, 212, 255, 0.8),
                         0 0 40px rgba(0, 212, 255, 0.5),
                         0 0 60px rgba(0, 212, 255, 0.3);
        }
    }
`;
document.head.appendChild(glowStyle);

// Cursor Trail Effect
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '9998';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let mouseX = 0;
let mouseY = 0;
const particles = [];

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (Math.random() > 0.8) {
        const colors = [
            'rgba(0, 212, 255, ',
            'rgba(255, 0, 110, ',
            'rgba(131, 56, 236, '
        ];
        particles.push({
            x: mouseX,
            y: mouseY,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life -= 0.01;
        
        if (p.life <= 0) {
            particles.splice(i, 1);
        } else {
            ctx.fillStyle = p.color + p.life + ')';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Window resize handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('قلعة التقنيات - موقع تقني متقدم');
    console.log('تم تصميم هذا الموقع وتطويره بواسطة سيف علي');
    
    document.querySelectorAll('.hero-text > *').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animation = 'slideInUp 0.8s ease ' + (0.2 + index * 0.2) + 's forwards';
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: 100, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -100, behavior: 'smooth' });
    }
});

