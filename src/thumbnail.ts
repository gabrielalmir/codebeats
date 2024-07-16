import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs';
import sharp from 'sharp';

class ThumbnailGenerator {
    private imagePath: string;
    private outputPath: string;

    constructor(imagePath: string, outputPath: string) {
        this.imagePath = imagePath;
        this.outputPath = outputPath;
    }

    async generateThumbnail() {
        // Load the image
        const imageBuffer = fs.readFileSync(this.imagePath);
        const image = await sharp(imageBuffer).toBuffer();
        const metadata = await sharp(imageBuffer).metadata();

        const width = metadata.width || 800;
        const height = metadata.height || 600;

        // Create a canvas
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Draw the image on the canvas
        const img = await loadImage(image);
        ctx.drawImage(img, 0, 0, width, height);

        // Darken the image
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1.0;

        // Add a slight grain to the image
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = 'white';
        for (let i = 0; i < width; i += 2) {
            for (let j = 0; j < height; j += 2) {
                ctx.fillRect(i, j, 1, 1);
            }
        }
        ctx.globalAlpha = 1.0;

        // Register and load fonts
        registerFont('assets/fonts/dejavu-sans/DejaVuSans-Bold.ttf', { family: 'DejaVuSans-Bold' });
        registerFont('assets/fonts/dejavu-sans/DejaVuSans.ttf', { family: 'DejaVuSans' });

        const textLarge = "CodeBeats";
        const textSmall = "Study & Relax";

        // Calculate positions for the text
        ctx.font = '110px "DejaVuSans-Bold"';
        const textLargeWidth = ctx.measureText(textLarge).width;
        const textLargeHeight = 110; // Font size

        ctx.font = '90px "DejaVuSans"';
        const textSmallWidth = ctx.measureText(textSmall).width;
        const textSmallHeight = 90; // Font size

        const xLarge = (width - textLargeWidth) / 2;
        const yLarge = (height - (textLargeHeight + textSmallHeight)) / 2 + 80;

        const xSmall = (width - textSmallWidth) / 2;
        const ySmall = yLarge + (textLargeHeight / 1.1);

        // Add shadow for the text
        const shadowOffset = 2;
        ctx.fillStyle = 'black';
        ctx.font = '110px "DejaVuSans-Bold"';
        ctx.fillText(textLarge, xLarge + shadowOffset, yLarge + shadowOffset);
        ctx.font = '90px "DejaVuSans"';
        ctx.fillText(textSmall, xSmall + shadowOffset, ySmall + shadowOffset);

        // Add the text
        ctx.fillStyle = 'white';
        ctx.font = '110px "DejaVuSans-Bold"';
        ctx.fillText(textLarge, xLarge, yLarge);

        ctx.fillStyle = 'lightgrey';
        ctx.font = '90px "DejaVuSans"';
        ctx.fillText(textSmall, xSmall, ySmall);

        // Save the image
        const outputBuffer = canvas.toBuffer('image/png');
        fs.writeFileSync(this.outputPath, outputBuffer);
    }

    async resizeImage(imagePath: string, outputPath: string, width: number, height: number) {
        const imageBuffer = fs.readFileSync(imagePath);
        const image = await sharp(imageBuffer).resize(width, height).toBuffer();
        fs.writeFileSync(outputPath, image);
    }

    async compressImage(imagePath: string, outputPath: string, quality: number) {
        const imageBuffer = fs.readFileSync(imagePath);
        const image = await sharp(imageBuffer).jpeg({ quality }).toBuffer();
        fs.writeFileSync(outputPath, image);
    }
}

async function main() {
    const imagePath = 'assets/images/5.png';
    const outputPath = 'assets/thumbs/5.png';
    const generator = new ThumbnailGenerator(imagePath, outputPath);
    await generator.generateThumbnail();
    // resize the image
    await generator.resizeImage(outputPath, outputPath, 1280, 720);

    // optimize the image
    await generator.compressImage(outputPath, outputPath, 80);
}

main().catch(console.error);
