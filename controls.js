class Controls {

    constructor(ball) {

        this.addMag = false;
        this.subMag = false;
        this.addDir = false;
        this.subDir = false;
        this.shootD = false;

        this.ball = ball;

        this.#addKeyboard()

    }

    #addKeyboard() {

        document.onkeydown = (e) => {

            switch (e.key) {

                case "ArrowLeft":
                    this.subDir = true;
                    break;
                case "ArrowRight":
                    this.addDir = true;
                    break;
                case "ArrowUp":
                    this.addMag = true;
                    break;
                case "ArrowDown":
                    this.subMag = true;
                    break;
                case "Enter":
                    e.preventDefault()
                    if(e.repeat) break
                    this.ball.shoot()
                    break;
            }

        }

        document.onkeyup = (e) => {

            switch (e.key) {

                case "ArrowLeft":
                    this.subDir = false;
                    break;
                case "ArrowRight":
                    this.addDir = false;
                    break;
                case "ArrowUp":
                    this.addMag = false;
                    break;
                case "ArrowDown":
                    this.subMag = false;
                    break;
                // case "Enter":
                //     this.shootD = false;
            }

        }

    }



}