import { useEffect, useState } from "react";
import {topArtistsJson} from '../Components/TopArtists.jsx'
import {GenreJson} from '../Components/TopGenres.jsx'
import {topTracks} from '../Components/TopTracks.jsx'
//Secret: "8f7efe34265748668d254a3da349f30c"
/**
 * This will check the callback url for a code
 * If there is one,
 */
const CallbackPage = ({ setTopArtists, setTopGenres, setHaveData, setTracks}) => {
    const queryParams = new URLSearchParams(window.location.search);
    //Gets the specific code from the url, if none returns:
    const code = queryParams.get("code");

    let foundCode = false

    useEffect(() => {
        //Gets all parameters from the url
        const queryParams = new URLSearchParams(window.location.search);
        //Gets the specific code from the url, if none returns:
        let code = queryParams.get("code");

        if (code) {
            // Send the code to your backend to exchange for tokens
            //exchangeCodeForToken(code)
            //fetchAccessToken(code);
            //skip intermediate steps, automatically have json
            setHaveData(true)
            setTopArtists(topArtistsJson)
            setTopGenres(GenreJson)
            setTracks(topTracks)
        }
    }, []);

};

//Interacts with the backend 
const exchangeCodeForToken = async (code) => {
    try {
      console.log(code)
      const response = await fetch('http://localhost:8080/api/spotify/exchange-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      // Handle the response from your backend
      if (response.ok) {
        const data = await response.json();
        console.log('Tokens from backend:', data);
      } else {
        console.error('Failed to exchange code');
      }
    } catch (error) {
      console.error('Network error exchanging code:', error);
    }
  };


export default CallbackPage;
