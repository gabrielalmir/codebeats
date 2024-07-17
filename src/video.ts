import ffmpeg from '@ffmpeg-installer/ffmpeg';
import fluentFfmpeg from 'fluent-ffmpeg';
import { promises as fs } from 'fs';
import path from 'path';

fluentFfmpeg.setFfmpegPath(ffmpeg.path);

export class VideoUtils {
    static async getAudioFiles(dir: string): Promise<string[]> {
        console.log(`Getting audio files from ${dir}`);
        const files = await fs.readdir(dir);
        return files.filter(async file => (await fs.lstat(path.join(dir, file))).isFile()).map(file => path.join(dir, file));
    }

    static async concatAudioFiles(audioFiles: string[], outputFile: string, threads: number = 1): Promise<void> {
        const listFile = 'audios.txt';
        await fs.writeFile(listFile, audioFiles.map(file => `file '${file}'`).join('\n'));

        return new Promise((resolve, reject) => {
            fluentFfmpeg()
                .input(listFile)
                .inputOptions(['-f concat', '-safe 0'])
                .output(outputFile)
                .outputOptions(`-threads ${threads}`)
                .on('end', async () => {
                    await fs.unlink(listFile);
                    resolve();
                })
                .on('start', commandLine => console.log(`Spawned FFmpeg with command: ${commandLine}`))
                .on('stderr', stderrLine => console.log(`FFmpeg stderr: ${stderrLine}`))
                .on('error', reject)
                .run();
        });
    }

    static createVideo(imageFile: string, audioFile: string, outputFile: string, threads: number): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log(`Creating video with image ${imageFile} and audio ${audioFile}`);
            fluentFfmpeg()
                .input(imageFile)
                .inputOptions(['-loop 1'])
                .input(audioFile)
                .output(outputFile)
                .videoCodec('h264_nvenc')
                .audioCodec('aac')
                .outputOptions([
                    '-tune stillimage',
                    '-b:a 192k',
                    '-pix_fmt yuv420p',
                    '-shortest',
                    `-threads ${threads}`
                ])
                .on('end', resolve)
                .on('error', reject)
                .on('start', commandLine => console.log(`Spawned FFmpeg with command: ${commandLine}`))
                .on('stderr', stderrLine => console.log(`FFmpeg stderr: ${stderrLine}`))
                .run();
        });
    }

    static async concatVideoFiles(videoFiles: string[], outputFile: string, threads: number = 1): Promise<void> {
        const listFile = 'videos.txt';
        await fs.writeFile(listFile, videoFiles.map(file => `file '${file}'`).join('\n'));

        return new Promise((resolve, reject) => {
            fluentFfmpeg()
                .input(listFile)
                .inputOptions(['-f concat', '-safe 0'])
                .output(outputFile)
                .outputOptions(`-threads ${threads}`)
                .on('end', async () => {
                    await fs.unlink(listFile);
                    resolve();
                })
                .on('start', commandLine => console.log(`Spawned FFmpeg with command: ${commandLine}`))
                .on('stderr', stderrLine => console.log(`FFmpeg stderr: ${stderrLine}`))
                .on('error', reject)
                .run();
        });
    }
}
