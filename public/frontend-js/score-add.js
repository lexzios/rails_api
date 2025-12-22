const highscoreForm = document.getElementById('highscore-form');

highscoreForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop page from refreshing

    const name = document.getElementById('player-name').value;
    const score = document.getElementById('player-score').value;
    const idplay = document.getElementById('player-id').value;
    const now_utc_string = new Date().toISOString();

    const newScore = {
        name: name,
        score: parseInt(score),
        last_update: now_utc_string,
        idplay: idplay
    };

    try {
        const response = await fetch('http://localhost:3000/api/v1/products', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newScore)
        });

        if (response.ok) {
            console.log('Score saved!');
            highscoreForm.reset(); // Clear form fields
            loadHighscores();      // Refresh the table to show the new entry
        } else {
            console.error('Failed to save score');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
});