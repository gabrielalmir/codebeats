import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export class ThumbnailGenerator {
    private imagePath: string;
    private outputPath: string;

    constructor(imagePath: string, outputPath: string) {
        this.imagePath = imagePath;
        this.outputPath = outputPath;
    }

    async generateThumbnail(fontSize: number = 110) {
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

        const fontSizeLarge = fontSize;
        const fontSizeSmall = fontSize - 50;

        const fontPath = path.join(__dirname, '..', 'assets', 'fonts', 'dejavu-sans');
        const fontPathBold = path.join(fontPath, 'DejaVuSans-Bold.ttf');
        const fontPathRegular = path.join(fontPath, 'DejaVuSans.ttf');

        const fontExists = fs.existsSync(fontPathBold) && fs.existsSync(fontPathRegular);
        if (!fontExists) {
            throw new Error('Font files not found');
        }

        console.log('Font files found');

        // Register and load fonts
        registerFont(fontPathBold, { family: 'DejaVuSans-Bold' });
        registerFont(fontPathRegular, { family: 'DejaVuSans' });

        const textLarge = "CodeBeats";
        const textSmall = "Study, Focus, Relax, Repeat";

        // Calculate positions for the text
        ctx.font = `${fontSizeLarge}px "DejaVuSans-Bold"`;
        const textLargeWidth = ctx.measureText(textLarge).width;
        const textLargeHeight = fontSizeLarge; // Font size

        ctx.font = `${fontSizeSmall}px "DejaVuSans"`;
        const textSmallWidth = ctx.measureText(textSmall).width;
        const textSmallHeight = fontSizeSmall; // Font size

        const xLarge = (width - textLargeWidth) / 2;
        const yLarge = (height - (textLargeHeight + textSmallHeight)) / 2 + 80;

        const xSmall = (width - textSmallWidth) / 2;
        const ySmall = yLarge + (textLargeHeight / 1.1);

        // Add shadow for the text
        const shadowOffset = 2;
        ctx.fillStyle = 'black';
        ctx.font = `${fontSizeLarge}px "DejaVuSans-Bold"`;
        ctx.fillText(textLarge, xLarge + shadowOffset, yLarge + shadowOffset);
        ctx.font = `${fontSizeSmall}px "DejaVuSans"`;
        ctx.fillText(textSmall, xSmall + shadowOffset, ySmall + shadowOffset);

        // Add the text
        ctx.fillStyle = 'white';
        ctx.font = `${fontSizeLarge}px "DejaVuSans-Bold"`;
        ctx.fillText(textLarge, xLarge, yLarge);

        ctx.fillStyle = 'lightgrey';
        ctx.font = `${fontSizeSmall}px "DejaVuSans"`;
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

