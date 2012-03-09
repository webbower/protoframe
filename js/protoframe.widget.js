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
				self = this,
				$root = self.element,
				evAction, evSelector, tmp,
				callbackWrapper
			;
			
			if(!$.isEmptyObject(this.options.events)) {
				this._events = {};
			}
			
			$.each(this.options.events, function(key, handler) {
				tmp = key.split(' ');
				evAction = tmp.pop();
				evSelector = tmp.join(' ');
				// Store the custom event handler methods in a private map for later removal
				self._events[key] = callbackWrapper = function(ev) {
					return handler.call(self, ev, this);
				};

				// For delegate events (e.g. "li a click")
				if(!!evSelector)
					$root.on(evAction + '.tabs', evSelector, callbackWrapper);

				// For root events (e.g. "click" or "myEvent")
				else
					$root.on(evAction + '.tabs', callbackWrapper);
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
			
			$.each(this._events, function(key, handler) {
				tmp = key.split(' ');
				evAction = tmp.pop();
				evSelector = tmp.join(' ');
				
				// For delegate events (e.g. "li a click")
				if(!!evSelector)
					$root.off(evAction + '.tabs', evSelector, handler);

				// For root events (e.g. "click" or "myEvent")
				else
					$root.off(evAction + '.tabs', handler);
			});
			
			delete this._events;
			
			this._trigger('destroyed', null, {});
			
			// Call parent method
			_parent.prototype.destroy.apply(this, arguments);
		}
	});
})(jQuery);
