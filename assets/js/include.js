jQuery(document).ready(function($){

	$('.js_select').selectric();

	$(document).on('click', '.js_service__info', function (e){
		serviceTooltip.call(e.currentTarget);
	});

	$(document).on('click', '.burger', function(){
		mobileNav.toggle();
	});

});

jQuery(window).load(function() {
	scrollToAnimation();
	mobileNav.init('.header__menu');
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
	$(document).on('click', 'a[href*="#"]:not([href="#"])', function () {
		if ($(this).parents('.mobile-nav').length) { mobileNav.close(); }
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
}

var mobileNav = {
	mobileClassName: '.mobile-nav',
	mobileMenuClassName: '.mobile-nav__menu',
	activeClass: 'open',
	init: function (mainMenuClassName) {
		if (!$(this.mobileMenuClassName).children().length) {
			$(mainMenuClassName).children().clone().prependTo(this.mobileMenuClassName);
		}
	},
	open: function() {
		$(this.mobileClassName).addClass(this.activeClass);
	},
	close: function() {
		$(this.mobileClassName).removeClass(this.activeClass);
	},
	toggle: function() {
		$(this.mobileClassName).hasClass(this.activeClass) ? this.close() : this.open();
	}
};
