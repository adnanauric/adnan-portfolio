import { config, profile } from '../data/contentLoader';
import FadeInSection from './FadeInSection';
import '../styles/about.css';

export default function About() {
  const heading = config.sectionHeadings.about;
  const quickSkills = [
    'Python',
    'Java',
    'JavaScript',
    'React',
    'Git & GitHub',
    'Software Testing & QA',
    'AI-assisted Development'
  ];

  return (
    <section id="about">
      <div className="section-wrapper">
        <FadeInSection>
          <h2 className="section-heading">
            <span className="section-number">{heading.number}.</span>
            {heading.title}
          </h2>
        </FadeInSection>

        <div className="about-content">
          <div className="about-text">
            {profile.bio.map((paragraph, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <p>{paragraph}</p>
              </FadeInSection>
            ))}

            <FadeInSection delay={300}>
              <p>Technologies and tools I’ve been working with:</p>
              <ul className="about-skills-list">
                {quickSkills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </FadeInSection>
          </div>

          <FadeInSection delay={200}>
            <div className="about-image-wrapper">
              <div className="about-image-container">
                <div className="about-avatar-placeholder">
                  {'{ A }'}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
