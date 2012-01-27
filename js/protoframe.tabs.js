; (function($) {

	window.PF.Tabs = {
		/*
			API:
			data-tabs-content-src: URL to AJAX load tab content (.tab-panel)
			data-tabs-show: Activate a tab on a tab set #id[idx] (*)
		*/
		init: function() {
			var
				self = this,
				roots = $('.tabs'),
				hash = location.hash
			;

			// Loop over each tab root...
			roots.each(function() {
				var
					$parent = $(this)
				;
				$parent
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
	};

})(jQuery);