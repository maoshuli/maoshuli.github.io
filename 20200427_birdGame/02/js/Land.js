;(function () {
    let Land = window.Land = function () {
        this.x = 0;
        this.w = 336;
        this.h = 112;
        this.step = 2;
    };

    Land.prototype.update = function () {
        this.x = this.x - this.step;
        if(this.x == -this.w) {
            this.x = 0;
        }
    };

    Land.prototype.render = function () {
        game.draw.drawImage(game.allImg["land"], 0 + this.x, game.canvas.height - this.h);
        game.draw.drawImage(game.allImg["land"], this.w + this.x, game.canvas.height - this.h);
        game.draw.drawImage(game.allImg["land"], this.w*2 + this.x, game.canvas.height - this.h);
    };
})()