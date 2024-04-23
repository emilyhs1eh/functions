document.addEventListener("DOMContentLoaded", function() {
    const mainAudio = document.getElementById("main-audio");
    const audioSource = mainAudio.querySelector('source');
    const trackTitles = document.querySelectorAll(".song-title");

    // Function to handle track switching
    function switchTrack(newSrc) {
        if (audioSource.src !== newSrc) {
            audioSource.src = newSrc;  // Update the source element's src attribute
            mainAudio.load();  // Load the new source
            mainAudio.play();  // Start playing the new track
        } else {
            // Toggle play/pause if the same track is clicked
            if (mainAudio.paused) {
                mainAudio.play();
            } else {
                mainAudio.pause();
            }
        }
    }

    // Setting up event listeners for all track title buttons
    trackTitles.forEach(track => {
        track.addEventListener("click", function() {
            let newSrc = this.getAttribute("data-src");
            switchTrack(newSrc);

            // Update UI to reflect the currently playing or paused track
            trackTitles.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Optional: Handling a general play/pause button if present in the HTML
    const playButton = document.getElementById("playButton");
    if (playButton) {
        playButton.addEventListener('click', () => {
            if (mainAudio.paused) {
                mainAudio.play();
            } else {
                mainAudio.pause();
            }
        });
    }
});
