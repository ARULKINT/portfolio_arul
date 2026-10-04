import { Project, SkillCategory, ExperienceItem, AcademicItem, LeadershipItem, TelemetryNode, SkillDetail } from '../types/portfolio';

export const TELEMETRY_NODES: TelemetryNode[] = [
  {
    id: 'source_a',
    label: 'SOURCE_A',
    sublabel: 'Telemetry Logs',
    status: 'streaming',
    throughput: '4,200 evt/sec',
    latency: '18ms',
    details: '12 distributed factory floor sensor nodes publishing raw semi-structured JSON payloads via TCP socket stream.',
    type: 'source'
  },
  {
    id: 'source_b',
    label: 'SOURCE_B',
    sublabel: 'Ops DB / ERP',
    status: 'synced',
    throughput: '850 tx/min',
    latency: '34ms',
    details: 'Production transaction ledger and raw bill-of-materials tables streamed via Debezium CDC change streams.',
    type: 'source'
  },
  {
    id: 'engine_core',
    label: 'ENGINE_CORE',
    sublabel: 'Kafka + Spark',
    status: 'active',
    throughput: '5,050 evt/sec',
    latency: '82ms',
    details: 'Structured streaming pipeline enforcing JSON schema validation, dropping corrupt frames, and windowing timestamps into 1-minute batches.',
    type: 'processing'
  },
  {
    id: 'storage',
    label: 'STORAGE',
    sublabel: 'PostgreSQL / Star Schema',
    status: 'active',
    throughput: '99.98% writes/sec',
    latency: '14ms',
    details: 'Multi-tier storage warehouse with hourly partitioning in PostgreSQL and columnar parquet partitions in object storage.',
    type: 'storage'
  },
  {
    id: 'analytics',
    label: 'ANALYTICS',
    sublabel: 'Power BI',
    status: 'active',
    throughput: 'DirectQuery Active',
    latency: '110ms',
    details: 'Executive and plant manager dashboards calculating real-time inventory shrinkage index, machine downtime, and shift scrap rates.',
    type: 'consumer'
  },
  {
    id: 'serving',
    label: 'SERVING',
    sublabel: 'REST APIs',
    status: 'active',
    throughput: '340 req/min',
    latency: '24ms p95',
    details: 'Secured HTTP microservice cluster exposing parameterized endpoints for cross-platform ERP sync and dispatch authorization.',
    type: 'consumer'
  }
];

