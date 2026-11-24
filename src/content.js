export const profile = {
  name: 'Vaishnavi Darla',
  title: 'Senior Agentic AI Engineer',
  email: 'darlavaishnavi11@gmail.com',
  linkedin: 'https://www.linkedin.com/in/darla-vaishnavi2711',
  github: 'https://github.com/Vaishnavi-2708',
}

export const projects = [
  {
    id: 'clinical', sector: 'Healthcare', client: 'Vatica Health', role: 'Senior Agentic AI Engineer',
    dates: 'Jan 2024 – Present', location: 'Alpharetta, GA', title: 'Clinical intelligence platform',
    metric: '35%', metricLabel: 'less clinical review time',
    summary: 'Coordinated evidence retrieval, validation, and clinician approvals across clinical review workflows.',
    detail: 'Built event-driven agent services and used Graph RAG to ground prior authorization and utilization management workflows in patient history, coverage criteria, and clinical evidence. Evaluated retrieval quality, faithfulness, and latency before production use.',
    stack: ['LangGraph', 'Amazon Bedrock', 'FastAPI', 'Pinecone', 'Neo4j'],
    highlights: ['Designed multi-agent workflows with human approvals and secure handoffs.', 'Built FHIR, HL7, and claims ingestion with PHI masking and data validation.', 'Deployed and monitored containerized services on Amazon EKS.'],
  },
  {
    id: 'fraud', sector: 'Financial services', client: 'U.S. Bank', role: 'Applied AI/ML Engineer',
    dates: 'Apr 2022 – Dec 2023', location: 'Charlotte, NC', title: 'Real-time payment fraud detection',
    metric: '28%', metricLabel: 'better suspicious transaction identification',
    summary: 'Built low-latency scoring for digital payments and connected it to case generation and analyst workflows.',
    detail: 'Developed transaction, merchant, device, and behavioral features for production scoring. Validated models through backtesting, champion–challenger testing, and SHAP, and calibrated thresholds to balance recall and false declines.',
    stack: ['XGBoost', 'Azure Machine Learning', 'Databricks', 'AKS', 'Event Hubs'],
    highlights: ['Separated scoring, alerts, verification, and case generation in event-driven services.', 'Used Feast and Delta Lake to keep training and scoring features consistent.', 'Automated model validation, deployment approvals, and rollback.'],
  },
  {
    id: 'assist', sector: 'Public services', client: 'State of Delaware', role: 'ML Engineer',
    dates: 'Dec 2019 – Mar 2022', location: 'Delaware', title: 'ASSIST application intelligence',
    metric: '30%', metricLabel: 'less benefits application review time',
    summary: 'Streamlined application intake, document validation, eligibility scoring, and caseworker review.',
    detail: 'Built governed eligibility features and models for application classification, missing-document prediction, and case prioritization. Used historical backtesting and shadow scoring ahead of production releases.',
    stack: ['AWS Glue', 'Amazon SageMaker', 'FastAPI', 'AWS Lambda', 'SHAP'],
    highlights: ['Standardized application records and masked sensitive fields.', 'Used SHAP to make eligibility model recommendations easier to explain.', 'Built asynchronous document checks with retries and notifications.'],
  },
  {
    id: 'maintenance', sector: 'Industrial analytics', client: 'AVEVA', role: 'Data Scientist',
    dates: 'Oct 2017 – Nov 2019', location: 'Houston, TX', title: 'Industrial predictive maintenance',
    summary: 'Used equipment telemetry and risk models to surface early signs of failure and prioritize maintenance.',
    detail: 'Integrated SCADA and PLC sensor data, standardized timestamps, and engineered rolling and frequency features. Produced dashboards with asset health, downtime trends, and failure probabilities for reliability teams.',
    stack: ['Python', 'Scikit-learn', 'Random Forest', 'Kafka', 'Power BI'],
    highlights: ['Consolidated industrial telemetry for analytics and reporting.', 'Trained equipment risk models and analyzed recurring failures.', 'Automated validation and monitored data pipelines.'],
  },
  {
    id: 'quality', sector: 'Pharmaceutical quality', client: 'Cipla', role: 'Python Developer',
    dates: 'May 2015 – Jul 2017', location: 'Mumbai, India', title: 'Pharmaceutical quality data platform',
    summary: 'Improved lab record processing, batch traceability, and compliance reporting for manufacturing teams.',
    detail: 'Integrated LIMS, REST, and XML feeds into validated laboratory and manufacturing datasets. Built relational schemas and APIs for sample tracking, batch genealogy, and deviation analysis.',
    stack: ['Python', 'Django', 'Oracle Database', 'Pandas', 'Pytest'],
    highlights: ['Built validated APIs for laboratory and manufacturing data.', 'Automated scheduled exception reporting and sample alerts.', 'Added automated quality checks and repeatable deployments.'],
  },
]

export const skills = [
  { title: 'Agentic AI', items: ['LangGraph', 'CrewAI', 'LangChain', 'LlamaIndex', 'MCP', 'A2A', 'Human-in-the-loop approvals'] },
  { title: 'Retrieval & evaluation', items: ['RAG', 'Graph RAG', 'Pinecone', 'Neo4j', 'pgvector', 'RAGAS', 'DeepEval', 'LangSmith'] },
  { title: 'Machine learning', items: ['Scikit-learn', 'PyTorch', 'TensorFlow', 'XGBoost', 'SHAP', 'MLflow', 'Amazon SageMaker', 'Azure Machine Learning'] },
  { title: 'Software & data engineering', items: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'FastAPI', 'Django', 'Kafka', 'PySpark', 'AWS Glue'] },
  { title: 'Cloud & delivery', items: ['AWS', 'Microsoft Azure', 'GCP', 'Amazon Bedrock', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'] },
  { title: 'Governance & reliability', items: ['FHIR', 'HL7', 'PHI masking', 'OAuth 2.0', 'RBAC', 'Datadog', 'Prometheus', 'Pytest'] },
]
