;(function($, window, document, undefined) {
	if(!window.PF) PF = {};

	$.extend(PF, {
		doc: $(document),
		
		Tabs: {
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
		},
		
		Slideshow: {
			init: function() {
				var
					self = this,
					roots = $('.slideshow')
				;
				
				roots.each(function() {
					var
						$parent = $(this),
						slideCount = $parent.find('.slides img').length
					;
					$parent
						// Slideshow controls
						.delegate('.prev', 'click', function(ev) {
							ev.preventDefault();
						})
						.delegate('.next', 'click', function(ev) {
							ev.preventDefault();
						})
						.delegate('a:not(.prev):not(.next)', 'click', function(ev) {
							ev.preventDefault();
						})
						.bind('slides.show', function(ev, index) {})
						.trigger('slides.show', 1)
					;
				});
			},
			
			showSlide: function() {},
			
			buildUI: function() {}
		},
		
		Dialog: {
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
			
		}
		
	});
	
	// READY
	$(function() {
		$(document.documentElement).toggleClass('no-js js');

		PF.Tabs.init();

		PF.Slideshow.init();
		
		PF.Dialog.init();
		
	});
})(jQuery, this, this.document);