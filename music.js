document.addEventListener("DOMContentLoaded", function() {
    const mainAudio = document.getElementById("main-audio");
    const audioSource = mainAudio.querySelector('source');
    const trackTitles = document.querySelectorAll(".song-title");

    // Function to handle track switching
    function switchTrack(newSrc) {
        if (audioSource.src !== newSrc) {
            audioSource.src = newSrc;  
            mainAudio.load();  
            mainAudio.play();  
        } else {
       
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

      
            trackTitles.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });


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
