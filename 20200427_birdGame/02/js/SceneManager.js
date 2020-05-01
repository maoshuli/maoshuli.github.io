;(function () {
    let SceneManager = window.SceneManager = function () {
        this.bindEvent();
    };

    function scene0() {
        game.draw.save();

        // 天空背景
        game.draw.fillStyle = "#4ec0ca";
        game.draw.fillRect(0, 0, game.canvas.width, game.canvas.height);

        // 背景草地楼房
        game.draw.drawImage(game.allImg["day"], 0, game.canvas.height - 512);
        game.draw.drawImage(game.allImg["day"], 288, game.canvas.height - 512);

        // 地面
        game.draw.drawImage(game.allImg["land"], 0, game.canvas.height - 112);
        game.draw.drawImage(game.allImg["land"], 336, game.canvas.height - 112);

        if(this.titleY <= 160) {
            this.titleY += 5;
        }
        game.draw.drawImage(game.allImg["title"], game.canvas.width/2 - 89, this.titleY);

        if(this.buttonY >= 370) {
            this.buttonY -= 10;
        }
        game.draw.drawImage(game.allImg["button_play"], game.canvas.width/2 - 58, this.buttonY);

        if(this.birdY <= 250 || this.birdY >= 300) {
            this.birdChangeY = -this.birdChangeY;
        }

        this.birdY += this.birdChangeY;

        game.draw.drawImage(game.allImg["bird0_0"], (game.canvas.width - game.allImg["bird0_0"].width) / 2, this.birdY);

        game.draw.restore();
    }

    function scene1() {
        game.draw.save();

        // 天空背景
        game.draw.fillStyle = "#4ec0ca";
        game.draw.fillRect(0, 0, game.canvas.width, game.canvas.height);

        // 背景草地楼房
        game.draw.drawImage(game.allImg["day"], 0, game.canvas.height - 512);
        game.draw.drawImage(game.allImg["day"], 288, game.canvas.height - 512);

        // 地面
        game.draw.drawImage(game.allImg["land"], 0, game.canvas.height - 112);
        game.draw.drawImage(game.allImg["land"], 336, game.canvas.height - 112);


        // 🐦
        game.draw.drawImage(game.allImg["bird0_0"], (game.canvas.width - game.allImg["bird0_0"].width) / 2, 150);

        // 新手指引

        // 透明度
        game.draw.save();

        this.tutorialAlpha = this.tutorialAlpha + this.tutorialAlphaChange;
        if(this.tutorialAlpha >= 1 || this.tutorialAlpha <= 0.2) {
            if(this.tutorialAlpha >= 1) {
                this.tutorialAlpha = 1
            }
            if(this.tutorialAlpha <= 0) {
                this.tutorialAlpha = 0.2
            }
            this.tutorialAlphaChange = -this.tutorialAlphaChange;
        }
        game.draw.globalAlpha = this.tutorialAlpha;

        game.draw.drawImage(game.allImg["tutorial"], (game.canvas.width - game.allImg["tutorial"].width) / 2, 250);
        game.draw.restore();

        game.draw.restore();
    }

    function scene2() {
        // console.log("scene2")

        game.bg.update();
        game.bg.render();




        game.f % 200 == 0 ? new Pipe() : null;
        if(game.pipeArr && game.pipeArr.length > 0) {
            game.pipeArr.forEach((item) => {
                item.update();
                item.render();
                item.peng();
                item.score();
            })
        }
        game.land.update();
        game.land.render();

        game.bird.update();
        game.bird.render();


    }

    /**
     * 进入第一个场景
     */
    SceneManager.prototype.enter = function (scene) {
        switch (scene) {
            case 0:
                console.log("game.scene");
                this.titleY = 0;
                this.buttonY = game.canvas.height;
                this.birdY = 300;
                this.birdChangeY = 1.2;
                break;
            case 1:
                console.log("新手");
                // 透明度变化
                this.tutorialAlpha = 0.4;
                this.tutorialAlphaChange = 0.02;
                game.bird = new Bird();
                break;
            case 2:
                game.scene = 2;
                game.bg = new Background();
                game.land  = new Land();
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            default:
                break;

        }
    }

    SceneManager.prototype.updateRender = function () {
        switch (game.scene) {
            case 0:
                scene0.apply(this);
                break;
            case 1:
                scene1.apply(this);
                console.log("新手1");
                break;
            case 2:
                scene2.apply(this);
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            default:
                break;

        }
    }

    SceneManager.prototype.bindEvent = function () {
        // 只有这个元素可以绑定事件
        // 通过鼠标位置判断是否点击
        // 不同场景下有点击事件，需要判断不同场景下的点击
        game.canvas.addEventListener("click", (e) => {
            switch (game.scene) {
                case 0:
                    if(e.clientY > this.buttonY &&
                        e.clientY < (this.buttonY + game.allImg["button_play"].height) &&
                        e.clientX > (game.canvas.width - game.allImg["button_play"].width) / 2 &&
                        e.clientX < ((game.canvas.width - game.allImg["button_play"].width) / 2) + game.allImg["button_play"].width
                    ) {
                        this.enter(1);
                        game.scene = 1;
                        console.log("click")
                    }
                    break;
                case 1:
                    this.enter(2);
                    break;
                case 2:
                    // this.game.bird.fly();
                    break;
            }
        }, false)
    };


})();