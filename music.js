document.addEventListener("DOMContentLoaded", function() {
    const mainAudio = document.getElementById("main-audio");
    const audioSource = mainAudio.querySelector('source');  // Ensure you target the source element
    const trackTitles = document.querySelectorAll(".song-title");

    trackTitles.forEach(track => {
        track.addEventListener("click", function() {
            let newSrc = this.getAttribute("data-src");
            if (audioSource.src !== newSrc) {
                audioSource.src = newSrc;  // Update the source element's src attribute
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



