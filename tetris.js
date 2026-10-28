const canvas = document.getElementById('tetrisbackground');
const ctx = canvas.getContext('2d');
let cutscene=1
        // the cutscene variable is for when skinny bat or fat bat spawns, so that blocks don't spawn while you watch the bats fall to the ground. when skinny bat or fat bat dies cutscene gets set back to 0 so blocks can continue spawning. however no functionality exists for this variable yet.
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load: ${src}`));

        img.src = src;
    });
}

//render background
function loadVideo(src) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        
        video.src = src;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;
        video.style.display = 'none';

        video.oncanplaythrough = () => {
            video.play(); // Explicitly kick off playback
            resolve(video);
        };
        video.onerror = () => reject(new Error(`Failed to load video: ${src}`));
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

// loop bg
function animationLoop() {
    drawTetris();
    requestAnimationFrame(animationLoop);
}

// Spawn bats randomly
function spawnBat() {
    const size = 40;

    const x = Math.random() * (canvas.width - size);
    const y = canvas.height-150;

    bats.push({ x, y });
    
    // Draw the game (this may be shocking but to PLAY the game, you need to SEE it)
    drawTetris();
}

// Load bg and board first
async function init() {
    try {
        // Preload all assets once so they don't block drawing loops
        [background, sprite, batSprite] = await Promise.all([
            loadVideo("assets/bg-animated-embed.mp4"),
            loadImage("assets/tetris-board.png"),
            loadImage("assets/skinny-bat.png"),
        ]);

        // Start continuous animation loop so the video updates live
        animationLoop();

        // Spawn a bat every 2 seconds
        setInterval(spawnBat, 2000);

    } catch (error) {
        console.error("cant load bg or ui:", error);
    }
}

init();
