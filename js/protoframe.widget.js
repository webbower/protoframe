/*
* jQuery LexisNexis <widgetTitle>
*
* Copyright <year>
*
* Depends:
*   jquery.js <version>
*   jquery.ui.core.js <version>
*   jquery.ui.widget.js <version>
*/
; (function ($) {
	var _parent = $.Widget;
	
	$.widget('pf.widget', _parent, {
		// Default options
		options: {
			events: {}
		},

		_create: function() {
			var
				$root = this.element,
				evAction, evSelector, tmp
			;
			$.each(this.options.events, function(key, handler) {
				tmp = key.split(' ');
				evAction = tmp.pop();
				evSelector = tmp.join(' ');
				
				$root.on(evAction + '.tabs', evSelector, handler);
			});
		},

		_init: function() {},

		// Override option setting method
		_setOption: function(key, value) {
			_parent.prototype._setOption.apply(this, arguments);
		},

		// Remove and cleanup after the widget. Unbind events, serialize data, remove HTML components
		destroy: function() {
			var
				$root = this.element,
				evAction, evSelector, tmp
			;
			
			$.each(this.options.events, function(key, handler) {
				tmp = key.split(' ');
				evAction = tmp.pop();
				evSelector = tmp.join(' ');
				
				$root.off(evAction + '.tabs', evSelector, handler);
			});
			
			this._trigger('destroyed', null, {});
			
			// Call parent method
			_parent.prototype.destroy.apply(this, arguments);
		}
	});
})(jQuery);
