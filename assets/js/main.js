// Language persistence
(function() {
  var supportedLangs = ['en', 'ar'];
  var storedLang = localStorage.getItem('preferred_lang');
  var currentLang = 'en'; // default
  
  // Set initial language from localStorage or browser default
  if (storedLang && supportedLangs.indexOf(storedLang) !== -1) {
    currentLang = storedLang;
  } else {
    var browserLang = navigator.language.slice(0, 2);
    if (supportedLangs.indexOf(browserLang) !== -1) {
      currentLang = browserLang;
    }
  }
  
  // Apply language to page
  applyLanguage(currentLang);
  
  // Handle language change
  var langSelector = document.getElementById('lang-selector');
  if (langSelector) {
    langSelector.value = currentLang;
    langSelector.addEventListener('change', function(e) {
      var newLang = e.target.value;
      localStorage.setItem('preferred_lang', newLang);
      applyLanguage(newLang);
    });
  }
  
  function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    // Hide all language content
    var allContent = document.querySelectorAll('.lang-content');
    allContent.forEach(function(el) {
      el.style.display = 'none';
    });
    
    // Show only selected language
    var selectedContent = document.querySelectorAll('.lang-' + lang);
    selectedContent.forEach(function(el) {
      el.style.display = 'block';
    });
    
    // Update direction for RTL languages
    if (lang === 'ar') {
      document.body.style.direction = 'rtl';
    } else {
      document.body.style.direction = 'ltr';
    }
  }
})();

$(document).ready(function() {
  // Slick JS
  var arrowsContainer = $("#arrows-container");
  $('.slick').slick({
    dots: true,
    arrows: false
  });

  $('.slick-slide-to-next').on("click", function() {
    $('.slick').slick('slickNext');
  });

  $('.slick-post-hero-image').slick({
    dots: true,
    arrows: true
  });

  // Slide down menu
  $(".site-header-menu-button").on("click", function(e) {
    e.preventDefault();
    var slideMenu = $(".slide-menu");
    if ( $(slideMenu).hasClass("slide-menu-show") ) {
      $(slideMenu).removeClass("slide-menu-show");
    }
    else {
      $(slideMenu).addClass("slide-menu-show");  
    }
  });
});
