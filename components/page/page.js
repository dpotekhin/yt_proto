var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

$(function(){
  
  var $element = $('body');
  if( !$element.length ) return;
  
  // >>> LOAD DATA >>>
  var data_url = $element.data('data');
  console.log('data_url: ', data_url );
  if( !data_url ) {
    console.warn('data url required!');
    return;
  }

  $.getJSON(data_url, function( data ){
    $(window).trigger('page:ready', data );
    console.log("data: ", data );
  });

});