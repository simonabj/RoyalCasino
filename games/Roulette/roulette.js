// DOCUMENT LOAD
$(function () {

    /**
     * method normalizeAngle returns the lowest possible degree with which to describe the given degree, between 0 and 359.
     * @param deg {Number} - The degree to normalize.
     * @returns {Number} - The degree, normalized to a number which is 0 < x < 359.
     */
    function normalizeAngle(deg) {
        let newDeg = deg;
        while (newDeg <= 0) newDeg += 360;
        while (newDeg > 360) newDeg -= 360;
        return newDeg;
    }

    function getAngle(x1,y1,x2,y2){
        return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    }


    class Rotatable {
        constructor(initEl, initDeg = 0) {
            this.deg = initDeg;
            this.el = initEl;
        }

        rotate(deg) {
            this.deg += deg;
            this.el.style.transform = "rotate(" + normalizeAngle(this.deg) + "deg)";
        }

        rotateTo(deg) {
            this.deg = deg;
            this.el.style.transform = "rotate(" + normalizeAngle(this.deg) + "deg)";
        }
    }


    // _______ VARIABLES _______
    let rotateVelMax = 4;
    let rotateVel = 0;
    // THE BALL
    let ball = new Rotatable($("#ballDiv")[0]);
    let ballHeightMax = 600;
    let ballHeight = ballHeightMax;
    ball.el.style.height = ballHeight + "px";

    // THE WHEEL
    let rWheel = new Rotatable($("#rouletteWheel")[0]);



    // ________ GAMELOOP ________
    function gameloop() {

        // Makes the rotation and ball return to correct velocity and height smoothly.
        if(rotateVel < rotateVelMax && !stop) rotateVel += 0.25;
        if(ballHeight < ballHeightMax && !stop) ballHeight += 10;

        // ROTATING
        rWheel.rotate(rotateVel * 0.4);
        ball.rotate(-rotateVel);
        ball.el.style.height = ballHeight + "px";

        // STOPPING
        if (stop) {
            console.log("stopping");
            rotateVel = rotateVel * 0.99;

            // BREAKS THE GAMELOOP IF THE BALL HAS STOPPED.
            if(rotateVel < 0.02){
                rotateVel = 0;
                console.log("stopped");
                spinning = false;
                return false;
            }
            // LOWERS THE BALL UNTIL IT'S WITHIN A 360 PIXEL RADIUS OF THE CENTER
            if (ballHeight > 360) {
                ballHeight = ballHeight * 0.98;
            }
        }

        requestAnimationFrame(gameloop);
    }


    // SIGNIFYING WHEN TO STOP
    let stop, stopTime, spinning = false;

    function spin(){
        if(!spinning){

            spinning = true;
            stop = false;

            stopTime = Math.random() * 6000 + 1500;
            console.log((stopTime / 1000).toFixed(1) + " seconds.");

            setTimeout(function () { stop = true; }, stopTime);

            rotateVel = 0;
            ball.el.style.height = ballHeight + "px";

            gameloop();
        }
    }
    $("#spinBtn").click(function(){spin();});
    $("#rouletteWheelCover").click(function(){spin();});


    // CALLING THE GAME LOOP AFTER ALL VARIABLES ARE SET.
    //spin();


    /*
        let values = [
            {from: 0, to: 10, is: 18},
            {from: 10, to: 19, is: 31},
            {from: 19,to: 29,is: 19},
            {from: 29,to: 38,is: 8},
            {from: 38,to: 48,is: 12},
            {from: 48,to: 57,is: 29},
            {from: 57,to: 66,is: 25},
            {from: 66,to: 76,is: 10},
            {from: 76,to: 85,is: 27},
            {from: 85,to: 95,is: 0},
            {from: 95,to: 104,is:1},
            {from: 104,to: 114,is: 13},
            {from: 114,to: 123,is: 36},
            {from: 123,to: 133,is: 24},
            {from: 133,to: 142,is: 3},
            {from: 142,to: 151,is: 15},
            {from: 151,to: 161,is: 34},
            {from: 161,to: 170,is: 22},
            {from: 170,to: 180,is: 5},
            {from: ,to: ,is: },
            {from: ,to: ,is: },
            {from: ,to: ,is: },
            {from: ,to: ,is: },
            {from: ,to: ,is: },

            inverted
            180 - 171 = 17
            171-161 = 32
            161-152 = 20
            152-142 = 7
            142-133 = 11
            133-123 = 30
            123-114 = 26
            114-104 = 9
            104-95 = 28
            95-85 = 0
            85-76 = 2
            76-66 = 14
            66-57 = 35
            57-47 = 32
            47-37 = 4
            37-28 = 16
            28-18 = 33
            18-9 = 21
            9-0 = 6
        ]
    */
});

