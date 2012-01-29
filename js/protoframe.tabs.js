; (function($) {

	PF.Tabs = function(el, opts) {
		return PF.Tabs.prototype.init(el, opts); 
	};

	$.extend(PF.Tabs, {
		defaults: {
			
		}
	});

	$.extend(PF.Tabs.prototype, {
		/*
			API:
			data-tabs-content-src: URL to AJAX load tab content (.tab-panel)
			data-tabs-show: Activate a tab on a tab set #id[idx] (*)
		*/
		constructor: PF.Tabs,
		element: null,
		_activeTab: null,
		_activePanel: null,
		init: function(el, opts) {
			var
				self = this,
				$root = $(el),
				hash = location.hash
			;
			
			this.element = $root;
			
			$root
				// Use EOA for the tabs to handle the showing method
				.on('show.tabs', function(ev, id) {
					self.showTab(id);
				})
				
				.on('destroy.tabs', function(ev) {
					self.destroy();
				})

				// Hook up click event to tabs
				.on('click.tabs', '.tab-strip a', function(ev) {
					ev.preventDefault();
						
					var
						$tab = $(this)
					;
						
					// If the tab clicked on isn't the currently active one, show the tab
					if(this !== self._activeTab[0])
						$root.triggerHandler('show.tabs', $tab.attr('href'));
				})
				// Show the default tab
				.triggerHandler('show.tabs', hash.length > 1 ? hash : $root.find('.tab-strip a').first().attr('href'))
			;

			$(el).widget('Tabs', this);
			
			return self;
		},
			
		showTab: function(id) {
			var
				self = this,
				$root = self.element
			;
			
			if(self._activeTab && self._activeTab[0])
				self._activeTab.add(self._activePanel).removeClass('active');
			
			self._activeTab = $root.find('.tab-strip a[href="'+id+'"]');
			self._activePanel = $root.find(id);

			self._activeTab.add(self._activePanel).addClass('active');
		},
		
		destroy: function() {
			this.element.off('.tabs');
			this._activePanel = null;
			this._activeTab = null;
			
			this.element.widget('Tabs', 'destroy');
		}
	});

	$.fn.extend({
		tabs: function(opts) {
			return this.each(function() {
				PF.Tabs(this, opts);
			});
		}
	});

})(jQuery);