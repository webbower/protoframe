;(function($, window, document, undefined) {

	window.PF = window.PF || {};

	$.extend(window.PF, {
		doc: $(document)
	});
	
	$.fn.extend({
		// Get, set, or destroy a widget of type "name" (e.g. "Tabs", "Slideshow", etc)
		widget: function(name, obj) {
			if(obj) {
				if(typeof obj === 'string' && obj === 'destroy') {
					var data = $.data(this[0], name);
					delete data;
					$.removeData(this[0], name);
				} else {
					$.data(this[0], name + '.widget', obj);
				}
				return this;
			} else {
				var
					widget = $.data(this[0], name + '.widget')
				;
				return widget || undefined;
			}
		}
	});
	
	$(function() {
		$(document.body)
			// Disabled links should not trigger
			.on('click', 'a.pf-state-disabled', function(ev) { ev.preventDefault(); })
		;
	});

})(jQuery, this, this.document);
