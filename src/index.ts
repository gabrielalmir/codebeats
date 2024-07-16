import { randomUUID } from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { benchmark } from './utils';
import { VideoUtils } from './video';

class App {
    @benchmark
    async main() {
        const imagePath = path.join('assets', 'images', '4.png');
        const audioDir = path.join('assets', 'audios');
        const audioFiles = await VideoUtils.getAudioFiles(audioDir);

        console.log(`Found ${audioFiles.length} audio files`);

        const videoFiles = [];
        const numberOfVideos = 20;

        for (let i = 0; i < numberOfVideos; i++) {
            const audioFile = audioFiles[Math.floor(Math.random() * audioFiles.length)];
            audioFiles.splice(audioFiles.indexOf(audioFile), 1);

            const videoFile = path.join('assets', 'output', 'temp', `${randomUUID().toString()}.mp4`);
            await VideoUtils.createVideo(imagePath, audioFile, videoFile, 4);

            videoFiles.push(videoFile);
            console.log(`Created video ${videoFile} for audio ${audioFile}`);
        }

        const secondaryOutputFile = path.join('assets', 'output', 'secondary.mp4');
        const finalOutputFile = path.join('assets', 'output', 'final.mp4')

        await VideoUtils.concatVideoFiles(videoFiles, secondaryOutputFile, 4);
        await VideoUtils.concatVideoFiles([secondaryOutputFile, secondaryOutputFile], finalOutputFile, 4);

        console.log('Deleting temporary files ...')
        for (const video of videoFiles) {
            if (await fs.exists(video)) {
                await fs.rm(video)
            }
        }

        console.log(`Final video created at ${secondaryOutputFile}`);
    }
}

const app = new App()
app.main().catch(console.error)
