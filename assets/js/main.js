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
  debug('currentLang after check: ' + currentLang);
  
  // Check if lang-selector exists
  var langSelector = document.getElementById('lang-selector');
  if (!langSelector) {
    debug('ERROR: #lang-selector not found in DOM!');
  } else {
    debug('Found #lang-selector');
    // Set the selector to match currentLang
    langSelector.value = currentLang;
    debug('Set #lang-selector value to: ' + currentLang);
    
    langSelector.addEventListener('change', function(e) {
      var newLang = e.target.value;
      debug('Language changed to: ' + newLang);
      localStorage.setItem('preferred_lang', newLang);
      debug('Saved to localStorage: ' + newLang);
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
  console.log('[LANG] applyLanguage called with:', lang);
  currentLang = lang;
  document.documentElement.lang = lang;
  
  // Hide all language content
  var allContent = document.querySelectorAll('.lang-content');
  debug('Hiding all .lang-content elements (' + allContent.length + ' found)');
  allContent.forEach(function(el) {
    el.style.display = 'none';
  });
  
  // Show only selected language
  var selectedContent = document.querySelectorAll('.lang-' + lang);
  debug('Showing .lang-' + lang + ' elements (' + selectedContent.length + ' found)');
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
  
  debug('audio-en exists: ' + (audioEn !== null));
  debug('audio-ar exists: ' + (audioAr !== null));
  debug('jplayer exists: ' + (jplayer.length > 0));
  
  if (lang === 'ar' && audioAr) {
    var newAudioSrc = audioAr.querySelector('source').src;
    debug('SWITCHING TO ARABIC audio: ' + newAudioSrc);
    
    if (jplayer.length) {
      debug('jPlayer found, attempting to set media...');
      try {
        jplayer.jPlayer('setMedia', {
          mp3: newAudioSrc
        });
        debug('Media set successfully');
        jplayer.jPlayer('play');
        debug('Play command sent');
      } catch(e) {
        debug('ERROR switching audio: ' + e.message);
      }
    } else {
      debug('ERROR: jPlayer not found!');
    }
  } else if (lang === 'en' && audioEn) {
    var newAudioSrc = audioEn.querySelector('source').src;
    debug('SWITCHING TO ENGLISH audio: ' + newAudioSrc);
    
    if (jplayer.length) {
      debug('jPlayer found, attempting to set media...');
      try {
        jplayer.jPlayer('setMedia', {
          mp3: newAudioSrc
        });
        debug('Media set successfully');
        jplayer.jPlayer('play');
        debug('Play command sent');
      } catch(e) {
        debug('ERROR switching audio: ' + e.message);
      }
    } else {
      debug('ERROR: jPlayer not found!');
    }
  }
  // ===================================
  
  debugPanel.innerHTML += '<strong>Current language: ' + lang + '</strong><br>';
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
