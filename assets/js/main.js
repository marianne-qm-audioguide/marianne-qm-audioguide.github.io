$(document).ready(function() {
  console.log('[LANG] Document ready, initializing...');
  
  var supportedLangs = ['en', 'ar'];
  
  // ALWAYS read from localStorage first on every page load
  var storedLang = localStorage.getItem('preferred_lang');
  var currentLang = 'en'; // default fallback
  
  console.log('[LANG] storedLang:', storedLang);
  
  if (storedLang && supportedLangs.indexOf(storedLang) !== -1) {
    currentLang = storedLang;
    console.log('[LANG] Using stored lang:', currentLang);
  } else {
    // Only use browser lang if no stored preference
    var browserLang = navigator.language.slice(0, 2);
    if (supportedLangs.indexOf(browserLang) !== -1) {
      currentLang = browserLang;
    }
    console.log('[LANG] Using fallback lang:', currentLang);
  }
  
  // Check if lang-selector exists
  var langSelector = document.getElementById('lang-selector');
  if (!langSelector) {
    console.error('[LANG] ERROR: #lang-selector not found in DOM!');
  } else {
    console.log('[LANG] Found #lang-selector');
    // Set the selector to match currentLang
    langSelector.value = currentLang;
    console.log('[LANG] Set #lang-selector value to: ' + currentLang);
    
    langSelector.addEventListener('change', function(e) {
      var newLang = e.target.value;
      console.log('[LANG] Language changed to: ' + newLang);
      localStorage.setItem('preferred_lang', newLang);
      console.log('[LANG] Saved to localStorage: ' + newLang);
      applyLanguage(newLang);
    });
  }
  
  // Check for language content
  var enContent = document.querySelectorAll('.lang-en');
  var arContent = document.querySelectorAll('.lang-ar');
  console.log('[LANG] Found .lang-en elements: ' + enContent.length);
  console.log('[LANG] Found .lang-ar elements: ' + arContent.length);
  
  // Apply language to page
  applyLanguage(currentLang);
  
  function applyLanguage(lang) {
    console.log('[LANG] applyLanguage called with:', lang);
    currentLang = lang;
    document.documentElement.lang = lang;
    
    // Hide all language content
    var allContent = document.querySelectorAll('.lang-content');
    console.log('[LANG] Hiding all .lang-content elements (' + allContent.length + ' found)');
    allContent.forEach(function(el) {
      el.style.display = 'none';
    });
    
    // Show only selected language
    var selectedContent = document.querySelectorAll('.lang-' + lang);
    console.log('[LANG] Showing .lang-' + lang + ' elements (' + selectedContent.length + ' found)');
    selectedContent.forEach(function(el) {
      el.style.display = 'block';
    });
    
    // Update direction for RTL languages
    if (lang === 'ar') {
      document.body.style.direction = 'rtl';
      document.body.style.textAlign = 'right';
    } else {
      document.body.style.direction = 'ltr';
      document.body.style.textAlign = 'left';
    }
    
    // === AUDIO SWITCHING WITH DEBUG ===
    var audioEn = document.getElementById('audio-en');
    var audioAr = document.getElementById('audio-ar');
    var jplayer = $('#jquery_jplayer_1');
    
    console.log('[LANG] audio-en exists: ' + (audioEn !== null));
    console.log('[LANG] audio-ar exists: ' + (audioAr !== null));
    console.log('[LANG] jplayer exists: ' + (jplayer.length > 0));
    
    if (lang === 'ar' && audioAr) {
      var newAudioSrc = audioAr.querySelector('source').src;
      console.log('[LANG] SWITCHING TO ARABIC audio: ' + newAudioSrc);
      
      if (jplayer.length) {
        console.log('[LANG] jPlayer found, attempting to set media...');
        try {
          jplayer.jPlayer('setMedia', {
            mp3: newAudioSrc
          });
          console.log('[LANG] Media set successfully');
          jplayer.jPlayer('play');
          console.log('[LANG] Play command sent');
        } catch(e) {
          console.error('[LANG] ERROR switching audio: ' + e.message);
        }
      } else {
        console.error('[LANG] ERROR: jPlayer not found!');
      }
    } else if (lang === 'en' && audioEn) {
      var newAudioSrc = audioEn.querySelector('source').src;
      console.log('[LANG] SWITCHING TO ENGLISH audio: ' + newAudioSrc);
      
      if (jplayer.length) {
        console.log('[LANG] jPlayer found, attempting to set media...');
        try {
          jplayer.jPlayer('setMedia', {
            mp3: newAudioSrc
          });
          console.log('[LANG] Media set successfully');
          jplayer.jPlayer('play');
          console.log('[LANG] Play command sent');
        } catch(e) {
          console.error('[LANG] ERROR switching audio: ' + e.message);
        }
      } else {
        console.error('[LANG] ERROR: jPlayer not found!');
      }
    }
    
    console.log('[LANG] Current language set to: ' + lang);
  }
  
  // Slick JS
  var arrowsContainer = $("#arrows-container");
  if (arrowsContainer.length) {
    $('.slick').slick({
      dots: true,
      arrows: false
    });

    $('.slick-slide-to-next').on("click", function() {
      $('.slick').slick('slickNext');
    });
  }

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
