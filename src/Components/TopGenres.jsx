const GenreJson = {
    "top_genres": [
      { "genre": "poop", "count": 2 },
      { "genre": "rock", "count": 1 },
      { "genre": "dance pop", "count": 1 },
      { "genre": "alternative rock", "count": 1 },
      { "genre": "indie pop", "count": 1 }
    ]
} 

export {GenreJson} 

import React from "react";
import "../Style/TopGenres.css";

const TopGenres = ({ genreData }) => {
  // Safely handle the array of genres
  const genres = genreData?.top_genres || [];

  // Get only the top 5
  const topFive = genres.slice(0, 5);

  return (
    <div className="genres-container">
      <h2>Your Top Genres</h2>
      <ul className="genres-list">
        {topFive.map((item, index) => (
          <li key={index} className="genre-item">
            <span className="genre-rank">{index + 1}.</span>
            <span className="genre-name">{item.genre}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopGenres;