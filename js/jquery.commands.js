;(function($, undefined) {
	// Pre ready() code goes here
	// #<id>.<event>:literal,[attr];.<class>.<event>:literal,[attr]

	// var
	// 
	// ;

	$(function() {
		$(document.body)
			.on('click', '[data-command]', function(ev) {
				ev.preventDefault();
				var
					$el = $(this),
					command = $el.attr('data-command'),
					commands = [], token = '', sel, call, args = [],
					completeCommand = false,
					tmp
				;
				
				// if(!!command.length) {
					// commands = command.split(';');
					// Loop over commands
					// for(var i = 0, il = commands.length ; i < il ; i++) {
						if(command.charAt(0) === '#' || command.charAt(0) === '.' || command.substr(0,4) === "body") {
							// Loop to parse command string
							for(var j = 0, jl = command.length ; j < jl ; j++) {
								tmp = command.charAt(j);
								switch(tmp) {
									case '.':
										if(j > 0) {
											sel = $.trim(token);
											token = '';
										} else {
											token += tmp;
										}
										break;
									case ':':
										call = $.trim(token);
										token = '';
										break;
									case ',':
										args.push($.cast(token));
										token = '';
										break;
									default:
										if(sel)
											completeCommand = true;
										
										token += tmp;
										break;
								}
							}
							// Drop the last token into place
							if(sel && !call)
								call = token;
							else if(call)
								args.push($.cast(token));

							
							// console.log(
							// 	"Complete: ", completeCommand,
							// 	"; Selector: ", sel,
							// 	"; Call: ", call,
							// 	"; Args:", args
							// );  // TODO: Remove for Production
						} else {
							throw "Illegal command format: " + command;
						}
						
						if(completeCommand) {
							var $target = $(sel);
							args.unshift(call);
							$target.triggerHandler.apply($target, args);
						} else {
							throw "Incomplete command: " + command;
						}
					// }
				// }
			})
		;
	});
})(jQuery);
