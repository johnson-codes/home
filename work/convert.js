document.getElementById('videoInput').addEventListener('change', function(event) {
    console.log("File input changed."); // Debug log
    const file = event.target.files[0];
    if (file) {
        console.log("File found: ", file.name); // Debug log
        convertToMp3(file);
    } else {
        console.log("No file selected."); // Debug log
    }
});

async function convertToMp3(file) {
    console.log("Starting conversion for: ", file.name); // Debug log
    const { createFFmpeg, fetchFile } = FFmpeg;
    const ffmpeg = createFFmpeg({ log: true });
    try {
        await ffmpeg.load();
        console.log("FFmpeg loaded."); // Debug log

        ffmpeg.FS('writeFile', file.name, await fetchFile(file));
        console.log("File written to FFmpeg filesystem."); // Debug log

        await ffmpeg.run('-i', file.name, '-vn', '-ar', '44100', '-ac', '2', '-b:a', '192k', 'output.mp3');
        console.log("Conversion complete."); // Debug log

        const data = ffmpeg.FS('readFile', 'output.mp3');
        const audioUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' }));
        
        const audioElement = document.getElementById('audioResult');
        audioElement.src = audioUrl;
        audioElement.hidden = false;
        console.log("Audio element updated."); // Debug log

        // Create and display a download button
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download MP3';
        downloadButton.onclick = function() {
            const link = document.createElement('a');
            link.href = audioUrl;
            link.download = 'converted.mp3';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log("Download initiated."); // Debug log
        };
        document.body.appendChild(downloadButton); // Append the button to the body
        console.log("Download button added."); // Debug log
    } catch (error) {
        console.error("Error during conversion: ", error); // Error log
    }
}
