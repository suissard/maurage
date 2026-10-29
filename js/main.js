/**
 * Alice Maurage - Art-Thérapie Clinique (maurage.fr)
 * Core Frontend Application Script (Shared across all pages)
 */
(function () {
    'use strict';

    // Progressive enhancement flag for CSS reveal animations
    document.documentElement.classList.add('js-enabled');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const WEB3FORMS_ACCESS_KEY = '7dbc9d3a-1130-4878-a406-0712162dd61e';
    const CAL_EMBED_URL = 'https://app.cal.com/jeremy-clavier/1h?embed=true&layout=month_view&theme=light&ui.color-scheme=light';

    // =========================================================================
    // 1. DYNAMIC HAND-DRAWN BRUSH WAVE GENERATOR (SVG Path & Length)
    // =========================================================================
    function initArtisticUnderlines() {
        const underlineNodes = document.querySelectorAll('.art-underline');
        if (!underlineNodes.length) return;

        underlineNodes.forEach((container, index) => {
            if (container.querySelector('svg.art-underline-svg')) return;

            container.style.position = 'relative';
            container.style.display = 'inline-block';
            container.style.zIndex = '1';

            const isDark = container.closest('#contact') !== null;
            const strokeColor = isDark ? '#5eead4' : '#0f766e';
            const strokeOpacity = isDark ? 0.30 : 0.22;

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('class', 'art-underline-svg');
            svg.setAttribute('viewBox', '0 0 600 50');
            svg.setAttribute('preserveAspectRatio', 'none');
            svg.setAttribute('aria-hidden', 'true');
            svg.style.position = 'absolute';
            svg.style.bottom = '-8px';
            svg.style.left = '0';
            svg.style.width = '100%';
            svg.style.height = '26px';
            svg.style.pointerEvents = 'none';
            svg.style.overflow = 'visible';
            svg.style.zIndex = '-1';
            svg.style.opacity = '0';
            svg.style.transition = prefersReducedMotion ? 'none' : 'opacity 0.4s ease';

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M 6 32 C 150 14, 300 38, 450 18 C 520 10, 565 28, 594 22');
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', strokeColor);
            path.setAttribute('stroke-width', '18');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');

            svg.appendChild(path);
            container.appendChild(svg);

            if (prefersReducedMotion) {
                svg.style.opacity = strokeOpacity.toString();
                return;
            }

            const totalLength = path.getTotalLength ? path.getTotalLength() || 650 : 650;
            path.style.strokeDasharray = `${totalLength} ${totalLength}`;
            path.style.strokeDashoffset = `${totalLength}`;

            let animated = false;
            const triggerDraw = () => {
                if (animated) return;
                animated = true;
                svg.style.opacity = strokeOpacity.toString();
                path.style.transition = 'stroke-dashoffset 1.35s cubic-bezier(0.35, 0.05, 0.2, 1)';
                path.style.strokeDashoffset = '0';
            };

            if (index === 0 || !('IntersectionObserver' in window)) {
                setTimeout(triggerDraw, 300);
            } else {
                const scrollObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setTimeout(triggerDraw, 120);
                            scrollObserver.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.35,
                    rootMargin: '0px 0px -40px 0px'
                });

                scrollObserver.observe(container);
            }
        });
    }

    // =========================================================================
    // 2. REVEAL ANIMATIONS ON SCROLL
    // =========================================================================
    function initRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal');
        if (!revealElements.length) return;

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            revealElements.forEach((el) => el.classList.add('active'));
            return;
        }

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach((el) => revealObserver.observe(el));
    }

    // =========================================================================
    // 3. CITY TARIFF CALCULATOR DROPDOWN
    // =========================================================================
    function initCityTariffDropdown() {
        const selects = document.querySelectorAll('[data-tariff-select], #city-tariff-select');
        selects.forEach((select) => {
            const targetId = select.getAttribute('data-tariff-target') || 'city-tariff-total';
            const totalDisplay = document.getElementById(targetId);
            if (!totalDisplay) return;

            const updateCityTariff = () => {
                const selectedOption = select.options[select.selectedIndex];
                if (!selectedOption) return;
                const fee = parseFloat(selectedOption.dataset.fee) || 0;
                const total = 60 + fee;
                totalDisplay.textContent = `${total.toFixed(2).replace('.', ',')} €`;
            };

            select.addEventListener('change', updateCityTariff);
            updateCityTariff();
        });
    }

    // =========================================================================
    // 4. NAVIGATION & ACCESSIBLE MOBILE MENU
    // =========================================================================
    function setMobileMenuState(open) {
        const mobileBtn = document.getElementById('mobile-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIconOpen = document.getElementById('menu-icon-open');
        const menuIconClose = document.getElementById('menu-icon-close');
        if (!mobileMenu || !mobileBtn) return;

        if (open) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            if (menuIconOpen) menuIconOpen.classList.add('hidden');
            if (menuIconClose) menuIconClose.classList.remove('hidden');
            mobileBtn.setAttribute('aria-expanded', 'true');
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            if (menuIconOpen) menuIconOpen.classList.remove('hidden');
            if (menuIconClose) menuIconClose.classList.add('hidden');
            mobileBtn.setAttribute('aria-expanded', 'false');
        }
    }

    function toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu) return;
        const isHidden = mobileMenu.classList.contains('hidden');
        setMobileMenuState(isHidden);
    }

    function initNavigation() {
        const mobileBtn = document.getElementById('mobile-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const navbar = document.getElementById('navbar');

        if (mobileBtn && mobileMenu) {
            mobileBtn.addEventListener('click', toggleMobileMenu);
            document.querySelectorAll('.mobile-link').forEach((link) => {
                link.addEventListener('click', () => setMobileMenuState(false));
            });

            // Close mobile menu when pressing Escape or clicking outside navbar
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                    setMobileMenuState(false);
                    mobileBtn.focus();
                }
            });

            document.addEventListener('click', (e) => {
                if (!mobileMenu.classList.contains('hidden') && navbar && !navbar.contains(e.target)) {
                    setMobileMenuState(false);
                }
            });
        }

        // Subtle navbar elevation on scroll
        if (navbar) {
            const updateNavbarScroll = () => {
                if (window.scrollY > 16) {
                    navbar.classList.add('shadow-xs', 'bg-warm-50/95');
                } else {
                    navbar.classList.remove('shadow-xs', 'bg-warm-50/95');
                }
            };
            window.addEventListener('scroll', updateNavbarScroll, { passive: true });
            updateNavbarScroll();
        }
    }

    // =========================================================================
    // 5. FAQ ACCORDION (WCAG 2.1 AA)
    // =========================================================================
    function initFaqAccordion() {
        const faqButtons = document.querySelectorAll('.faq-btn');
        if (!faqButtons.length) return;

        faqButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.faq-item');
                const isExpanded = btn.getAttribute('aria-expanded') === 'true';

                faqButtons.forEach((otherBtn) => {
                    if (otherBtn !== btn) {
                        const otherItem = otherBtn.closest('.faq-item');
                        if (otherItem) otherItem.classList.remove('open');
                        otherBtn.setAttribute('aria-expanded', 'false');
                    }
                });

                if (item) {
                    if (isExpanded) {
                        item.classList.remove('open');
                        btn.setAttribute('aria-expanded', 'false');
                    } else {
                        item.classList.add('open');
                        btn.setAttribute('aria-expanded', 'true');
                    }
                }
            });
        });
    }

    // =========================================================================
    // 6. UNIFIED MODAL ACCESSIBILITY & FOCUS TRAP (MENTIONS LÉGALES & CAL.COM)
    // =========================================================================
    function getFocusableElements(container) {
        if (!container) return [];
        return Array.from(
            container.querySelectorAll(
                'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
            )
        ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
    }

    function trapFocus(e, modalContent) {
        if (e.key !== 'Tab' || !modalContent) return;
        const focusable = getFocusableElements(modalContent);
        if (!focusable.length) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement || !modalContent.contains(document.activeElement)) {
                e.preventDefault();
                lastElement.focus();
            }
        } else if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    // --- Mentions Légales Modal ---
    let previouslyFocusedMentionsEl = null;

    function handleMentionsKeydown(e) {
        const mentionsModal = document.getElementById('mentions-modal');
        const mentionsModalContent = document.getElementById('mentions-modal-content');
        if (!mentionsModal || mentionsModal.classList.contains('hidden')) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal();
            return;
        }
        trapFocus(e, mentionsModalContent);
    }

    function openModal() {
        const mentionsModal = document.getElementById('mentions-modal');
        const mentionsModalContent = document.getElementById('mentions-modal-content');
        const closeMentionsBtn = document.getElementById('close-mentions-btn');
        if (!mentionsModal || !mentionsModalContent) return;

        previouslyFocusedMentionsEl = document.activeElement;
        mentionsModal.classList.remove('hidden');
        void mentionsModal.offsetWidth;
        mentionsModal.classList.remove('opacity-0');
        mentionsModalContent.classList.remove('scale-95');
        mentionsModalContent.classList.add('scale-100');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            if (closeMentionsBtn) closeMentionsBtn.focus();
        }, 60);

        document.addEventListener('keydown', handleMentionsKeydown);
    }

    function closeModal() {
        const mentionsModal = document.getElementById('mentions-modal');
        const mentionsModalContent = document.getElementById('mentions-modal-content');
        if (!mentionsModal || !mentionsModalContent) return;

        document.removeEventListener('keydown', handleMentionsKeydown);
        mentionsModal.classList.add('opacity-0');
        mentionsModalContent.classList.remove('scale-100');
        mentionsModalContent.classList.add('scale-95');

        setTimeout(() => {
            mentionsModal.classList.add('hidden');
            document.body.style.overflow = '';
            if (previouslyFocusedMentionsEl && typeof previouslyFocusedMentionsEl.focus === 'function') {
                previouslyFocusedMentionsEl.focus();
            }
        }, 300);
    }

    // --- Cal.com Booking Modal ---
    let previouslyFocusedBookingEl = null;
    let calEmbedInitialized = false;

    const calCustomStyles = {
        theme: 'light',
        styles: {
            branding: {
                brandColor: '#0f766e'
            }
        },
        cssVarsPerTheme: {
            light: {
                'cal-brand': '#0f766e',
                'cal-brand-emphasis': '#115e59',
                'cal-brand-text': '#ffffff',
                'cal-brand-subtle': '#f0fdfa',
                'cal-brand-accent': '#0d9488',
                'cal-border': '#e7e5e4',
                'cal-border-emphasis': '#cbd5e1',
                'cal-border-subtle': '#f5f5f4',
                'cal-border-booker': '#e7e5e4',
                'cal-border-booker-width': '1px',
                'cal-bg': '#ffffff',
                'cal-bg-emphasis': '#fafaf9',
                'cal-bg-subtle': '#fafaf9',
                'cal-bg-muted': '#f5f5f4',
                'cal-text': '#1c1917',
                'cal-text-emphasis': '#1c1917',
                'cal-text-muted': '#78716c',
                'cal-text-subtle': '#a8a29e'
            }
        },
        hideEventTypeDetails: false,
        layout: 'month_view'
    };

    function injectCalStyles() {
        const iframe = document.getElementById('cal-booking-iframe');
        if (!iframe || !iframe.contentWindow) return;
        try {
            iframe.contentWindow.postMessage({
                originator: 'CAL',
                method: 'parentKnowsIframeReady'
            }, 'https://app.cal.com');
            iframe.contentWindow.postMessage({
                originator: 'CAL',
                method: 'ui',
                arg: calCustomStyles
            }, 'https://app.cal.com');
        } catch (_err) {
            // Ignore cross-origin frame readiness race conditions
        }
    }

    function ensureCalLoaded() {
        const iframe = document.getElementById('cal-booking-iframe');
        if (iframe && (!iframe.getAttribute('src') || iframe.getAttribute('src') === 'about:blank')) {
            iframe.setAttribute('src', iframe.dataset.src || CAL_EMBED_URL);
        }

        if (calEmbedInitialized) return;
        calEmbedInitialized = true;

        (function (C, A, L) {
            const p = function (a, ar) { a.q.push(ar); };
            const d = C.document;
            C.Cal = C.Cal || function () {
                const cal = C.Cal;
                const ar = arguments;
                if (!cal.loaded) {
                    cal.ns = {};
                    cal.q = cal.q || [];
                    const script = d.createElement('script');
                    script.src = A;
                    script.async = true;
                    d.head.appendChild(script);
                    cal.loaded = true;
                }
                if (ar[0] === L) {
                    const api = function () { p(api, arguments); };
                    const namespace = ar[1];
                    api.q = api.q || [];
                    if (typeof namespace === 'string') {
                        cal.ns[namespace] = cal.ns[namespace] || api;
                        p(cal.ns[namespace], ar);
                        p(cal, ['initNamespace', namespace]);
                    } else {
                        p(cal, ar);
                    }
                    return;
                }
                p(cal, ar);
            };
        })(window, 'https://app.cal.com/embed/embed.js', 'init');

        if (typeof window.Cal === 'function') {
            window.Cal('init', { origin: 'https://app.cal.com' });
            window.Cal('ui', calCustomStyles);
        }
    }

    function handleBookingKeydown(e) {
        const bookingModal = document.getElementById('booking-modal');
        const bookingModalContent = document.getElementById('booking-modal-content');
        if (!bookingModal || bookingModal.classList.contains('hidden')) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            closeBookingModal();
            return;
        }
        trapFocus(e, bookingModalContent);
    }

    function openBookingModal() {
        const bookingModal = document.getElementById('booking-modal');
        const bookingModalContent = document.getElementById('booking-modal-content');
        if (!bookingModal || !bookingModalContent) return;

        previouslyFocusedBookingEl = document.activeElement;
        ensureCalLoaded();

        bookingModal.classList.remove('hidden');
        void bookingModal.offsetWidth;
        bookingModal.classList.remove('opacity-0');
        bookingModalContent.classList.remove('scale-95');
        bookingModalContent.classList.add('scale-100');
        document.body.style.overflow = 'hidden';

        injectCalStyles();

        setTimeout(() => {
            const closeBtn = document.getElementById('close-booking-modal-btn');
            if (closeBtn) closeBtn.focus();
        }, 60);

        document.addEventListener('keydown', handleBookingKeydown);

        if (window.posthog && typeof window.posthog.capture === 'function') {
            window.posthog.capture('booking_modal_opened', { page: window.location.pathname });
        }
    }

    function closeBookingModal() {
        const bookingModal = document.getElementById('booking-modal');
        const bookingModalContent = document.getElementById('booking-modal-content');
        if (!bookingModal || !bookingModalContent) return;

        document.removeEventListener('keydown', handleBookingKeydown);
        bookingModal.classList.add('opacity-0');
        bookingModalContent.classList.remove('scale-100');
        bookingModalContent.classList.add('scale-95');
        document.body.style.overflow = '';

        setTimeout(() => {
            bookingModal.classList.add('hidden');
            if (previouslyFocusedBookingEl && typeof previouslyFocusedBookingEl.focus === 'function') {
                previouslyFocusedBookingEl.focus();
            }
        }, 300);

        if (window.posthog && typeof window.posthog.capture === 'function') {
            window.posthog.capture('booking_modal_closed', { page: window.location.pathname });
        }
    }

    function switchContactView(view, scroll = true) {
        if (view === 'calendar') {
            openBookingModal();
        } else if (scroll) {
            const contactSection = document.getElementById('contact');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function initModals() {
        const mentionsModal = document.getElementById('mentions-modal');
        const openMentionsBtn = document.getElementById('open-mentions-btn');
        const closeMentionsBtn = document.getElementById('close-mentions-btn');

        if (openMentionsBtn) openMentionsBtn.addEventListener('click', openModal);
        if (closeMentionsBtn) closeMentionsBtn.addEventListener('click', closeModal);
        if (mentionsModal) {
            mentionsModal.addEventListener('click', (e) => {
                if (e.target === mentionsModal) closeModal();
            });
        }

        const bookingModal = document.getElementById('booking-modal');
        if (bookingModal) {
            bookingModal.addEventListener('click', (e) => {
                if (e.target === bookingModal) closeBookingModal();
            });
        }

        const calIframeEl = document.getElementById('cal-booking-iframe');
        if (calIframeEl) {
            calIframeEl.addEventListener('load', () => {
                const skeleton = document.getElementById('cal-loading-skeleton');
                if (skeleton) skeleton.style.opacity = '0';
                injectCalStyles();
                setTimeout(injectCalStyles, 350);
                setTimeout(injectCalStyles, 1000);
            });
        }

        window.addEventListener('message', (e) => {
            if (!e.data || e.data.originator !== 'CAL') return;
            if (e.data.type === '__iframeReady' || e.data.type === 'linkReady' || e.data.type === 'bookerReady') {
                const skeleton = document.getElementById('cal-loading-skeleton');
                if (skeleton) skeleton.style.opacity = '0';
                injectCalStyles();
            }
        });

        // Prewarm Cal.com iframe on idle or first CTA hover so initial page load stays fast
        const prewarmCal = () => ensureCalLoaded();
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(prewarmCal, { timeout: 2500 });
        } else {
            setTimeout(prewarmCal, 1800);
        }

        document.querySelectorAll('[onclick*="openBookingModal"]').forEach((btn) => {
            btn.addEventListener('mouseenter', prewarmCal, { once: true, passive: true });
            btn.addEventListener('touchstart', prewarmCal, { once: true, passive: true });
        });

        // Deep-link auto-open (#booking, #rdv, ?modal=booking, ?view=calendar)
        const searchParams = new URLSearchParams(window.location.search);
        if (
            window.location.hash === '#booking' ||
            window.location.hash === '#rdv' ||
            searchParams.get('modal') === 'booking' ||
            searchParams.get('view') === 'calendar'
        ) {
            setTimeout(openBookingModal, 200);
        }
    }

    // =========================================================================
    // 7. CONTACT FORM SUBMISSION (WEB3FORMS + POSTHOG TELEMETRY)
    // =========================================================================
    async function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target.closest('form') || document.getElementById('contact-form');
        if (!form) return;

        const submitBtn = document.getElementById('form-submit-btn');
        const feedback = document.getElementById('form-feedback');
        const feedbackError = document.getElementById('form-feedback-error');
        const formErrorTitle = document.getElementById('form-error-title');
        const formErrorDesc = document.getElementById('form-error-desc');

        const name = (document.getElementById('form-name')?.value || '').trim();
        const phone = (document.getElementById('form-phone')?.value || '').trim();
        const email = (document.getElementById('form-email')?.value || '').trim();
        const subject = document.getElementById('form-subject')?.value || '';
        const message = (document.getElementById('form-message')?.value || '').trim();

        const sourcePage = form.dataset.sourcePage || 'accueil-cap-atlantique';
        const subjectPrefix = form.dataset.subjectPrefix || 'Demande RDV (Cap Atlantique)';
        const defaultBtnLabel = form.dataset.defaultBtnLabel || 'Demander mon appel découverte gratuit';

        const defaultBtnMarkup = `
            <span>${defaultBtnLabel}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
        `;

        if (feedback) feedback.classList.add('hidden');
        if (feedbackError) feedbackError.classList.add('hidden');

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Envoi en cours...</span>
            `;
        }

        if (window.posthog && typeof window.posthog.capture === 'function') {
            window.posthog.capture('contact_form_submitted', {
                subject,
                source_page: sourcePage,
                has_email: Boolean(email),
                has_message: Boolean(message)
            });
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: `${subjectPrefix} - ${name} (${subject})`,
                    from_name: name,
                    name,
                    telephone: phone,
                    email: email || 'Non renseigné',
                    contexte: subject,
                    message: message || 'Aucun message spécifique',
                    source_page: sourcePage,
                    source_site: 'maurage.fr'
                })
            });

            const result = await response.json();

            if (response.status === 200 && result.success) {
                if (submitBtn) submitBtn.classList.add('hidden');
                if (feedback) feedback.classList.remove('hidden');
                form.reset();

                if (window.posthog && typeof window.posthog.capture === 'function') {
                    window.posthog.capture('contact_form_success', {
                        subject,
                        source_page: sourcePage,
                        has_email: Boolean(email)
                    });
                }
            } else {
                throw new Error(result.message || 'Erreur lors de la transmission');
            }
        } catch (err) {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = defaultBtnMarkup;
            }
            if (formErrorTitle) {
                formErrorTitle.textContent = "Une erreur est survenue lors de l'envoi";
            }
            if (formErrorDesc) {
                formErrorDesc.textContent = 'Veuillez réessayer ou joindre directement Alice au 06 77 15 69 10 ou sur alice@maurage.fr';
            }
            if (feedbackError) feedbackError.classList.remove('hidden');

            if (window.posthog && typeof window.posthog.capture === 'function') {
                window.posthog.capture('contact_form_failed', {
                    source_page: sourcePage,
                    error: String(err)
                });
            }
        }
    }

    // =========================================================================
    // 8. TELEMETRY & INITIALIZATION
    // =========================================================================
    function initTelemetry() {
        document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.posthog && typeof window.posthog.capture === 'function') {
                    window.posthog.capture('phone_call_clicked', {
                        destination: '0677156910',
                        page: window.location.pathname
                    });
                }
            });
        });
    }

    function initApp() {
        initArtisticUnderlines();
        initRevealAnimations();
        initCityTariffDropdown();
        initNavigation();
        initFaqAccordion();
        initModals();
        initTelemetry();
    }

    // Expose globals for inline attributes
    window.openBookingModal = openBookingModal;
    window.closeBookingModal = closeBookingModal;
    window.toggleMobileMenu = toggleMobileMenu;
    window.handleFormSubmit = handleFormSubmit;
    window.switchContactView = switchContactView;
    window.openModal = openModal;
    window.closeModal = closeModal;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
})();
