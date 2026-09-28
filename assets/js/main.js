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
