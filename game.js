window.onload = function() {
    /* global var */
    /* player point */
    var playerPoint = 0; /* don't remove */
    var container = document.getElementsByClassName("container")[0];
    /* number of map block */
    var side = 10; /* the dimension of map */
    var numBlock = side*side;
    /* number of round match before the end */
    var round = 5;
    var timer = 5000; /* 5 second, is ms */
    var numChicken = 5;
    var level = 1;
    /* the actual round playing player */
    var actualRound = 0; /* don't remove */
    /* background image size 
            if you change, change the css */
    var blockWidth = 64; /* width of background */
    var blockHeight = 64; /* height of background */

    /* create the map */    
    for (var i = 0; i < side; i++) {
        for(var l= 0; l < side; l++){
            var block = document.createElement("div");
            block.innerHTML = "<div class=\"block-30\" id=\"id_"+i+"_"+l+"\"></div>";
            container.appendChild(block);
        }
    }

    /* add character 
    var char = document.createElement("div");
    char.innerHTML = "<div class=\"character\"><img src=\"walk_60003.png\" width=\""+blockWidth+"px\" height=\""+blockHeight+"px\" /></div>";
    container.appendChild(char);*/

    /* take event for each block */
    /*var blocks = document.getElementsByClassName("block-30");
    for(var i=0;i<blocks.length;i++){
        /*var itemBlock = blocks[i];
        var string = itemBlock.id;
        itemBlock.setAttribute('title', string);
        itemBlock.onmouseover= function () {
            this.style.background = "#ccc";
        };

        itemBlock.onmouseout = function () {
            this.style.background = "";
        };*/

        /*itemBlock.onclick = function (e) {
            var id = this.getAttribute('id');
            var res = id.split("_");
            var left = res[2]*blockWidth;
            var top = res[1]*blockHeight;
            var char = document.getElementsByClassName("character")[0];
            char.style.left = left;
            char.style.top = top;*/

        /*$(".character").css({
                        'transition-duration': '4s',
                        '-webkit-transition-duration': '4s',
                        '-webkit-transform': 'translate(' + left + 'px, ' + top + 'px)',
                        '-moz-transform': 'translate(' + left + 'px, ' + top + 'px)',
                        '-ms-transform': 'translate(' + left + 'px, ' + top + 'px)',
                        '-o-transform': 'translate(' + left + 'px, ' + top + 'px)',
                        'transform': 'translate(' + left + 'px, ' + top + 'px)'

                    });*/
        /*};*/
    /*};*/

    function refreshPoint() {
        var domPoint = document.getElementsByClassName("point")[0];
        domPoint.innerHTML = ""+playerPoint+"";
    };
    /* take the enemy */
    function addChicken() {
        /* return a pos random from 0 and side var */
        var posX = Math.floor((Math.random()*side))*blockWidth;
        var posY = Math.floor((Math.random()*side))*blockHeight;
        var chicken = document.createElement("div");
        chicken.className = "chicken";
        chicken.style.left = posX;
        chicken.style.top = posY;
        chicken.onclick = function() {
            playerPoint++;
            refreshPoint();
            this.className = this.className + ' chicken_dead';
            setTimeout(function() {
                this.remove();
            }, 300);
        };
        container.appendChild(chicken);
    };

    /* remove all enemy at the end of round */
    function cleanAllChicken() {
        var chickens = document.getElementsByClassName("chicken");
        for(var i =0;i<chickens.length;i++){
            chickens[i].remove();
        }
    };


    function gameExecution() {
        if(actualRound == round) {
            alert("Il tuo punteggio e': "+playerPoint);
            resetGame();
        } else {
            cleanAllChicken();
            var numEnemy = numChicken*level;
            for(var k=0; k<numEnemy;k++) {
                addChicken();
            }
            timer = timer-(actualRound*200);
            actualRound++;
            setTimeout(function(){
                gameExecution();
            }, timer);
        }
    };

    function resetGame()
    {
        document.getElementById("startGame").style.display = "block";
        cleanAllChicken();
        actualRound = 0;
        playerPoint = 0;
        refreshPoint();d
    }
    
    function mouseAttack() {
        setTimeout(function() {
                document.getElementsByTagName('body')[0].className = '';
            document.getElementsByTagName('body')[0].className = 'cursorMoveOne';
            }, 50);
        
            setTimeout(function() {
                document.getElementsByTagName('body')[0].className = '';
            document.getElementsByTagName('body')[0].className = 'cursorMoveTwo';
            }, 80);
        
        setTimeout(function() {
                document.getElementsByTagName('body')[0].className = '';
            document.getElementsByTagName('body')[0].className = 'cursorDefault';
            }, 120);
    };
    
    var startGame = document.getElementById("startGame");
    startGame.onclick = function() {
        gameExecution();
        startGame.style.display = "none";
    }
    
    window.onclick = function() {
            mouseAttack();
    }
}; /* end window.onload */