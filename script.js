// Navbar functionality
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Player card interactions
const playerCards = document.querySelectorAll('.player-card');
playerCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateY(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateY(0)';
    });
});

// Gallery tab functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Poll functionality
const pollOptions = document.querySelectorAll('.poll-option');
const voteBtn = document.querySelector('.vote-btn');
let selectedOption = null;

pollOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove selection from all options
        pollOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selection to clicked option
        option.classList.add('selected');
        selectedOption = option.getAttribute('data-option');
        
        // Style selected option
        option.style.borderColor = 'var(--rcb-red)';
        option.style.backgroundColor = '#fef2f2';
        
        // Reset other options
        pollOptions.forEach(opt => {
            if (opt !== option) {
                opt.style.borderColor = '#e5e7eb';
                opt.style.backgroundColor = 'transparent';
            }
        });
    });
});

voteBtn.addEventListener('click', () => {
    if (selectedOption) {
        // Simulate vote animation
        voteBtn.textContent = 'Voting...';
        voteBtn.disabled = true;
        
        setTimeout(() => {
            voteBtn.textContent = 'Vote Cast! ✓';
            voteBtn.style.background = 'var(--gradient-secondary)';
            voteBtn.style.color = 'var(--rcb-black)';
            
            // Update poll percentages (simulated)
            updatePollResults(selectedOption);
        }, 1000);
        
        setTimeout(() => {
            voteBtn.textContent = 'Cast Your Vote';
            voteBtn.disabled = false;
            voteBtn.style.background = 'var(--gradient-primary)';
            voteBtn.style.color = 'var(--rcb-white)';
            selectedOption = null;
            
            // Reset option styles
            pollOptions.forEach(opt => {
                opt.style.borderColor = '#e5e7eb';
                opt.style.backgroundColor = 'transparent';
                opt.classList.remove('selected');
            });
        }, 3000);
    } else {
        // Show error message
        voteBtn.textContent = 'Select an option first!';
        voteBtn.style.background = '#ef4444';
        
        setTimeout(() => {
            voteBtn.textContent = 'Cast Your Vote';
            voteBtn.style.background = 'var(--gradient-primary)';
        }, 2000);
    }
});

function updatePollResults(votedOption) {
    const currentPercentages = {
        'virat': 45,
        'faf': 25,
        'maxwell': 20,
        'siraj': 10
    };
    
    // Increase voted option by 1%
    currentPercentages[votedOption] += 1;
    
    // Decrease others proportionally
    const otherOptions = Object.keys(currentPercentages).filter(key => key !== votedOption);
    otherOptions.forEach(option => {
        currentPercentages[option] = Math.max(0, currentPercentages[option] - 0.33);
    });
    
    // Update UI
    pollOptions.forEach(option => {
        const optionKey = option.getAttribute('data-option');
        const percentage = Math.round(currentPercentages[optionKey]);
        const fillElement = option.querySelector('.option-fill');
        const percentageElement = option.querySelector('.option-percentage');
        
        fillElement.style.width = `${percentage}%`;
        percentageElement.textContent = `${percentage}%`;
    });
}

// Fan wall functionality
const messageField = document.querySelector('.message-field');
const sendBtn = document.querySelector('.send-btn');
const fanMessages = document.querySelector('.fan-messages');

const sampleMessages = [
    { author: 'RCB_Warrior', text: 'Ee Sala Cup Namde! 🏆', time: 'just now' },
    { author: 'KohliKing', text: 'What a match! Goosebumps! 🔥', time: '1 minute ago' },
    { author: 'MaxwellFan99', text: 'Big Show magic never gets old! ✨', time: '2 minutes ago' },
    { author: 'RCBForLife', text: 'This team is pure passion! ❤️', time: '3 minutes ago' }
];

sendBtn.addEventListener('click', () => {
    const message = messageField.value.trim();
    if (message) {
        addFanMessage('You', message, 'just now');
        messageField.value = '';
        
        // Simulate other fan responses
        setTimeout(() => {
            const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
            addFanMessage(randomMessage.author, randomMessage.text, randomMessage.time);
        }, 2000 + Math.random() * 3000);
    }
});

