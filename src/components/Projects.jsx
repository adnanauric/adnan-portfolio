import { useState, useEffect, useRef } from 'react';
import { projects } from '../data/contentLoader';
import FadeInSection from './FadeInSection';
import '../styles/projects.css';

function FeaturedProject({ project, index }) {
  const isReversed = index % 2 !== 0;
  return (
    <FadeInSection delay={index * 100}>
      <div className={`featured-project ${isReversed ? 'reversed' : ''}`}>
        <div className="project-image-wrapper">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="project-image"
              loading="lazy"
            />
          ) : (
            <div className="project-image-placeholder">
              {'</>'} 
            </div>
          )}
        </div>

        <div className="project-info">
          <span className="project-overline">Featured Project</span>
          <h3 className="project-title">
            {project.live ? (
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
          <div className="project-description">
            <p style={{ marginBottom: 0 }}>{project.description}</p>
          </div>
          <ul className="project-tech-list">
            {project.tech.map((tech, i) => (
              <li key={i} className="tech-pill">{tech}</li>
            ))}
          </ul>
          <div className="project-links">
            {project.github && (
              <a
                href={project.github}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repo for ${project.title}`}
              >
                &#x2794; GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo of ${project.title}`}
              >
                &#x2197; Live
              </a>
            )}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

function OtherProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const descRef = useRef(null);
  const [needsToggle, setNeedsToggle] = useState(false);

  useEffect(() => {
    if (descRef.current) {
      // Check if the text overflows the clamped height (3 lines)
      setNeedsToggle(descRef.current.scrollHeight > descRef.current.clientHeight + 1);
    }
  }, [project.description]);

  return (
    <div className={`other-project-card ${expanded ? 'expanded' : ''}`}>
      <div className="other-project-card-header">
        <span className="other-project-card-folder">&#x1F4C1;</span>
        <div className="other-project-card-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              &#x2794;
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live">
              &#x2197;
            </a>
          )}
        </div>
      </div>
      <h3 className="other-project-card-title">{project.title}</h3>
      <div className="other-project-card-desc-wrapper">
        <p
          ref={descRef}
          className={`other-project-card-desc ${expanded ? 'expanded' : ''}`}
        >
          {project.description}
        </p>
        {needsToggle && !expanded && <div className="other-project-card-fade" />}
        {needsToggle && (
          <button
            className="other-project-card-toggle"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? 'Show less' : 'Show more'}
          >
            {expanded ? '− show less' : '+ read more'}
          </button>
        )}
      </div>
      <ul className="other-project-card-tech">
        {project.tech.map((tech, i) => (
          <li key={i}>{tech}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-wrapper">
        <FadeInSection>
          <h2 className="section-heading">
            <span className="section-number">03.</span>
            Things I&apos;ve Built
          </h2>
        </FadeInSection>

        {/* Featured Projects */}
        <div className="featured-projects">
          {projects.featured.map((project, i) => (
            <FeaturedProject key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Other Notable Projects */}
        {projects.other.length > 0 && (
          <FadeInSection>
            <h3 className="other-projects-heading">Other Notable Projects</h3>
            <div className="other-projects-grid">
              {projects.other.map((project) => (
                <FadeInSection key={project.id}>
                  <OtherProjectCard project={project} />
                </FadeInSection>
              ))}
            </div>
          </FadeInSection>
        )}
      </div>
    </section>
  );
}
