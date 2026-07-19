import { useState } from 'react';
import { config, experience } from '../data/contentLoader';
import FadeInSection from './FadeInSection';
import '../styles/experience.css';

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  const heading = config.sectionHeadings.experience;

  return (
    <section id="experience">
      <div className="section-wrapper">
        <FadeInSection>
          <h2 className="section-heading">
            <span className="section-number">{heading.number}.</span>
            {heading.title}
          </h2>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="experience-content">
            {/* Company Tab List */}
            <div className="experience-tabs" role="tablist" aria-label="Work experience">
              {experience.map((job, i) => (
                <button
                  key={job.id}
                  className={`experience-tab-btn ${activeTab === i ? 'active' : ''}`}
                  onClick={() => setActiveTab(i)}
                  role="tab"
                  aria-selected={activeTab === i}
                  id={`tab-${job.id}`}
                >
                  {job.company}
                </button>
              ))}
            </div>

            {/* Job Details Panel */}
            {experience.map((job, i) => (
              activeTab === i && (
                <div
                  key={job.id}
                  className="experience-panel"
                  role="tabpanel"
                  aria-labelledby={`tab-${job.id}`}
                >
                  <h3 className="experience-panel-title">
                    {job.title}{' '}
                    <a
                      href={job.url}
                      className="company-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @ {job.company}
                    </a>
                  </h3>
                  <p className="experience-panel-dates">
                    {job.startDate} — {job.endDate}
                  </p>
                  <ul className="experience-panel-list">
                    {job.description.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
