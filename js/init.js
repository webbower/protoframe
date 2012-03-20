;(function($, window, document, undefined) {
	window.PF = window.PF || {};

	$.extend(window.PF, {
		doc: $(document)
	});
	
	// READY
	$(function() {
		$(document.documentElement).toggleClass('no-js js');

		// PF.Dialog.init();
		
		$('.expandable').expandable();
		
	});
})(jQuery, this, this.document);