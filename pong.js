/**
 * Created by noam on 5/15/16.
 */
(function () {
    window.onload=function () {
        new Game();
    }
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame   ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    }());

    function Game() {
        var i = 0;
        console.log('oiioioiuip');
        var canvas = initCanvas();
        var ctx = canvas.getContext("2d");
        var ball = new Ball();
        var peddle = new Peddle(canvas.width - 20, 38, 40);
        var peddle2 = new Peddle(20, 81, 65);
        document.body.appendChild(canvas);
        console.log(canvas);
        requestAnimFrame(render);

        function initCanvas() {
            var width = 600;
            var height = 400;
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.id = "canvas";
            return canvas;
        }


        function drawBoard() {
            ctx.fillStyle = "#ff00ff";
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }



        function clearCanvas() {
            ctx.clearRect(0,0, canvas.width,canvas.height);
        }

        function render() {
            clearCanvas();
            drawBoard();
            ball.drawBall();
            peddle.drawPeddle();
            peddle2.drawPeddle();
            requestAnimFrame(render);
        }


        function  Ball() {
            var x = canvas.width/2;
            var y = canvas.height/2; // starting point of ball
            var speedX = 1;
            var speedY = 1;
            Ball.prototype.drawBall = function () {
                if (x==peddle.x && y<peddle.y+peddle.height && y>peddle.y){
                    speedX = speedX*-1; //make the ball bounce off the peddle wall

                }
                if ( y > canvas.height || y < 0 ) {
                    //make the ball bounce off the upper and lower wall
                    speedY = speedY*-1;
                }

                // calculate new coordinates
                x = x + speedX;
                y = y + speedY;

                // redraw ball in new coordinates
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI*2);
                ctx.fillStyle = "#000000";
                ctx.closePath();
                ctx.fill();
            }
        }

        function Peddle(startX,upKeyCode,downKeyCode) {
            var self = this;
            var keyUp = upKeyCode;
            var keyDown= downKeyCode;
            this.x = startX;
            this.height = 60;
            this.y = (canvas.height - this.height) / 2;
            this.speedY = 2;
            this.key = 0;
            window.addEventListener("keydown", onDown);
            window.addEventListener("keyup", onUp);

            function onDown(event) {
                if (event.keyCode==keyDown||event.keyCode==keyUp){
                    self.key = event.keyCode;
                }
            }

            function onUp() {
                if (event.keyCode==keyDown||event.keyCode==keyUp){
                    self.key = 0;
                }
            }

            this.drawPeddle = function () {
                self.speed = getMoveSpeed(self.key);
                self.y = self.y + self.speed;
                ctx.fillStyle = "black";
                ctx.fillRect(self.x, self.y, 10, self.height);
            }

            function getMoveSpeed(keyCode){
                if (keyCode==keyUp){ //handle up key
                    return self.speedY * -1;
                } else if (keyCode==keyDown){ //handle down key
                    return self.speedY;
                }
                return 0;
            }


        }
    }
}())

