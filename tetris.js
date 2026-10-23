const canvas = document.getElementById('tetrisbackground');
const ctx = canvas.getContext('2d')
const sprite = new Image();
        sprite.src = "assets/tetris-ui.png";
        sprite.onload = function() {
            //scale the ui
            const scale = 0.4;
            const width = sprite.width * scale;
            const height = sprite.height * scale;

            //centering
            const centerX = canvas.width / 2;
            const x = centerX - (width / 2);
                
            ctx.drawImage(sprite, x, 50, width, height);
        }
