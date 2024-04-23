document.addEventListener("DOMContentLoaded", function() {
    const mainAudio = document.getElementById("main-audio");
    const audioSource = mainAudio.querySelector('source');
    const trackTitles = document.querySelectorAll(".song-title");

    trackTitles.forEach(track => {
        track.addEventListener("click", function() {
            let newSrc = this.getAttribute("data-src");
            if (audioSource.src !== newSrc) {
                audioSource.src = newSrc;
                mainAudio.load();  // Load the new source

                // Play the new track after ensuring load is complete
                mainAudio.oncanplay = function() {
                    mainAudio.play().catch(e => console.error("Error attempting to play audio:", e));
                };
            } else {
                togglePlayPause();
            }

            // Update UI to reflect the currently playing or paused track
            trackTitles.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    function togglePlayPause() {
        if (mainAudio.paused) {
            mainAudio.play().catch(e => console.error("Error attempting to play audio:", e));
        } else {
            mainAudio.pause();
        }
    }
});



