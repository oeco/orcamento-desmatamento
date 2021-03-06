function isMobileSafari() {
	return navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/);
}

$(document).ready(function() {

	/*
	 * Mobile nav
	 */
	$('#masthead nav.mobile .label').on('click', function() {
		var $content = $(this).parents('nav.mobile');
		if($content.is('.active')) {
			$content.removeClass('active');
		} else {
			$content.addClass('active');
		}
	});

	$('#masthead nav.mobile a').on('click', function() {
		$(this).parents('nav.mobile').removeClass('active');
	});

	/*
	 * IOS class
	 */
	if(isMobileSafari()) {
		$('body').addClass('ios');
	}


	/*
	 * Fixed timeline
	 */

	var timelineHeight = $('#timeline-nav').height();

	$(window).scroll(function() {

		if($(window).width() > 770) {

			var offset = $(window).height() - $(window).scrollTop() - timelineHeight - 40;

			if(offset <= 0) {
				$('#mastfoot').addClass('fixed');
				$('#timeline-nav').addClass('fixed');
			} else {
				$('#mastfoot').removeClass('fixed');
				$('#timeline-nav').removeClass('fixed');
			}
		}

	});

	var resize = function() {
		var width = $(window).width(),
		ratio = 16/9,
		pWidth, // player width, to be defined
		height = $(window).height(),
		pHeight, // player height, tbd
		$player = $('#video');

		// when screen aspect ratio differs from video, video must center and underlay one dimension

		if (width / ratio < height) { // if new video height < window height (gap underneath)
			pWidth = Math.ceil(height * ratio); // get new player width
			$player.width(pWidth).height(height).css({left: (width - pWidth) / 2, top: 0}); // player width is greater, offset left; reset top
		} else { // new video width < window width (gap to right)
			pHeight = Math.ceil(width / ratio); // get new player height
			$player.width(width).height(pHeight).css({left: 0, top: (height - pHeight) / 2}); // player height is greater, offset top; reset left
		}

		if($('#timeline-nav').hasClass('fixed')) {
			$(window).scrollTop($(window).height());
		}

	}

	$(window).resize(resize).resize();
});