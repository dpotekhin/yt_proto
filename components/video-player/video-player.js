$(function(){
  
  var $element = $('.video-player');
  if( !$element.length ) return;

  //
  var $win = $(window);
  var player;
  var current_video_id;
  var is_playing = false;
  var current_start;
  var current_end;

  var video = $( 'video', $element )[0];
 	enableInlineVideo(video);
 	video.addEventListener('loadedmetadata', function() {
	  video.currentTime = current_start;
	}, false);

  console.log('video-player init', video );

  $win.on('video-player:play', function(e,o){
  	console.log('@video-player:play', o );
  	current_end = o.end;
  	video.src = o.url;
  	current_start = o.start || 0;
  	video.play();
  	is_playing = true;
  	// player.loadVideoById(o);
  });

  setInterval(function(){
  	if( !is_playing || !current_end ) return;
  	// console.log('>', video.currentTime );
  	_DEBUG( true );
  	_DEBUG( ~~video.currentTime );
  	if( current_start && video.currentTime < current_start -1 ){
  		video.currentTime = current_start;
  	}
  	if( current_end && video.currentTime >= current_end ){
  		stopPlayback();
  	}
  }, 40 );

  function stopPlayback(){
  	is_playing = false;
  	video.pause();
		// setVisibility(false);
		$win.trigger('video-player:finished');
  }

  $win.trigger('video-player:ready');

});