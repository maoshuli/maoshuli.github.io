;(function () {
    let Bird = window.Bird = function () {
        this.img = [game.allImg["bird0_0"], game.allImg["bird0_1"], game.allImg["bird0_2"]];

        // 默认坐标
        this.x = (game.canvas.width - game.allImg["bird0_0"].width) / 2;
        this.y = 150 + 24;

        this.changeY = 1;

        this.rotate = 0;

        // 状态
        this.status = "drop";

        this.wing = 0;

    };

    Bird.prototype.update = function () {
        if(this.status == "drop") {
            this.changeY += 0.5;
            this.y += this.changeY;
            this.rotate += 0.03;
            if(this.rotate > (75 * Math.PI/180)) {
                this.rotate = 75 * Math.PI/180;
            }
        }else if(this.status == "up") {
            this.changeY -= 0.8;

            this.y -= this.changeY;

            if(this.rotate <= -85 * Math.PI/180) {
                this.rotate = -90 * Math.PI/180;
            }

            if(this.changeY <= 0) {
                this.status = "drop";
            }

            if(this.y < 24) {
                this.y = 24;
            }
            this.wing++;
            this.wing==3 ? this.wing = 0 : null;
        }

        // 死亡，清除定时器
        if(this.y > game.canvas.height - 112 - 24) {
            clearInterval(game.timer);
        }

    };

    Bird.prototype.render = function () {
        game.draw.save();
        game.draw.translate(this.x, this.y);
        game.draw.rotate(this.rotate);

        game.draw.drawImage(this.img[this.wing], 0, 0);

        game.draw.restore();
    };

    //上升一段距离
    Bird.prototype.fly = function () {
        this.status = "up";

        // 改变头方向
        if((this.rotate - 45 * Math.PI/180) > (-80 * Math.PI/180)) {
            this.rotate -= 35 * Math.PI/180;
        }

        this.changeY = 10;
    };
})();