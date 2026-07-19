import { config, education } from '../data/contentLoader';
import FadeInSection from './FadeInSection';
import '../styles/education.css';

export default function Education() {
  const heading = config.sectionHeadings.education;

  return (
    <section id="education" aria-labelledby="education-heading">
      <div className="section-wrapper">
        <FadeInSection>
          <h2 className="section-heading" id="education-heading">
            <span className="section-number">{heading.number}.</span>
            {heading.title}
          </h2>
        </FadeInSection>

        <div className="education-list">
          {education.education.map((entry, index) => (
            <FadeInSection key={entry.id} delay={index * 100}>
              <article className="education-card">
                <div className="education-card-header">
                  <div className="education-institution-mark" aria-hidden="true">
                    {entry.institutionShort}
                  </div>

                  <div className="education-title-group">
                    <p className="education-status">{entry.status}</p>
                    <h3 className="education-degree">{entry.field}</h3>
                    <p className="education-qualification">{entry.degree}</p>
                    <a
                      className="education-institution"
                      href={entry.institutionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {entry.institution}
                    </a>
                  </div>

                  <div className="education-meta">
                    <p>{entry.startDate} — {entry.endDate}</p>
                    <p>{entry.location}</p>
                  </div>
                </div>

                <p className="education-description">{entry.description}</p>

                <div className="education-focus">
                  <h4>{entry.focusLabel}</h4>
                  <ul className="education-focus-list">
                    {entry.focusAreas.map((area) => (
                      <li key={area}>{area}</li>
                    ))}
                  </ul>
                </div>

                <a
                  className="education-programme-link"
                  href={entry.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${entry.programmeLinkLabel}: ${entry.field}`}
                >
                  {entry.programmeLinkLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            </FadeInSection>
          ))}
        </div>

        {education.certifications.length > 0 && (
          <div className="certification-list">
            {education.certifications.map((certification, index) => (
              <FadeInSection key={certification.id} delay={index * 100}>
                <article className="certification-card">
                  <p className="certification-issuer">{certification.issuer}</p>
                  <h3>{certification.name}</h3>
                  <p>{certification.date}</p>
                </article>
              </FadeInSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
