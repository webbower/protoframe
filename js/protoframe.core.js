;(function($, window, document, undefined) {

	window.PF = window.PF || {};

	$.extend(window.PF, {
		doc: $(document),
		
		tmpl: function(template, data) {
			var
				re
			;
			for(var d in data) {
				re = new RexExp('\\{\\{' + d + '\\}\\}', 'g');
				
				template = template.replace(re, data[d]);
			}
			
			// Clear out all the unreplaced placeholders
			return template.replace(/\{\{\w+\}\}/g, '');
		}
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
