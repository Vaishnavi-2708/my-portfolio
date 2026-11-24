import { useId, useState } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Activity, BrainCircuit,
  BriefcaseBusiness, ChevronDown, Cloud, Code2, Database, Fingerprint, GitFork, GraduationCap,
  Mail, Moon, Network, ShieldCheck, Sun, Workflow,
} from 'lucide-react'
import '@fontsource-variable/manrope/wght.css'
import '@fontsource-variable/space-grotesk/wght.css'
import { profile, projects, skills } from './content'
import CyberHero from './CyberHero'
import { useCyberMotion } from './useCyberMotion'
import './styles.css'

const skillIcons = [BrainCircuit, Network, Activity, Code2, Cloud, ShieldCheck]
const projectIcons = [BrainCircuit, Fingerprint, Workflow, Activity, Database]
const navigation = [['about', 'About'], ['experience', 'Experience'], ['skills', 'Skills'], ['work', 'Projects'], ['architecture', 'AI Architecture']]
const contactLinks = [
  { label: 'Email', url: 'mailto:' + profile.email, Icon: Mail },
  { label: 'LinkedIn', url: profile.linkedin, Icon: BriefcaseBusiness },
  { label: 'GitHub', url: profile.github, Icon: GitFork },
]

function SectionHeading({ label, children }) {
  return <div className="section-heading"><p className="eyebrow"><span />{label}</p><h2>{children}</h2></div>
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme)
  const dark = theme === 'dark'
  const Icon = dark ? Sun : Moon
  const label = dark ? 'Switch to light theme' : 'Switch to dark theme'

  function toggleTheme() {
    const nextTheme = dark ? 'light' : 'dark'
    document.documentElement.dataset.theme = nextTheme
    document.querySelector('meta[name="theme-color"]').content = dark ? '#eef6ff' : '#060b17'
    try { localStorage.setItem('portfolio-theme', nextTheme) } catch {
      // Theme switching still works when storage is unavailable.
    }
    setTheme(nextTheme)
  }

  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={label} title={label}><Icon size={18} aria-hidden="true" /></button>
}

function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#home" aria-label="VD Vaishnavi Darla, Home"><span>VD</span> Vaishnavi Darla</a>
        <nav aria-label="Main navigation">
          {navigation.map(([id, label]) => <a key={id} href={'#' + id}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <a className="header-contact" href="#contact" aria-label="Get in touch"><span>Get in touch</span><ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </header>
  )
}

