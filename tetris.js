
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

async function drawTetris() {
    try {
        // Load bg and ui first
        const [background, sprite] = await Promise.all([
            loadImage("assets/bg-placeholder.png"),
            loadImage("assets/tetris-ui.png")
        ]);

        // Clear + redraw bg
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(
            background,
            0, 0,
            canvas.width,
            canvas.height
        );

        // Draw ui
        const scale = 0.4;
        const width = sprite.width * scale;
        const height = sprite.height * scale;

        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;

        ctx.drawImage(sprite, x, y, width, height);

        // Load & draw bats 
        if (bats.length > 0) {
            try {
                const batSprite = await loadImage("assets/fat-bat.png");

                for (const bat of bats) {
                    ctx.drawImage(
                        batSprite,
                        bat.x,
                        bat.y,
                        40,
                        40
                    );
                }
            } catch (error) {
                console.error("cant load bat sprite:", error);
            }
        }

    } catch (error) {
        console.error("cant load bg or ui:", error);
    }
}

// Spawn bats randomly
function spawnBat() {
    const size = 40;

    const x = Math.random() * (canvas.width - size);
    const y = Math.random() * (canvas.height - size);

    bats.push({ x, y });

    drawTetris();
}

// Draw the initial screen
drawTetris();

// Spawn a bat every 2 seconds
setInterval(spawnBat, 2000);


