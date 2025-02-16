import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import animeData from '../data/animeData.json';
import '../styles/anime-grid.css';

export function Home() {
  const navigate = useNavigate();
  
  // State to track the index of the currently featured anime
  const [currentAnimeIndex, setCurrentAnimeIndex] = useState(0);

  // Function to cycle through the anime list
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimeIndex((prevIndex) => (prevIndex + 1) % animeData.animes.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Get the currently featured anime
  const featuredAnime = animeData.animes[currentAnimeIndex];

  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />
      {/* Pass the currently featured anime to the Hero component */}
      <Hero anime={featuredAnime} />
      
      <main className="container pb-16">
        {/* Trending Section */}
        <section className="trending-section">
          <br/><br/><br/><br/><br/>
          <h2 className="section-title">Anime</h2>
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