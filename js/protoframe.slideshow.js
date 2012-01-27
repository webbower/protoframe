; (function($) {

	window.PF.Slideshow = {
		init: function() {
			var
				self = this,
				roots = $('.slideshow')
			;
				
			roots.each(function() {
				var
					$parent = $(this),
					slideCount = $parent.find('.slides img').length
				;
				$parent
					// Slideshow controls
					.delegate('.prev', 'click', function(ev) {
						ev.preventDefault();
					})
					.delegate('.next', 'click', function(ev) {
						ev.preventDefault();
					})
					.delegate('a:not(.prev):not(.next)', 'click', function(ev) {
						ev.preventDefault();
					})
					.bind('slides.show', function(ev, index) {})
					.trigger('slides.show', 1)
				;
			});
		},
			
		showSlide: function() {},
			
		buildUI: function() {}
	};

})(jQuery);
