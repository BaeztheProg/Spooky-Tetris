const canvas = document.getElementById('tetrisbackground');
const ctx = canvas.getContext('2d');

// load  background
const background = new Image();
background.src = "assets/bg-placeholder.png";
// load tetris ui
const sprite = new Image();
sprite.src = "assets/tetris-ui.png";

background.onload = function() {
   
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    sprite.onload = function() {
        const scale = 0.4;
        const width = sprite.width * scale;
        const height = sprite.height * scale;

        // centering
        const centerX = canvas.width / 2;
        const x = centerX - (width / 2);

        ctx.drawImage(sprite, x, 50, width, height);
    }
}
