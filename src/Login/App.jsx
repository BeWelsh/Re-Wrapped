import './App.css'

function App() {
    //Probably a bad area to store sensitive info like CID
    //Replace with kaylees stuff
    const CLIENT_ID = "15c2b61c4ff349a6bb4821383d89dc1f";
    const REDIRECT_URI = "http://localhost:5173/callback";
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
