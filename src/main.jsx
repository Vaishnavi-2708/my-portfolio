import { useId, useState } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Activity, BrainCircuit,
  BriefcaseBusiness, ChevronDown, Cloud, Code2, Database, Fingerprint, GitFork, GraduationCap,
  Mail, Moon, Network, ShieldCheck, Sparkles, Sun, Workflow,
} from 'lucide-react'
import '@fontsource-variable/manrope/wght.css'
import '@fontsource-variable/space-grotesk/wght.css'
import { profile, projects, skills } from './content'
import './styles.css'

const skillIcons = [BrainCircuit, Network, Activity, Code2, Cloud, ShieldCheck]
const projectIcons = [BrainCircuit, Fingerprint, Workflow, Activity, Database]
const navigation = [['work', 'Work'], ['experience', 'Experience'], ['skills', 'Skills'], ['about', 'About']]
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
    document.querySelector('meta[name="theme-color"]').content = dark ? '#fffaf2' : '#192225'
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

function ImpactPlayground({ resetFilter }) {
  const [selected, setSelected] = useState(0)
  const featured = projects.slice(0, 3)
  const active = featured[selected]

  return (
    <div className="playground">
      <div className="playground-heading">
        <Sparkles size={20} aria-hidden="true" />
        <h2>Explore the impact</h2>
      </div>
      <div className="impact-grid" role="group" aria-label="Choose a project highlight">
        {featured.map(({ id, sector, metric }, index) => {
          const Icon = projectIcons[index]
          return (
            <button key={id} type="button" className={'impact-tile tile-' + id} aria-pressed={selected === index} onClick={() => setSelected(index)}>
              <Icon size={22} aria-hidden="true" />
              <strong>{metric}</strong>
              <span>{sector}</span>
            </button>
          )
        })}
      </div>
      <div className="impact-selection">
        <div aria-live="polite">
          <div key={active.id} className="impact-copy">
            <p>{active.client}</p>
            <strong>{active.metricLabel}</strong>
          </div>
        </div>
        <a href={'#project-' + active.id} onClick={resetFilter} aria-label={'View ' + active.title}><ArrowDown size={19} aria-hidden="true" /></a>
      </div>
    </div>
  )
}

function Hero({ resetFilter }) {
  return (
    <section id="home" className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span />{profile.title}</p>
          <h1>Vaishnavi<br /><em>Darla<span>.</span></em></h1>
          <p className="hero-intro">I build AI systems that help people review evidence, assess risk, and make decisions across healthcare, finance, and public services.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work" onClick={resetFilter}>Explore my work <ArrowDown size={17} aria-hidden="true" /></a>
            <a className="button button-outline" href="#contact">Contact me <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <ImpactPlayground resetFilter={resetFilter} />
      </div>
    </section>
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
    <section className="experience-section" id="experience">
      <div className="shell section-grid">
        <SectionHeading label="Experience">Career timeline</SectionHeading>
        <ol className="timeline">
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
    <section className="shell section" id="skills">
      <SectionHeading label="Skills">Technical stack</SectionHeading>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map(({ title, items }, index) => {
          const Icon = skillIcons[index]
          return <article className="skill-card" key={title}><Icon size={23} aria-hidden="true" /><h3>{title}</h3><ul className="tags">{items.map(item => <li key={item}>{item}</li>)}</ul></article>
        })}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about-section" id="about">
      <div className="shell section-grid">
        <SectionHeading label="About me">From Python development to agentic AI</SectionHeading>
        <div className="about-copy">
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
    <footer id="contact">
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

const filters = ['All', ...projects.map(project => project.sector)]

function Portfolio() {
  const [filter, setFilter] = useState('All')

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero resetFilter={() => flushSync(() => setFilter('All'))} />
        <section className="shell section" id="work">
          <SectionHeading label="Portfolio">Selected work</SectionHeading>
          <div className="project-filters" role="group" aria-label="Filter projects by industry">
            {filters.map(value => <button type="button" key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}
          </div>
          <p className="sr-only" role="status">{filter === 'All' ? 'Showing all five projects' : 'Showing one project in ' + filter}</p>
          <div className="project-grid grid gap-4 md:grid-cols-2 lg:grid-cols-6" data-filtered={filter !== 'All'}>
            {projects.map((project, index) => (
              <div className="project-slot" hidden={filter !== 'All' && filter !== project.sector} key={project.id}>
                <ProjectCard project={project} Icon={projectIcons[index]} />
              </div>
            ))}
          </div>
        </section>
        <Experience />
        <Skills />
        <About />
      </main>
      <Contact />
    </>
  )
}

createRoot(document.getElementById('root')).render(<Portfolio />)
