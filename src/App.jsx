import { useEffect, useState } from 'react';
import { config, education, experience, profile, projects, skills } from './data/contentLoader';
import './App.css';

const Arrow = ({ diagonal = false }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={diagonal ? 'M7 17 17 7M8 7h9v9' : 'M5 12h14M14 7l5 5-5 5'} />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.82a9.6 9.6 0 0 1 2.5.34c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.5 8.5H3v12h3.5v-12ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM20.5 13.6c0-3.62-1.93-5.3-4.5-5.3-2.08 0-3 1.14-3.52 1.94V8.5H9v12h3.48v-5.94c0-1.57.3-3.1 2.25-3.1 1.92 0 1.94 1.8 1.94 3.2v5.84h3.48l.35-6.9Z" />
  </svg>
);

const TravelIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 8V6.8A4 4 0 0 1 12 3a4 4 0 0 1 4 3.8V8" />
    <rect x="5" y="8" width="14" height="13" rx="3" />
    <path d="M8 13h8M8 17v4M16 17v4" />
  </svg>
);

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px' },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 80);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="#top" onClick={close} aria-label="Adnan — home">
        <span className="brand-word"><em>A</em>dnan</span>
      </a>

      <nav className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        <div className="nav-pages">
          {config.navigation.map((item) => (
            <a href={item.href} onClick={close} key={item.number}>{item.label}</a>
          ))}
        </div>
        <div className="nav-socials" aria-label="Social and personal links">
          <a className="nav-social" href={profile.social.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
            <GitHubIcon />
          </a>
          <a className="nav-social" href={profile.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <LinkedInIcon />
          </a>
          <a className="nav-social nav-travel" href="https://www.thebrokenbackpack.com/" target="_blank" rel="noreferrer" aria-label="The Broken Backpack travel blog" title="Travel blog — The Broken Backpack">
            <TravelIcon />
          </a>
        </div>
      </nav>

      <button
        className={`menu-button ${open ? 'is-open' : ''}`}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
      >
        <span />
        <span />
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <video className="hero-video" autoPlay muted loop playsInline poster="/images/hero-poster.jpg">
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-shade" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-identity" aria-label={`Portfolio of ${profile.fullName}`}>
          <span className="identity-monogram" aria-hidden="true">
            <img src="/images/monogram.png" alt="" />
          </span>
          <span className="identity-copy">
            <small>Portfolio of</small>
            <strong>{profile.fullName}</strong>
          </span>
        </div>
        <h1 id="hero-title">
          <span className="hero-title-role">Software <span className="hero-title-accent">QA</span> Engineer</span>
          <span className="hero-title-study">&amp; <em>Infotronic Systems</em><br />Engineering Student</span>
        </h1>
        <p className="hero-manifesto">I build, test &amp; explore what’s next</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#experience">Explore my work <Arrow /></a>
          <a className="button button-ghost" href="#contact">Say hello <Arrow diagonal /></a>
        </div>
      </div>

      <div className="hero-footnote">
        <span className="scroll-cue">Scroll to wander <i>↓</i></span>
      </div>
      <div className="hero-transition" aria-hidden="true">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
          <g className="transition-wave transition-wave-back">
            <path d="M-180 107C70 54 278 132 512 99C752 65 884 47 1110 84C1287 113 1420 119 1620 93V180H-180Z" />
          </g>
          <g className="transition-wave transition-wave-front">
            <path d="M-180 127C68 81 276 146 512 116C758 84 897 78 1128 107C1293 128 1428 132 1620 110V180H-180Z" />
          </g>
        </svg>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, copy, light = false }) {
  return (
    <div className={`section-intro ${light ? 'is-light' : ''}`} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}

function About() {
  return (
    <section className="about section-shell" id="about">
      <SectionIntro
        eyebrow="01 / Profile"
        title={<>About <em>Me</em></>}
      />
      <div className="about-layout">
        <figure className="about-portrait" data-reveal>
          <div className="about-photo-frame">
            <img
              src="/images/adnan-abir-portrait.jpg"
              alt="Adnan Abir smiling outdoors"
              width="1306"
              height="1741"
              loading="lazy"
            />
            <span className="about-photo-label">Adnan Abir / Portrait</span>
          </div>
          <figcaption className="about-quote">
            <span className="quote-mark" aria-hidden="true">“</span>
            <p>I enjoy finding what breaks, building what helps, and exploring what comes next.</p>
            <div className="quote-credit">Adnan Abir</div>
          </figcaption>
        </figure>
        <div className="about-copy" data-reveal>
          {profile.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="about-facts">
            <div><span>NOW</span><strong>Software QA<br />@ BlackBerry</strong></div>
            <div><span>STUDYING</span><strong>Infotronic<br />Systems Engineering</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="section-shell">
        <SectionIntro
          light
          eyebrow="02 / Career"
          title={<>Professional <em>Experience</em></>}
        />
        <div className="experience-list">
          {experience.map((job, index) => (
            <article className="experience-card" key={job.id} data-reveal>
              <div className="experience-index">0{index + 1}</div>
              <div className="experience-main">
                <p>{job.startDate} — {job.endDate}</p>
                <h3>{job.title}</h3>
                <a href={job.url} target="_blank" rel="noreferrer">{job.company} <Arrow diagonal /></a>
              </div>
              <ul>
                {job.description.slice(0, 4).map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProject({ project, index }) {
  return (
    <article className={`project-card project-${index + 1}`} data-reveal>
      <div className="project-visual">
        <img src={project.image} alt={`Screenshot of ${project.title}`} loading="lazy" />
        <span>0{index + 1}</span>
      </div>
      <div className="project-content">
        <p className="eyebrow">Featured build / 0{index + 1}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul>{project.tech.map((item) => <li key={item}>{item}</li>)}</ul>
        {project.github && (
          <a className="project-link" href={project.github} target="_blank" rel="noreferrer">
            View the source <Arrow diagonal />
          </a>
        )}
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section className="projects section-shell" id="projects">
      <SectionIntro
        eyebrow="03 / Portfolio"
        title={<>Featured <em>Projects</em></>}
      />
      <div className="featured-projects">
        {projects.featured.map((project, index) => (
          <FeaturedProject project={project} index={index} key={project.id} />
        ))}
      </div>
      <div className="project-archive" data-reveal>
        <div className="archive-heading">
          <p className="eyebrow">More from the lab</p>
          <h3>Experiments &amp; ongoing builds</h3>
        </div>
        <div className="archive-list">
          {projects.other.map((project, index) => (
            <article key={project.id}>
              <span>0{index + 3}</span>
              <div><h4>{project.title}</h4><p>{project.description}</p></div>
              <ul>{project.tech.map((item) => <li key={item}>{item}</li>)}</ul>
              {project.github ? (
                <a href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}><Arrow diagonal /></a>
              ) : <i>In progress</i>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  const degree = education.education[0];
  return (
    <section className="education-section" id="education">
      <div className="education-glow" aria-hidden="true" />
      <div className="section-shell education-shell">
        <SectionIntro
          light
          eyebrow="04 / Academic background"
          title={<>Education &amp; <em>Training</em></>}
        />
        <div className="education-card" data-reveal>
          <div className="education-mark">{degree.institutionShort}</div>
          <div className="education-title">
            <p>{degree.status}</p>
            <h3>{degree.field}</h3>
            <span>{degree.degree}</span>
          </div>
          <div className="education-meta">
            <p>{degree.institution}</p>
            <p>{degree.location}</p>
            <p>{degree.startDate} — {degree.endDate}</p>
          </div>
          <p className="education-description">{degree.description}</p>
          <ul className="education-tags">
            {degree.focusAreas.map((area) => <li key={area}>{area}</li>)}
          </ul>
          <a href={degree.institutionUrl} target="_blank" rel="noreferrer">
            Explore the programme <Arrow diagonal />
          </a>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills-section section-shell" id="skills">
      <SectionIntro
        eyebrow="05 / Capabilities"
        title={<>Technical <em>Skills</em></>}
      />
      <div className="skills-grid">
        {skills.categories.map((category, index) => (
          <article className={`skill-card skill-card-${index + 1}`} key={category.name} data-reveal>
            <span>0{index + 1}</span>
            <h3>{category.name}</h3>
            <ul>{category.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [formStatus, setFormStatus] = useState({ type: 'idle', message: '' });
  const isSending = formStatus.type === 'sending';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormStatus({ type: 'sending', message: 'Sending your message…' });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error('Submission failed');
      }

      form.reset();
      setFormStatus({
        type: 'success',
        message: 'Thank you — your message has been sent successfully.',
      });
    } catch {
      setFormStatus({
        type: 'error',
        message: 'Your message could not be sent. Please try again in a moment.',
      });
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-orbit orbit-one" aria-hidden="true" />
      <div className="contact-orbit orbit-two" aria-hidden="true" />
      <div className="contact-content" data-reveal>
        <div className="contact-heading">
          <p className="eyebrow">06 / Contact</p>
          <h2>Contact <em>Me</em></h2>
          <p>{profile.contactText}</p>
        </div>

        <div className="contact-panel">
          <aside className="contact-note">
            <span className="contact-note-label">Open to conversations</span>
            <h3>Let’s discuss quality, software, AI, or collaboration</h3>
            <p>Share a little context and I’ll reply directly to the email address you provide.</p>
            <ul aria-label="Conversation topics">
              <li>Quality engineering</li>
              <li>Software projects</li>
              <li>AI &amp; automation</li>
            </ul>
          </aside>

          <form
            id="contact-form"
            className="contact-form"
            action="https://api.web3forms.com/submit"
            method="POST"
            onSubmit={handleSubmit}
            aria-busy={isSending}
          >
            <input type="hidden" name="access_key" value="390d5222-da05-4d3b-b96a-6df19abd5154" />
            <input type="hidden" name="from_name" value="Adnan Abir Portfolio" />
            <input className="form-botcheck" type="checkbox" name="botcheck" tabIndex="-1" autoComplete="off" />

            <div className="contact-form-row">
              <label>
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" autoComplete="name" required />
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
              </label>
            </div>

            <label>
              <span>Subject</span>
              <input type="text" name="subject" placeholder="What would you like to discuss?" required />
            </label>

            <label>
              <span>Message</span>
              <textarea name="message" rows="6" placeholder="Tell me about your idea, project, or question" required />
            </label>

            <div className="contact-form-footer">
              <p>Your details are used only to respond to your message.</p>
              <button className="contact-submit" type="submit" disabled={isSending}>
                <span>{isSending ? 'Sending…' : 'Send message'}</span>
                <Arrow diagonal />
              </button>
            </div>

            <p
              className={`contact-status is-${formStatus.type}`}
              role={formStatus.type === 'error' ? 'alert' : 'status'}
              aria-live="polite"
            >
              {formStatus.message}
            </p>
          </form>
        </div>
      </div>
      <footer>
        <p>Built and designed by <strong>Adnan Abir</strong> · All rights reserved. ©</p>
      </footer>
    </section>
  );
}

export default function App() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
