import React from 'react';
import { Play, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/hero.css';

export function Hero({ anime }) {
  const navigate = useNavigate();

  return (
    <section className="hero">
      {/* Use both poster and heroPoster in the image tags */}
      <img src={anime.heroPoster} alt={anime.title} className="hero-image hero-image-desktop" />
      <img src={anime.poster} alt={anime.title} className="hero-image hero-image-mobile" />
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