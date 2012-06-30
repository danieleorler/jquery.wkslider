/*
 * plugin's template taken from Addy Osmani's http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/
 */

;(function($, window, document, undefined)
{
    //plugin's name
    var pluginName = "wkslider";
    //defaults    
    var defaults =
    {
        slideElement    : 'div',
        menuClass       : 'slider_menu',
        selector        : 'o',
        autoplay        : false,
        activate        : 'active',
        time            : 3000,
        effect          : 'base'
    }

    //plugin contructor
    function Plugin(element,options)
    {
        this.container      = $(element);
        this.options        = $.extend({},defaults, options);
        this.slides         = this.container.children(this.options.slideElement);
        this.slidesNumber   = this.slides.length;

        //transaction effects
        this.effects        =
        {
            base     : function(slides,i)
            {
                slides.filter(':visible').fadeOut('slow',function()
                {
                    slides.filter(':visible').hide();
                    slides.eq(i).fadeIn('slow');
                });
            },
            orizontal: function(slides,i)
            {
                slides.filter(':visible').hide('slide',{direction:'left'},1000);
                slides.eq(i).show('slide',{direction:'right'},1000);
            }
        }

        this.init();
    }

    Plugin.prototype.init = function()
    {
        //if there are less than 2 slides there is no need for the slider
        if(this.slidesNumber < 2)
        {
            return this.container;
        }
        else
        {
            //display just the first slide
            this.slides.hide().eq(0).show();
            //create slider's menu container
            this.sliderMenu = $(document.createElement('ul'));
            //create actual menu
            for(var i = 0; i < this.slidesNumber; i++)
            {
                var li = $(document.createElement('li'));

                switch(this.options.selector)
                {
                    case 'number'       : li.text(i+1); break;
                    case 'character'    : li.text(String.fromCharCode(97+i)); break;
                    default             : li.text(this.options.selector);
                }

                this.sliderMenu.append(li);
            }

            if(typeof this.options.menuClass !== 'undefined')
                this.sliderMenu.addClass(this.options.menuClass);

            this.moveSelector();
            this.container.append(this.sliderMenu);

            var container = this;
            this.sliderMenu.children('li').on('click',function()
            {
                var index = $(this).index();
                container.moveSelector(index);
                container.moveSlide(index);
                window.clearInterval(container.intervals);
            });

            if(this.options.autoplay)
            {
                var that = this;
                this.intervals = window.setInterval(function(){that.autoslide();},this.options.time);
            }

            //when the slider is not visible the stop it
            $(window).bind('blur',function()
            {
                clearInterval(container.intervals);
            });
        }
    };
    	
    //move the 'highlight' to active selector
    Plugin.prototype.moveSelector = function(i)
    {
        this.sliderMenu.children('li').removeClass(this.options.activate).eq(i|0).addClass(this.options.activate);
    };

    Plugin.prototype.moveSlide = function(i)
    {
        var slides = this.slides;
        this.effects[this.options.effect](slides,i);
    }
        
    Plugin.prototype.getActiveIndex = function()
    {
        return this.sliderMenu.find('.'+this.options.activate).index();
    };

    Plugin.prototype.autoslide = function()
    {
        var start = this.getActiveIndex();
        var step = (start+1)%this.slidesNumber;
        this.moveSelector(step);
        this.moveSlide(step);
    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options)
    {
        return this.each(function()
        {
            if (!$.data(this, 'plugin_' + pluginName))
            {
                $.data(this,'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    }
})( jQuery, window, document );