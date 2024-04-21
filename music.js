document.addEventListener("DOMContentLoaded", function() {
    const mainAudio = document.getElementById("main-audio");
    const trackTitles = document.querySelectorAll(".song-title");

    trackTitles.forEach(track => {
        track.addEventListener("click", function() {
            // Change the source of the main audio player
            mainAudio.src = this.getAttribute("data-src");
            mainAudio.load();  // Load the new source
            mainAudio.play();  // Play the new track

            // Optionally, update the UI to reflect the currently playing track
            trackTitles.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

