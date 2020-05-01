;(function () {
    let Game = window.Game = function (selector) {
        this.canvas = document.querySelector("#canvas");

        // 创建绘制环境
        this.draw = this.canvas.getContext("2d");

        function setSize() {
            let W = document.documentElement.clientWidth;
            let H = document.documentElement.clientHeight;

            this.canvas.width = W > 420 ? 420 : W;
            this.canvas.height = H > 750 ? 750 : H;
        }

        // 设置 canvas 宽高
        setSize();

        window.addEventListener("resize", (e) => {
            setSize();
        }, false);

        this.loadImg();

        // 分数
        this.score = 0;

        this.bindEvent();
    };

    Game.prototype.clear = function () {
        this.draw.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    Game.prototype.loadImg = function () {
        // 所有图片地址对象
        this.allImg = {
            "day": "./img/bg_day.png",
            "land": "./img/land.png",
            "pipe_down": "./img/pipe_down.png",
            "pipe_up": "./img/pipe_up.png",
            "bird0_0": "./img/bird0_0.png",
            "bird0_1": "./img/bird0_1.png",
            "bird0_2": "./img/bird0_2.png",
            "title": "./img/title.png",
            "button_play": "./img/button_play.png",
            "tutorial": "./img/tutorial.png",
            "shuzi0": "./img/font_048.png",
            "shuzi1": "./img/font_049.png",
            "shuzi2": "./img/font_050.png",
            "shuzi3": "./img/font_051.png",
            "shuzi4": "./img/font_052.png",
            "shuzi5": "./img/font_053.png",
            "shuzi6": "./img/font_054.png",
            "shuzi7": "./img/font_055.png",
            "shuzi8": "./img/font_056.png",
            "shuzi9": "./img/font_057.png",
        };

        // 加载所有图片
        let n = 0;
        // 图片总个数
        let total = Object.keys(this.allImg).length;

        for(let key in this.allImg) {
            ((src) => {
                this.allImg[key] = new Image();
                this.allImg[key].src = src;
                this.allImg[key].onload = () => {
                    n++;
                    if(total == n) {
                        this.start();
                    }
                }
            })(this.allImg[key]);

        }
    };

    Game.prototype.start = function () {
        // this.bg = new Background();
        // this.land = new Land();
        //
        // this.pipeArr = [];
        // this.bird = new Bird();

        this.f = 0;
        this.pipeArr = [];

        // 场景管理器
        this.sM = new SceneManager();

        this.scene = 1;
        this.sM.enter(this.scene);


        this.timer = setInterval(() => {
            this.f++;
            this.clear();

            this.sM.updateRender();

            // this.bg.update();
            // this.bg.render();
            //
            // this.pipeArr.forEach((item) => {
            //     item.update();
            //     item.render();
            // });
            //
            //
            // if(this.f % 180 == 0) {
            //     new Pipe();
            // }
            //
            // this.land.render();
            // this.land.update();
            //
            // this.bird.update();
            // this.bird.render();

        }, 20);



    };

    Game.prototype.bindEvent = function () {
        this.canvas.addEventListener("click", () => {
            console.log("bind event");
            if(this.bird.y < 24) {
                return;
            }
            this.bird.fly();
        })
    };




})();






























