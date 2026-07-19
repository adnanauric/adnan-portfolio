import { config, profile } from '../data/contentLoader';
import FadeInSection from './FadeInSection';
import '../styles/contact.css';

export default function Contact() {
  const heading = config.sectionHeadings.contact;

  return (
    <section id="contact">
      <div className="contact-section">
        <FadeInSection>
          <span className="contact-overline">{heading.number}. {heading.title}</span>
          <h2 className="contact-heading">{profile.contactHeading || "Get In Touch"}</h2>
          <p className="contact-text">
            {profile.contactText || "I'm currently looking for new opportunities and my inbox is always open. Whether you have a question, a project idea, or just want to say hi — I'll do my best to get back to you!"}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="btn-primary contact-cta"
          >
            Say Hello
          </a>
        </FadeInSection>
      </div>
    </section>
  );
}