function ProjectCard({ project, Icon }) {
  const headingId = useId()
  return (
    <article id={'project-' + project.id} className={'project-card project-' + project.id} aria-labelledby={headingId}>
      <div className="project-top">
        <span className="project-icon"><Icon size={22} aria-hidden="true" /></span>
        <p>{project.client} <span>·</span> {project.sector}</p>
      </div>
      <h3 id={headingId}>{project.title}</h3>
      <p className="project-summary">{project.summary}</p>
      {project.metric && <p className="project-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></p>}
      <ul className="tags">{project.stack.map(technology => <li key={technology}>{technology}</li>)}</ul>
      <details className="project-details">
        <summary aria-label={'Case study: ' + project.title}>Case study <ChevronDown size={18} aria-hidden="true" /></summary>
        <p>{project.detail}</p>
      </details>
    </article>
  )
}

function Experience() {
  return (
    <section className="experience-section" id="experience" data-reveal>
      <div className="shell section-grid">
        <SectionHeading label="Experience">Career timeline</SectionHeading>
        <ol className="timeline reveal-item">
          {projects.map(({ id, client, role, dates, location, highlights }) => (
            <li key={id}>
              <p className="timeline-meta">{dates} <span>·</span> {location}</p>
              <h3>{role}</h3>
              <p className="timeline-client">{client}</p>
              <ul>{highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="shell section" id="skills" data-reveal>
      <SectionHeading label="Skills">Technical stack</SectionHeading>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map(({ title, items }, index) => {
          const Icon = skillIcons[index]
          return <article className="skill-card reveal-item" key={title}><Icon size={23} aria-hidden="true" /><h3>{title}</h3><ul className="tags">{items.map(item => <li key={item}>{item}</li>)}</ul></article>
        })}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about-section" id="about" data-reveal>
      <div className="shell section-grid">
        <SectionHeading label="About me">From Python development to agentic AI</SectionHeading>
        <div className="about-copy reveal-item">
          <p>I started out building Python applications for pharmaceutical quality teams. I moved into industrial data science and applied machine learning before designing multi-agent systems for clinical review.</p>
          <p>My work spans the path from data ingestion and model evaluation to deployment and observability. I’m particularly interested in how evidence retrieval, explainability, and human approvals help teams use AI in regulated settings.</p>
          <section className="education-card" id="education" aria-labelledby="education-title">
            <GraduationCap size={26} aria-hidden="true" />
            <div><p className="eyebrow">Education</p><h3 id="education-title">Bachelor of Engineering in Computer Science</h3><p>KITSW, India</p></div>
          </section>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <footer id="contact" data-reveal>
      <div className="shell footer-inner">
        <SectionHeading label="Contact">Let’s connect.</SectionHeading>
        <a className="email-link" href={'mailto:' + profile.email}>{profile.email} <ArrowUpRight size={18} aria-hidden="true" /></a>
        <div className="footer-bottom">
          <p>{profile.name}</p>
          <ul>{contactLinks.map(({ label, url, Icon }) => <li key={label}><a href={url}><Icon size={17} aria-hidden="true" />{label}</a></li>)}</ul>
          <a className="top-link" href="#home">Back to top <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  )
}

const architecture = [
  { title: 'Ingest', Icon: Database, text: 'Integrate FHIR, HL7, and claims data with validation and PHI masking.', tools: 'FHIR · HL7 · claims APIs' },
  { title: 'Retrieve', Icon: Network, text: 'Ground review in patient history, coverage criteria, and clinical evidence.', tools: 'Graph RAG · Neo4j · Pinecone' },
  { title: 'Evaluate', Icon: BrainCircuit, text: 'Coordinate clinical workflows and evaluate retrieval quality, faithfulness, and latency.', tools: 'LangGraph · Amazon Bedrock · FastAPI' },
  { title: 'Approve', Icon: ShieldCheck, text: 'Route decisions through human approvals and secure handoffs.', tools: 'Human-in-the-loop · Amazon EKS' },
]

function Architecture() {
  const [selected, setSelected] = useState(0)
  const active = architecture[selected]
  return (
    <section className="architecture-section" id="architecture" data-reveal>
      <div className="shell section-grid">
        <SectionHeading label="AI Architecture">Clinical review workflow</SectionHeading>
        <div className="architecture-card reveal-item">
          <div className="architecture-stages" role="group" aria-label="Clinical review stages">
            {architecture.map(({ title, Icon }, index) => (
              <button key={title} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}><Icon size={21} aria-hidden="true" />{title}</button>
            ))}
          </div>
          <div className="architecture-detail" aria-live="polite">
            <p>{active.text}</p><p>{active.tools}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const filters = ['All', ...projects.map(project => project.sector)]

function Portfolio() {
  const [filter, setFilter] = useState('All')
  const motionRoot = useCyberMotion()

  return (
    <div ref={motionRoot}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <CyberHero resetFilter={() => flushSync(() => setFilter('All'))} />
        <About />
        <Experience />
        <Skills />
        <section className="shell section" id="work" data-reveal>
          <SectionHeading label="Portfolio">Selected work</SectionHeading>
          <div className="project-filters" role="group" aria-label="Filter projects by industry">
            {filters.map(value => <button type="button" key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}
          </div>
          <p className="sr-only" role="status">{filter === 'All' ? 'Showing all five projects' : 'Showing one project in ' + filter}</p>
          <div className="project-grid grid gap-4 md:grid-cols-2 lg:grid-cols-6" data-filtered={filter !== 'All'}>
            {projects.map((project, index) => (
              <div className="project-slot reveal-item" hidden={filter !== 'All' && filter !== project.sector} key={project.id}>
                <ProjectCard project={project} Icon={projectIcons[index]} />
              </div>
            ))}
          </div>
        </section>
        <Architecture />
      </main>
      <Contact />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<Portfolio />)
