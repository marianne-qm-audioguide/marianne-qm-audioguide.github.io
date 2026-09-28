// Language persistence
(function() {
  var supportedLangs = ['en', 'ar']; // Add your language codes
  var storedLang = localStorage.getItem('preferred_lang');
  
  // Set initial language from localStorage or browser default
  if (storedLang && supportedLangs.indexOf(storedLang) !== -1) {
    document.documentElement.lang = storedLang;
    document.getElementById('lang-selector').value = storedLang;
  } else {
    var browserLang = navigator.language.slice(0, 2);
    if (supportedLangs.indexOf(browserLang) !== -1) {
      document.documentElement.lang = browserLang;
      document.getElementById('lang-selector').value = browserLang;
    }
  }
  
  // Handle language change
  document.getElementById('lang-selector').addEventListener('change', function(e) {
    var newLang = e.target.value;
    localStorage.setItem('preferred_lang', newLang);
    document.documentElement.lang = newLang;
    
    // Optional: reload page to apply language-specific content
    // location.reload();
    
    // Or: dynamically swap text content (see Step 3)
    applyLanguage(newLang);
  });
})();

$(document).ready(function() {

  // Slick JS

  var arrowsContainer = $("#arrows-container");
  $('.slick').slick({
    dots: true,
    //appendArrows: arrowsContainer
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

    //$(".slide-menu").slideToggle();
    
    var slideMenu = $(".slide-menu");
    if ( $(slideMenu).hasClass("slide-menu-show") ) {
      $(slideMenu).removeClass("slide-menu-show");
    }
    else {
      $(slideMenu).addClass("slide-menu-show");  
    }
    
  });

});
