; (function($) {

	var
		ns = '.tableview'
	;

	PF.Tableview = function(el, opts) {
		return PF.Tableview.prototype.init(el, opts); 
	};

	$.extend(PF.Tableview, {
		defaults: {
			editSelector: '.edit',
			deleteSelector: '.delete',
			saveSelector: '.save',
			newSelector: '.add',
			selectSelector: 'input[type=checkbox]',
			selectedClass: 'selected',
			clickRowSelect: true,
			insertNewRow: 'top', // Values are "top" or "bottom"
			
			rowElement: 'li',
			editLink: '<a href="#" class="edit">Edit</a>',
			saveLink: '<a href="#" class="save">Save</a>',
			deleteLink: '<a href="#" class="delete">X</a>',
			editTmpl: '',
			viewTmpl: ''
			
		}
	});

	$.extend(PF.Tableview.prototype, {
		/*
			API:
			data-tabs-content-src: URL to AJAX load tab content (.tab-panel)
			data-tabs-show: Activate a tab on a tab set #id[idx] (*)
		*/
		constructor: PF.Tableview,
		element: null,
		_activeTab: null,
		_activePanel: null,
		init: function(el, opts) {
			var
				self = this,
				$root = $(el),
				// Compile Options
				o = $.extend(
					{}, // Roll into new object
					this.constructor.defaults, // Start with widget defaults
					opts || {}, // Override with opts passed in to constructor
					$root[0].dataset || {} // Last override from root element data-* attributes
				)
			;
			
			this.element = $root;
			
			this.options = o;
			
			$root.children(this.options.rowElement)
				.each(function() {
					var
						$row = $(this)
					;
					
					self.toggleRow(this, $row.find(o.selectSelector).is(':checked'))
				})
			;
			
			$root
				.on('edit'+ns, function(ev, row) {
					self.editRow(row);
				})
				.on('save'+ns, function(ev, row) {
					self.saveRow(row);
				})
				.on('delete'+ns, function(ev, row) {
					self.deleteRow(row);
				})
				.on('add'+ns, function(ev) {
					self.addRow();
				})
				.on('select'+ns, function(ev, row) {
					self.toggleRow(row, true);
				})
				.on('unselect'+ns, function(ev, row) {
					self.toggleRow(row, false);
				})
				
				.on('click'+ns, '.edit', function(ev) {
					ev.preventDefault();
					$root.triggerHandler('edit', $(this).closest(o.rowElement)[0]);
				})
				.on('click'+ns, '.save', function(ev) {
					ev.preventDefault();
					$root.triggerHandler('save', $(this).closest(o.rowElement)[0]);
				})
				.on('click'+ns, '.delete', function(ev) {
					ev.preventDefault();
					$root.triggerHandler('delete', $(this).closest(o.rowElement)[0]);
				})
				.on('click'+ns, '.add', function(ev) {
					ev.preventDefault();
					$root.triggerHandler('add');
				})
				.on('click'+ns, o.rowElement, function(ev) {
					if(o.clickRowSelect && ev.target.nodeName.toLowerCase() === o.rowElement)
						self.toggleRow(this, true);
				})
				.on('click'+ns, o.selectSelector, function(ev) {
					var
						$el = $(this)
					;
					ev.stopPropagation();
					self.toggleRow($(this).closest(o.rowElement), this.checked);
				})
				.on('keyup'+ns, 'input[type=text]', function(ev) {
					if(ev.which === 13)
						self.saveRow($(this).closest(o.rowElement)[0]);
				})
			;

			$root.widget('Tableview', this);
			
			return self;
		},
		
		deleteRow: function(row) {
			// console.log("Deleting ", row);  // TODO: Remove for Production
			var
				$row = $(row)
			;
			$row.fadeOut(400, function() {
				$row.remove();
			});
		},
		
		editRow: function(row) {
			// console.log("Editing ", row);  // TODO: Remove for Production
			var
				$row = $(row),
				o = this.options,
				editable = $row.find('.editable').text()
			;
			
			$row
				.find(o.selectSelector).attr('disabled', 'disabled')
				.end().find('.delete').addClass('pf-state-disabled')
				.end().find('.edit').replaceWith(o.saveLink)
				.end().find('.editable').html('<input type="text" name="editRow" value="'+editable+'" />')
			;
		},
		
		saveRow: function(row) {
			// console.log("Saving ", row);  // TODO: Remove for Production
			var
				$row = $(row),
				o = this.options,
				editable = $row.find('input[type=text]').val()
			;
			
			$row
				.find(o.selectSelector).removeAttr('disabled')
				.end().find('.pf-state-disabled').removeClass('pf-state-disabled')
				.end().find('.save').replaceWith(o.editLink)
				.end().find('.editable').text(editable)
			;
		},
		
		addRow: function() {
			//  ("Adding Row");  // TODO: Remove for Production
			// var
			// 	self = this,
			// 	o = self.options
			// ;
			// 
			// self.element[o.insertNewRow === 'top' ? 'prepend' : 'append'](PF.tmpl(this.options.editTmpl, {}));
		},
		
		toggleRow: function(row, state) {
			// console.log("Selecting ", row, state);  // TODO: Remove for Production

			var
				o = this.options
			;

			$(row)
				.toggleClass(o.selectedClass, state)
				.find(o.selectSelector).prop('checked', state)
			;
		},
		
		destroy: function() {
			this.element.off(ns);
			
			this.element.widget('Tableview', 'destroy');
		}
	});

	$.fn.extend({
		tableview: function(opts) {
			return this.each(function() {
				PF.Tableview(this, opts);
			});
		}
	});

})(jQuery);