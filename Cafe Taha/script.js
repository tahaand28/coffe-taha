// وقتی سایت لود شد اجرا بشه!
$(document).ready(function () {


    // ------------------------------
    // لودر سایت
    // ------------------------------
    setTimeout(function () {
        $("#loader").fadeOut(500);
    }, 1000);


    // ------------------------------
    // برای لود صفحه و انیمیشن ها
    // ------------------------------
    $(window).on('load', function () {
        $('#loader').fadeOut(500);
        $('.text-box img').addClass('animate__animated animate__fadeInUp').one('animationend', function () {
            $(this).removeClass('animate__fadeInUp');
        });
    });

    // ------------------------------
    // انیمیشن fadeInUp هنگام اسکرول
    // ------------------------------
    $(window).on('scroll', function () {
        $('.Category, .The-best-sellers, .main-banner-2, .most-popular').each(function () {
            var elementTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();

            if (elementTop < windowBottom && !$(this).hasClass('animate__fadeInUp')) {
                $(this).addClass('animate__animated animate__fadeInUp');
            }
        });
    });



    // ------------------------------
    // برای منو در حالت موبایل
    // ------------------------------

    var $toggle = $('#mobile-nav-toggle');
    var $mobileNav = $('#mobile-nav');

    // ساخت overlay
    var $overlay = $('<div class="mobile-nav-overlay"></div>');
    $('body').append($overlay);

    function openMenu() {
        $toggle.addClass('open').attr('aria-expanded', 'true');
        $mobileNav.addClass('open').attr('aria-hidden', 'false');
        $overlay.addClass('open');
    }

    function closeMenu() {
        $toggle.removeClass('open').attr('aria-expanded', 'false');
        $mobileNav.removeClass('open').attr('aria-hidden', 'true');
        $overlay.removeClass('open');
    }

    // کلیک روی دکمه
    $toggle.on('click', function () {
        if ($mobileNav.hasClass('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // کلیک روی بک‌دراپ
    $overlay.on('click', closeMenu);

    // ESC بستن
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && $mobileNav.hasClass('open')) {
            closeMenu();
        }
    });

    // وقتی روی لینک منو کلیک شد
    $mobileNav.on('click', 'a', function () {
        closeMenu();
    });



    // ------------------------------
    // تغییر کلاس navbar هنگام اسکرول
    // ------------------------------
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 50) {
            $("nav").addClass("navbar-hover-mob");
        } else {
            $("nav").removeClass("navbar-hover-mob");
        }
    });



    // باز کردن پنجره
    $(document).on('click', '#openModal', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#myModal').fadeIn(100);
    });

    // بستن پنجره وقتی روی پس‌زمینه کلیک شد
    $(window).click(function (e) {
        if ($(e.target).is('#myModal')) {
            $('#myModal').fadeOut(100);
        }
    });

    // بستن پنجره با ESC
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && $('#myModal').is(':visible')) {
            $('#myModal').fadeOut(100);
        }
    });

    // بستن modal وقتی روی input کلیک شد
    $('#myModal input').on('click', function (e) {
        e.stopPropagation();
    });



    $(function () {

        const $slider = $('#slider');
        const $slidesWrap = $slider.find('.slides');
        const $slides = $slider.find('.slide');
        const total = $slides.length;

        let current = 0;
        let speed = 500;       // سرعت انیمیشن
        let autoplay = true;
        let autoplayTime = 3000;
        let timer = null;

        // ساخت دات‌ها
        const $dots = $slider.find('.dots');
        for (let i = 0; i < total; i++) {
            $dots.append(`<button data-i="${i}"></button>`);
        }
        const $dot = $dots.find("button");

        // به‌روزرسانی دات فعال
        function updateDots() {
            $dot.removeClass("active").eq(current).addClass("active");
        }

        // رفتن به اسلاید
        function goTo(i) {
            if (i < 0) i = total - 1;
            if (i >= total) i = 0;

            current = i;

            $slidesWrap.css("transform", `translateX(-${current * 100}%)`);
            updateDots();
        }

        // دکمه‌ها
        $(".next").click(function () {
            goTo(current + 1);
            resetAutoplay();
        });

        $(".prev").click(function () {
            goTo(current - 1);
            resetAutoplay();
        });

        // کلیک روی دات
        $dot.click(function () {
            let i = $(this).data("i");
            goTo(i);
            resetAutoplay();
        });

        // autoplay
        function start() {
            if (!autoplay) return;
            stop();
            timer = setInterval(() => goTo(current + 1), autoplayTime);
        }
        function stop() {
            clearInterval(timer);
        }
        function resetAutoplay() {
            stop();
            start();
        }

        // توقف با hover
        $slider.on("mouseenter", stop);
        $slider.on("mouseleave", start);

        // شروع اولیه
        goTo(0);
        start();

    });



});

// ------------------------------
// اسکرول نرم
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const lenis = new Lenis({
        lerp: 0.070,
        smoothWheel: true,
    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
});


