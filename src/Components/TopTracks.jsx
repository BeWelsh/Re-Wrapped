const topTracks = {
    "top_tracks": [
      {
        "rank": 1,
        "name": "Blinding Lights",
        "artist": "The Weeknd",
        "album": "After Hours",
        "spotify_url": "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",
        "popularity": 95,
        "energy": 0.73,
        "danceability": 0.80,
        "valence": 0.55,
        "tempo": 171,
        "acousticness": 0.01,
        "x_pos": 5.3,
        "y_pos": 7.8
      },
      {
        "rank": 2,
        "name": "Bad Guy",
        "artist": "Billie Eilish",
        "album": "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
        "spotify_url": "https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m",
        "popularity": 92,
        "energy": 0.44,
        "danceability": 0.71,
        "valence": 0.56,
        "tempo": 135,
        "acousticness": 0.33,
        "x_pos": 2.1,
        "y_pos": 5.4
      },
      {
        "rank": 3,
        "name": "Uptown Funk",
        "artist": "Mark Ronson feat. Bruno Mars",
        "album": "Uptown Special",
        "spotify_url": "https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS",
        "popularity": 97,
        "energy": 0.90,
        "danceability": 0.85,
        "valence": 0.95,
        "tempo": 115,
        "acousticness": 0.02,
        "x_pos": 8.2,
        "y_pos": 9.1
      },
      {
        "rank": 4,
        "name": "Shape of You",
        "artist": "Ed Sheeran",
        "album": "÷ (Deluxe)",
        "spotify_url": "https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3",
        "popularity": 99,
        "energy": 0.65,
        "danceability": 0.82,
        "valence": 0.75,
        "tempo": 96,
        "acousticness": 0.58,
        "x_pos": 6.7,
        "y_pos": 6.3
      },
      {
        "rank": 5,
        "name": "Sicko Mode",
        "artist": "Travis Scott",
        "album": "ASTROWORLD",
        "spotify_url": "https://open.spotify.com/track/2xLMifQCjDGFmkHkpNLD9h",
        "popularity": 94,
        "energy": 0.80,
        "danceability": 0.77,
        "valence": 0.45,
        "tempo": 155,
        "acousticness": 0.10,
        "x_pos": 4.4,
        "y_pos": 8.9
      },
      {
        "rank": 6,
        "name": "Stay",
        "artist": "The Kid LAROI, Justin Bieber",
        "album": "F*CK LOVE 3: OVER YOU",
        "spotify_url": "https://open.spotify.com/track/5PjdY0CKGZdEuoNab3yDmX",
        "popularity": 93,
        "energy": 0.76,
        "danceability": 0.70,
        "valence": 0.42,
        "tempo": 169,
        "acousticness": 0.02,
        "x_pos": 3.7,
        "y_pos": 7.5
      },
      {
        "rank": 7,
        "name": "Levitating",
        "artist": "Dua Lipa",
        "album": "Future Nostalgia",
        "spotify_url": "https://open.spotify.com/track/39LLxExYz6ewLAcYrzQQyP",
        "popularity": 96,
        "energy": 0.88,
        "danceability": 0.85,
        "valence": 0.85,
        "tempo": 103,
        "acousticness": 0.12,
        "x_pos": 7.5,
        "y_pos": 6.9
      },
      {
        "rank": 8,
        "name": "Starboy",
        "artist": "The Weeknd feat. Daft Punk",
        "album": "Starboy",
        "spotify_url": "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB",
        "popularity": 94,
        "energy": 0.68,
        "danceability": 0.78,
        "valence": 0.32,
        "tempo": 186,
        "acousticness": 0.08,
        "x_pos": 5.8,
        "y_pos": 4.2
      },
      {
        "rank": 9,
        "name": "Can't Feel My Face",
        "artist": "The Weeknd",
        "album": "Beauty Behind The Madness",
        "spotify_url": "https://open.spotify.com/track/22VdIZQfgXJea34mQxlt81",
        "popularity": 92,
        "energy": 0.85,
        "danceability": 0.78,
        "valence": 0.75,
        "tempo": 108,
        "acousticness": 0.11,
        "x_pos": 6.3,
        "y_pos": 5.8
      },
      {
        "rank": 10,
        "name": "Watermelon Sugar",
        "artist": "Harry Styles",
        "album": "Fine Line",
        "spotify_url": "https://open.spotify.com/track/6UelLqGlWMcVH1E5c4H7lY",
        "popularity": 95,
        "energy": 0.70,
        "danceability": 0.80,
        "valence": 0.80,
        "tempo": 95,
        "acousticness": 0.20,
        "x_pos": 4.9,
        "y_pos": 6.7
      }
    ]
  }

  export {topTracks}

  import React from "react";
  import { Scatter } from "react-chartjs-2";
  import { Chart as ChartJS, Title, Tooltip, Legend, LinearScale, PointElement } from "chart.js";
  
  // Register necessary Chart.js components
  ChartJS.register(Title, Tooltip, Legend, LinearScale, PointElement);
  
  const EnergyValenceChart = ({ t }) => {
    const tracks = t["top_tracks"]
    // Map data into Chart.js format
    const chartData = {
      datasets: [
        {
          label: "Songs",
          data: tracks.map((track) => ({
            x: track.energy,  // Energy on X-axis
            y: track.valence, // Valence on Y-axis
            r: track.popularity / 10 // Bubble size (popularity scaled)
          })),
          backgroundColor: "rgba(29, 185, 84, 0.8)", // Spotify Green
          borderColor: "rgba(29, 185, 84, 1)",
          borderWidth: 1
        }
      ]
    };
  
    const options = {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: "Energy", font: { size: 14 } },
          min: 0, max: 1 // Ensures energy is within [0,1]
        },
        y: {
          title: { display: true, text: "Valence", font: { size: 14 } },
          min: 0, max: 1 // Ensures valence is within [0,1]
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const track = tracks[context.dataIndex];
              return `${track.name} by ${track.artist}`;
            }
          }
        }
      }
    };
  
    return <Scatter data={chartData} options={options} />;
  };
  
  export default EnergyValenceChart;
  