messageField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

function addFanMessage(author, text, time) {
    const messageElement = document.createElement('div');
    messageElement.className = 'fan-message';
    messageElement.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="message-content">
            <div class="message-author">${author}</div>
            <div class="message-text">${text}</div>
            <div class="message-time">${time}</div>
        </div>
    `;
    
    fanMessages.insertBefore(messageElement, fanMessages.firstChild);
    
    // Animate new message
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        messageElement.style.transition = 'all 0.3s ease';
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove oldest message if more than 5
    const messages = fanMessages.querySelectorAll('.fan-message');
    if (messages.length > 5) {
        messages[messages.length - 1].remove();
    }
}

// Auto-refresh fan messages
setInterval(() => {
    if (Math.random() < 0.3) { // 30% chance every 10 seconds
        const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
        addFanMessage(randomMessage.author, randomMessage.text, randomMessage.time);
    }
}, 10000);

// Download functionality
const downloadButtons = document.querySelectorAll('.download-btn, .download-button');
downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Simulate download
        const originalContent = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = '#10b981';
            button.style.color = 'white';
            
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.disabled = false;
                button.style.background = '';
                button.style.color = '';
            }, 2000);
        }, 1500);
    });
});

// Product cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
let cart = [];

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.current-price').textContent;
        
        // Add to cart animation
        button.textContent = 'Adding...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Added to Cart! ✓';
            button.style.background = 'var(--gradient-secondary)';
            button.style.color = 'var(--rcb-black)';
            
            cart.push({ name: productName, price: productPrice });
            updateCartCount();
            
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.disabled = false;
                button.style.background = 'var(--gradient-primary)';
                button.style.color = 'var(--rcb-white)';
            }, 2000);
        }, 1000);
    });
});

function updateCartCount() {
    // This would typically update a cart icon in the navbar
    console.log(`Cart items: ${cart.length}`);
}

// Video play functionality
const playButtons = document.querySelectorAll('.play-button');
playButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Simulate video play
        const videoContainer = button.closest('.video-container');
        const overlay = document.createElement('div');
        overlay.className = 'video-overlay';
        overlay.innerHTML = `
            <div class="video-player">
                <div class="video-controls">
                    <button class="close-video">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="video-placeholder">
                    <i class="fas fa-play"></i>
                    <p>Video player placeholder</p>
                    <small>Replace with actual video embed</small>
                </div>
            </div>
        `;
        
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const videoPlayer = overlay.querySelector('.video-player');
        videoPlayer.style.cssText = `
            background: white;
            border-radius: 10px;
            padding: 2rem;
            max-width: 800px;
            width: 90%;
            text-align: center;
        `;
        
        const videoPlaceholder = overlay.querySelector('.video-placeholder');
        videoPlaceholder.style.cssText = `
            background: #f3f4f6;
            padding: 4rem;
            border-radius: 10px;
            margin-top: 1rem;
        `;
        
        const closeButton = overlay.querySelector('.close-video');
        closeButton.style.cssText = `
            background: var(--rcb-red);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            float: right;
        `;
        
        document.body.appendChild(overlay);
        
        closeButton.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.player-card, .match-card, .highlight-item, .gallery-item, .fan-zone-card, .product-card'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Loading state management
window.addEventListener('load', () => {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        element.classList.add('loaded');
    });
});

// Quick view functionality for products
const quickViewButtons = document.querySelectorAll('.quick-view-btn');
quickViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.current-price').textContent;
        const productImage = productCard.querySelector('.product-image img').src;
        
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-product">
                    <div class="modal-image">
                        <img src="${productImage}" alt="${productName}">
                    </div>
                    <div class="modal-info">
                        <h3>${productName}</h3>
                        <p class="modal-price">${productPrice}</p>
                        <p class="modal-description">Premium quality RCB merchandise. Show your support for the team with this official product.</p>
                        <div class="modal-actions">
                            <button class="modal-add-to-cart">Add to Cart</button>
                            <button class="modal-buy-now">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeModal = () => {
            document.body.removeChild(modal);
        };
        
        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Modal button actions
        modal.querySelector('.modal-add-to-cart').addEventListener('click', () => {
            cart.push({ name: productName, price: productPrice });
            updateCartCount();
            closeModal();
        });
        
        modal.querySelector('.modal-buy-now').addEventListener('click', () => {
            alert('Redirecting to checkout...');
            closeModal();
        });
    });
});

// Animate statistics on scroll
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const finalValue = stat.textContent;
                    if (finalValue.includes('+')) {
                        animateNumber(stat, 0, parseInt(finalValue.replace(/\D/g, '')), '+');
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

function animateNumber(element, start, end, suffix = '') {
    const duration = 2000;
    const increment = end / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        if (suffix === '+' && current >= 1000000) {
            element.textContent = (current / 1000000).toFixed(1) + 'M+';
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Initialize tooltips (if needed)
const initTooltips = () => {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
};

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.getAttribute('data-tooltip');
    tooltip.style.cssText = `
        position: absolute;
        background: var(--rcb-black);
        color: var(--rcb-white);
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-size: 0.9rem;
        z-index: 1000;
        pointer-events: none;
        top: ${e.pageY - 40}px;
        left: ${e.pageX - 50}px;
    `;
    
    document.body.appendChild(tooltip);
    e.target.tooltipElement = tooltip;
}

function hideTooltip(e) {
    if (e.target.tooltipElement) {
        document.body.removeChild(e.target.tooltipElement);
        e.target.tooltipElement = null;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTooltips();
    
    // Add loading class to elements
    const elementsToLoad = document.querySelectorAll(
        '.player-card, .match-card, .highlight-item, .gallery-item, .fan-zone-card, .product-card'
    );
    
    elementsToLoad.forEach(element => {
        element.classList.add('loading');
    });
    
    // Remove loading class after a delay
    setTimeout(() => {
        elementsToLoad.forEach(element => {
            element.classList.add('loaded');
        });
    }, 500);
});

// RCB Emotions Video Modal
function playRCBVideo() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create video element
    const video = document.createElement('video');
    video.controls = true;
    video.autoplay = true;
    video.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
    `;
    
    // Add video source - try multiple sources for reliability
    const source1 = document.createElement('source');
    source1.src = 'assets/videos/rcb-emotional-journey.mp4';
    source1.type = 'video/mp4';
    video.appendChild(source1);
    
    const source2 = document.createElement('source');
    source2.src = 'assets/videos/Tears. Roars. Jubilation 🥹The emotions of #RCB were raw, real, and 1⃣8⃣ years in the making ❤️#.mp4';
    source2.type = 'video/mp4';
    video.appendChild(source2);
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: var(--rcb-red);
        color: white;
        border: none;
        font-size: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 10001;
    `;
    
    // Close modal function
    function closeModal() {
        video.pause();
        document.body.removeChild(modal);
    }
    
    closeBtn.onclick = closeModal;
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
    
    // Press Escape to close
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
    
    modal.appendChild(video);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
}

// Gallery Video Playback
function playGalleryVideo(button) {
    const galleryItem = button.closest('.gallery-item');
    const video = galleryItem.querySelector('.gallery-video');
    
    if (video.paused) {
        video.play();
        button.innerHTML = '<i class="fas fa-pause"></i>';
        button.style.background = 'var(--rcb-gold)';
    } else {
        video.pause();
        button.innerHTML = '<i class="fas fa-play"></i>';
        button.style.background = 'var(--rcb-red)';
    }
}

// Console welcome message
console.log(`
🏏 Welcome to RCB Fan Page! 🏏
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔥 Ee Sala Cup Namde! 🔥
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Made with ❤️ for RCB fans worldwide
`);