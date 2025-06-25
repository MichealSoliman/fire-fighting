





// Projects Section - Filtering and Animation System
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all filter buttons and project cards
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.getElementById('projects-grid');
    
    // Animation timing constants
    const ANIMATION_DURATION = 500;
    const STAGGER_DELAY = 100;
    
    // Initialize the page
    initializePage();
    
    function initializePage() {
        // Add event listeners to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', handleFilterClick);
        });
        
        // Initialize scroll animations
        initializeScrollAnimations();
        
        // Initialize counter animations
        initializeCounterAnimations();
        
        // Initialize card hover effects
        initializeCardHoverEffects();
        
        // Show all cards initially with staggered animation
        showCardsWithAnimation(projectCards);
        
        console.log('🔥 Projects section initialized successfully!');
    }
    
    function handleFilterClick(event) {
        const button = event.currentTarget;
        const filter = button.getAttribute('data-filter');
        
        // Add ripple effect
        createRippleEffect(button, event);
        
        // Update active button
        updateActiveButton(button);
        
        // Filter and animate cards
        filterCards(filter);
    }
    
    function createRippleEffect(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    function updateActiveButton(activeButton) {
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = '';
            btn.style.color = '';
            btn.style.transform = '';
        });
        
        // Add active class to clicked button
        activeButton.classList.add('active');
    }
    
    function filterCards(filter) {
        // First, hide all cards with animation
        hideCardsWithAnimation().then(() => {
            // Filter cards based on category
            const visibleCards = Array.from(projectCards).filter(card => {
                if (filter === 'all') return true;
                
                const categories = card.getAttribute('data-category').split(' ');
                return categories.includes(filter);
            });
            
            // Hide non-matching cards
            projectCards.forEach(card => {
                if (!visibleCards.includes(card)) {
                    card.style.display = 'none';
                }
            });
            
            // Show matching cards with animation
            setTimeout(() => {
                showCardsWithAnimation(visibleCards);
            }, 100);
        });
    }
    
    function hideCardsWithAnimation() {
        return new Promise(resolve => {
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('hidden');
                    card.classList.remove('show');
                }, index * 50);
            });
            
            setTimeout(resolve, projectCards.length * 50 + 300);
        });
    }
    
    function showCardsWithAnimation(cards) {
        cards.forEach((card, index) => {
            card.style.display = 'block';
            
            setTimeout(() => {
                card.classList.remove('hidden');
                card.classList.add('show');
                
                // Add entrance animation
                card.style.animation = `scaleIn 0.6s ease-out ${index * 0.1}s both`;
            }, index * STAGGER_DELAY);
        });
    }
    
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Special handling for different elements
                    if (entry.target.classList.contains('project-card')) {
                        entry.target.style.animation = 'slideUp 0.8s ease-out';
                    }
                }
            });
        }, observerOptions);
        
        // Observe animated elements
        document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(element);
        });
    }
    
    function initializeCounterAnimations() {
        const counters = document.querySelectorAll('[data-count]');
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    function initializeCardHoverEffects() {
        projectCards.forEach(card => {
            const image = card.querySelector('img');
            const title = card.querySelector('h3');
            
            card.addEventListener('mouseenter', function() {
                // Enhanced hover effects
                this.style.transform = 'translateY(-12px) scale(1.02)';
                this.style.boxShadow = '0 30px 60px -12px rgba(220, 38, 38, 0.25)';
                
                if (image) {
                    image.style.transform = 'scale(1.15)';
                }
                
                if (title) {
                    title.style.color = '#DC2626';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
                
                if (image) {
                    image.style.transform = 'scale(1)';
                }
                
                if (title) {
                    title.style.color = '#1F2937';
                }
            });
        });
    }
    
    // Enhanced button interactions
    filterButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
            }
        });
    });
    
    // Call to action button animation
    const ctaButton = document.querySelector('.bg-white.text-fire-red');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.background = 'rgba(220, 38, 38, 0.3)';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Parallax effect for background elements
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.absolute');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    
    // Performance optimization: Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate animations if needed
            console.log('Window resized - recalculating animations');
        }, 250);
    });
    
    // Add custom CSS for enhanced animations
    const style = document.createElement('style');
    style.textContent = `
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
        
        .project-card {
            will-change: transform, opacity;
        }
        
        .filter-btn {
            will-change: transform, background-color;
        }
        
        .project-card img {
            will-change: transform;
        }
        
        /* Enhanced loading states */
        .project-card.loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        /* Smooth transitions for all interactive elements */
        .project-card, .filter-btn, .project-card img, .project-card h3 {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    
    document.head.appendChild(style);
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Add focus styles for accessibility
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    console.log('🎯 Projects filtering system loaded successfully!');
});




// Integrated Solutions Section - Advanced Interactions and Animations
// Fire Safety Website - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const ANIMATION_DURATION = 600;
    const STAGGER_DELAY = 100;
    
    // Solution data with detailed content
    const solutionsData = {
        assessment: {
             title: 'التوريد والتركيب',
            subtitle: 'توفير وتركيب أحدث المعدات والأنظمة بكفاءة عالية',
            icon: 'fas fa-truck',
            image: './img/Maintenance and installation.jpeg',
            services: [
                'توريد معدات الإطفاء المعتمدة',
                'تركيب أنظمة الإنذار المتطورة',
                'تجهيز غرف التحكم والمراقبة',
                'تركيب أنظمة الرش الآلي'

            ],
            features: [
                 'معدات من أفضل الماركات العالمية',
                'فرق تركيب متخصصة ومدربة',
                'ضمان شامل على جميع المعدات',
                'خدمة ما بعد التركيب'

            ],
           description: 'نوفر ونركب أحدث المعدات والأنظمة من أفضل الماركات العالمية، مع ضمان الجودة والكفاءة في التركيب والتشغيل.'

        },
        design: {
            title: 'التصميم والهندسة',
            subtitle: 'أنظمة متكاملة تتوافق مع المعايير العالمية والمحلية',
            icon: 'fas fa-drafting-compass',
            image: './img/solution-2.jpg',
            
            services: [
                'تصميم أنظمة الإطفاء المتكاملة',
                'هندسة شبكات الإنذار المبكر',
                'تخطيط مسارات الإخلاء الآمنة',
                'تصميم أنظمة التهوية والدخان'
            ],
            features: [
                'مهندسون معتمدون ومتخصصون',
                'استخدام أحدث برامج التصميم',
                'التوافق مع المعايير الدولية',
                'تصاميم مخصصة لكل مشروع'
            ],
            description: 'نقدم خدمات التصميم والهندسة المتطورة باستخدام أحدث التقنيات والبرامج المتخصصة، مع ضمان التوافق الكامل مع جميع المعايير المحلية والدولية للسلامة.'
        },
        supply: {
          




                 title: 'التقييم والاستشارة',
            subtitle: 'تحليل شامل ودقيق للمخاطر مع استشارات مخصصة',
            icon: 'fas fa-search-plus',
            image: './img/solution-3.webp',
            services: [
                'تقييم شامل للمخاطر والتهديدات',
                'دراسة الموقع والبنية التحتية',
                'تحليل الامتثال للمعايير المحلية والدولية',
                'وضع خطة استراتيجية للحماية'
            ],
            features: [
              

                 'خبراء معتمدون دولياً',
                'تقارير مفصلة وتوصيات عملية',
                'استشارة مجانية أولية',
                'متابعة دورية للتحديثات'
            ],
            description: 'التقييم الدقيق هو الأساس لأي نظام حماية فعال. نحن نحلل كل جانب من جوانب منشأتك لنضع خطة حماية مخصصة تناسب احتياجاتك الفريدة وتضمن أعلى مستويات الأمان.'

        },
        testing: {
            title: 'الاختبار والتشغيل',
            subtitle: 'اختبارات دقيقة لضمان عمل الأنظمة بكفاءة وجاهزيتها',
            icon: 'fas fa-vial',
            image: './img/solution-4.webp',
            services: [
                'اختبار شامل لجميع الأنظمة',
                'فحص أداء معدات الإطفاء',
                'اختبار أنظمة الإنذار والتنبيه',
                'تجربة سيناريوهات الطوارئ'
            ],
            features: [
                'معايير اختبار دولية معتمدة',
                'تقارير اختبار مفصلة',
                'شهادات امتثال رسمية',
                'ضمان الجاهزية التشغيلية'
            ],
            description: 'نجري اختبارات شاملة ودقيقة لجميع الأنظمة والمعدات لضمان عملها بأعلى كفاءة وجاهزيتها الكاملة للتعامل مع أي حالة طوارئ.'
        },
        maintenance: {
            title: 'الصيانة والدعم الفني',
            subtitle: 'عقود صيانة مرنة ودعم فني على مدار الساعة',
            icon: 'fas fa-tools',
            image: './img/solution-5.webp',
            services: [
                'صيانة دورية شاملة',
                'دعم فني على مدار الساعة',
                'استبدال القطع والمعدات',
                'تحديث الأنظمة والبرمجيات'
            ],
            features: [
                'عقود صيانة مرنة ومخصصة',
                'فرق صيانة متخصصة',
                'قطع غيار أصلية ومعتمدة',
                'استجابة سريعة للطوارئ'
            ],
            description: 'نقدم خدمات الصيانة والدعم الفني المتكاملة مع عقود مرنة تضمن استمرارية عمل أنظمتك بأعلى كفاءة وجاهزية دائمة.'
        },
        training: {
            title: 'التدريب والتوعية',
            subtitle: 'برامج تدريبية متخصصة لفرق العمل والمنشآت',
            icon: 'fas fa-graduation-cap',
            image: './img/solution-6.jpeg',
            services: [
                'تدريب فرق الطوارئ والإخلاء',
                'ورش توعية للموظفين',
                'تدريب على استخدام المعدات',
                'محاكاة سيناريوهات الطوارئ'
            ],
            features: [
                'مدربون معتمدون دولياً',
                'برامج تدريبية متخصصة',
                'شهادات تدريب معتمدة',
                'تدريب عملي ونظري'
            ],
            description: 'نقدم برامج تدريبية شاملة ومتخصصة لضمان جاهزية فرق العمل والموظفين للتعامل مع حالات الطوارئ بكفاءة وفعالية.'
        }
    };

    // Initialize the page
    initializePage();
    setupEventListeners();
    startAnimations();

    function initializePage() {
        // Set up intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.animate-fade-in, .animate-slide-in-right, .animate-slide-in-left').forEach(el => {
            observer.observe(el);
        });
    }

    function setupEventListeners() {
        // Solution item click handlers
        document.querySelectorAll('.solution-item').forEach(item => {
            item.addEventListener('click', function() {
                const solutionType = this.dataset.solution;
                switchSolution(solutionType, this);
            });

            // Add hover effects
            item.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateX(-5px)';
                    this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                }
            });

            item.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateX(0)';
                    this.style.boxShadow = 'none';
                }
            });
        });

        // Button click effects
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function(e) {
                createRippleEffect(e, this);
            });
        });

        // Smooth scrolling for internal links
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
    }

    function switchSolution(solutionType, clickedItem) {
        // Remove active class from all items
        document.querySelectorAll('.solution-item').forEach(item => {
            item.classList.remove('active');
            item.style.transform = 'translateX(0)';
            item.style.boxShadow = 'none';
        });

        // Add active class to clicked item
        clickedItem.classList.add('active');

        // Fade out current content
        const contentArea = document.getElementById('content-area');
        contentArea.classList.add('fade-out');

        // Wait for fade out, then update content
        setTimeout(() => {
            updateContent(solutionType);
            contentArea.classList.remove('fade-out');
            contentArea.classList.add('fade-in');
        }, ANIMATION_DURATION / 2);
    }

    function updateContent(solutionType) {
        const solution = solutionsData[solutionType];
        const contentArea = document.getElementById('content-area');

        contentArea.innerHTML = `
            <div class="solution-content active" id="${solutionType}-content">
                <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div class="relative h-80 lg:h-96">
                        <img src="${solution.image}" alt="${solution.title}" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div class="absolute bottom-6 right-6 left-6">
                            <h3 class="text-3xl font-bold text-white mb-2 text-shadow">
                                <i class="${solution.icon} ml-2"></i>
                                ${solution.title}
                            </h3>
                            <p class="text-white/90 text-lg text-shadow">${solution.subtitle}</p>
                        </div>
                    </div>
                    <div class="p-8">
                        <div class="grid md:grid-cols-2 gap-6 mb-8">
                            <div class="space-y-4">
                                <h4 class="text-xl font-bold text-dark-gray mb-4">
                                    <i class="fas fa-clipboard-check text-fire-red ml-2"></i>
                                    ما نقدمه:
                                </h4>
                                <div class="space-y-3">
                                    ${solution.services.map(service => `
                                        <div class="flex items-center">
                                            <i class="fas fa-check-circle text-fire-red ml-2"></i>
                                            <span>${service}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            <div class="space-y-4">
                                <h4 class="text-xl font-bold text-dark-gray mb-4">
                                    <i class="fas fa-star text-fire-red ml-2"></i>
                                    المميزات:
                                </h4>
                                <div class="space-y-3">
                                    ${solution.features.map(feature => `
                                        <div class="flex items-center">
                                            <i class="fas fa-medal text-fire-orange ml-2"></i>
                                            <span>${feature}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                        <div class="bg-gradient-to-r from-fire-red to-fire-orange p-6 rounded-xl text-white">
                            <h4 class="text-xl font-bold mb-3">
                                <i class="fas fa-lightbulb ml-2"></i>
                                لماذا ${solution.title}؟
                            </h4>
                            <p class="leading-relaxed">
                                ${solution.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Animate new content elements
        animateContentElements();
    }

    function animateContentElements() {
        const elements = document.querySelectorAll('#content-area .flex, #content-area .bg-gradient-to-r');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * STAGGER_DELAY);
        });
    }

    function createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Add ripple styles
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    function startAnimations() {
        // Animate floating elements
        animateFloatingElements();
        
        // Start parallax effects
        setupParallaxEffects();
        
        // Animate counters if they exist
        animateCounters();
    }

    function animateFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            // Add random movement
            setInterval(() => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                element.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 3000 + index * 1000);
        });
    }

    function setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + index * 0.1;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        const observerOptions = {
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.count);
                    animateCounter(counter, target);
                    counterObserver.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    }

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .solution-item {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .content-area {
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .fade-out {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .floating-element {
            transition: transform 2s ease-in-out;
        }
        
        .icon-container {
            transition: all 0.3s ease;
        }
        
        .solution-item:hover .icon-container {
            transform: scale(1.1) rotate(5deg);
        }
        
        .solution-item.active .icon-container {
            transform: scale(1.2);
        }
        
        .animated-border {
            position: relative;
            overflow: hidden;
        }
        
        .animated-border::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        
        .animated-border:hover::before {
            left: 100%;
        }
    `;
    document.head.appendChild(style);

    // Performance optimization
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    function updateAnimations() {
        // Update any frame-based animations here
        ticking = false;
    }

    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(requestTick, 10);
    });

    console.log('🔥 Integrated Solutions Section - JavaScript Loaded Successfully!');
});





// Fire Systems Section - Advanced Carousel and Animations
// Fire Safety Website - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const ANIMATION_DURATION = 800;
    const AUTO_PLAY_INTERVAL = 5000;
    const STAGGER_DELAY = 100;
    
    // State
    let currentSlide = 0;
    let isAnimating = false;
    let autoPlayTimer = null;
    
    // Elements
    const carousel = document.getElementById('systems-carousel');
    const slides = document.querySelectorAll('.system-slide');
    const navDots = document.querySelectorAll('.nav-dot');
    const systemNames = document.querySelectorAll('.system-name');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Initialize the carousel
    initializeCarousel();
    setupEventListeners();
    startAnimations();
    startAutoPlay();

    function initializeCarousel() {
        // Set up intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.animate-fade-in, .animate-slide-in-right, .animate-slide-in-left, .animate-slide-in-up').forEach(el => {
            observer.observe(el);
        });

        // Initialize first slide
        updateSlide(0, false);
    }

    function setupEventListeners() {
        // Navigation buttons
        prevBtn.addEventListener('click', () => {
            if (!isAnimating) {
                goToPrevSlide();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (!isAnimating) {
                goToNextSlide();
            }
        });

        // Navigation dots
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (!isAnimating && index !== currentSlide) {
                    goToSlide(index);
                }
            });
        });

        // System names
        systemNames.forEach((name, index) => {
            name.addEventListener('click', () => {
                if (!isAnimating && index !== currentSlide) {
                    goToSlide(index);
                }
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && !isAnimating) {
                goToNextSlide();
            } else if (e.key === 'ArrowRight' && !isAnimating) {
                goToPrevSlide();
            }
        });

        // Touch/swipe support
        let startX = 0;
        let endX = 0;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > swipeThreshold && !isAnimating) {
                if (diff > 0) {
                    // Swipe left (next slide)
                    goToNextSlide();
                } else {
                    // Swipe right (previous slide)
                    goToPrevSlide();
                }
            }
        }

        // Pause auto-play on hover
        carousel.addEventListener('mouseenter', pauseAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Button click effects
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function(e) {
                createRippleEffect(e, this);
            });
        });

        // Feature item hover effects
        document.querySelectorAll('.feature-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(-5px)';
                this.style.background = 'rgba(220, 38, 38, 0.05)';
            });

            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.background = 'transparent';
            });
        });
    }

    function goToSlide(index) {
        if (index === currentSlide || isAnimating) return;
        
        const direction = index > currentSlide ? 'next' : 'prev';
        updateSlide(index, true, direction);
    }

    function goToNextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        updateSlide(nextIndex, true, 'next');
    }

    function goToPrevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(prevIndex, true, 'prev');
    }

    function updateSlide(index, animate = true, direction = 'next') {
        if (isAnimating && animate) return;
        
        if (animate) {
            isAnimating = true;
        }

        const previousSlide = currentSlide;
        currentSlide = index;

        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'inactive', 'prev', 'next');
            
            if (i === currentSlide) {
                slide.classList.add('active');
            } else if (i === previousSlide && animate) {
                slide.classList.add(direction === 'next' ? 'prev' : 'next');
            } else {
                slide.classList.add('inactive');
            }
        });

        // Update navigation dots
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });

        // Update system names
        systemNames.forEach((name, i) => {
            name.classList.toggle('active', i === currentSlide);
            name.style.fontWeight = i === currentSlide ? 'bold' : 'normal';
            name.style.color = i === currentSlide ? '#DC2626' : '#6B7280';
        });

        // Animate slide content
        if (animate) {
            animateSlideContent(slides[currentSlide]);
            
            setTimeout(() => {
                isAnimating = false;
            }, ANIMATION_DURATION);
        }

        // Update progress bar
        updateProgressBar();
    }

    function animateSlideContent(slide) {
        const elements = slide.querySelectorAll('.feature-item, .btn-primary');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * STAGGER_DELAY);
        });
    }

    function updateProgressBar() {
        const progressBars = document.querySelectorAll('.progress-bar');
        const progress = ((currentSlide + 1) / slides.length) * 100;
        
        progressBars.forEach(bar => {
            bar.style.width = `${progress}%`;
        });
    }

    function startAutoPlay() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
        
        autoPlayTimer = setInterval(() => {
            if (!isAnimating) {
                goToNextSlide();
            }
        }, AUTO_PLAY_INTERVAL);
    }

    function pauseAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    function createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Add ripple styles
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    function startAnimations() {
        // Animate floating elements
        animateFloatingElements();
        
        // Start parallax effects
        setupParallaxEffects();
        
        // Animate system icons
        animateSystemIcons();
        
        // Animate counters if they exist
        animateCounters();
    }

    function animateFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            // Add random movement
            setInterval(() => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                const randomRotate = Math.random() * 10 - 5;
                
                element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
            }, 3000 + index * 1000);
        });
    }

    function setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + index * 0.1;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    function animateSystemIcons() {
        const icons = document.querySelectorAll('.system-icon');
        
        icons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.color = '#EA580C';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = '';
            });
        });
    }

    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        const observerOptions = {
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.count);
                    animateCounter(counter, target);
                    counterObserver.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    }

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .system-slide {
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .system-slide.active {
            opacity: 1;
            transform: translateX(0) scale(1);
            z-index: 10;
        }
        
        .system-slide.inactive {
            opacity: 0;
            transform: translateX(0) scale(0.95);
            z-index: 1;
        }
        
        .system-slide.prev {
            opacity: 0;
            transform: translateX(-100%) scale(0.9);
            z-index: 1;
        }
        
        .system-slide.next {
            opacity: 0;
            transform: translateX(100%) scale(0.9);
            z-index: 1;
        }
        
        .nav-dot {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
        }
        
        .nav-dot:hover {
            transform: scale(1.1);
            background: rgba(220, 38, 38, 0.5);
        }
        
        .nav-dot.active {
            background: linear-gradient(135deg, #DC2626, #EA580C);
            transform: scale(1.2);
        }
        
        .system-name {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .system-name:hover {
            color: #DC2626 !important;
            transform: translateY(-2px);
        }
        
        .system-name.active {
            color: #DC2626 !important;
            font-weight: bold !important;
        }
        
        .floating-element {
            transition: transform 2s ease-in-out;
        }
        
        .system-icon {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .feature-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
        }
        
        .btn-primary {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3);
        }
        
        .btn-primary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        
        .btn-primary:hover::before {
            left: 100%;
        }
        
        .glass-effect {
            transition: all 0.3s ease;
        }
        
        .glass-effect:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
            .system-slide.prev,
            .system-slide.next {
                transform: translateX(0) scale(0.95);
            }
        }
        
        .progress-bar {
            transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .carousel-container {
            perspective: 1000px;
        }
        
        .slide-3d {
            transform-style: preserve-3d;
        }
    `;
    document.head.appendChild(style);

    // Performance optimization
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    function updateAnimations() {
        // Update any frame-based animations here
        ticking = false;
    }

    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(requestTick, 10);
    });

    // Preload images for better performance
    function preloadImages() {
        const imageUrls = [
            'assets/images/sprinkler-system.jpg',
            'assets/images/fire-alarm-system.png',
            'assets/images/gas-suppression-system.png',
            'assets/images/foam-suppression-system.jpg',
            'assets/images/fire-pumps.jpg',
            'assets/images/fire-hose-cabinets.jpg'
        ];

        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    // Initialize preloading
    preloadImages();

    // Accessibility improvements
    function setupAccessibility() {
        // Add ARIA labels
        carousel.setAttribute('aria-label', 'أنظمة مكافحة الحريق');
        carousel.setAttribute('role', 'region');
        
        navDots.forEach((dot, index) => {
            dot.setAttribute('aria-label', `الانتقال إلى النظام ${index + 1}`);
            dot.setAttribute('role', 'button');
        });
        
        prevBtn.setAttribute('aria-label', 'النظام السابق');
        nextBtn.setAttribute('aria-label', 'النظام التالي');
        
        // Keyboard navigation for dots
        navDots.forEach(dot => {
            dot.setAttribute('tabindex', '0');
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dot.click();
                }
            });
        });
    }

    setupAccessibility();

    console.log('🔥 Fire Systems Section - JavaScript Loaded Successfully!');
    console.log(`📊 Total Systems: ${slides.length}`);
    console.log(`⚡ Auto-play Interval: ${AUTO_PLAY_INTERVAL}ms`);
    console.log(`🎬 Animation Duration: ${ANIMATION_DURATION}ms`);
});



