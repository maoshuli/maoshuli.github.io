;(function () {
    let Pipe = window.Pipe = function () {
        // 上部管子, 320 - 100
        this.h1 = Math.floor(Math.random() * 220) + 100;

        // 空隙固定 140
        this.space = 140;

        // 下部管子
        this.h2 = game.canvas.height - 112 - this.space - this.h1;

        this.x = game.canvas.width;

        // 管子的宽度
        this.width = game.allImg["pipe_up"].width;

        game.pipeArr.push(this);

        this.step = 2;

        /**
         * 碰撞检测
         * 如果鸟在本管子渲染的上下范围内，即为碰到管子
         * 一根管子有四个坐标定义渲染的范围，鸟的身体不再这四个坐标范围内安全
         * 需要考虑鸟的身体大小
         */
        this.peng = function (){
            let birdX = game.bird.x + 10;
            let birdY = game.bird.y - 30;

            // 鸟尺寸
            let birdSize = 34;

            game.draw.save();
            game.draw.fillStyle = "red";
            game.draw.fillRect(birdX, birdY, birdSize, birdSize);
            game.draw.restore();

            // 从左到右，从上到下坐标
            let p1x1 = this.x - birdSize;
            let p1y1 = 0;

            let p1x2 = this.x + this.width  - birdSize;
            let p1y2 = 0;

            let p1x3 = this.x  - birdSize;
            let p1y3 = this.h1;

            let p1x4 = this.x + this.width  - birdSize;
            let p1y4 = this.h1;

            if((birdX >= p1x1) &&
                (birdX <= p1x2) &&
                (birdX >= p1x3) &&
                (birdX <= p1x4) &&
                (birdY <= p1y4)
            ) {
                clearInterval(game.timer);
            }

            // let

            let p2x1 = this.x - birdSize;
            let p2y1 = this.h1 + this.space - birdSize;

            let p2x2 = this.x + this.width - birdSize;
            let p2y2 = this.h1 + this.space- birdSize;

            let p2x3 = this.x - birdSize;
            let p2y3 = this.h1 + this.space + this.h2- birdSize;

            let p2x4 = this.x + this.width - birdSize;
            let p2y4 = this.h1 + this.space + this.h2- birdSize;

            if((birdX >= p2x1) &&
                (birdX <= p2x2) &&
                (birdY >= p2y1) &&
                (birdY <= p2y4)) {
                clearInterval(game.timer);
            }
        }

        this.pass = false

        /**
         * 得分,越过一个管子右侧得分
         */
        this.score = function () {
            // 鸟的左侧
            let lBird = game.bird.x;
            if((this.pass == false) && (lBird > this.x + this.width)) {
                game.score++;
                this.pass = true;
                console.log("得分");
            }

        }




    };

    Pipe.prototype.update = function () {
        this.x = this.x - this.step;
        if(this.x < -game.canvas.width*2) {
            for(let i = 0; i < game.pipeArr.length; i++) {
                if(this == game.pipeArr[i]) {
                    game.pipeArr.splice(i, 1);
                    i--;
                }
            }
        }
    };

    Pipe.prototype.render = function () {
        // 上管
        game.draw.drawImage(game.allImg["pipe_down"], 0, 320 - this.h1, 52, this.h1, this.x, 0, 52, this.h1);

        // 下管
        game.draw.drawImage(game.allImg["pipe_up"], 0, 0, 52, this.h2, this.x, this.h1 + this.space, 52, this.h2);
    };
})();