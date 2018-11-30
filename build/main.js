$(function(){
	var $debug = $( '<div id="debug" style="position:fixed;top:0;left:0;background:black;color:red;font-size:20px;padding:0 10px;"></div>').appendTo('body');
	window._DEBUG = function(v){
		if(v === true){
			$debug.empty();
			return;
		}
		$debug.append('<p>'+v+'</p>');
	}
})

//@prepros-append ../components/page/page.js
//@ prepros-append ../components/yt-player/yt-player.js
//@prepros-append ../components/video-player/video-player.js
//@prepros-append ../components/list-player/list-player.js