// Fire Systems Tabs Section - Advanced Animations and Interactions
// Fire Safety Website - JavaScript

// Tailwind CSS Configuration


document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const ANIMATION_DURATION = 500;
    const STAGGER_DELAY = 100;
    
    // State
    let currentTab = 'sprinkler';
    let isAnimating = false;
    
    // Elements
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Initialize the tabs system
    initializeTabs();
    setupEventListeners();
    startAnimations();

    function initializeTabs() {
        // Set up intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('stagger-animation');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.stagger-animation').forEach(el => {
            observer.observe(el);
        });

        // Initialize first tab
        showTab('sprinkler', false);
    }

    function setupEventListeners() {
        // Tab buttons
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                if (!isAnimating && tabId !== currentTab) {
                    showTab(tabId, true);
                }
            });
        });

        // Button click effects
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function(e) {
                createRippleEffect(e, this);
            });
        });

        // Feature item hover effects
        document.querySelectorAll('.feature-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(-5px)';
                this.style.background = 'rgba(220, 38, 38, 0.05)';
            });

            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.background = 'transparent';
            });
        });

        // System icon hover effects
        document.querySelectorAll('.system-icon').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.color = '#EA580C';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = '';
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && !isAnimating) {
                navigateTab('next');
            } else if (e.key === 'ArrowLeft' && !isAnimating) {
                navigateTab('prev');
            }
        });
    }

    function showTab(tabId, animate = true) {
        if (isAnimating && animate) return;
        
        if (animate) {
            isAnimating = true;
        }

        const previousTab = currentTab;
        currentTab = tabId;

        // Update tab buttons
        tabButtons.forEach(button => {
            const buttonTabId = button.getAttribute('data-tab');
            if (buttonTabId === tabId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Update tab contents
        tabContents.forEach(content => {
            const contentId = content.id.replace('-content', '');
            if (contentId === tabId) {
                content.classList.add('active');
                if (animate) {
                    animateTabContent(content);
                }
            } else {
                content.classList.remove('active');
            }
        });

        if (animate) {
            setTimeout(() => {
                isAnimating = false;
            }, ANIMATION_DURATION);
        }
    }

    function navigateTab(direction) {
        const tabIds = ['sprinkler', 'alarm', 'gas', 'foam', 'pumps', 'hose'];
        const currentIndex = tabIds.indexOf(currentTab);
        let nextIndex;

        if (direction === 'next') {
            nextIndex = (currentIndex + 1) % tabIds.length;
        } else {
            nextIndex = (currentIndex - 1 + tabIds.length) % tabIds.length;
        }

        showTab(tabIds[nextIndex], true);
    }

    function animateTabContent(tabContent) {
        const elements = tabContent.querySelectorAll('.feature-item, .btn-primary, h3, p, .text-xl');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * STAGGER_DELAY);
        });
    }

    function createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Add ripple styles
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    function startAnimations() {
        // Animate floating elements
        animateFloatingElements();
        
        // Start parallax effects
        setupParallaxEffects();
        
        // Animate counters
        animateCounters();
        
        // Start auto tab switching (optional)
        // startAutoTabSwitching();
    }

    function animateFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            // Add random movement
            setInterval(() => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                const randomRotate = Math.random() * 10 - 5;
                
                element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
            }, 3000 + index * 1000);
        });
    }

    function setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + index * 0.1;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        const observerOptions = {
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.count);
                    animateCounter(counter, target);
                    counterObserver.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    }

    function startAutoTabSwitching() {
        const AUTO_SWITCH_INTERVAL = 8000; // 8 seconds
        
        setInterval(() => {
            if (!isAnimating) {
                navigateTab('next');
            }
        }, AUTO_SWITCH_INTERVAL);
    }

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .tab-content {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .tab-content.active {
            opacity: 1;
            transform: translateY(0);
            display: block;
        }
        
        .tab-content:not(.active) {
            opacity: 0;
            transform: translateY(20px);
            display: none;
        }
        
        .tab-button {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
        }
        
        .tab-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(220, 38, 38, 0.2);
        }
        
        .tab-button.active {
            background: linear-gradient(135deg, #DC2626, #EA580C);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3);
        }
        
        .floating-element {
            transition: transform 2s ease-in-out;
        }
        
        .system-icon {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .feature-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
        }
        
        .btn-primary {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3);
        }
        
        .btn-primary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        
        .btn-primary:hover::before {
            left: 100%;
        }
        
        .glass-effect {
            transition: all 0.3s ease;
        }
        
        .glass-effect:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.02);
        }
        
        @media (max-width: 768px) {
            .tab-button {
                font-size: 0.9rem;
                padding: 0.5rem 1rem;
            }
            
            .tab-content {
                padding: 1rem;
            }
        }
        
        .stagger-animation {
            animation: staggerFadeIn 0.8s ease-out forwards;
        }
        
        @keyframes staggerFadeIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Enhanced hover effects for images */
        .tab-content img {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .tab-content img:hover {
            transform: scale(1.05);
        }
        
        /* Enhanced button effects */
        .btn-primary,
        .tab-button {
            position: relative;
            overflow: hidden;
        }
        
        /* Smooth scrolling for better UX */
        html {
            scroll-behavior: smooth;
        }
        
        /* Loading animation for tab content */
        .tab-content.loading {
            opacity: 0.5;
            pointer-events: none;
        }
        
        /* Focus styles for accessibility */
        .tab-button:focus {
            outline: 2px solid #DC2626;
            outline-offset: 2px;
        }
        
        /* Enhanced responsive design */
        @media (max-width: 640px) {
            .tab-button {
                flex: 1;
                text-align: center;
                min-width: 0;
            }
            
            .tab-button .system-icon {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Performance optimization
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    function updateAnimations() {
        // Update any frame-based animations here
        ticking = false;
    }

    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            requestTick();
        }, 16); // ~60fps
    });

    // Add touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold && !isAnimating) {
            if (diff > 0) {
                // Swipe left (next tab)
                navigateTab('next');
            } else {
                // Swipe right (previous tab)
                navigateTab('prev');
            }
        }
    }

    // Accessibility improvements
    document.addEventListener('keydown', (e) => {
        // Tab navigation with Tab key
        if (e.key === 'Tab') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('tab-button')) {
                e.preventDefault();
                const tabId = focusedElement.getAttribute('data-tab');
                showTab(tabId, true);
            }
        }
    });

    // Initialize ARIA attributes for accessibility
    tabButtons.forEach((button, index) => {
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        button.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });

    tabContents.forEach((content, index) => {
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
    });

    console.log('Fire Systems Tabs Section initialized successfully!');
});











