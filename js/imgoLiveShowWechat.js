(function(bodyStyle,$) {

    $.fn.canvasGame = function(options){
        'use strict';
        var self = this;
        var opt = $.extend({
            info:'没有中奖',
            percent:0.5
        }, options);
        bodyStyle.mozUserSelect = 'none';
        bodyStyle.webkitUserSelect = 'none';

        if(self.data('imgo-options')) {
            var info = self.data('imgo-options').info;
            if(info) {
                opt.info = info;
            }
        }

//      建立刮开信息
        self.append(
            $('<p>').text(opt.info)
        );
//      建立画布
        self.append('<canvas></canvas>');
        console.log(self.data());
        var canvas  = self.children('canvas').get(0);
        var $canvas = self.children('canvas');
        canvas.style.backgroundColor='transparent';


        var ctx;
        var w = self.width(),
            h = self.height();

        var mousedown = false;

        function layer(ctx) {
            ctx.fillStyle = 'gray';
            ctx.fillRect(0, 0, w, h);
        }

        function eventDown(e){
            e.preventDefault();
            mousedown=true;
        }


        function eventUp(e){
            e.preventDefault();
            mousedown = false;
        }

        function eventMove(e){
            e.preventDefault();
            e = e.originalEvent;
            if(mousedown) {
                if(e.changedTouches){
                    e = e.changedTouches[e.changedTouches.length-1];
                }
                var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,
                    y = (e.clientY + document.body.scrollTop  || e.pageY) - offsetY || 0;
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, Math.PI * 2);
                ctx.fill();

            }
        }

        canvas.width  = w;
        canvas.height = h;

        ctx           = canvas.getContext('2d');
        ctx.fillStyle ='transparent';
        layer(ctx);
        var offsetX = $canvas.offset().left,
            offsetY = $canvas.offset().top;
        ctx.globalCompositeOperation = 'destination-out';

        $canvas.on({
            'touchstart':eventDown,
            'touchend':eventUp,
            'touchmove':eventMove,
            'mousedown':eventDown,
            'mouseup':eventUp,
            'mousemove':eventMove
        });

        return self;
    };

//    data api
//    ========
    var canvasGame = '[data-imgo-plugin="canvasGame"]';
    $(window).on('load',function(){
        $(canvasGame).each(function(){
            $canvasGame = $(this);
            $canvasGame.canvasGame();
        });
    });

})(document.body.style,window.jQuery);
