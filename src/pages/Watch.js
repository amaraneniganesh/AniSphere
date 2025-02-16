import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import animeData from '../data/animeData.json';
import '../styles/watch.css';

export function Watch() {
  const { id } = useParams();
  const anime = animeData.animes.find((a) => a.id === id);
  
  const [currentSeason, setCurrentSeason] = useState(anime?.seasons[0]);
  const [currentEpisode, setCurrentEpisode] = useState(currentSeason?.episodes[0]);

  if (!anime || !currentSeason || !currentEpisode) {
    return <div>Anime not found</div>;
  }

  return (
    <div>
      <Header />
      <br/><br/><br/>
      <div className="container player-container">
        <div>
          <div className="video-container">
            <iframe
              src={currentEpisode.link}
              title={currentEpisode.title}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling='no'
              allowFullScreen
            />
          </div>
          <h1 className="text-2xl font-bold mt-4">{anime.title}</h1>
          <p className="text-gray-500">
            Season {currentSeason.number} Episode {currentEpisode.title}
          </p>
        </div>
        
        <div className="episode-list">
          <select
            className="season-select"
            value={currentSeason.number}
            onChange={(e) => {
              const season = anime.seasons.find(
                (s) => s.number === Number(e.target.value)
              );
              if (season) {
                setCurrentSeason(season);
                setCurrentEpisode(season.episodes[0]);
              }
            }}
          >
            {anime.seasons.map((season) => (
              <option key={season.number} value={season.number}>
                Season {season.number}
              </option>
            ))}
          </select>
          
          <div>
            {currentSeason.episodes.map((episode) => (
              <div
                key={episode.id}
                className={`episode-item ${
                  currentEpisode.id === episode.id ? 'active' : ''
                }`}
                onClick={() => setCurrentEpisode(episode)}
              >
                {episode.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}