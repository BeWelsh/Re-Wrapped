import React from 'react'
import './App.css'
import GetAccessToken from './GetAccessToken.jsx'
import { useState } from 'react';
import TopArtistsDisplay from '../Components/TopArtists.jsx'
import TopGenres from '../Components/TopGenres.jsx';
import HorizontalPages from '../Components/HorizontalPages.jsx';
import TopTracks from '../Components/TopTracks.jsx'
import UserColor from '../Components/UserColor.jsx'

function App() {
    //Probably a bad area to store sensitive info like CID
    const CLIENT_ID = "0f36460fb586415ca4290ffdc712ea68";
    const REDIRECT_URI = "http://localhost:5173/callback";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const SCOPES = [
        "user-top-read",
        "user-read-recently-played",
    ].join("%20"); // Join scopes with %20 (URL encoded space)

    const [haveData, setHaveData] = useState(false)
    const [topArtists, setTopArtists] = useState([]);
    const [topGenres, setTopGenres] = useState([]);
    const [tracks,setTracks] = useState([])

    const handleLogin = () => {
        window.location.href = `${AUTH_ENDPOINT}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
            REDIRECT_URI
        )}&scope=${SCOPES}`; // Rediarect to Spotify's authentication page
    };

    if(!haveData){
        return (
            <div>
                <h1>Log into Spotify</h1>
                <button onClick={handleLogin}>Get Your Re-Wrapped</button>
                <GetAccessToken setTopArtists={setTopArtists} setTopGenres={setTopGenres} setHaveData={setHaveData} setTracks={setTracks}/>
            </div>
        );
    }
    const pages = [<TopArtistsDisplay topArtists={topArtists}/>,
                   <TopGenres genreData={topGenres} />,
                   <TopTracks t={tracks} />,
                   <UserColor tracks={tracks} />
                ]
    return <HorizontalPages pages ={pages} />
}

export default App

//AQBbTQ8kVnJsSlUjUny1zKZYZCgIj3TtokN2JzaEAAMQUFGGvEjdj6Qa_SsnmRmXfhgrpNM1g6uRHGwDrLiWQvHuNOKbqh2oVeDKDUqe8Asi0OO8XiNwxApHkkNp9ahZc52kLZ7YSAJJN0WUKdrD_A5ivhf3LVeZT-dJINc9mzzF-rdZjHyH3clAaxRgE6dlQd79qiuBJvHv_gnRBCC7bNj0W0UXbUHO5a6HoQ