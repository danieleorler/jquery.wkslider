(function($)
{
	$.fn.wkslider = function(options)
	{
		        
		var defaults =
		{
			selector: 'o'
		}
		var opts = $.extend(defaults, options);
		        
		//move the 'highlight' to active selector
		this.move = function(i)
		{
			ul.children('li').removeClass(opts.activate).eq(i|0).addClass(opts.activate);
		};
		        
		//store 'this' element for scoping
		var container = this;
		var divs = this.children('div');

		//numbers of slides
		var n = divs.length;
		        
		//display just the first slide
		divs.hide().eq(0).show();
		        
		//create slider's menu container
		var ul = $(document.createElement('ul'));
		        
		//create actual menu
		for(var i = 0; i < n; i++)
		{
			var li = $(document.createElement('li'));
		            
		    switch(opts.selector)
		    {
		    	case 'number':		li.text(i+1); break;
		        case 'character':	li.text(String.fromCharCode(97+i)); break;
		        default:			li.text(opts.selector);
		    }
		            
		    ul.append(li);
		}
		        
		if(typeof opts.css !== 'undefined')
			ul.addClass(opts.css);
		        
		this.move();
		        
		this.append(ul);
		        
		ul.children('li').bind('click',function()
		{
			var index = $(this).index();
			container.move(index);
			divs.filter(':visible').fadeOut('slow',function()
		    {
				divs.filter(':visible').hide();
		        divs.eq(index).fadeIn('slow');
		    });            
		});
		        
	}
})(jQuery);