( function ( $ ) {
    var canvas         = $('#simpleEditor')[0],
        mousePressed   = false,
        lastX, lastY,
        ctx,
        lineColor      = 'black',
        lineWidth      = 2,
        lineWidthValue = $('#lineWidthValue').html(lineWidth),
        lineFlag       = false;

    $(document).ready( function() {
        ctx = document.getElementById('simpleEditor').getContext("2d");

        $(canvas)
        .mousedown( function (event) {
            mousePressed = true;
            Draw(event.pageX - $(this).offset().left,
                 event.pageY - $(this).offset().top, false);
        })
        .mousemove( function (event) {
            if (mousePressed) {
                Draw(event.pageX - $(this).offset().left,
                     event.pageY - $(this).offset().top, true);
            }
        })
        .mouseup( function() {
            mousePressed = false;
        })
        .mouseleave( function() {
            mousePressed = false;
        });
    });

    $('#lineColor').on('change', function() {
        lineColor = $(this)[0].value;
    })

    $('#lineWidth').on('change', function() {
        lineWidth = $(this)[0].value;
        $(lineWidthValue).html(lineWidth);
    })

    function Draw(x, y, isDown) {
        if (isDown) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth   = lineWidth;
            ctx.lineJoin    = "round";
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
            ctx.save();
        }
        lastX = x; lastY = y;
    }

    $('#clearCanvas').on('click', function() {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });

    $('#saveCanvas').on('click', function() {
        var dataURL = canvas.toDataURL('image/png');
        this.href   = dataURL;
    });

    $('#prev').on('click', function() {
        // Сохранять стек команд и метку
    });

    $('#next').on('click', function() {
        // Возвращать сохраненное состояние
    });

})( jQuery );
