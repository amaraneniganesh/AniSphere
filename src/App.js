import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Watch } from './pages/Watch';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/*
import React from 'react';
import { Film } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <Film size={24} />
          <span>AnimeStream</span>
        </Link>
      </div>
    </header>
  );
}

import React from 'react';
import { Play, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero({ anime }) {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <img src={anime.heroPoster} alt={anime.title} className="hero-image" />
      <div className="hero-overlay" />
      <div className="container hero-content">
        <div className="hero-info">
          <h1 className="hero-title">{anime.title}</h1>
          <p className="hero-description">{anime.description}</p>
          <div className="hero-buttons">
            <button 
              className="watch-button"
              onClick={() => navigate(`/watch/${anime.id}`)}
            >
              <Play size={24} />
              <span>Watch Now</span>
            </button>
            <button className="info-button">
              <Info size={24} />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import animeData from '../data/animeData.json';

export function Home() {
  const navigate = useNavigate();
  const featuredAnime = animeData.animes[0];

  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />
      <Hero anime={featuredAnime} />
      
      <main className="container pb-16">
        
        <section className="trending-section">
          <h2 className="section-title">Trending Now</h2>
          <div className="anime-grid">
            {animeData.animes.map((anime) => (
              <div
                key={anime.id}
                className="anime-card"
                onClick={() => navigate(`/watch/${anime.id}`)}
              >
                <div className="anime-card-image">
                  <img
                    src={anime.poster}
                    alt={anime.title}
                    className="anime-poster"
                  />
                  <div className="anime-card-overlay">
                    <button className="play-button">
                      <Play size={24} />
                      <span>Play</span>
                    </button>
                  </div>
                </div>
                <div className="anime-card-info">
                  <h3 className="anime-title">{anime.title}</h3>
                  <div className="anime-meta">
                    <span className="seasons-count">{anime.seasons.length} Seasons</span>
                    <div className="rating">
                      <Star size={16} className="star-icon" />
                      <span>{anime.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Section 
        <section className="popular-section">
          <h2 className="section-title">Popular This Week</h2>
          <div className="anime-grid">
            {animeData.animes.map((anime) => (
              <div
                key={anime.id}
                className="anime-card"
                onClick={() => navigate(`/watch/${anime.id}`)}
              >
                <div className="anime-card-image">
                  <img
                    src={anime.poster}
                    alt={anime.title}
                    className="anime-poster"
                  />
                  <div className="anime-card-overlay">
                    <button className="play-button">
                      <Play size={24} />
                      <span>Play</span>
                    </button>
                  </div>
                </div>
                <div className="anime-card-info">
                  <h3 className="anime-title">{anime.title}</h3>
                  <div className="anime-meta">
                    <span className="seasons-count">{anime.seasons.length} Seasons</span>
                    <div className="rating">
                      <Star size={16} className="star-icon" />
                      <span>{anime.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import animeData from '../data/animeData.json';

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
      <div className="container player-container">
        <div>
          <div className="video-container">
            <iframe
              src={currentEpisode.link}
              title={currentEpisode.title}
              width="100%"
              height="100%"
              frameBorder="0"
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


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Watch } from './pages/Watch';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


Give me good css that looks advance give me files under styles folder and dont use @apply user normal css
*/