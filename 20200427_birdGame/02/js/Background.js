;(function () {
    let Background = function () {
        this.x = 0;
        this.w = 288;
        this.h = 512;
        this.step = 2;
    };

    window.Background = Background;

    // 更新
    Background.prototype.update = function () {
        this.x = this.x - this.step;
        if(this.x == -this.w) {
            this.x = 0;
        }
    };

    // 渲染
    Background.prototype.render = function () {
        //绘制天空背景
        game.draw.save();
        game.draw.beginPath();
        game.draw.fillStyle = "rgb(78, 192, 202)";
        game.draw.fillRect(0, 0, game.canvas.width, game.canvas.height);
        game.draw.restore();

        game.draw.drawImage(game.allImg["day"], 0 + this.x,  game.canvas.height - this.h);
        game.draw.drawImage(game.allImg["day"], this.w + this.x,  game.canvas.height - this.h);
        game.draw.drawImage(game.allImg["day"], this.w*2 + this.x,  game.canvas.height - this.h);
    };
})();