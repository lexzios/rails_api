// const API_BASE_URL = "http://localhost:3000/api/v1";

// // This replaces the old hardcoded leaderboardData
// let leaderboardData = [];

// // 1. Fetch data from Rails
// async function fetchLeaderboard() {
//     try {
//         const response = await fetch(`${API_BASE_URL}/leaderboard`);
//         if (!response.ok) throw new Error("Network response was not ok");
        
//         leaderboardData = await response.json();
//         renderLeaderboard(); // Draw the table once data arrives
//     } catch (error) {
//         console.error("Error fetching leaderboard:", error);
//         // Fallback or error message in UI
//     }
// }

// 2. Update Follow status in Database
async function toggleFollow(targetId) {
    const player = leaderboardData.find(p => p.id === targetId);
    const action = player.following ? 'unfollow' : 'follow';
    console.log(player.id);

    
    $.ajax({
        url: `${API_BASE_URL}/follow/`+player.id,//'http://localhost:3000/api/v1/products',
        type: 'POST',
        dataType: 'json',
        crossDomain: true, // Explicitly tells jQuery this is a CORS request
        xhrFields: {
            withCredentials: false // Set to true only if using Cookies/Sessions
        },
        success: function(data) {
            //const datax = data.json();
            console.log('Highscores loaded:', data);
            leaderboardData = data;//.json();
            player.following = !player.following;
            fetchScore(); // Function to display data on your UI
        },
        error: function(xhr, status, error) {
            console.error('Could not fetch highscores:', error);
            console.error('There has been a problem with your fetch operation:', error);
            scoreElement.textContent = 'Error loading score';
        }
    });
      
}

function loadFollow(id) {
    const scoreElement = document.getElementById('highscores');
    const loadingIndicator = document.getElementById('loading-indicator');

    // Show loading indicator before the request starts
    loadingIndicator.style.display = 'block';

    $.ajax({
        url: `${API_BASE_URL}/follow/`+id,
        type: 'GET',
        dataType: 'json',
        crossDomain: true, // Explicitly tells jQuery this is a CORS request
        xhrFields: {
            withCredentials: false // Set to true only if using Cookies/Sessions
        },
        success: function(data) {
            //const datax = data.json();
            console.log('Follower loaded:', data);
            //fetchScore(); // Function to display data on your UI
            alert(data.followers_count+' Follower ('+JSON.stringify(data.followers)+')');
        },
        error: function(xhr, status, error) {
            console.error('Could not fetch highscores:', error);
            console.error('There has been a problem with your fetch operation:', error);
            scoreElement.textContent = 'Error loading score';
        }
    });

        loadingIndicator.style.display = 'none';
}


// 3. Submit Edit/Score to Rails
async function updateMyProfile() {
    const name = document.getElementById('edit-name').value;
    const score = document.getElementById('edit-score').value;

    const response = await fetch(`${API_BASE_URL}/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        crossDomain: true, // Explicitly tells jQuery this is a CORS request
        xhrFields: {
            withCredentials: false // Set to true only if using Cookies/Sessions
        },
        body: JSON.stringify({ username: name, score: score })
    });

    if (response.ok) {
        alert("Score synced with server!");
        fetchScore(); // Refresh the list to see your new rank
    }
}

function shareWA(playerName, score) {
  const text = `I just scored ${score} points Here! Can you beat me?`;
  const url = window.location.href;

  const platforms = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  };

  // Example: Opening WhatsApp
  window.open(platforms.whatsapp, '_blank');
}


function shareTE(playerName, score) {
  const text = `I just scored ${score} points Here! Can you beat me?`;
  const url = window.location.href;

  const platforms = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  };

  // Example: Opening WhatsApp
  window.open(platforms.telegram, '_blank');
}


function shareFB(playerName, score) {
  const text = `I just scored ${score} points Here! Can you beat me?`;
  const url = window.location.href;

  const platforms = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  };

  // Example: Opening WhatsApp
  window.open(platforms.facebook, '_blank');
}
