<!DOCTYPE html>
<html>
<head>
    <script src="../../0JS/universal_menu.js"></script>
    <link href="../../0CSS/universal_menu.css" rel="stylesheet">
    <meta charset="utf-8">
    <title>Snake</title>
    <link rel="stylesheet" href="../../0CSS/classes.css">
    <link rel="stylesheet" href="../../0CSS/universal.css">
    <link rel="stylesheet" href="snake.css">
    <script src="../../0JS/RoyaleSubsystem.js"></script>
</head>
<body>

<div id="">
    <div id="canvas">
        <canvas id="gc" width="400" height="400"></canvas>
    </div>
    <div id="count"> <img src="../../resources/redChip.png" id="chip"/>
        <p id="counter">X  0</p>
    </div>
</div>
<script>
    init_royale();
    window.onload=function() {
        canv=document.getElementById("gc");
        ctx=canv.getContext("2d");
        document.addEventListener("keydown",keyPush);
        setInterval(game,1000/15);
    }
    px=py=10;
    gs=tc=20;
    ax=ay=15;
    xv=yv=0;
    trail=[];
    tail = 5;
    function game() {
        px+=xv;
        py+=yv;
        if(px<0) {
            px= tc-1;
        }
        if(px>tc-1) {
            px= 0;
        }
        if(py<0) {
            py= tc-1;
        }
        if(py>tc-1) {
            py= 0;
        }
        ctx.fillStyle="#0e9e21";
        ctx.fillRect(0,0,canv.width,canv.height);

        ctx.fillStyle="red";
        for(var i=0;i<trail.length;i++) {
            ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
            if(trail[i].x==px && trail[i].y==py) {
                tail = 5;
            }
        }
        trail.push({x:px,y:py});
        while(trail.length>tail) {
            trail.shift();
        }

        if(ax==px && ay==py) {
            tail++;

            document.getElementById("counter").innerHTML= "X  " + (tail-5);
            user.tokenManager.addTokenAmount(1); /*Fjern tokens hvis tap*/
            saveUser(user); /*Oppdatere til session storage*/
            updateSQL(); /*Oppdater database*/
            rmh_updateTokenCount();

            ax=Math.floor(Math.random()*tc);
            ay=Math.floor(Math.random()*tc);
        }
        ctx.fillStyle="purple";
        ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
    }
    function keyPush(evt) {
        switch(evt.keyCode) {
            case 37:
                xv=-1;yv=0;
                break;
            case 38:
                xv=0;yv=-1;
                break;
            case 39:
                xv=1;yv=0;
                break;
            case 40:
                xv=0;yv=1;
                break;
        }
    }
</script>

</body>
</html>