jQuery(document).ready(function($){

	$('.js_select').selectric();

	scrollToAnimation();

	$(document).on('click', '.js_service__info', function (e){
		serviceTooltip.call(e.currentTarget);
	});

});

function serviceTooltip() {
	var $thisEl = $(this);

	var block = {
		offsetX:		$thisEl.offset().left,
		width:			$thisEl.outerWidth(),
		parentWidth:	$thisEl.parent().width(),
		siblingOffsetX: $thisEl.siblings().offset().left,
		tooltip:		{
			el:			$thisEl.find('.service__info'),
			isShow:		!!(+$thisEl.find('.service__info').css('opacity'))
		}
	};

	hideAllTooltips();

	block.position = (block.offsetX > block.parentWidth / 2) ? 'left' : 'right';
	block.tooltip.el.css('width' , block.parentWidth / 2 );
	if (block.position == 'right') {
		block.tooltip.el.css(block.position, -block.parentWidth / 2);
	} else {
		block.tooltip.el.css(block.position, -(block.parentWidth - block.width));
	}

	triggerTooltip();




	function triggerTooltip() {
		if (!block.tooltip.isShow) {
			showTooltip();
		} else {
			hideTooltip();
		}
	}

	function showTooltip() {
		$thisEl.addClass('js_active');
		block.tooltip.el.css({
			'opacity': '1',
			'z-index': '2'
		});
	}

	function hideTooltip() {
		$thisEl.removeClass('js_active');
		block.tooltip.el.css({
			'opacity': '0',
			'z-index': '-1'
		});
	}

	function hideAllTooltips() {

		$('.service__info').each(function () {
			$(this).parents('.js_service__info').removeClass('js_active');
			$(this).css({
				'opacity': '0',
				'z-index': '-1'
			});
		})
	}

}

function scrollToAnimation() {
	$('a[href*="#"]:not([href="#"])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top + $(target).css('margin-top')
				}, 1000);
				return false;
			}
		}
	});
}
