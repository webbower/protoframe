; (function($) {
	
var _parent = $.pf.widget;
	
$.widget('pf.tabs', _parent, {
	// Default options
	options: {
		events: {
			'.tab-strip a click': function(ev) {
				ev.preventDefault();
				var
					$el = $(this)
				;
				// this.tabs('show', $(el).attr('href'));
				$el.closest('.pf-tabs').tabs('show', $el.attr('href'));
				console.log("Tab clicked");  // TODO: Remove for Production
			}
		}
	},

	_create: function() {
		_parent.prototype._create.call(this);
		this._activePanel = null;
		this._activeTab   = null;
		
		var
			self = this,
			$root = self.element,
			hash = location.hash
		;
		
		$root
			.addClass('pf-tabs')
			
			.find('.tab-strip').addClass('pf-tab-strip')
			.end().find('.tab-panel').addClass('pf-tab-panel')
		;

		if(hash && hash.length > 1)
			this.show(hash);
		else
			this.show(0);
	},

	_init: function() {},

	_indexToId: function(index) {
		return this.element.find('.tab-strip a').eq(index).attr('href');
	},

	// Override option setting method
	_setOption: function(option, value) {
		_parent.prototype._setOption.apply(this, arguments);
	},

	show: function(id) {
		// if(this !== self._activeTab[0])
		// 	$root.triggerHandler('show.tabs', $tab.attr('href'));
		var
			self = this,
			$root = self.element
		;

		if(!isNaN(+id)) {
			id = self._indexToId(+id);
		}

		if(self._activeTab && self._activeTab[0]) {
			self._activeTab.removeClass('pf-state-active');
			self._activePanel.removeClass('pf-state-active');
		}

		self._activeTab = $root.find('.tab-strip a[href="'+id+'"]');
		self._activePanel = $root.find(id);

		self._activeTab.addClass('pf-state-active');
		self._activePanel.addClass('pf-state-active');

	},

	// Remove and cleanup after the widget. Unbind events, serialize data, remove HTML components
	destroy: function() {
		var
			self = this,
			$root = self.element
		;
		$root
			.removeClass('pf-tabs')
			
			.find('.tab-strip').removeClass('pf-tab-strip')
			.end().find('.tab-panel').removeClass('pf-tab-panel')
		;
		
		// Call parent method
		_parent.prototype.destroy.apply(this, arguments);
	}
});

})(jQuery);