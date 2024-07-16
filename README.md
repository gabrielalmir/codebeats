
# CodeBeats Lo-fi for Study and Relaxation

## Description
The **CodeBeats** project is a video generator that combines images and audio to create relaxing videos for study and relaxation. It also includes a functionality to generate custom thumbnails for the generated videos. The project uses libraries such as `fluent-ffmpeg`, `sharp`, and `canvas` for media manipulation.

## Project Structure

```plaintext
.
├── src
│   ├── index.ts          # Main application file
│   ├── thumbnail.ts      # Script for thumbnail generation
│   ├── utils.ts          # Utilities and decorators like 'benchmark'
│   └── video.ts          # VideoUtils class with video manipulation functions
├── assets
│   ├── audios            # Directory containing audio files
│   ├── images            # Directory containing images
│   ├── output            # Directory for generated video files
│   ├── fonts             # Directory containing fonts for thumbnails
│   └── thumbs            # Directory for generated thumbnails
├── dist                  # Output directory for built files
├── package.json
└── README.md             # This file
```

## Features

1. **Video Generation**: Combines an image with audio files to create videos.
2. **Video Concatenation**: Joins multiple video files into a single file.
3. **Thumbnail Generation**: Creates custom thumbnails for the generated videos.
4. **Image Optimization**: Resizes and compresses thumbnails for optimization.

## How to Use

### Prerequisites
- Node.js
- Bun.sh (optional, but recommended for faster execution and build)
- FFmpeg (required for video manipulation)

### Installation
1. Clone the repository:
    ```sh
    git clone <REPOSITORY_URL>
    cd codebeats
    ```

2. Install dependencies:
    ```sh
    npm install
    # or, if using bun
    bun install
    ```

### Execution
1. To start the main application:
    ```sh
    npm start
    # or, if using bun
    bun run src/index.ts
    ```

2. To generate thumbnails:
    ```sh
    npm run thumb
    # or, if using bun
    bun run src/thumbnail.ts
    ```

### Build
1. To build the application:
    ```sh
    npm run build
    # or, if using bun
    bun build src/index.ts --minify --outdir dist --target=node
    ```

2. To build the thumbnail generator:
    ```sh
    npm run build:thumb
    # or, if using tsup
    tsup src/thumbnail.ts --minify
    ```

## File and Directory Structure

- `src/index.ts`: Entry point of the application that generates the videos.
- `src/thumbnail.ts`: Script to generate thumbnails for the videos.
- `src/utils.ts`: Utilities and helper functions.
- `src/video.ts`: `VideoUtils` class containing methods for video manipulation.
- `assets/audios`: Contains the audio files to be used in the videos.
- `assets/images`: Contains the images to be used in the videos.
- `assets/output`: Directory where the generated videos will be saved.
- `assets/fonts`: Contains the fonts used to generate the thumbnails.
- `assets/thumbs`: Directory where the generated thumbnails will be saved.

## Contribution
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

