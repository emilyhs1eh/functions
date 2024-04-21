document.addEventListener("DOMContentLoaded", function() {
    const mainAudio = document.getElementById("main-audio");
    const trackTitles = document.querySelectorAll(".song-title");

    trackTitles.forEach(track => {
        track.addEventListener("click", function() {
            if (mainAudio.src !== this.getAttribute("data-src")) {
                mainAudio.src = this.getAttribute("data-src");
                mainAudio.load();  // Load the new source
                mainAudio.play();  // Play the new track
            } else {
                if (mainAudio.paused) {
                    mainAudio.play();  // Resume if paused
                } else {
                    mainAudio.pause();  // Pause if playing
                }
            }

            // Update UI to reflect the currently playing or paused track
            trackTitles.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
});



