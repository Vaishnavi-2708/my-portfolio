import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

const projectFlows = {
  clinical: [
    ['Ingest', 'FHIR, HL7, and claims data with PHI masking and validation.'],
    ['Retrieve', 'Graph RAG grounds reviews in patient history, coverage criteria, and clinical evidence.'],
    ['Review', 'The agent workflow supports clinician approval and secure handoffs.'],
  ],
  fraud: [
    ['Events', 'Digital payment events provide transaction, merchant, device, and behavioral features.'],
    ['Score', 'Low-latency risk scoring uses calibrated decision thresholds.'],
    ['Cases', 'Event-driven services connect scoring to alerts, verification, and analyst case generation.'],
  ],
  assist: [
    ['Intake', 'Application records are standardized and sensitive fields are masked.'],
    ['Validate', 'Asynchronous checks flag missing documents, with retries and notifications.'],
    ['Prioritize', 'Eligibility models support prioritization for caseworker review.'],
  ],
  maintenance: [
    ['Telemetry', 'SCADA and PLC sensor data is consolidated and timestamps are standardized.'],
    ['Model', 'Rolling and frequency features help identify risk patterns.'],
    ['Monitor', 'Dashboards surface equipment health, downtime trends, and failure probabilities.'],
  ],
  quality: [
    ['Integrate', 'LIMS, REST, and XML feeds supply laboratory and manufacturing data.'],
    ['Validate', 'Relational schemas and APIs support sample tracking and batch genealogy.'],
    ['Report', 'Scheduled exception reports and sample alerts support quality teams.'],
  ],
}

export default function ProjectFlow({ id, title }) {
  const [selected, setSelected] = useState(0)
  const steps = projectFlows[id]
  return (
    <div className="project-flow">
      <h4>Project data flow</h4>
      <div className="flow-steps" role="group" aria-label={title + ' data flow'}>
        {steps.map(([label], index) => (
          <div className="flow-step" key={label}>
            {index > 0 && <ArrowRight size={14} aria-hidden="true" />}
            <button type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{label}</button>
          </div>
        ))}
      </div>
      <p className="flow-description" aria-live="polite">{steps[selected][1]}</p>
    </div>
  )
}
