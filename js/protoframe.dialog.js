; (function($) {

	window.PF.Dialog = {
		/*
			API:
			data-dialog-width: [int] Manually set the dialog width (a)
			data-dialog-height: [int] Manually set the dialog height (a)
			data-dialog-content: [str] Load dialog content from "#id" or "URL" (a)
			data-dialog-blocker: [bool] The dialog is modal
		*/
		dialog: null,
		overlay: null,
		isOpen: false,
			
		options: {
			width: 500,
			height: null,
			top: 150,
			modal: true
		},
			
		init: function(opts) {
			if(!this.dialog) this.buildUI();

			this.options = $.extend({}, this.options, opts || {});
		},
			
		open: function(opts) {
			var
				self = this,
				o = $.extend({}, self.options, opts || {}),
				content = o.content
			;

			if(content.indexOf('#') === 0) {
				self.dialog.find('.content').html((content).html());
			} else {
				self.dialog.load(content);
			}

			self.overlay.show();
				
			self.dialog
				.css({
					'width':o.width+'px',
					'height':o.height ? o.height+'px' : 'auto',
					'top':o.top+'px',
					'marginLeft':-(o.width/2)+'px'
				})
				.show()
			;
				
			self.isOpen = true;
		},
			
		close: function() {
			var
				self = this
			;
				
			self.overlay.hide();
				
			self.dialog.hide();
				
			self.isOpen = false;
		},
			
		buildUI: function() {
			var
				self = this,
				o = self.options,
				overlay = (this.overlay = $('<div id="overlay"></div>')),
				dialog = (this.dialog = $('<div id="dialog"></div>').append('<a class="close" href="#">x</a>'))
			;
				
			$(document.body)
				.append(overlay)
				.append(dialog)
			;
				
			PF.doc
				.bind('openDialog', function(ev) {
					PF.Dialog.open();
				})
				.bind('closeDialog', function(ev) {
					PF.Dialog.close();
				})
				.bind('keypress', function(ev) {
					if(PF.Dialog.isOpen && ev.which === 0) PF.doc.trigger('closeDialog');
				})
				.delegate('.dialog', 'click', function(ev) {
					ev.preventDefault();
					var
						data
					;
					PF.doc.trigger('openDialog');
				})
			;
				
			overlay
				.hide()
				.bind('click', function() {
					if(!o.modal) dialog.trigger('close');
				})
			;
				
			dialog
				.hide()
				.bind('close.dialog', function(ev) {
					PF.doc.trigger('closeDialog');
				})
				.bind('open.dialog', function(ev) {
					PF.doc.trigger('openDialog');
				})
				.delegate('.close', 'click', function(ev) {
					ev.preventDefault();
					PF.doc.trigger('closeDialog');
				})
			;
		}
			
	};

})(jQuery);