(function() {
    'use strict';
    
    function initPageLoader() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            setTimeout(function() {
                loader.classList.add('hidden');
            }, 1000);
        }
    }
    
    function initBurgerMenu() {
        const burgerMenu = document.querySelector('.burger-menu');
        const navMenu = document.querySelector('.nav-menu');
        
        if (burgerMenu && navMenu) {
            burgerMenu.addEventListener('click', function() {
                burgerMenu.classList.toggle('active');
                navMenu.classList.toggle('active');
                const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
                burgerMenu.setAttribute('aria-expanded', !isExpanded);
            });

            document.addEventListener('click', function(event) {
                if (!burgerMenu.contains(event.target) && !navMenu.contains(event.target)) {
                    burgerMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                    burgerMenu.setAttribute('aria-expanded', 'false');
                }
            });

            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    burgerMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                    burgerMenu.setAttribute('aria-expanded', 'false');
                });
            });
        }
    }
    
    function initCookieBanner() {
        const currentPage = window.location.pathname.split('/').pop() || 'site.html';
        
        if (currentPage === 'site.html' || currentPage === '' || currentPage === 'index.html') {
            const cookieBanner = document.getElementById('cookieBanner');
            const acceptBtn = document.getElementById('acceptCookies');
            const rejectBtn = document.getElementById('rejectCookies');
            const settingsBtn = document.getElementById('cookieSettings');
            const settingsPanel = document.getElementById('cookieSettingsPanel');
            const saveSettingsBtn = document.getElementById('saveCookieSettings');
            
            if (cookieBanner) {
                const cookieConsent = localStorage.getItem('cookieConsent');
                
                if (!cookieConsent) {
                    cookieBanner.classList.add('show');
                }
                
                if (acceptBtn) {
                    acceptBtn.addEventListener('click', function() {
                        localStorage.setItem('cookieConsent', 'accepted');
                        localStorage.setItem('essentialCookies', 'true');
                        localStorage.setItem('analyticsCookies', 'true');
                        localStorage.setItem('marketingCookies', 'true');
                        cookieBanner.classList.remove('show');
                        if (settingsPanel) {
                            settingsPanel.style.display = 'none';
                        }
                    });
                }
                
                if (rejectBtn) {
                    rejectBtn.addEventListener('click', function() {
                        localStorage.setItem('cookieConsent', 'rejected');
                        localStorage.setItem('essentialCookies', 'true');
                        localStorage.setItem('analyticsCookies', 'false');
                        localStorage.setItem('marketingCookies', 'false');
                        cookieBanner.classList.remove('show');
                        if (settingsPanel) {
                            settingsPanel.style.display = 'none';
                        }
                    });
                }
                
                if (settingsBtn && settingsPanel) {
                    settingsBtn.addEventListener('click', function() {
                        if (settingsPanel.style.display === 'none' || !settingsPanel.style.display) {
                            settingsPanel.style.display = 'block';
                            
                            const essentialCookies = document.getElementById('essentialCookies');
                            const analyticsCookies = document.getElementById('analyticsCookies');
                            const marketingCookies = document.getElementById('marketingCookies');
                            
                            if (essentialCookies) {
                                essentialCookies.checked = localStorage.getItem('essentialCookies') === 'true';
                            }
                            if (analyticsCookies) {
                                analyticsCookies.checked = localStorage.getItem('analyticsCookies') === 'true';
                            }
                            if (marketingCookies) {
                                marketingCookies.checked = localStorage.getItem('marketingCookies') === 'true';
                            }
                        } else {
                            settingsPanel.style.display = 'none';
                        }
                    });
                }
                
                if (saveSettingsBtn && settingsPanel) {
                    saveSettingsBtn.addEventListener('click', function() {
                        const essentialCookies = document.getElementById('essentialCookies');
                        const analyticsCookies = document.getElementById('analyticsCookies');
                        const marketingCookies = document.getElementById('marketingCookies');
                        
                        if (essentialCookies) {
                            localStorage.setItem('essentialCookies', essentialCookies.checked ? 'true' : 'false');
                        }
                        if (analyticsCookies) {
                            localStorage.setItem('analyticsCookies', analyticsCookies.checked ? 'true' : 'false');
                        }
                        if (marketingCookies) {
                            localStorage.setItem('marketingCookies', marketingCookies.checked ? 'true' : 'false');
                        }
                        
                        localStorage.setItem('cookieConsent', 'custom');
                        cookieBanner.classList.remove('show');
                        settingsPanel.style.display = 'none';
                    });
                }
            }
        }
    }
    
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                };
                
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(function() {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.background = '#4CAF50';
                    
                    contactForm.reset();
                    
                    setTimeout(function() {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            });
        }
    }
    
    function initKeyboardNavigation() {
        const focusableElements = document.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(function(element) {
            element.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    if (element.tagName === 'A' || element.tagName === 'BUTTON') {
                        element.click();
                    }
                }
            });
        });
        
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const burgerMenu = document.querySelector('.burger-menu');
                const navMenu = document.querySelector('.nav-menu');
                
                if (burgerMenu && navMenu && navMenu.classList.contains('active')) {
                    burgerMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                    burgerMenu.setAttribute('aria-expanded', 'false');
                    burgerMenu.focus();
                }
                
                const settingsPanel = document.getElementById('cookieSettingsPanel');
                if (settingsPanel && settingsPanel.style.display === 'block') {
                    settingsPanel.style.display = 'none';
                }
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initPageLoader();
            initBurgerMenu();
            initCookieBanner();
            initContactForm();
            initKeyboardNavigation();
        });
    } else {
        initPageLoader();
        initBurgerMenu();
        initCookieBanner();
        initContactForm();
        initKeyboardNavigation();
    }
    
    window.addEventListener('load', function() {
        const loader = document.querySelector('.page-loader');
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
        }
    });
    
    window.addEventListener('beforeunload', function() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.remove('hidden');
        }
    });
})();
