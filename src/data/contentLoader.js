/**
 * contentLoader.js
 * Centralized content loading from /content/*.json files.
 * Components import from here — never hardcode content in JSX.
 */

import profileData from '../../content/profile.json';
import experienceData from '../../content/experience.json';
import educationData from '../../content/education.json';
import projectsData from '../../content/projects.json';
import skillsData from '../../content/skills.json';
import siteConfig from '../../content/site-config.json';

export const profile = profileData;
export const experience = experienceData;
export const education = educationData;
export const projects = projectsData;
export const skills = skillsData;
export const config = siteConfig;
