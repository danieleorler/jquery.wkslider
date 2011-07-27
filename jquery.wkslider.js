(function($)
{
    $.fn.wkslider = function(options)
    {
        //defaults    
        var defaults =
        {
        	css		: 'slider_menu',
            selector: 'o',
            autoplay: true,
            activate: 'active'
        }
        var opts = $.extend(defaults, options);
                
        //move the 'highlight' to active selector
        this.move_selector = function(i)
        {
            ul.children('li').removeClass(opts.activate).eq(i|0).addClass(opts.activate);
        };
        
        this.move_slide = function(i)
        {
            divs.filter(':visible').fadeOut('slow',function()
            {
                divs.filter(':visible').hide();
                divs.eq(i).fadeIn('slow');
            });              
        }
        
        this.get_active_index = function()
        {
            return ul.find('.'+opts.activate).index();
        };
        
        this.autoslide = function()
        {
            var start = container.get_active_index();
            var step = (start+1)%n;
            container.move_selector(step);
            container.move_slide(step);
        }
                
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
                case 'number':        li.text(i+1); break;
                case 'character':    li.text(String.fromCharCode(97+i)); break;
                default:            li.text(opts.selector);
            }
                    
            ul.append(li);
        }
                
        if(typeof opts.css !== 'undefined')
            ul.addClass(opts.css);
                
        this.move_selector();
                
        this.append(ul);
                
        ul.children('li').bind('click',function()
        {
            var index = $(this).index();
            container.move_selector(index);
            container.move_slide(index);            
        });
        
        if(opts.autoplay)
        {
            window.setInterval(container.autoslide,3000);
        }
                
    }
})(jQuery);