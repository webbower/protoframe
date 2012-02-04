; (function($, undefined) {
	$.cast = function(str) {
		if(typeof str !== 'string')
			return str;
		
		if(str === 'true')
			return true;
		else if(str === 'false')
			return false;
		else if(str === 'null')
			return null;
		else if(str.length === 0)
			return undefined;
		else if(!isNaN(+str))
			return +str;
		else
			return str;
	};
})(jQuery);