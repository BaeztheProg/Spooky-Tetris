const canvas = document.getElementById('tetrisbackground');
const ctx = canvas.getContext('2d')
const sprite = new Image();
        sprite.src = "assets/tetris-ui.png";
        sprite.onload = function() {
            
            ctx.drawImage(sprite, 50, 50);
        }
