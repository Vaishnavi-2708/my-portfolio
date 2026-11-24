import { lazy, Suspense } from 'react'
import { Activity, ArrowDown, ArrowUpRight, Database, Fingerprint, Network, Terminal } from 'lucide-react'
import { profile, projects } from './content'

const CyberScene = lazy(() => import('./CyberScene'))

const nodeGroups = [
  { className: 'network-west', points: [[8, 30], [22, 67], [42, 12], [60, 39], [83, 62], [97, 85]] },
  { className: 'network-east', points: [[2, 88], [27, 57], [47, 12], [68, 76], [81, 29], [98, 62]] },
]
const edges = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4], [3, 5], [4, 5]]

function NetworkField() {
  return (
    <div className="network-field" aria-hidden="true">
      {nodeGroups.map(({ className, points }) => (
        <div key={className} className={'network-cluster ' + className}>
          {edges.map(([start, end]) => {
            const [x, y] = points[start]
            const dx = points[end][0] - x
            const dy = points[end][1] - y
            return <i key={start + '-' + end} className="network-edge" style={{ left: x + '%', top: y + '%', width: Math.hypot(dx, dy) + '%', rotate: Math.atan2(dy, dx) + 'rad' }} />
          })}
          {points.map(([x, y], index) => <i key={x} className="network-node" style={{ left: x + '%', top: y + '%', '--pulse-delay': index * -.47 + 's' }} />)}
        </div>
      ))}
    </div>
  )
}

function CodeWindow() {
  return (
    <figure className="holo-panel code-window">
      <figcaption className="window-bar"><Terminal size={14} aria-hidden="true" /> clinical_workflow.py <span aria-hidden="true">•••</span></figcaption>
      {/* The scrollable code region needs a tab stop for keyboard scrolling. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div className="code-body" tabIndex={0} role="region" aria-label="Illustrative Python and LangGraph code">
        <p className="code-comment"># Clinical review graph</p>
        <pre><code>
          <span className="code-key">from</span>{' langgraph.graph '}<span className="code-key">import</span>{' StateGraph\n'}
          {'\ngraph = '}<span className="code-call">StateGraph</span>{'(ReviewState)\n'}
          {'graph.add_node("retrieve", retrieve)\n'}
          {'graph.add_node("review", review)\n'}
          {'graph.set_entry_point("retrieve")\n'}
          {'graph.add_edge("retrieve", "review")\n'}
          {'graph.set_finish_point("review")\n'}
          {'workflow = graph.compile(\n'}
          {'    interrupt_before=["review"]\n)'}
        </code></pre>
      </div>
      <p className="code-caption">Illustrative LangGraph excerpt</p>
    </figure>
  )
}

const visuals = [Network, Fingerprint, Database]

function HoloProject({ project, index, resetFilter }) {
  const Icon = visuals[index]
  return (
    <a href={'#project-' + project.id} onClick={resetFilter} className={'holo-panel holo-project holo-' + project.id}>
      <div className="window-bar">{project.sector}<ArrowUpRight size={15} aria-hidden="true" /></div>
      <div className="holo-visual" aria-hidden="true">
        {index === 0 ? <Suspense fallback={<div className="brain-fallback" />}><CyberScene /></Suspense> : <><div className="signal-rings" /><Icon className="signal-icon" /></>}
      </div>
      <div className="holo-project-copy">
        <h2>{project.title}</h2>
        <p><strong>{project.metric}</strong> {project.metricLabel}</p>
      </div>
    </a>
  )
}

export default function CyberHero({ resetFilter }) {
  return (
    <section className="hero" id="home">
      <div className="hero-grid-field" aria-hidden="true" />
      <NetworkField />
      <div className="hero-horizon" aria-hidden="true" />
      <div className="shell hero-shell">
        <div className="hero-frame" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span />{profile.title}</p>
          <h1>{profile.name}</h1>
          <p className="hero-experience">10+ years of experience</p>
          <p className="hero-intro">I build AI systems that help people review evidence, assess risk, and make decisions across healthcare, finance, and public services.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work" onClick={resetFilter}>Explore my work <ArrowDown size={17} aria-hidden="true" /></a>
            <a className="button button-outline" href="#contact">Contact me <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="holo-deck">
          <CodeWindow />
          {projects.slice(0, 3).map((project, index) => <HoloProject key={project.id} project={project} index={index} resetFilter={resetFilter} />)}
        </div>
        <a className="hero-scroll" href="#about"><Activity size={16} aria-hidden="true" /> About me <ArrowDown size={14} aria-hidden="true" /></a>
      </div>
    </section>
  )
}
