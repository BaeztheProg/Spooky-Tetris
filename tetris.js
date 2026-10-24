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

async function drawTetris() {
    try {
        const [background, sprite] = await Promise.all([
            loadImage("assets/bg-placeholder.png"),
            loadImage("assets/tetris-ui.png")
        ]);

        // draw bg first
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(
            background,
            0, 0,
            canvas.width,
            canvas.height
        );

        // draw ui second to prevent bugs
        const padding = 20;
        const maxWidth = canvas.width - padding * 2;
        const maxHeight = canvas.height - padding * 2;

        const scale = 0.4;

        const width = sprite.width * scale;
        const height = sprite.height * scale;

        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;

        ctx.drawImage(sprite, x, y, width, height);

    } catch (error) {
        console.error("load failed! assets could not be rendered:", error);
    }
}

drawTetris();
