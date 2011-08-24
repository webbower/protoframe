;(function($, undefined) {
	if(!window.WF) WF = {};

	$.extend(WF, {
		Tabs: {
			init: function() {
				var
					self = this,
					roots = $('.tabs'),
					hash = location.hash
				;
				
				// Loop over each tab root...
				roots.each(function() {
					$(this)
						// Hook up click event to tabs
						.delegate('.tab-strip a', 'click', function(ev) {
							ev.preventDefault();
							
							var $tab = $(this) ;
							
							// If the tab clicked on isn't the currently active one, show the tab
							if(!$tab.hasClass('active')) $tab.trigger('tabs.show', $tab.attr('href'));
						})
						// Use EOA for the tabs to handle the showing method
						.bind('tabs.show', self.showTab)
						// Show the default tab
						.trigger('tabs.show', hash.length > 1 ? hash : $parent.find('.tab-strip a').first().attr('href'))
					;
				});
			},
			
			showTab: function(ev, id) {
				$(this)
					.find('.tab-panel.active, .tab-strip .active').removeClass('active').end()
					.find('.tab-strip a[href="'+id+'"], ' + id).addClass('active')
				;
			} // END Tabs
		},
		
		Slideshow: {
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
		}
		
	});
	
	// READY
	$(function() {
		$(document.documentElement).toggleClass('no-js js');
		
		WF.Tabs.init();

		WF.Slideshow.init();
		
	});
})(jQuery);