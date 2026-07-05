import { useState, useEffect } from 'react';
import { profile } from '../data/contentLoader';
import '../styles/hero.css';

const roles = ['Software Engineer', 'AI Enthusiast', 'Problem Solver', 'Creative Builder'];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
        }, 80);
      } else {
        // Pause at end of word
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.substring(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="hero" id="hero">
      {/* Background decoration */}
      <div className="hero-bg-decoration">
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
      </div>

      <p className="hero-greeting">Hi, my name is</p>
      <h1 className="hero-name">{profile.name}.</h1>
      <h2 className="hero-tagline">
        I&apos;m a{' '}
        <span className="typewriter-text">
          {displayText}
          <span className="typewriter-cursor"></span>
        </span>
      </h2>
      <p className="hero-description">
        {profile.bio[0]}
      </p>
      <div className="hero-cta">
        <a href="#projects" className="btn-filled">
          View My Work
        </a>
        <a href="#contact" className="btn-primary">
          Get In Touch
        </a>
      </div>
    </section>
  );
}
