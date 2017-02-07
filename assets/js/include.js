jQuery(document).ready(function ($) {

	$('.js_select').selectric();

	$(document).on('click', '.js_service__info', function (e) {
		serviceTooltip.call(e.currentTarget);
	});

	$(document).on('click', '.burger', function () {
		mobileNav.toggle();
	});

	$(document).keyup(function(a) // esc btn
	{
		if ((a.keyCode == 27) && ($(modalVideo.className).hasClass(modalVideo.activeClass))) {
			modalVideo.close();
		} else if ((a.keyCode == 27) && ($(mobileNav.className).hasClass(mobileNav.activeClass))) {
			mobileNav.close();
		}
	});


});

jQuery(window).load(function () {
	scrollToAnimation();
	mobileNav.init('.header__menu');
	modalVideo.init();
});

function serviceTooltip() {
	var $thisEl = $(this);

	var block = {
		offsetX: $thisEl.offset().left,
		width: $thisEl.outerWidth(),
		parentWidth: $thisEl.parents('.wrap').width(),
		siblingOffsetX: $thisEl.parent().siblings().offset().left,
		helperClasses: 's-right s-left s-center',
		tooltip: {
			el: $thisEl.find('.service__info'),
			isShow: !!(+$thisEl.find('.service__info').css('opacity'))
		}
	};

	hideAllTooltips();

	if (!(block.width*2 > block.parentWidth)) {
		block.position = (block.offsetX > block.parentWidth / 2) ? 's-right' : 's-left';
	} else {
		block.position = 's-center';
	}

	// clear classes and add current
	block.tooltip.el.removeClass(block.helperClasses).addClass(block.position);
	$thisEl.removeClass(block.helperClasses).addClass(block.position);

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
		if ($(this).parents('.mobile-nav').length) {
			mobileNav.close();
		}
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
	className: '.mobile-nav',
	mobileMenuClassName: '.mobile-nav__menu',
	activeClass: 'open',
	init: function (mainMenuClassName) {
		if (!$(this.mobileMenuClassName).children().length) {
			$(mainMenuClassName).children().clone().prependTo(this.mobileMenuClassName);
		}
	},
	open: function () {
		$(this.className).addClass(this.activeClass);
	},
	close: function () {
		$(this.className).removeClass(this.activeClass);
	},
	toggle: function () {
		$(this.className).hasClass(this.activeClass) ? this.close() : this.open();
	}
};

var modalVideo = {
	$self: $(this),
	className: '.modal__video',
	linkClassName: '.modal__link',
	modalBtn: '.modal__close',
	activeClass: 'open',
	init: function () {
		$(document).on('click', this.linkClassName, function () {modalVideo.open($(this).data('url'));});
		$(document).on('click', this.modalBtn, function () {modalVideo.close();});
	},
	open: function (data_url) {
		$(this.className).addClass(this.activeClass);

		data_url = modalVideo.youtubeParser(data_url);
		data_url = "http://www.youtube.com/embed/" + data_url + '?autoplay=1';

		$(this.className).prepend($("<iframe />")
			.attr({ width: '100%', height:'100%', src: data_url, frameborder: 0, "allowfullscreen": "" }));
	},
	close: function () {
		$(this.className).removeClass(this.activeClass);
		$(this.className).find('iframe').remove();
	},
	toggle: function () {
		$(this.className).hasClass(this.activeClass) ? this.close() : this.open();
	},
	youtubeParser: function(url){
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = url.match(regExp);
		return (match&&match[7].length==11)? match[7] : false;
	}
};
