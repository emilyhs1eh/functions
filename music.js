document.addEventListener('DOMContentLoaded', function () {
    var player = document.getElementById('main-audio');
    var songButtons = document.querySelectorAll('.song-title');

    songButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Update the source of the audio player
            player.src = this.getAttribute('data-src');
            // Play the new track
            player.play();

            // Set all song titles back to their original color (assuming default is not black)
            songButtons.forEach(function (btn) {
                btn.style.color = ''; // Reset to default color
            });

            // Change the clicked song title's color to black
            this.style.color = 'black';
        });
    });
});
