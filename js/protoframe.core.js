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
	
	$(function() {
		$(document.body)
			// Disabled links should not trigger
			.on('click', 'a.pf-state-disabled', function(ev) { ev.preventDefault(); })
		;
	});

})(jQuery, this, this.document);
