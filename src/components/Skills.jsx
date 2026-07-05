import { skills } from '../data/contentLoader';
import FadeInSection from './FadeInSection';
import '../styles/skills.css';

const categoryIcons = {
  'Languages': '&#x1F4BB;',
  'Frameworks & Libraries': '&#x2699;',
  'Tools & Platforms': '&#x1F6E0;',
  'AI & Data': '&#x1F916;',
};

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-wrapper">
        <FadeInSection>
          <h2 className="section-heading">
            <span className="section-number">04.</span>
            Skills & Technologies
          </h2>
        </FadeInSection>

        <div className="skills-grid">
          {skills.categories.map((category, i) => (
            <FadeInSection key={category.name} delay={i * 100}>
              <div className="skill-category">
                <h3 className="skill-category-title">
                  <span
                    className="category-icon"
                    dangerouslySetInnerHTML={{
                      __html: categoryIcons[category.name] || '&#x1F4E6;',
                    }}
                  />
                  {category.name}
                </h3>
                <div className="skill-tags">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
