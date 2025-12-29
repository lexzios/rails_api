import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

const API_BASE_URL = "http://localhost:3000/api/v1";


function App() {
   const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Form State
    const [formData, setFormData] = useState({
        playerId: '',
        playerName: '',
        playerScore: ''
    });

    // 1. Fetch Scores (Equivalent to fetchScore/loadScore)
    const fetchScores = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/products`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });
            if (!response.ok) throw new Error('Failed to fetch highscores');
            const data = await response.json();
            setScores(data);
        } catch (err) {
            console.error('Could not fetch highscores:', err);
            setError('Error loading score');
        } finally {
            setLoading(false);
        }
    };

    // Load data on component mount
    useEffect(() => {
        fetchScores();
    }, []);

    // 2. Handle Form Submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const now_utc_string = new Date().toISOString();

        const newScore = {
            name: formData.playerName,
            score: parseInt(formData.playerScore),
            last_update: now_utc_string,
            idplay: formData.playerId
        };

        try {
            const response = await fetch(`${API_BASE_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newScore)
            });

            if (response.ok) {
                console.log('Score saved!');
                setFormData({ playerId: '', playerName: '', playerScore: '' }); // Reset form
                fetchScores(); // Refresh list
            } else {
                console.error('Failed to save score');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    // 3. Toggle Follow
    const toggleFollow = async (item) => {
        try {
            const response = await fetch(`${API_BASE_URL}/follow/${item.id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (response.ok) {
                // In the original code, the logic updates the local state and re-fetches
                fetchScores();
            }
        } catch (err) {
            console.error('Error toggling follow:', err);
        }
    };

    // 4. Load Follower Info
    const loadFollow = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/follow/${id}`);
            const data = await response.json();
            alert(`${data.followers_count} Follower (${JSON.stringify(data.followers)})`);
        } catch (err) {
            console.error('Error loading followers:', err);
            setError('Error loading follower data');
        } finally {
            setLoading(false);
        }
    };

    // 5. Social Sharing Functions
    const shareWA = (name, score) => {
        const text = `Check out ${name}'s high score of ${score}!`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const shareTE = (name, score) => {
        const text = `Check out ${name}'s high score of ${score}!`;
        window.open(`https://t.me/share/url?url=${window.location.href}&text=${encodeURIComponent(text)}`, '_blank');
    };

    const shareFB = (name, score) => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank');
    };

  return (
    <div className="container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>High Scores</h1>
            
            <table id="highscores-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                        <th>Rank</th>
                        <th>Follower</th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((item, index) => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td>{index + 1}</td>
                            <td>{item.id} {item.idplay}</td>
                            <td>{item.name}</td>
                            <td>{item.score}</td>
                            <td>
                                <button 
                                    onClick={() => toggleFollow(item)} 
                                    style={{ color: item.isFollowing ? 'red' : 'blue', cursor: 'pointer', border: 'none', background: 'none' }}
                                >
                                    {item.isFollowing ? 'Unfollow' : 'Follow'}
                                </button>
                                <button 
                                    onClick={() => loadFollow(item.id)} 
                                    style={{ marginLeft: '16px', color: 'gray', cursor: 'pointer', border: 'none', background: 'none' }}
                                >
                                    Follower
                                </button>
                                <div style={{ marginTop: '5px', fontSize: '12px' }}>
                                    Share: 
                                    <button onClick={() => shareWA(item.name, item.score)} style={{ marginLeft: '10px', color: 'gray', border: 'none', background: 'none', cursor: 'pointer' }}>WA</button>
                                    <button onClick={() => shareTE(item.name, item.score)} style={{ marginLeft: '10px', color: 'gray', border: 'none', background: 'none', cursor: 'pointer' }}>Tele</button>
                                    <button onClick={() => shareFB(item.name, item.score)} style={{ marginLeft: '10px', color: 'gray', border: 'none', background: 'none', cursor: 'pointer' }}>FB</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {loading && <p id="loading-indicator">Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <button onClick={fetchScores} style={{ marginBottom: '20px', padding: '8px 16px' }}>
                Refresh Score List
            </button>

            <form onSubmit={handleFormSubmit} id="highscore-form" style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
                <input 
                    type="text" 
                    placeholder="Code" 
                    value={formData.playerId}
                    onChange={(e) => setFormData({...formData, playerId: e.target.value})}
                    required 
                    style={{ marginBottom: '10px', padding: '8px' }}
                /><br />
                <input 
                    type="text" 
                    placeholder="Player Name" 
                    value={formData.playerName}
                    onChange={(e) => setFormData({...formData, playerName: e.target.value})}
                    required 
                    style={{ marginBottom: '10px', padding: '8px' }}
                /><br />
                <input 
                    type="number" 
                    placeholder="Score" 
                    value={formData.playerScore}
                    onChange={(e) => setFormData({...formData, playerScore: e.target.value})}
                    required 
                    style={{ marginBottom: '10px', padding: '8px' }}
                /><br />
                <button type="submit" className="home-btn" style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                    Submit Score
                </button>        
            </form>
        </div>
  );
}

export default App;
