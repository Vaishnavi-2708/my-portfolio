import { useId } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Activity, BrainCircuit,
  BriefcaseBusiness, ChevronDown, Cloud, Code2, Database, Fingerprint, GitFork, GraduationCap,
  Mail, Network, ShieldCheck, Workflow,
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

function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#home" aria-label="VD Vaishnavi Darla, Home"><span>VD</span> Vaishnavi Darla</a>
        <nav aria-label="Main navigation">
          {navigation.map(([id, label]) => <a key={id} href={'#' + id}>{label}</a>)}
        </nav>
        <a className="header-contact" href="#contact">Get in touch <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </header>
  )
}

function WorkflowPanel() {
  return (
    <div className="workflow-panel">
      <p className="panel-caption"><span><Workflow size={15} aria-hidden="true" /> Agentic workflow</span><span>Clinical review</span></p>
      <ol className="workflow-steps">
        <li><span className="step-icon"><Database size={19} aria-hidden="true" /></span><div><strong>Retrieve evidence</strong><small>Graph RAG · Clinical records</small></div></li>
        <li><span className="step-icon"><BrainCircuit size={19} aria-hidden="true" /></span><div><strong>Evaluate context</strong><small>LangGraph · Amazon Bedrock</small></div></li>
        <li><span className="step-icon"><ShieldCheck size={19} aria-hidden="true" /></span><div><strong>Review and approve</strong><small>Human-in-the-loop</small></div></li>
      </ol>
      <div className="panel-result"><div><strong>35%</strong><span>less clinical review time</span></div><ArrowDownRight size={32} aria-hidden="true" /></div>
    </div>
  )
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span />{profile.title}</p>
          <h1>Vaishnavi<br />Darla<span>.</span></h1>
          <p className="hero-intro">I build AI systems that help people review evidence, assess risk, and make decisions across healthcare, finance, and public services.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore my work <ArrowDown size={17} aria-hidden="true" /></a>
            <a className="button button-outline" href="#contact">Contact me <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <WorkflowPanel />
      </div>
    </section>
  )
}

function ProjectCard({ project, Icon }) {
  const headingId = useId()
  return (
    <article className={'project-card project-' + project.id} aria-labelledby={headingId}>
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

function Portfolio() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <section className="shell section" id="work">
          <SectionHeading label="Portfolio">Selected work</SectionHeading>
          <div className="project-grid grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {projects.map((project, index) => <ProjectCard key={project.id} project={project} Icon={projectIcons[index]} />)}
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
