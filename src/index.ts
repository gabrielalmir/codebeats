import { existsSync } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { VideoUtils } from './video';

class App {
    async main() {
        const imagePath = path.join('assets', 'images', '13.png');
        const audioDir = path.join('assets', 'audios');
        const audioFiles = await VideoUtils.getAudioFiles(audioDir);

        console.log(`Found ${audioFiles.length} audio files`);

        const threads = 12;
        const selectedAudioFiles = [];
        const numberOfVideos = 50;

        for (let i = 0; i < numberOfVideos; i++) {
            const audioFile = audioFiles[Math.floor(Math.random() * audioFiles.length)];
            audioFiles.splice(audioFiles.indexOf(audioFile), 1);
            selectedAudioFiles.push(audioFile);
        }

        const finalAudioFile = path.join('assets', 'output', 'final.mp3');
        // await VideoUtils.concatAudioFiles(selectedAudioFiles, finalAudioFile);

        const secondaryOutputFile = path.join('assets', 'output', 'secondary.mp4');
        const finalOutputFile = path.join('assets', 'output', 'final.mp4')

        await VideoUtils.createVideo(imagePath, finalAudioFile, secondaryOutputFile, threads);
        await VideoUtils.concatVideoFiles([secondaryOutputFile, secondaryOutputFile, secondaryOutputFile, secondaryOutputFile], finalOutputFile, threads);

        console.log('Deleting temporary files ...')
        for (const video of selectedAudioFiles) {
            if (existsSync(video)) {
                await fs.rm(video)
            }
        }

        console.log(`Final video created at ${finalOutputFile}`);
    }
}

const app = new App()
app.main().catch(console.error)
