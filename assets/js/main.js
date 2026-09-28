// Language persistence - FIXED VERSION
$(document).ready(function() {
  console.log('[LANG] Document ready, initializing...');
  
  var supportedLangs = ['en', 'ar'];
  var storedLang = localStorage.getItem('preferred_lang');
  var currentLang = 'en'; // default
  
  // Create debug panel
  var debugPanel = document.createElement('div');
  debugPanel.id = 'debug-panel';
  debugPanel.style.cssText = 'position: fixed; bottom: 10px; left: 10px; background: #000; color: #0f0; padding: 10px; font-size: 12px; z-index: 9999; font-family: monospace; max-width: 400px; max-height: 300px; overflow: auto;';
  debugPanel.innerHTML = '<strong>DEBUG:</strong><br>';
  document.body.appendChild(debugPanel);
  
  function debug(msg) {
    debugPanel.innerHTML += msg + '<br>';
    console.log('[LANG DEBUG]', msg);
  }
  
  debug('supportedLangs: ' + supportedLangs.join(', '));
  debug('storedLang from localStorage: ' + storedLang);
  
  // Set initial language from localStorage or browser default
  if (storedLang && supportedLangs.indexOf(storedLang) !== -1) {
    currentLang = storedLang;
    debug('Using stored lang: ' + currentLang);
  } else {
    var browserLang = navigator.language.slice(0, 2);
    debug('Browser lang: ' + browserLang);
    if (supportedLangs.indexOf(browserLang) !== -1) {
      currentLang = browserLang;
      debug('Using browser lang: ' + currentLang);
    } else {
      debug('Using default lang: en');
    }
  }
  
  debug('Final currentLang: ' + currentLang);
  debug('document.documentElement.lang: ' + document.documentElement.lang);
  
  // Check if lang-selector exists
  var langSelector = document.getElementById('lang-selector');
  if (!langSelector) {
    debug('ERROR: #lang-selector not found in DOM!');
    debugPanel.innerHTML += '<strong style="color: red;">ERROR: Language selector not found!</strong><br>';
  } else {
    debug('Found #lang-selector, value: ' + langSelector.value);
    langSelector.value = currentLang;
    debug('Set #lang-selector value to: ' + currentLang);
    
    langSelector.addEventListener('change', function(e) {
      var newLang = e.target.value;
      debug('Language changed to: ' + newLang);
      localStorage.setItem('preferred_lang', newLang);
      applyLanguage(newLang);
    });
  }
  
  // Check for language content
  var enContent = document.querySelectorAll('.lang-en');
  var arContent = document.querySelectorAll('.lang-ar');
  debug('Found .lang-en elements: ' + enContent.length);
  debug('Found .lang-ar elements: ' + arContent.length);
  
  // Apply language to page
  applyLanguage(currentLang);
  
  function applyLanguage(lang) {
    debug('applyLanguage called with: ' + lang);
    currentLang = lang;
    document.documentElement.lang = lang;
    debug('Set documentElement.lang to: ' + lang);
    
    // Hide all language content
    var allContent = document.querySelectorAll('.lang-content');
    debug('Hiding all .lang-content elements (' + allContent.length + ' found)');
    allContent.forEach(function(el, index) {
      el.style.display = 'none';
      debug('Hidden element ' + index + ': ' + el.className);
    });
    
    // Show only selected language
    var selectedContent = document.querySelectorAll('.lang-' + lang);
    debug('Showing .lang-' + lang + ' elements (' + selectedContent.length + ' found)');
    selectedContent.forEach(function(el, index) {
      el.style.display = 'block';
      debug('Shown element ' + index + ': ' + el.className);
    });
    
    // Update direction for RTL languages
    if (lang === 'ar') {
      document.body.style.direction = 'rtl';
      debug('Set body direction: rtl');
    } else {
      document.body.style.direction = 'ltr';
      debug('Set body direction: ltr');
    }
    
    debugPanel.innerHTML += '<strong>Current language: ' + lang + '</strong><br>';
  }
  
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
