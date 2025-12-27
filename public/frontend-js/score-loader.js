// Function to fetch the score from the server
const API_BASE_URL = "http://localhost:3000/api/v1";
let leaderboardData = [];

function fetchScore() {
    const scoreElement = document.getElementById('highscores');
    const loadingIndicator = document.getElementById('loading-indicator');

    // Show loading indicator before the request starts
    loadingIndicator.style.display = 'block';

    $.ajax({
        url: 'http://localhost:3000/api/v1/products',
        type: 'GET',
        dataType: 'json',
        crossDomain: true, // Explicitly tells jQuery this is a CORS request
        xhrFields: {
            withCredentials: false // Set to true only if using Cookies/Sessions
        },
        success: function(data) {
            //const datax = data.json();
            console.log('Highscores loaded:', data);
            leaderboardData = data;//.json();
            renderHighscores(data); // Function to display data on your UI
        },
        error: function(xhr, status, error) {
            console.error('Could not fetch highscores:', error);
            console.error('There has been a problem with your fetch operation:', error);
            scoreElement.textContent = 'Error loading score';
        }
    });

        loadingIndicator.style.display = 'none';
}

// Initial load when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
    fetchScore();
    // Update the score every 5 seconds (5000 milliseconds) automatically
    //setInterval(fetchScore, 5000);
});

// Function to allow manual updates via the button
function loadScore() {
    fetchScore();
}

function renderHighscores(data) {
    const scoreElement = document.getElementById('highscores');
    scoreElement.innerHTML = '';
    data.forEach((item, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.id} ${item.idplay}</td>
                <td>${item.name}</td>
                <td>${item.score}</td>
                <td>
                    <button onclick="toggleFollow(${item.id})" class="${item.isFollowing ? 'text-red-500' : 'text-blue-500'}">
                    ${item.isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                    <button onclick="loadFollow('${item.id}')" class="ml-4 text-gray-500">Follower</button>
                    <br>Share:<br>
                    <button onclick="shareWA('${item.name}', ${item.score})" class="ml-4 text-gray-500">WA</button>
                    <button onclick="shareTE('${item.name}', ${item.score})" class="ml-4 text-gray-500">Tele</button>
                    <button onclick="shareFB('${item.name}', ${item.score})" class="ml-4 text-gray-500">FB</button>
                </td>
            </tr>
        `;
        scoreElement.insertAdjacentHTML('beforeend', row);
    });
    
}