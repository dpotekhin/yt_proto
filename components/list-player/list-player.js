$(window).on('page:ready', function(e,_main_data){

	var $element = $('.list-player');
  if( !$element.length ) return;

	var $win = $(window);
	var $buttons = $('.list-player__buttons', $element );
	var main_data = _main_data;
	var preload_count = 0;
	var current_video_index = -1;
	var current_video_object;

	$buttons.hide().addClass('list-player__buttons_hidden');

	// $win.on('page:ready', function(e,_main_data){
	// 	main_data = _main_data;
	// 	// checkPreload();
	// });

	// preload_count++;
	// $win.on('yt-player:ready', function(e){
	// 	checkPreload();
	// });
	
	start();

	function checkPreload(){
		preload_count--;
		if( preload_count <= 0 ){
			console.log("all's set");
			start();
		}
	}

	function start(){
		// _DEBUG('start');
		showButtons([{
			title: "Start",
			click: playNext
		}]);
		// playNext();
	}
	

	function playNext( id ){

  	console.log("playNext: ", main_data );
  	if( id != undefined ){
  		main_data.videos.forEach(function(e,i){
  			// console.log('>', i, e.id, id, e.id == id );
  			if( e.id == id ) current_video_index = i;
  		});
  	}else{
	  	current_video_index++;
	  }
  	current_video_object = main_data.videos[ current_video_index ];
  	console.log("playNext: ", current_video_index, current_video_object );

  	/*
  	$win.trigger('yt-player:play-by-id', {
  		videoId: current_video_object.yt_video_id,
			startSeconds: current_video_object.start,
			endSeconds: current_video_object.end,
			suggestedQuality: 'large'
		});
		*/

		$win.trigger('video-player:play', current_video_object );

  }
	

	$win.on('video-player:finished', function(e){
		
		console.log("FINISHED");
		showButtons( current_video_object.buttons );
		
	});

	function showButtons( _buttons ){
		_buttons.forEach(function(e,i){
			console.log('btn', e, i );
			$(`<div class="select-button" data-video-id="${e.video_id}">${e.title}<div>`)
				.appendTo($buttons)
				.click(function(){
					if( e.click ) {
						e.click();
					}else{
						var $e = $(this);
						playNext( $e.data('video-id') );
					}
					hideButtons();
				})
			;
		});
		$buttons.show().removeClass('list-player__buttons_hidden');
	}

	function hideButtons(){
		$buttons.addClass('list-player__buttons_hidden');
		setTimeout(function(){
			$buttons.empty().hide();
		}, 400);
	}

});
