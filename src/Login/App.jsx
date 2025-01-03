import React from 'react'
import './App.css'

function App() {
    //Probably a bad area to store sensitive info like CID
    const CLIENT_ID = "0f36460fb586415ca4290ffdc712ea68";
    const REDIRECT_URI = "http://localhost:8080/callback";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const SCOPES = [
        "user-top-read",
        "user-read-recently-played",
    ].join("%20"); // Join scopes with %20 (URL encoded space)

    const handleLogin = () => {
        window.location.href = `${AUTH_ENDPOINT}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
            REDIRECT_URI
        )}&scope=${SCOPES}`; // Redirect to Spotify's authentication page
    };

    return (
        <div>
            <h1>Log into Spotify</h1>
            <button onClick={handleLogin}>Get Your Re-Wrapped</button>
        </div>
    );
}

export default App

//AQBbTQ8kVnJsSlUjUny1zKZYZCgIj3TtokN2JzaEAAMQUFGGvEjdj6Qa_SsnmRmXfhgrpNM1g6uRHGwDrLiWQvHuNOKbqh2oVeDKDUqe8Asi0OO8XiNwxApHkkNp9ahZc52kLZ7YSAJJN0WUKdrD_A5ivhf3LVeZT-dJINc9mzzF-rdZjHyH3clAaxRgE6dlQd79qiuBJvHv_gnRBCC7bNj0W0UXbUHO5a6HoQ