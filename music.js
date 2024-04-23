document.addEventListener('DOMContentLoaded', function () {
    var player = document.getElementById('main-audio');
    var songButtons = document.querySelectorAll('.song-title');

    songButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Update the source of the audio player
            player.src = this.getAttribute('data-src');
            // Play the new track
            player.play();
        });
    });
});