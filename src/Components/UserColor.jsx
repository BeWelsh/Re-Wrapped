const generateUserColor = (topTracks) => {
    if (!topTracks || topTracks.length === 0) return "#888888"; // Default gray if no data
  
    // Average Energy, Danceability, and Valence from Top 10 Songs
    let totalEnergy = 0, totalDanceability = 0, totalValence = 0;
    const numTracks = Math.min(topTracks.length, 10); // Use Top 10 tracks max
  
    topTracks.slice(0, numTracks).forEach((track) => {
      totalEnergy += track.energy;
      totalDanceability += track.danceability;
      totalValence += track.valence;
    });
  
    const avgEnergy = totalEnergy / numTracks;
    const avgDanceability = totalDanceability / numTracks;
    const avgValence = totalValence / numTracks;
  
    // Convert to RGB (scaled to 255)
    const red = Math.round(avgEnergy * 255);       // Energy → Red
    const green = Math.round(avgDanceability * 255); // Danceability → Green
    const blue = Math.round(avgValence * 255);      // Valence → Blue
  
    // Convert RGB to HEX
    const hexColor = `#${red.toString(16).padStart(2, "0")}${green.toString(16).padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
  
    return hexColor;
  };

import React from "react";
import "../Style/UserColorPage.css";

const UserColorPage = ({ tracks }) => {
    const userColor = generateUserColor(tracks["top_tracks"])
  return (
    <div className="color-page" style={{ backgroundColor: userColor }}>
      <div className="color-box">
        <h1>Your Spotify Color</h1>
        <div className="color-display" style={{ backgroundColor: userColor }}></div>
        <p className="color-code">{userColor.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default UserColorPage;
