// Excellence College Website JavaScript

$(document).ready(function() {
    'use strict';

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    $('.navbar-nav a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000, 'easeInOutExpo');
            
            // Close mobile menu
            $('.navbar-collapse').collapse('hide');
        }
    });

    // Scroll indicator click
    $('.scroll-indicator').on('click', function() {
        $('html, body').animate({
            scrollTop: $('#about').offset().top - 70
        }, 1000);
    });

    // Active navigation highlighting
    $(window).on('scroll', function() {
        const scrollPos = $(window).scrollTop() + 100;
        
        $('.navbar-nav a[href^="#"]').each(function() {
            const currLink = $(this);
            const refElement = $(currLink.attr('href'));
            
            if (refElement.length) {
                if (refElement.position().top <= scrollPos && 
                    refElement.position().top + refElement.height() > scrollPos) {
                    $('.navbar-nav a').removeClass('active');
                    currLink.addClass('active');
                }
            }
        });
    });

    // Animated counters
    function animateCounters() {
        $('.stat-number').each(function() {
            const $this = $(this);
            const countTo = $this.attr('data-count');
            
            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Trigger counter animation when section is visible
    let counterAnimated = false;
    $(window).on('scroll', function() {
        const aboutSection = $('#about');
        if (aboutSection.length) {
            const aboutTop = aboutSection.offset().top;
            const aboutHeight = aboutSection.outerHeight();
            const windowTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            
            if (windowTop + windowHeight > aboutTop + aboutHeight / 2 && !counterAnimated) {
                animateCounters();
                counterAnimated = true;
            }
        }
    });

    // Gallery item hover effects
    $('.gallery-item').on('mouseenter', function() {
        $(this).find('img').css('transform', 'scale(1.1)');
    }).on('mouseleave', function() {
        $(this).find('img').css('transform', 'scale(1)');
    });

    // Course modal functionality
    $('#courseModal').on('show.bs.modal', function(event) {
        const button = $(event.relatedTarget);
        const courseName = button.data('course');
        const modal = $(this);
        
        // Course details data
        const courseDetails = {
            'Computer Science': {
                title: 'Computer Science & Engineering',
                description: 'Our Computer Science program provides comprehensive training in programming, software development, artificial intelligence, and emerging technologies. Students gain hands-on experience with cutting-edge tools and technologies.',
                duration: '4 Years',
                degree: 'Bachelor of Technology (B.Tech)',
                specializations: ['Artificial Intelligence', 'Data Science', 'Cybersecurity', 'Software Engineering', 'Mobile App Development'],
                careerOptions: ['Software Developer', 'Data Scientist', 'AI Engineer', 'Cybersecurity Specialist', 'Product Manager'],
                fees: '$15,000 per year'
            },
            'Business Administration': {
                title: 'Business Administration',
                description: 'Develop essential business skills including leadership, management, marketing, and strategic planning. Our program combines theoretical knowledge with practical application through real-world projects.',
                duration: '3 Years',
                degree: 'Bachelor of Business Administration (BBA)',
                specializations: ['Marketing', 'Finance', 'Human Resources', 'Operations Management', 'International Business'],
                careerOptions: ['Business Analyst', 'Marketing Manager', 'Project Manager', 'Consultant', 'Entrepreneur'],
                fees: '$12,000 per year'
            },
            'English Literature': {
                title: 'English Literature',
                description: 'Explore the rich world of literature, develop critical thinking skills, and enhance your communication abilities. Our program covers classic and contemporary works from diverse cultures.',
                duration: '3 Years',
                degree: 'Bachelor of Arts (BA)',
                specializations: ['Creative Writing', 'Literary Criticism', 'Comparative Literature', 'Linguistics', 'Media Studies'],
                careerOptions: ['Writer', 'Editor', 'Teacher', 'Journalist', 'Content Creator'],
                fees: '$10,000 per year'
            }
        };
        
        const course = courseDetails[courseName];
        if (course) {
            modal.find('.modal-title').text(course.title);
            
            let content = `
                <div class="course-detail">
                    <p class="lead">${course.description}</p>
                    
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <h6><i class="fas fa-clock text-primary me-2"></i>Duration</h6>
                            <p>${course.duration}</p>
                        </div>
                        <div class="col-md-6">
                            <h6><i class="fas fa-graduation-cap text-primary me-2"></i>Degree</h6>
                            <p>${course.degree}</p>
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <h6><i class="fas fa-star text-primary me-2"></i>Specializations</h6>
                        <ul class="list-unstyled">
            `;
            
            course.specializations.forEach(spec => {
                content += `<li><i class="fas fa-check text-success me-2"></i>${spec}</li>`;
            });
            
            content += `
                        </ul>
                    </div>
                    
                    <div class="mb-4">
                        <h6><i class="fas fa-briefcase text-primary me-2"></i>Career Options</h6>
                        <ul class="list-unstyled">
            `;
            
            course.careerOptions.forEach(career => {
                content += `<li><i class="fas fa-arrow-right text-success me-2"></i>${career}</li>`;
            });
            
            content += `
                        </ul>
                    </div>
                    
                    <div class="alert alert-info">
                        <h6><i class="fas fa-dollar-sign me-2"></i>Tuition Fees</h6>
                        <p class="mb-0">${course.fees}</p>
                    </div>
                    
                    <div class="text-center mt-4">
                        <button class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#applicationModal" data-bs-dismiss="modal">Apply for This Course</button>
                    </div>
                </div>
            `;
            
            modal.find('.modal-body').html(content);
        }
    });

    // Form submissions
    $('button[type="button"]').on('click', function() {
        if ($(this).text() === 'Submit Application') {
            handleApplicationSubmission();
        } else if ($(this).text() === 'Send Message') {
            handleContactSubmission();
        }
    });

    function handleApplicationSubmission() {
        const name = $('#applicantName').val();
        const email = $('#applicantEmail').val();
        const phone = $('#applicantPhone').val();
        const program = $('#preferredProgram').val();
        
        if (name && email && phone && program) {
            // Simulate form submission
            showNotification('Application submitted successfully! We will contact you soon.', 'success');
            $('#applicationModal').modal('hide');
            clearForm('#applicationModal');
        } else {
            showNotification('Please fill in all required fields.', 'error');
        }
    }

    function handleContactSubmission() {
        const name = $('#contactName').val();
        const email = $('#contactEmail').val();
        const subject = $('#contactSubject').val();
        const message = $('#contactMessage').val();
        
        if (name && email && subject && message) {
            // Simulate form submission
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            $('#contactModal').modal('hide');
            clearForm('#contactModal');
        } else {
            showNotification('Please fill in all required fields.', 'error');
        }
    }

    function clearForm(modalId) {
        $(modalId + ' form')[0].reset();
    }

    function showNotification(message, type) {
        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        const notification = `
            <div class="alert ${alertClass} alert-dismissible fade show position-fixed" 
                 style="top: 20px; right: 20px; z-index: 9999; max-width: 400px;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        $('body').append(notification);
        
        setTimeout(function() {
            $('.alert').fadeOut();
        }, 5000);
    }

    // Parallax effect for hero section
    // $(window).on('scroll', function() {
    //     const scrolled = $(window).scrollTop();
    //     const parallax = $('.hero-section');
    //     const speed = 0.5;
        
    //     parallax.css('transform', 'translateY(' + (scrolled * speed) + 'px)');
    // });

    // Loading animations
    function triggerLoadAnimations() {
        $('.loading').addClass('loaded');
    }

    // Trigger animations on page load
    $(window).on('load', function() {
        triggerLoadAnimations();
    });

    // Image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Keyboard navigation support
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('.modal').modal('hide');
        }
    });

    // Smooth scroll for all anchor links
    $('a[href*="#"]:not([href="#"])').on('click', function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
            location.hostname === this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 1000);
                return false;
            }
        }
    });

    // Performance optimization: Debounced scroll handler
    let ticking = false;
    
    function updateScrollEffects() {
        // Add scroll-based effects here
        ticking = false;
    }
    
    $(window).on('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // Add hover effects to cards
    $('.department-card, .course-card').hover(
        function() {
            $(this).addClass('shadow-lg').css('transform', 'translateY(-5px)');
        },
        function() {
            $(this).removeClass('shadow-lg').css('transform', 'translateY(0)');
        }
    );

    // Testimonial slider (if needed)
    if ($('.testimonial-slider').length) {
        $('.testimonial-slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 4000
        });
    }

    // Custom easing function for smooth animations
    $.easing.easeInOutExpo = function(x, t, b, c, d) {
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };
});

// Additional utility functions
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to interactive elements
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.setAttribute('aria-label', `Navigate to ${link.textContent}`);
    });

    // Add focus trap for modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', function() {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        });
    });
});

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Google Analytics (placeholder)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Print functionality
function printPage() {
    window.print();
}

// Social sharing functionality
function shareOnSocial(platform, url, text) {
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Dark mode toggle (optional feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}