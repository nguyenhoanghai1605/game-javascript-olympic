var ctx,can,sprite,runH = 278,x=0,y
    spwidth = 100,spheight = 104,sizeW = 90,sizeH = 94,
    dx = 24,dy=3,i=1,gamePlay = 0,slObs = [],posObs = [];
var checkDraw,checkJump,checkPoints = 1,checkHit,checkObs = [0,0,0];
$(document).keydown(function(e){
  switch (e.keyCode) {
    case 32:
      if(y == runH && gamePlay == 1){
        checkJump = setInterval(jump,5);
        clearInterval(checkDraw);
      }
      break;
    case 87:
    case 38:
      if(y == runH && runH == 300){
        runH -= 22;
        sizeW -= 10;
        sizeH -= 10;
        $('#canv').css('z-index','2');
      }else if(y == runH && runH == 278){
        runH -= 18;
        sizeW -= 10;
        sizeH -= 10;
        $('#canv').css('z-index','1');
      }
      break;
    case 83:
    case 40:
      if(y == runH && runH == 260){
        runH += 18;
        sizeW += 10;
        sizeH += 10;
        $('#canv').css('z-index','2');
      }else if(y == runH && runH < 300){
        runH += 22;
        sizeW += 10;
        sizeH += 10;
        $('#canv').css('z-index','3');
      }
      break;
    default:
      break;
  }
});
$('#startButton').click(function(){
  gamePlay = 1;
  checkDraw = setInterval(draw,60);
  checkHit = setInterval(hitObstacle,0)
  randObstacle();
});
init();
function init(){
  can = document.getElementById('canv');
  ctx = can.getContext('2d');
  sprite = new Image();
  sprite.onload = draw;
  sprite.src = 'imgs/running2_Flamme.png';
  y = runH;
}
function draw(){
  ctx.clearRect(0,0,can.width,can.height);
  if(x < 4720){
    y = runH;
  }else if(x >= 4950){
    y -= 0;
  }else if(x >= 4760){
    y -= 16;
  }else if(x >= 4720){
    y -= 5;
  }
  window.scrollTo(x-$(window).width()/2,window.screenY);
  ctx.drawImage(sprite,i*spwidth,0,spwidth,spheight,x,y,sizeW,sizeH);
  x += dx;
  if(x >= can.width - 115){
    $('#pyre img').attr('src','imgs/pyre_fire.svg');
    clearInterval(checkDraw);
  }
  i++;
  (i == 4) ? i++ : '';
  (i > 7) ? i = 1 : '';
}
function jump(){
  ctx.clearRect(0,0,can.width,can.height);
  window.scrollTo(x-$(window).width()/2,window.screenY);
  ctx.drawImage(sprite,0*spwidth,0,spwidth,spheight,x,y,sizeW,sizeH);
  x += dx/15;
  y -= dy;
  if((runH == 260) && y <= runH - 110 || y >= runH){
    dy = -dy;
  }else if((runH == 278) && y <= runH - 128 || y >= runH){
    dy = -dy;
  }else if((runH == 300) && y <= runH - 150 || y >= runH){
    dy = -dy;
  }
  if(y >= runH){
    clearInterval(checkJump);
    checkDraw = setInterval(draw,60);
  }
}
function randObstacle(){
  for (var k = 1; k < 4; k++) {
    slObs[k-1] = Math.floor((Math.random()*5) + 5);
    posObs[k-1] = new Array();
    var pos = Math.floor((Math.random()*500) + 400);
    for (var j = 0; j < slObs[k-1]; i++) {
      posObs[k-1].push(pos);
      $('#runway'+k).append('<span class="obstacle" style="left:'+pos+'px !important;"></span>');
      pos = Math.floor((Math.random()*900) + 100) + pos;
      if(pos > 4750)
        break;
    }
  }
}
function hitObstacle(){
  if(x > 4720){

  }else {
    if(x >= checkPoints*800 + 350){
      if(checkPoints == 5){
        $('#points #rio').css('transform','scale(1) rotate(0deg)');
        $('#panels #rioPanel').css('transform','scale(1) rotate(0deg)');
      }else if(checkPoints == 4){
        $('#points #saopaulo').css('transform','scale(1)');
        $('#panels #saopauloPanel').css('transform','scale(1)');
      }else if(checkPoints == 3){
        $('#points #parana').css('transform','rotateY(0deg)');
        $('#panels #bahiaPanel').css('transform','rotateY(0deg)');
      }else if(checkPoints == 2){
        $('#points #bahia').slideToggle('slow');
        $('#panels #bahiaPanel').slideToggle('slow');
      }else if(checkPoints == 1){
        $('#points #amazon').fadeToggle(1000);
        $('#panels #amazonPanel').fadeToggle(1000);
      }
      checkPoints++;
    }
    if(x > posObs[0][checkObs[0]] - 20)
      checkObs[0]++;
    if(x > posObs[1][checkObs[1]] - 20)
      checkObs[1]++;
    if(x > posObs[2][checkObs[2]] - 20)
      checkObs[2]++;
    if(runH == 260){
      if(x >= posObs[0][checkObs[0]] - 50 && x <= posObs[0][checkObs[0]] - 20 && y >= runH - 62){
        error();
      }
    }
    if(runH == 278){
      if(x >= posObs[1][checkObs[1]] - 55 && x <= posObs[1][checkObs[1]] - 20 && y >= runH - 68){
        error();
      }
    }
    if(runH == 300){
      if(x >= posObs[2][checkObs[2]] - 60 && x <= posObs[2][checkObs[2]] - 20 && y >= runH - 80){
        error();
      }
    }
  }
}
$('#restartButton').click(function(){
  resetGame();
});
function error(){
  clearInterval(checkHit);
  clearInterval(checkJump);
  clearInterval(checkDraw);
  gamePlay = 0;
  $('#end').css('display','block');
  $('#end .success').css('display','none');
}
