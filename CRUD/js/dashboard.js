// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    setupEventListeners();
    loadUserData();
    setupMobileMenu();
}

// Event Listeners
function setupEventListeners() {
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Action cards
    const createTeamCard = document.getElementById('createTeamCard');
    const joinTeamCard = document.getElementById('joinTeamCard');
    const joinTournamentCard = document.getElementById('joinTournamentCard');
    const bookCourtCard = document.getElementById('bookCourtCard');

    if (createTeamCard) {
        createTeamCard.addEventListener('click', () => handleActionClick('create-team'));
    }
    
    if (joinTeamCard) {
        joinTeamCard.addEventListener('click', () => handleActionClick('join-team'));
    }
    
    if (joinTournamentCard) {
        joinTournamentCard.addEventListener('click', () => handleActionClick('join-tournament'));
    }
    
    if (bookCourtCard) {
        bookCourtCard.addEventListener('click', () => handleActionClick('book-court'));
    }

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}

// Load user data (simulated)
function loadUserData() {
    // Get user data from localStorage or simulate
    const userData = JSON.parse(localStorage.getItem('currentUser')) || {
        name: 'João Silva',
        firstName: 'João'
    };

    // Update user name displays
    const userNameEl = document.getElementById('userName');
    const welcomeUserEl = document.getElementById('welcomeUser');

    if (userNameEl) {
        userNameEl.textContent = userData.name;
    }
    
    if (welcomeUserEl) {
        welcomeUserEl.textContent = userData.firstName;
    }
}

// Handle action clicks
function handleActionClick(action) {
    switch (action) {
        case 'create-team':
            showModal('Criar Time', `
                <div class="modal-content">
                    <h3>Vamos criar seu time!</h3>
                    <form id="createTeamForm">
                        <div class="form-group">
                            <label class="form-label">Nome do Time</label>
                            <input type="text" class="form-input" placeholder="Ex: Ace Masters" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Descrição</label>
                            <textarea class="form-input" placeholder="Descreva seu time..."></textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Nível</label>
                            <select class="form-input">
                                <option>Iniciante</option>
                                <option>Intermediário</option>
                                <option>Avançado</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-hero btn-full">Criar Time</button>
                    </form>
                </div>
            `);
            break;
            
        case 'join-team':
            showModal('Procurar Times', `
                <div class="modal-content">
                    <h3>Encontre o time perfeito!</h3>
                    <div class="team-search">
                        <div class="form-group">
                            <input type="text" class="form-input" placeholder="Buscar por nome ou código...">
                        </div>
                        <div class="team-list">
                            <div class="team-item">
                                <h4>Thunder Beach</h4>
                                <p>Nível: Intermediário • 8 membros</p>
                                <button class="btn btn-outline">Ver Detalhes</button>
                            </div>
                            <div class="team-item">
                                <h4>Sunset Warriors</h4>
                                <p>Nível: Avançado • 12 membros</p>
                                <button class="btn btn-outline">Ver Detalhes</button>
                            </div>
                            <div class="team-item">
                                <h4>Beach Beginners</h4>
                                <p>Nível: Iniciante • 5 membros</p>
                                <button class="btn btn-outline">Ver Detalhes</button>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            break;
            
        case 'join-tournament':
            // Redirect to tournaments page with specific section
            window.location.href = 'index.html#campeonatos';
            break;
            
        case 'book-court':
            // Redirect to booking page with specific section
            window.location.href = 'index.html#reservas';
            break;
    }
}

// Show modal function
function showModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.getElementById('dashboardModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.id = 'dashboardModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">${title}</h2>
                <button class="modal-close" onclick="closeDashboardModal()">✕</button>
            </div>
            ${content}
        </div>
    `;

    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Handle form submission if exists
    const form = modal.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Funcionalidade em desenvolvimento!');
            closeDashboardModal();
        });
    }

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeDashboardModal();
        }
    });
}

// Close modal function
function closeDashboardModal() {
    const modal = document.getElementById('dashboardModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Handle logout
function handleLogout() {
    if (confirm('Tem certeza que deseja sair?')) {
        // Clear user data
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        
        // Redirect to home page
        window.location.href = 'index.html';
    }
}

// Mobile menu
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

function setupMobileMenu() {
    // Close mobile menu on link clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.getElementById('navMenu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
}

// Add some animations on scroll
function setupScrollAnimations() {
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
    
    // Observe cards
    document.querySelectorAll('.action-card, .stat-card, .activity-item, .event-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations when page loads
window.addEventListener('load', setupScrollAnimations);

// Global function for modal close (called from HTML)
window.closeDashboardModal = closeDashboardModal;