$(document).ready(function(){
	var view = $(window),
		html = $('html'),
		body = $('body');
	$('ul#skills').addClass("ready");
	$('ul#skills li').each(function(){
		var i = $(this).index();
		$(this).delay(100 * i).animate({right:"0%"},1000,function(){
			$(this).children('span').fadeIn(600);
		});	
	});
	$('#titleName, #socialIcons').clone().appendTo('#sticker');
	function responsive(){
		if(view.width() < 820){
			body.addClass('respond');
		} else {
			body.removeClass('respond');
		}
	}
	responsive();
	view.scroll(function(){
		if(view.scrollTop() > 140){
			$('#sticker').stop().animate({top:"0"},500);
		} else {
			$('#sticker').stop().animate({top:"-60px"},500);
		}
		var scrollPosition = $(window).scrollTop() * .25;
		body.css({backgroundPosition:'0px -'+scrollPosition+'px'});
	});
	view.resize(function(){ responsive(); });
	view.load(function(){ responsive(); });	 
});