export const PROJECTS: Project[] = [
  {
    id: '01',
    number: '01',
    categoryTag: 'DATA_ENGINEERING',
    filterCategory: 'engineering',
    badge: 'Featured Pipeline',
    status: 'STATUS: DEPLOYED_CONTAINER',
    title: 'Enterprise Telemetry & ETL Pipeline',
    description: 'Automated ingestion and partitioning of high-volume industrial log streams. Designed to parse nested semi-structured log events from distributed factory nodes, enforce schema constraints, drop malformed packets, and stage clean partitions into analytical storage.',
    problem: 'Unpartitioned log spikes causing query bottlenecks and silent data truncation.',
    architecture: 'PySpark transformations with date/hour partitioning to PostgreSQL & Parquet.',
    metric: '78% faster analytical scans',
    tags: ['PySpark', 'Apache Spark', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/arul-dev/enterprise-telemetry-etl',
    demoUrl: '#demo',
    codeSnippet: {
      filename: 'pipeline_job.py',
      runtime: 'SPARK-SESSION [ACTIVE]',
      code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col, from_json

spark = SparkSession.builder \\
    .appName("TelemetryIngestPipeline") \\
    .getOrCreate()

raw_df = spark.readStream \\
    .format("kafka") \\
    .option("subscribe", "sensors.telemetry.v1") \\
    .load()

clean_df = raw_df \\
    .select(from_json(col("value").cast("string"), schema).alias("payload")) \\
    .filter(col("payload.sensor_val").isNotNull())

clean_df.writeStream \\
    .partitionBy("batch_date", "node_id") \\
    .format("parquet") \\
    .start("/lake/partitioned_telemetry/")`
    },
    deepDive: {
      overview: 'Industrial IoT nodes generate semi-structured JSON telemetry with variable frequency and occasional null-byte corruption. This pipeline establishes an ingestion buffer using Kafka, validates incoming frames against an explicit schema in PySpark, and writes out Snappy-compressed Parquet files partitioned by date and node.',
      keyDecisions: [
        'Implemented strict dead-letter queue (DLQ) routing for corrupted packets instead of dropping them silently.',
        'Employed adaptive query execution (AQE) to coalesce micro-partitions into uniform 128MB chunks.',
        'Cut downstream analytical dashboard load time from 14.8 seconds to 3.2 seconds.'
      ],
      interactiveType: 'spark-stream'
    }
  },
  {
    id: '02',
    number: '02',
    categoryTag: 'DATA_ANALYTICS',
    filterCategory: 'analytics',
    badge: 'Operational Intelligence',
    status: 'STATUS: PRODUCTION_DASHBOARD',
    title: 'Production Operations & Inventory Analytics Engine',
    description: 'Real-time analytical dashboards tracking manufacturing throughput, scrap rates, inventory variance, and dispatch timelines. Consolidates disparate daily physical shop floor audits with digital ERP records to isolate bottlenecked shifts and reduce stockouts.',
    problem: '48-hour lag in identifying inventory shrinkage and shift throughput variance.',
    architecture: 'Aggregated SQL staging tables feeding dynamic Power BI executive metrics.',
    metric: '14.2% scrap reduction',
    tags: ['Python', 'SQL', 'PostgreSQL', 'Power BI'],
    githubUrl: 'https://github.com/arul-dev/ops-inventory-analytics',
    demoUrl: '#demo',
    metricsPanel: {
      title: 'OPS_EFFICIENCY_TELEMETRY',
      statusLabel: 'LIVE_RUN',
      submetricLabel: 'Inventory Discrepancy Index',
      value: '0.42%',
      subvalue: '(-2.8% audit delta)',
      badge: 'BATCH: SHIFT_C',
      sqlQuery: `SELECT shift_id, SUM(scrap_qty) / SUM(output_qty) * 100 AS scrap_rate
FROM ops_daily_logs 
GROUP BY shift_id ORDER BY scrap_rate DESC;`
    },
    deepDive: {
      overview: 'Shop floor operations at manufacturing plants face severe data drift between manual shift logs and automated ERP bookings. This project built an end-to-end data pipeline that reconciles physical cycle counts with warehouse ledger entries on a per-shift cadence.',
      keyDecisions: [
        'Automated discrepancy anomaly thresholds alerting supervisors before daily close.',
        'Pre-aggregated window functions in PostgreSQL materialized views, cutting dashboard refresh time to <1 second.',
        'Contributed directly to a 14.2% drop in avoidable scrap across three rotating plant shifts.'
      ],
      interactiveType: 'sql-runner'
    }
  },
  {
    id: '03',
    number: '03',
    categoryTag: 'DATA_ENGINEERING',
    filterCategory: 'engineering',
    badge: 'AIRFLOW_JOB',
    status: 'STATUS: SCHEDULED_DAG',
    title: 'Distributed Data Warehouse Schema & Staging Workflow',
    description: 'Multi-tier star schema with automated cleansing and data quality checks. Features automated DAG schedules isolating dimension table drift and staging atomic transactions.',
    problem: 'Slow OLAP queries on normalized transactional databases causing production locks.',
    architecture: 'Apache Airflow orchestrating fact and slowly changing dimension (SCD Type 2) tables in PostgreSQL.',
    metric: '99.9% data freshness SLA',
    tags: ['Python', 'SQL', 'PostgreSQL', 'Airflow'],
    githubUrl: 'https://github.com/arul-dev/warehouse-staging-airflow',
    deepDive: {
      overview: 'Engineered a star schema data warehouse that decouples operational transactional tables from reporting queries. Uses Airflow DAGs with Great Expectations for data validation.',
      keyDecisions: [
        'Implemented SCD Type 2 tracking for employee and product dimension tables.',
        'Created isolated staging schemas with idempotent upsert workflows.',
        'Added automated Slack webhook alerts for failed pipeline steps.'
      ],
      interactiveType: 'airflow-dag'
    }
  },
  {
    id: '04',
    number: '04',
    categoryTag: 'FULL_STACK',
    filterCategory: 'fullstack',
    badge: 'WEB_PORTAL',
    status: 'STATUS: PRODUCTION_APP',
    title: 'Cross-Platform Operations Management Portal',
    description: 'Full-stack web application designed for inventory audit logs, department dispatch authorizations, role-based sign-offs, and dynamic shift tracking.',
    problem: 'Manual paper checklists resulting in delayed dispatch verifications and lost audit trails.',
    architecture: 'Next.js frontend with REST APIs, PostgreSQL persistence, and role-based access control.',
    metric: '100% paperless audit compliance',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Tailwind'],
    githubUrl: 'https://github.com/arul-dev/ops-management-portal',
    deepDive: {
      overview: 'A digital portal used across tablets and desktop terminals on the factory floor. Features responsive audit forms, instant variance calculation, and digital cryptographic signoffs.',
      keyDecisions: [
        'Optimized client bundle for low-bandwidth plant network conditions.',
        'Implemented optimistic UI updates with offline IndexedDB fallbacks.',
        'Built comprehensive audit log tracking all edits with timestamp and user ID.'
      ],
      interactiveType: 'api-request'
    }
  },
  {
    id: '05',
    number: '05',
    categoryTag: 'AUTOMATION',
    filterCategory: 'automation',
    badge: 'DAEMON',
    status: 'STATUS: SYSTEMD_ACTIVE',
    title: 'Automated Batch Processing & Anomaly Alert System',
    description: 'Scheduled cron pipelines scanning transaction logs for standard deviation spikes in warehouse dispatch queues with immediate alert dispatch via webhooks.',
    problem: 'Dispatch anomalies identified hours after shipments departed facilities.',
    architecture: 'Lightweight Linux daemon utilizing Pandas for statistical outlier detection and webhook notifications.',
    metric: '<2 min anomaly notification',
    tags: ['Python', 'Pandas', 'Linux', 'Bash'],
    githubUrl: 'https://github.com/arul-dev/batch-anomaly-alert-daemon',
    deepDive: {
      overview: 'Continuously monitors warehouse queue logs. If variance in item dispatch weight exceeds 2.5 standard deviations from the moving average, an alert is pushed to shift leads immediately.',
      keyDecisions: [
        'Z-score computation across sliding 30-minute rolling windows.',
        'Daemonized using systemd with automatic restart on unexpected termination.',
        'Zero external cloud dependencies; operates cleanly on edge Linux gateways.'
      ],
      interactiveType: 'spark-stream'
    }
  },
  {
    id: '06',
    number: '06',
    categoryTag: 'DATA_ANALYTICS',
    filterCategory: 'analytics',
    badge: 'FORECASTING',
    status: 'STATUS: VALIDATED_MODEL',
    title: 'Retail Sales & Predictive Demand Intelligence Platform',
    description: 'Exploratory data analysis and time-series clustering for inventory level optimization, highlighting seasonal variance to prevent overstocking costs.',
    problem: 'Overstocking seasonal stock items resulting in dead capital and warehouse congestion.',
    architecture: 'Pandas exploratory analysis with ARIMA forecasting and interactive Power BI drill-down models.',
    metric: '18% inventory holding cost reduction',
    tags: ['Python', 'Pandas', 'Power BI', 'SQL'],
    githubUrl: 'https://github.com/arul-dev/retail-demand-forecasting',
    deepDive: {
      overview: 'Analyzed 3 years of retail transactional data. Decomposed trend, seasonality, and residual noise to compute safe reorder points per SKU category.',
      keyDecisions: [
        'Grouped 450+ product lines into 6 demand volatility clusters.',
        'Constructed dynamic safety-stock formulas taking supplier lead-time variance into account.',
        'Synthesized findings into an executive Power BI dashboard with scenario toggles.'
      ],
      interactiveType: 'sql-runner'
    }
  },
  {
    id: '07',
    number: '07',
    categoryTag: 'FULL_STACK',
    filterCategory: 'fullstack',
    badge: 'MICROSERVICE',
    status: 'STATUS: DOCKER_CONTAINER',
    title: 'RESTful Data API & Query Service',
    description: 'Microservice backend architecture exposing secure, cached HTTP endpoints for operational analytics, featuring rate limiting, JWT validation, and SQL query parameterization.',
    problem: 'Uncontrolled direct client database queries risking injection and server overload.',
    architecture: 'Node.js Express microservice containerized with Docker, featuring Redis caching layer and parameterized queries.',
    metric: '<15ms average cached response',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/arul-dev/restful-data-api-service',
    deepDive: {
      overview: 'Engineered a resilient API gateway handling data queries between analytics frontends and underlying operational relational stores.',
      keyDecisions: [
        'Applied Token Bucket rate-limiting algorithm to protect against query flooding.',
        'Added structured JSON logging with correlation IDs for cross-service tracing.',
        'Enforced 100% prepared SQL statements to eliminate injection vulnerabilities.'
      ],
      interactiveType: 'api-request'
    }
  },
  {
    id: '08',
    number: '08',
    categoryTag: 'DATA_ENGINEERING',
    filterCategory: 'engineering',
    badge: 'DISTRIBUTED_MAPREDUCE',
    status: 'STATUS: CLUSTER_VERIFIED',
    title: 'Hadoop & MapReduce Distributed Log Aggregator',
    description: 'Batch log parser clustering system crash frequencies across clustered nodes. Implemented MapReduce paradigms to parse multi-gigabyte log dumps and generate Hive summary tables.',
    problem: 'Single-node log analyzers running out of memory on multi-gigabyte server failure dumps.',
    architecture: 'Hadoop HDFS cluster running distributed MapReduce jobs with Hive SQL aggregations.',
    metric: '10x faster crash pattern extraction',
    tags: ['Hadoop', 'Hive', 'Python', 'Linux'],
    githubUrl: 'https://github.com/arul-dev/hadoop-mapreduce-log-aggregator',
    deepDive: {
      overview: 'Simulated a distributed Hadoop cluster to process server access logs. The Mapper isolates error codes and node hostnames; the Reducer tallies failure frequencies across temporal buckets.',
      keyDecisions: [
        'Optimized custom WritableComparable key-value serializers to reduce network shuffle overhead.',
        'Partitioned Hive external tables by year, month, and severity grade.',
        'Automated cron-based HDFS directory rotation and garbage cleanup.'
      ],
      interactiveType: 'spark-stream'
    }
  },
  {
    id: '09',
    number: '09',
    categoryTag: 'AUTOMATION',
    filterCategory: 'automation',
    badge: 'NOTIFICATION_BOT',
    status: 'STATUS: PRODUCTION_ACTIVE',
    title: 'Automated PDF Report Generator & Notification Bot',
    description: 'Daily dispatch summary compiler pulling tabular metrics from production databases, rendering stylized PDF sheets, and transmitting digests to management channels.',
    problem: 'Plant executives lacking unified daily summaries before morning production meetings.',
    architecture: 'Python headless script compiling SQL queries into styled PDF reports and transmitting via webhooks & SMTP.',
    metric: '100% automated 7:00 AM delivery',
    tags: ['Python', 'Pandas', 'Docker', 'Webhooks'],
    githubUrl: 'https://github.com/arul-dev/pdf-report-notification-bot',
    deepDive: {
      overview: 'Runs automatically at 06:45 AM daily. Extracts the completed night shift metrics, calculates scrap delta against weekly targets, generates a clean multi-page PDF briefing, and dispatches it.',
      keyDecisions: [
        'Used HTML/CSS templating with headless rendering for crisp, publication-grade tabular styling.',
        'Configured automated retry logic with exponential backoff for outbound webhook calls.',
        'Packaged into a lean 120MB Alpine Docker image.'
      ],
      interactiveType: 'api-request'
    }
  },
  {
    id: '10',
    number: '10',
    categoryTag: 'SOFTWARE_APPS',
    filterCategory: 'applications',
    badge: 'GEODATA_DASHBOARD',
    status: 'STATUS: LIVE_APPLICATION',
    title: 'Interactive Fleet & Shipment Tracking Dashboard',
    description: 'Client-facing operational dashboard with visual coordinate tracking, delivery milestone markers, status filter chips, and latency telemetry for active transport assets.',
    problem: 'Customers calling dispatch teams repeatedly due to lack of visibility into delivery milestones.',
    architecture: 'React frontend featuring coordinate geospatial plots, PostgreSQL geospatial points, and real-time status state.',
    metric: '65% drop in customer support inquiries',
    tags: ['React', 'JavaScript', 'PostgreSQL', 'CSS'],
    githubUrl: 'https://github.com/arul-dev/fleet-shipment-tracking-dashboard',
    deepDive: {
      overview: 'Interactive web dashboard providing real-time tracking of cargo transit between manufacturing units, regional depots, and destination fulfillment centers.',
      keyDecisions: [
        'Implemented lightweight SVG canvas map rendering to ensure 60fps responsiveness on low-spec tablets.',
        'Designed color-coded milestone telemetry (Dispatched, In Transit, Customs, Delivered).',
        'Built fast client-side fuzzy searching for consignment numbers and driver IDs.'
      ],
      interactiveType: 'gps-telemetry'
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming',
    icon: 'code_blocks',
    skills: ['Python', 'SQL (PostgreSQL / ANSI)', 'C++']
  },
  {
    title: 'Data Engineering',
    icon: 'hub',
    skills: ['Apache Spark', 'PySpark', 'Hadoop', 'Hive', 'ETL Workflows']
  },
  {
    title: 'Data Analysis',
    icon: 'analytics',
    skills: ['Pandas & NumPy', 'Microsoft Excel', 'Power BI', 'Data Cleansing']
  },
  {
    title: 'Databases',
    icon: 'database',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB']
  },
  {
    title: 'Development & Web',
    icon: 'devices',
    skills: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'Node.js', 'React', 'Next.js']
  },
  {
    title: 'Tools & Platforms',
    icon: 'terminal',
    skills: ['Git', 'GitHub', 'Linux / Unix Shell', 'Docker']
  }
];

export const DESIGN_SKILLS = ['Figma', 'Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects'];

export const SKILL_DETAILS: Record<string, SkillDetail> = {
  'PySpark': {
    name: 'PySpark / Apache Spark',
    category: 'Data Engineering',
    proficiency: 'Production Ready',
    projects: ['Enterprise Telemetry & ETL Pipeline'],
    context: 'Writing structured streaming pipelines, handling partition keys (date/node_id), writing to Parquet columnar storage, and managing SparkSession configurations.',
    sampleCode: 'df.writeStream.partitionBy("batch_date").format("parquet").start("/lake/data")'
  },
  'Python': {
    name: 'Python',
    category: 'Programming',
    proficiency: 'Production Ready',
    projects: ['Telemetry ETL', 'Ops Analytics', 'Anomaly Alert Daemon', 'PDF Bot'],
    context: 'Core language for ETL pipelines, data analysis with Pandas/NumPy, data modeling, automated cron scripts, and system utilities.',
    sampleCode: 'import pandas as pd\ndf = pd.read_csv("telemetry.csv")\nz_score = (df["val"] - df["val"].mean()) / df["val"].std()'
  },
  'SQL (PostgreSQL / ANSI)': {
    name: 'SQL (PostgreSQL / ANSI)',
    category: 'Programming & Databases',
    proficiency: 'Production Ready',
    projects: ['Inventory Analytics', 'Data Warehouse Schema', 'REST API'],
    context: 'Complex multi-table JOINs, window functions (ROW_NUMBER, LAG, LEAD), indexing strategies (B-Tree, BRIN for time series), and star schema design.',
    sampleCode: 'SELECT shift_id, SUM(scrap_qty) / SUM(output_qty) * 100 AS scrap_rate\nFROM ops_daily_logs\nGROUP BY shift_id ORDER BY scrap_rate DESC;'
  },
  'PostgreSQL': {
    name: 'PostgreSQL',
    category: 'Databases',
    proficiency: 'Production Ready',
    projects: ['Data Warehouse', 'Ops Portal', 'RESTful API', 'Fleet Dashboard'],
    context: 'Relational data modeling, ACID transactions, materialized views, foreign key constraints, connection pooling with PgBouncer, and performance tuning.'
  },
  'Docker': {
    name: 'Docker',
    category: 'Tools & Platforms',
    proficiency: 'Production Ready',
    projects: ['Telemetry ETL', 'RESTful API', 'PDF Report Generator'],
    context: 'Multi-stage Dockerfiles, Docker Compose service orchestration (PostgreSQL + API + Redis), environment variable management, and lightweight Alpine base images.'
  },
  'React': {
    name: 'React',
    category: 'Development & Web',
    proficiency: 'Production Ready',
    projects: ['Operations Management Portal', 'Fleet Tracking Dashboard'],
    context: 'Modern React with functional components, hooks, custom state management, responsive Tailwind layouts, and interactive SVG/Canvas renderings.'
  },
  'Power BI': {
    name: 'Power BI',
    category: 'Data Analysis',
    proficiency: 'Advanced',
    projects: ['Production Operations Analytics', 'Retail Demand Forecasting'],
    context: 'DAX expressions, data modeling with star schemas, custom drill-downs, parameterized slicers, and executive shop floor operational dashboards.'
  }
};

export const EXPERIENCE: ExperienceItem = {
  id: 'asara',
  role: 'Junior Engineer Trainee',
  company: 'Asara Pvt Ltd',
  location: 'Bangalore, India',
  period: 'January 2022 – May 2023',
  summary: 'Hands-on shop-floor operations role managing physical inventory tracking, manufacturing shift reporting, and ERP variance reconciliation.',
  bullets: [
    'Supported operational inventory management and daily departmental reporting across manufacturing shifts.',
    'Maintained daily inventory records, audited physical-to-digital inventory variance, and highlighted discrepancies before ERP batch closing.',
    'Coordinated seamlessly between production personnel, logistics dispatch, and quality assurance teams across alternating work shifts.',
    'Helped monitor live operational activities and prevent unplanned production interruptions through proactive stock and tool tracking.'
  ],
  competencies: [
    'Inventory Auditing',
    'Operational Reporting',
    'Shift Scheduling',
    'Cross-Functional Sync',
    'ERP Reconciliation'
  ],
  shiftMetrics: [
    { label: 'Audited Inventory Items', value: '1,400+ units / week' },
    { label: 'Variance Detection Delta', value: '<0.5% target' },
    { label: 'Manufacturing Shifts Synced', value: '3 rotating shifts' },
    { label: 'ERP Batch Signoff Timeliness', value: '99.4% on schedule' }
  ]
};

export const ACADEMICS: AcademicItem[] = [
  {
    degreeType: 'DEGREE // UNDERGRADUATE',
    status: 'In Progress',
    title: 'B.Tech in Computer Science and Engineering',
    institution: 'Rajiv Gandhi College of Engineering and Technology (Pondicherry University)',
    description: 'Rigorous immersion in distributed architectures, operating systems, data structures and algorithms, database management, and cloud application paradigms.',
    coursework: ['Algorithms', 'DBMS', 'OS & Networking', 'Distributed Systems', 'Data Warehousing'],
    period: '2023 – 2026'
  },
  {
    degreeType: 'DIPLOMA // TECHNICAL',
    status: 'Completed',
    title: 'Diploma in Mechanical Engineering',
    institution: 'Annai Velankanni Polytechnic College',
    description: 'Strong cross-disciplinary foundation in manufacturing workflows, industrial drafting, material kinematics, precision measurement, and quality assurance principles.',
    coursework: ['Manufacturing Process', 'Quality Control', 'CAD/Drafting', 'Fluid Mechanics', 'Industrial Management'],
    period: '2018 – 2021'
  }
];

export const LEADERSHIP: LeadershipItem[] = [
  {
    title: 'College Student President',
    icon: 'account_balance',
    summary: 'Elected to lead the college student council. Coordinated large-scale multi-departmental campus initiatives, organized inter-college events, and served as the direct student liaison to the college administration.',
    domain: '// Council Representation',
    fullNarrative: 'Represented 1,800+ students across engineering branches. Chaired monthly advisory committees with department heads and Dean, resolving facility challenges and launching student peer mentorship programs.'
  },
  {
    title: 'Class Representative',
    icon: 'groups',
    summary: 'Serving as the primary communication bridge between academic faculty and the student cohort. Managing scheduling, resolving academic logistical hurdles, and facilitating peer study circles.',
    domain: '// Cohort Management',
    fullNarrative: 'Maintained seamless communication channels across faculty members, lab coordinators, and 60+ classmates to ensure timetable adjustments and project submission clarity.'
  },
  {
    title: 'Design Team Leadership',
    icon: 'brush',
    summary: 'Headed visual design and creative media teams for university symposia, producing banners, event badges, digital banners, and presentation suites with consistent visual identity.',
    domain: '// Visual Directorship',
    fullNarrative: 'Supervised a squad of 8 student designers using Figma, Illustrator, and Photoshop to brand inter-college technical fests with comprehensive typography and print collateral.'
  },
  {
    title: 'Technical Event Organization',
    icon: 'event',
    summary: 'Managed end-to-end logistics for engineering symposiums, hackathons, and technical workshops—spearheading vendor coordination, budgeting, and participant communications.',
    domain: '// Logistics & Coordination',
    fullNarrative: 'Orchestrated logistics for a 400+ participant state-level hackathon. Managed room allocations, high-speed networking drops, sponsorship budgets, and judging rubrics.'
  },
  {
    title: 'Kabaddi Competitive Athlete',
    icon: 'sports_martial_arts',
    summary: 'Active participant in competitive regional Kabaddi tournaments. The sport demands instantaneous tactical reaction time, rigorous physical discipline, total mental clarity under severe physical stress, and absolute trust in teammate coordination.',
    domain: '// Team Strategy & Resilience',
    highlightTag: 'HIGH_PRESSURE EXECUTION',
    fullNarrative: 'Competitive Kabaddi requires defensive synchronization, breath-holding raid intensity, and situational awareness under split-second tactical shifts. It instills deep resilience that translates directly into high-pressure technical problem solving.'
  }
];
