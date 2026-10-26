const canvas = document.getElementById('tetrisbackground');
const ctx = canvas.getContext('2d');

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load: ${src}`));

        img.src = src;
    });
}

// Store bats
const bats = [];

// Global variables to hold our preloaded images
let background, sprite, batSprite;

function drawTetris() {
    // Clear + redraw bg
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (background) {
        ctx.drawImage(
            background,
            0, 0,
            canvas.width,
            canvas.height
        );
    }

    // Draw board
    if (sprite) {
        const scale = 0.4;
        const width = sprite.width * scale;
        const height = sprite.height * scale;

        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;

        ctx.drawImage(sprite, x, y, width, height);
    }

    // Load & draw bats 
    if (bats.length > 0 && batSprite) {
        for (const bat of bats) {
            ctx.drawImage(
                batSprite,
                bat.x,
                bat.y,
                40,
                40
            );
        }
    }
}

// Spawn bats randomly
function spawnBat() {
    const size = 40;

    const x = Math.random() * (canvas.width - size);
    const y = Math.random() * (canvas.height - size);

    bats.push({ x, y });
    
    // Draw the game (this may be shocking but to PLAY the game, you need to SEE it)
    drawTetris();
}

// Load bg and board first
async function init() {
    try {
        // Preload all assets once so they don't block drawing loops
        [background, sprite, batSprite] = await Promise.all([
            loadImage("assets/bg-placeholder.png"),
            loadImage("assets/tetris-board.png"),
            loadImage("assets/fat-bat.png")
        ]);

        // Initial draw once assets are ready
        drawTetris();

        // Spawn a bat every 2 seconds
        setInterval(spawnBat, 2000);

    } catch (error) {
        console.error("cant load bg or ui:", error);
    }
}

init();
