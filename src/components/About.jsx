import { profile } from '../data/contentLoader';
import FadeInSection from './FadeInSection';
import '../styles/about.css';

export default function About() {
  const quickSkills = [
    'JavaScript (ES6+)',
    'React',
    'Python',
    'Node.js',
    'Java',
    'Git & GitHub',
  ];

  return (
    <section id="about">
      <div className="section-wrapper">
        <FadeInSection>
          <h2 className="section-heading">
            <span className="section-number">01.</span>
            About Me
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
              <p>Here are a few technologies I've been working with recently:</p>
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
