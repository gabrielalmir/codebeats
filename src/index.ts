import path from 'path';
import readline from 'readline';
import { ThumbnailGenerator } from './thumbnail';
import { VideoUtils } from './video';

class App {
    async main() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const question = 'Enter the name of the image file: ';
        const imageName = await new Promise<string>(resolve => {
            rl.question(question, resolve);
        });

        const imagePath = path.join('assets', 'images', `${imageName}.png`);
        const audioDir = path.join('assets', 'audios');
        const audioFiles = await VideoUtils.getAudioFiles(audioDir);

        console.log(`Found ${audioFiles.length} audio files`);

        const threads = 12;

        const finalAudioFile = path.join('assets', 'output', 'final.mp3');
        await VideoUtils.concatAudioFiles(audioFiles, finalAudioFile);

        const secondaryOutputFile = path.join('assets', 'output', 'secondary.mp4');
        const finalOutputFile = path.join('assets', 'output', 'final.mp4')

        await VideoUtils.createVideo(imagePath, finalAudioFile, secondaryOutputFile, threads);
        await VideoUtils.concatVideoFiles([secondaryOutputFile, secondaryOutputFile, secondaryOutputFile, secondaryOutputFile], finalOutputFile, threads);

        console.log(`Final video created at ${finalOutputFile}`);

        const outputPath = path.join('assets', 'thumbs', `${imageName}.png`);
        const generator = new ThumbnailGenerator(imagePath, outputPath);
        await generator.generateThumbnail();

        // resize the image
        await generator.resizeImage(outputPath, outputPath, 1280, 720);

        // optimize the image
        await generator.compressImage(outputPath, outputPath, 80);
    }
}

const app = new App()
app.main().catch(console.error)
