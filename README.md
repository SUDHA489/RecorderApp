# Voice Recorder App

This is a simple Voice Recorder App built using HTML, CSS, and JavaScript. The app allows users to record audio using their device's microphone and play back the saved recordings.

## Features

- Record audio directly from the browser.
- Save recordings as playable audio files.
- Simple and intuitive user interface.

## Requirements

- Modern web browser with support for `MediaRecorder` API (e.g., Chrome, Edge, Firefox).
- Cordova CLI (for running the app as a mobile application).

## Installation

### Prerequisites

1. Install [Node.js](https://nodejs.org/) and npm.
2. Install Cordova globally using the command:
   ```bash
   npm install -g cordova
   ```

### Steps

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Navigate to the project directory:
   ```bash
   cd [project-directory]
   ```

3. Add the Android platform (or your target platform):
   ```bash
   cordova platform add android
   ```

4. Build the app:
   ```bash
   cordova build android
   ```

5. Run the app:
   ```bash
   cordova run android
   ```

## Usage

1. Open the app on your device or browser.
2. Click the "Record" button to start recording.
3. Click the "Stop" button to end the recording.
4. Play the saved recording using the audio player.

## File Structure

```
.
├── css
│   └── index.css         # Styles for the app
├── js
│   └── index.js          # Core functionality of the app
├── res
│   ├── images/           # App icons and images
│   └── xml/
├── www
│   ├── index.html        # Main HTML file
│   ├── css/              # CSS files
│   └── js/               # JavaScript files
└── config.xml            # Cordova configuration
```

## Troubleshooting

- **Build errors:** Ensure that all dependencies are installed and that you are using a compatible Cordova version.
- **Audio recording issues:** Check if the browser or device has granted microphone permissions.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Live Demo

Check out the live demo of the app: https://sudha489.github.io/RecorderApp/

