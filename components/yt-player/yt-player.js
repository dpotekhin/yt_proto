$(function(){
  
  var $element = $('.yt-player');
  if( !$element.length ) return;

  console.log('yt-player init');
  
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  //
  var $yt_container = $( '.yt-player__container', $element );
  var $win = $(window);
  var player;
  var current_video_id;
  var is_playing = false;
  var current_end;

  setVisibility( false, 0 );
  // var done = false;


  window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player( $yt_container[0], {
      height: '100%',
      width: '100%',
      // videoId: '',
      playerVars: {
      	autoplay: 0,
      	controls: 0,
      	disablekb: 1,
      	modestbranding: 1,
      	playsinline: 1,
      	rel: 0,
      	showinfo: 0,
      	enablejsapi: 1,
      	// start: ,
      	// end: ,
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    $yt_container = $( '.yt-player__container', $element );
  	console.log('YT player is ready!', player);

  	setInterval(function(){
	  	if( !is_playing || !current_end ) return;
	  	// console.log('>', player.getCurrentTime() );
	  	if( current_end && player.getCurrentTime() >= current_end ){
	  		stopPlayback();
	  		player.stopVideo();
	  	}
	  }, 40 );

  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
  	console.log('player! onPlayerReady');
    // event.target.playVideo();
    $win.trigger('yt-player:ready');
    // playNext();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  
  function onPlayerStateChange(event) {
  	console.log('player! onPlayerStateChange', event, YT.PlayerState );
  	switch( event.data ){
  		
  		case YT.PlayerState.UNSTARTED:
  			is_playing = false;
  			break;

  		case YT.PlayerState.PLAYING:
  			is_playing = true;
  			setVisibility(true);
  			break;

  		case YT.PlayerState.ENDED:
  			if( is_playing ){
  				stopPlayback();
	  		}
  			break;
  	}
    // if (event.data == YT.PlayerState.PLAYING) {
      // setTimeout(stopVideo, 6000);
      // done = true;
    // }
  }

  function stopVideo() {
    player.stopVideo();
  }

  //

  function stopPlayback(){
  	is_playing = false;
		setVisibility(false);
		$win.trigger('yt-player:finished');
  }

  function setVisibility( _on, _time ){
  	console.log("setVisibility", _on );
  	// $('iframe', $element ).css('visibility', _on ? 'visible' : 'hidden' );
  	if( _on ) $yt_container.show();
  	else $yt_container.hide();
  }

  $win.on('yt-player:play-by-id', function(e,o){
  	current_video_id = o.videoId;
  	current_end = o.endSeconds;
  	player.loadVideoById(o);
  });

});