// Particle System for Fire Effects
        class FireParticle {
            constructor(canvas) {
                this.canvas = canvas;
                this.ctx = canvas.getContext('2d');
                this.particles = [];
                this.init();
            }

            init() {
                // Create particles
                for (let i = 0; i < 50; i++) {
                    this.particles.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        size: Math.random() * 3 + 1,
                        speedX: (Math.random() - 0.5) * 2,
                        speedY: Math.random() * -3 - 1,
                        opacity: Math.random() * 0.5 + 0.2,
                        color: Math.random() > 0.5 ? '#ef4444' : '#f97316'
                    });
                }
                this.animate();
            }

            animate() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                this.particles.forEach((particle, index) => {
                    // Update particle position
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    particle.opacity -= 0.005;

                    // Reset particle if it goes off screen or fades out
                    if (particle.y < -10 || particle.opacity <= 0) {
                        particle.x = Math.random() * this.canvas.width;
                        particle.y = this.canvas.height + 10;
                        particle.opacity = Math.random() * 0.5 + 0.2;
                    }

                    // Draw particle
                    this.ctx.save();
                    this.ctx.globalAlpha = particle.opacity;
                    this.ctx.fillStyle = particle.color;
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    this.ctx.fill();
                    this.ctx.restore();
                });

                requestAnimationFrame(() => this.animate());
            }
        }

        // Initialize particle system when page loads
        window.addEventListener('load', () => {
            const canvas = document.createElement('canvas');
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '1';
            canvas.style.opacity = '0.3';
            
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            document.body.appendChild(canvas);
            new FireParticle(canvas);

            // Resize canvas on window resize
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        });

        // Advanced scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('animate-in-view');
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.animate-slide-up, .animate-fade-in').forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });

        // Enhanced interactive hover effects
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-20px) scale(1.02)';
                card.style.boxShadow = '0 30px 60px rgba(239, 68, 68, 0.25)';
                
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.top = '50%';
                ripple.style.left = '50%';
                ripple.style.width = '0';
                ripple.style.height = '0';
                ripple.style.background = 'radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)';
                ripple.style.borderRadius = '50%';
                ripple.style.transform = 'translate(-50%, -50%)';
                ripple.style.pointerEvents = 'none';
                ripple.style.zIndex = '1';
                
                card.style.position = 'relative';
                card.appendChild(ripple);
                
                // Animate ripple
                ripple.animate([
                    { width: '0px', height: '0px', opacity: 1 },
                    { width: '300px', height: '300px', opacity: 0 }
                ], {
                    duration: 600,
                    easing: 'ease-out'
                }).onfinish = () => ripple.remove();
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });

            // Add click animation
            card.addEventListener('click', () => {
                card.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(0.95)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 200,
                    easing: 'ease-in-out'
                });
            });
        });

        // Floating animation for background icons
        document.querySelectorAll('.absolute i').forEach((icon, index) => {
            const randomDelay = Math.random() * 2000;
            const randomDuration = 3000 + Math.random() * 2000;
            
            setTimeout(() => {
                icon.animate([
                    { transform: 'translateY(0px) rotate(0deg)' },
                    { transform: 'translateY(-20px) rotate(10deg)' },
                    { transform: 'translateY(0px) rotate(0deg)' }
                ], {
                    duration: randomDuration,
                    iterations: Infinity,
                    easing: 'ease-in-out'
                });
            }, randomDelay);
        });

        // Stats counter animation
        const animateStats = () => {
            document.querySelectorAll('.stats-number').forEach(stat => {
                const finalValue = stat.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/\d/g, '');
                let currentValue = 0;
                const increment = numericValue / 50;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(counter);
                    }
                    stat.textContent = Math.floor(currentValue) + suffix;
                }, 50);
            });
        };

        // Trigger stats animation when section is visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
            const statsSection = document.querySelector('.grid.grid-cols-2.lg\\:grid-cols-4');
            if (statsSection) {
                statsObserver.observe(statsSection);
            }
        });

        // Interactive button effects
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });

            button.addEventListener('click', (e) => {
                // Create click effect
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const clickEffect = document.createElement('div');
                clickEffect.style.position = 'absolute';
                clickEffect.style.left = x + 'px';
                clickEffect.style.top = y + 'px';
                clickEffect.style.width = '0';
                clickEffect.style.height = '0';
                clickEffect.style.background = 'rgba(255,255,255,0.5)';
                clickEffect.style.borderRadius = '50%';
                clickEffect.style.transform = 'translate(-50%, -50%)';
                clickEffect.style.pointerEvents = 'none';
                
                button.style.position = 'relative';
                button.appendChild(clickEffect);
                
                clickEffect.animate([
                    { width: '0px', height: '0px', opacity: 1 },
                    { width: '100px', height: '100px', opacity: 0 }
                ], {
                    duration: 400,
                    easing: 'ease-out'
                }).onfinish = () => clickEffect.remove();
            });
        });

        // Parallax effect for background elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.absolute');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Add glow effect on hover for fire elements
        document.querySelectorAll('.text-fire-red, .text-fire-orange').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.textShadow = '0 0 20px currentColor';
                element.style.transition = 'text-shadow 0.3s ease';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.textShadow = 'none';
            });
        });
    