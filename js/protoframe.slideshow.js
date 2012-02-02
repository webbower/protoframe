; (function($) {

	PF.Slideshow = function(el, opts) {
		return PF.Slideshow.prototype.init(el, opts); 
	};

	$.extend(PF.Slideshow, {
		defaults: {
			prevnext: true,
			navigation: "index", // false, "index", or "thumbnails"
			autoplay: false,
			delay: 10000
		}
	});

	$.extend(PF.Slideshow.prototype, {
		/*
			API:
		*/
		constructor: PF.Slideshow,
		element: null,
		count: 0,
		options: {},
		slides: null,
		init: function(el, opts) {
			var
				self = this,
				$root = $(el),
				$slides = self.slides = $root.find('li'),
				count = self.count = $slides.length
			;

			this.element = $root;
			
			this.options = $.extend({}, this.constructor.defaults, opts);

			this.current = 0;

			this._navs = null;

			$root
				.addClass('pf-slideshow')
				.find('ul').addClass('slides')
			;
			
			this.buildUI();

			$root
				// Slideshow controls
				.on('show.slides', function(ev, index) {
					self.showSlide(index);
				})
				.on('prev.slides', function(ev) {
					self.prevSlide();
				})
				.on('next.slides', function(ev) {
					self.nextSlide();
				})

				.on('click', '.nav-strip a', function(ev) {
					ev.preventDefault();
					var
						index = 0
					;
					
					self.showSlide(index);
				})

				.on('click', '.prev', function(ev) {
					ev.preventDefault();
					self.prevSlide();
				})
				.on('click', '.next', function(ev) {
					ev.preventDefault();
					self.nextSlide();
				})
				.triggerHandler('show.slides', 1)
			;

			$root.widget('Slideshow', this);

			return self;
		},
			
		buildUI: function() {
			var
				self = this,
				$root = this.element,
				o = self.options
			;
			
			if(o.prevnext) {
				$root.append('<a href="#" class="prev">Previous Slide</a><a href="#" class="next">Next Slide</a>');
			}
			
			if(!!o.navigation) {
				var
					nav = '<ul class="nav-strip'
				;
				
				switch(o.navigation) {
					case 'index':
						nav += ' index-strip">'
						$.each(self.slides, function(i, el) {
							nav += '<li><a href="#">' + (++i) + '</a></li>';
						});
						break;
					case 'thumbnails':
						nav += ' thumbnail-strip">'
						$.each(self.slides, function(i, el) {
							nav += '<li><a href="#"><img src="' + $(this).find('img').attr('src') + '" alt="" /></a></li>';
						});
						break;
				}
				
				$root.append($(nav += '</ul>'));
				
				self._navs = $root.find('.nav-strip a');
			}
		},
		
		nextSlide: function() {
			this.showSlide(++this.current);
		},
		
		prevSlide: function() {
			this.showSlide(--this.current);
		},
		
		showSlide: function(index) {
			index = this.count % index;
			
			this.current = index;
		}
	});


	$.fn.extend({
		slideshow: function(opts) {
			return this.each(function() {
				PF.Slideshow(this, opts);
			});
		}
	});

})(jQuery);
