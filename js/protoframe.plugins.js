;(function($) {
	$.fn.extend({
		expandable: function(opts) {
			var defaults = {};
			
			opts = opts || {};
			
			return this.each(function () {
				var
					$el = $(this),
					o = $.extend({}, defaults, opts, this.dataset || $el.data()),
					ns = 'expandable'
				;
				
				$el
					.addClass('pf-' + ns)
					.data('collapsed.' + ns, false)
					.on('expand.' + ns, function() {
						$(this)
							.removeClass('pf-state-collapsed').data('collapsed.' + ns, false)
							.find('.bd').attr('aria-hidden', 'false')
						;
					})
					.on('collapse.' + ns, function() {
						$(this)
							.addClass('pf-state-collapsed').data('collapsed.' + ns, true)
							.find('.bd').attr('aria-hidden', 'true')
						;
					})
					.on('destroy.' + ns, function() {
						var $root = $(this);
						
						$root.off('.' + ns).removeClass('pf-state-collapsed').removeData('collapsed.' + ns);
					})
					.on('remove.' + ns, function() {
						$(this).triggerHandler('destroy');
					})
					.on('click', '.hd', function() {
						var $root = $(this).closest('.pf-' + ns);
						$root.trigger($root.data('collapsed.' + ns) ? 'expand' : 'collapse');
					})
				;
				
				if($el.hasClass('collapsed'))
					$el.trigger('collapse');
			});
		}
	});
})(jQuery);
