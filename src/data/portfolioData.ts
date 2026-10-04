import { Project, SkillCategory, ExperienceItem, AcademicItem, LeadershipItem, TelemetryNode, SkillDetail } from '../types/portfolio';

export const TELEMETRY_NODES: TelemetryNode[] = [
  {
    id: 'weather_api',
    label: 'WEATHER_INGESTION',
    sublabel: 'OpenWeather API Stream',
    status: 'streaming',
    throughput: '7 Cities / Batch',
    latency: '45ms',
    details: 'Python ingestion collecting real-time weather observations across 7 Indian cities into PostgreSQL via JDBC.',
    type: 'source'
  },
  {
    id: 'commerce_pulse',
    label: 'COMMERCE_PULSE',
    sublabel: 'PySpark + Airflow',
    status: 'active',
    throughput: '12,400 evt/sec',
    latency: '68ms',
    details: 'End-to-end e-commerce pipeline processing order ingestion, data quality validations, and dimensional schema transforms.',
    type: 'processing'
  },
  {
    id: 'rowdesk_db',
    label: 'ROWDESK_DB',
    sublabel: 'Neon PostgreSQL (Prisma)',
    status: 'synced',
    throughput: '99.9% uptime',
    latency: '18ms',
    details: 'PostgreSQL database hosting Rowdesk CRM workflows, Zod schema validations, and Google Drive OAuth metadata.',
    type: 'storage'
  },
  {
    id: 'funnel_analytics',
    label: 'FUNNEL_ANALYTICS',
    sublabel: 'Power BI + DAX',
    status: 'active',
    throughput: '360 Leads / 2.1k Calls',
    latency: '110ms',
    details: 'Lead acquisition analytics dashboard modeling 360 Google Maps scraped leads and 2,192 call records.',
    type: 'consumer'
  }
];

export const PROJECTS: Project[] = [
  // --- DATA ENGINEERING / ANALYTICS ---
  {
    id: 'commerce-pulse',
    number: '02',
    categoryTag: 'DATA_ENGINEERING',
    filterCategory: 'engineering',
    badge: 'Architecture Dossier',
    status: 'STATUS: PIPELINE_DESIGNED',
    title: 'CommercePulse — E-commerce Data Architecture',
    description: 'Documented end-to-end data engineering platform processing e-commerce transaction data through ingestion, transformation, data quality validation, star schema storage, and Airflow orchestration.',
    problem: 'High-frequency e-commerce orders causing data quality drifts and unvalidated analytical metrics.',
    architecture: 'Python & PySpark ETL -> PostgreSQL Data Warehouse -> Apache Airflow DAGs -> Metabase/Power BI.',
    metric: 'Full Star Schema ETL',
    tags: ['Python', 'PySpark', 'PostgreSQL', 'Airflow', 'Docker', 'GitHub Actions', 'Power BI'],
    githubUrl: 'https://github.com/ARULKINT/portfolio_arul',
    isPriority: true,
    priorityTag: 'PRIORITY_01',
    codeSnippet: {
      filename: 'commerce_dag.py',
      runtime: 'AIRFLOW-DAG [SCHEDULED]',
      code: `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'arul',
    'retries': 2,
    'retry_delay': timedelta(minutes=5)
}

with DAG('commerce_pulse_etl', start_date=datetime(2026, 1, 1), schedule_interval='@daily', default_args=default_args) as dag:
    validate_orders = PythonOperator(task_id='validate_orders', python_callable=run_data_quality_checks)
    transform_dim = PythonOperator(task_id='transform_star_schema', python_callable=pyspark_transform_job)
    validate_orders >> transform_dim`
    },
    deepDive: {
      overview: 'Complete dimensional data warehouse model (Fact Orders, Dim Customer, Dim Product, Dim Date) designed to handle e-commerce operations with automated data quality checks.',
      keyDecisions: [
        'Designed idempotent Airflow DAG tasks to prevent duplicate transactions on pipeline retries.',
        'Constructed star-schema data models optimizing OLAP reporting queries.',
        'Integrated automated GitHub Actions CI/CD workflows for dbt and SQL validation.'
      ],
      interactiveType: 'airflow-dag'
    }
  },
  {
    id: 'weather-data-eng',
    number: '01',
    categoryTag: 'DATA_ENGINEERING',
    filterCategory: 'engineering',
    badge: 'PySpark & OpenWeather API',
    status: 'STATUS: GITHUB_VERIFIED',
    title: 'Weather Data Engineering Pipeline',
    description: 'API-based data pipeline collecting weather observations for 7 Indian cities, transforming the data with PySpark, and persisting records into PostgreSQL via JDBC inside Docker containers.',
    problem: 'Raw API weather data required structured ETL pipelines for historical analysis and SQL querying.',
    architecture: 'Python API Ingestion -> PySpark Transformations -> JDBC PostgreSQL Storage -> Docker Containerization.',
    metric: '7 Indian Cities Streamed',
    tags: ['Python', 'PySpark', 'PostgreSQL', 'Docker', 'OpenWeather API', 'JDBC'],
    githubUrl: 'https://github.com/ARULKINT/weather_data_eng',
    codeSnippet: {
      filename: 'weather_spark_ingest.py',
      runtime: 'PYSPARK [OPENWEATHER_INGEST]',
      code: `import requests
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, current_timestamp

spark = SparkSession.builder \\
    .appName("WeatherPipeline") \\
    .config("spark.jars", "/drivers/postgresql-42.6.0.jar") \\
    .getOrCreate()

def fetch_weather(city):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}"
    return requests.get(url).json()

# PySpark JDBC Write to PostgreSQL
weather_df.write \\
    .format("jdbc") \\
    .option("url", "jdbc:postgresql://postgres_db:5432/weather_db") \\
    .option("dbtable", "city_weather_logs") \\
    .option("user", "postgres") \\
    .option("password", "secret") \\
    .mode("append") \\
    .save()`
    },
    deepDive: {
      overview: 'Collects live weather parameters (temperature, humidity, pressure, wind velocity) for 7 Indian cities. Uses PySpark for schema validation, data cleaning, and writing structured tables into PostgreSQL.',
      keyDecisions: [
        'Containerized PostgreSQL and PySpark driver dependencies using Docker Compose.',
        'Implemented JDBC socket configuration for reliable bulk insertion.',
        'Structured schema for temporal reporting across Indian regional weather grids.'
      ],
      interactiveType: 'spark-stream'
    }
  },
  {
    id: 'uber-data-eng',
    number: '03',
    categoryTag: 'DATA_ENGINEERING',
    filterCategory: 'engineering',
    badge: 'Dimensional Modeling',
    status: 'STATUS: MODEL_DESIGNED',
    title: 'Uber Data Engineering Pipeline',
    description: 'Data pipeline and analytics architecture using Uber trip records. Features dimensional modeling (Mage/Airflow ETL, Fact & Dimension tables) for trip distance, fare breakdown, and pick-up analytics.',
    problem: 'Unstructured trip logs lacking analytical granularity for driver yield and fare optimization.',
    architecture: 'Python Pandas/PySpark -> Star Schema PostgreSQL -> Airflow & dbt -> Power BI Dashboards.',
    metric: '100k+ Trip Records Modeled',
    tags: ['Python', 'Pandas', 'PostgreSQL', 'Airflow', 'dbt', 'Power BI', 'Docker'],
    githubUrl: 'https://github.com/ARULKINT/portfolio_arul',
    metricsPanel: {
      title: 'UBER_TRIP_ANALYTICS',
      statusLabel: 'STAR_SCHEMA',
      submetricLabel: 'Average Fare Rate / Mile',
      value: '$3.42',
      subvalue: '(+12% surge delta)',
      badge: 'DIM_RATE_CODE',
      sqlQuery: `SELECT r.rate_code_name, 
       ROUND(AVG(f.fare_amount)::numeric, 2) AS avg_fare,
       COUNT(f.trip_id) AS total_trips
FROM fact_trips f
JOIN dim_rate_code r ON f.rate_code_id = r.rate_code_id
GROUP BY r.rate_code_name ORDER BY avg_fare DESC;`
    },
    deepDive: {
      overview: 'Deconstructed flat Uber trip datasets into normalized dimension tables (Vendor, Rate Code, Pickup Location, Dropoff Location, Payment Type) and a central Fact Trip table.',
      keyDecisions: [
        'Organized dbt transformations for automated data cleansing and schema documentation.',
        'Created optimized window functions in SQL for hourly surge demand analytics.',
        'Constructed interactive Power BI visual dashboards for trip density mapping.'
      ],
      interactiveType: 'sql-runner'
    }
  },
  {
    id: 'lead-analytics',
    number: '05',
    categoryTag: 'DATA_ANALYTICS',
    filterCategory: 'analytics',
    badge: 'Power BI & Python ETL',
    status: 'STATUS: PRODUCTION_ETL_COMPLETE',
    title: 'Lead Acquisition & Employee Performance Analysis',
    description: 'End-to-end data analytics and business intelligence solution analyzing acquisition funnel dynamics (360 leads across 4 weekly cycles), demographic conversion trends, and sales manager performance (4 Senior Managers, 16 Junior Managers, 2,192 phone interactions).',
    problem: 'High lead drop-off at demo stage (46.11% loss) and a 3.2x performance gap between top (SNR501MG at 24.47%) and bottom (SNR503MG at 12.24%) sales manager teams requiring automated ETL, outlier rules, and DAX metric benchmarking.',
    architecture: 'Raw CSV Ingestion -> Python Automated ETL & Outliers Handler -> Star Schema PostgreSQL Data Model -> 15 DAX Measures -> Power BI Dashboard Workspace (qasq.pbix).',
    metric: '17.78% Overall Conv Rate',
    tags: ['Python', 'Power BI', 'DAX', 'PostgreSQL', 'ETL Data Cleaning', 'Star Schema', 'Outlier Audit'],
    githubUrl: 'https://github.com/ARULKINT/sales-etl-pipeline_001',
    metricsPanel: {
      title: 'LEAD_ACQUISITION_FUNNEL',
      statusLabel: 'CLEANED_DATASET',
      submetricLabel: 'Email Channel Conv Rate',
      value: '26.03%',
      subvalue: '(360 leads / 2,192 calls)',
      badge: 'TOP_CHANNEL',
      sqlQuery: `SELECT lead_gen_source,
       COUNT(lead_id) AS total_leads,
       COUNT(CASE WHEN lead_stage = 'conversion' THEN 1 END) AS converted_leads,
       ROUND((COUNT(CASE WHEN lead_stage = 'conversion' THEN 1 END)::numeric / COUNT(lead_id)) * 100, 2) AS conv_rate_pct
FROM leads_summary_view
GROUP BY lead_gen_source
ORDER BY conv_rate_pct DESC;`
    },
    deepDive: {
      overview: 'Analyzed 360 unique leads, 2,192 phone interactions, and 4 sales manager cohorts. Identified top conversion channel (Email Marketing at 26.03%) and top geographic market (Bengaluru at 29.41%). Built automated Python script for age & percentage outlier capping.',
      keyDecisions: [
        'Built automated Python ETL script to sanitize age anomalies (ages 211, 116) and cap demo watched % at 100%.',
        'Authored 15 custom DAX measures for dynamic funnel stage conversion and call success rates.',
        'Identified top drop-off bottlenecks: Price sensitivity ("Can\'t afford" = 95 mentions) and preference for offline classes (91 mentions).'
      ],
      interactiveType: 'sql-runner'
    }
  },

  // --- SOFTWARE DEVELOPMENT & APPLICATIONS (PRIORITY 1) ---
  {
    id: 'rowdesk-crm',
    number: '04',
    categoryTag: 'FULL_STACK',
    filterCategory: 'fullstack',
    badge: 'Deployed Production App',
    status: 'STATUS: LIVE_VERIFIED',
    title: 'Rowdesk — Internal Workflow & CRM Platform',
    description: 'Deployed CRM application featuring structured follow-up workflows, Zod input validation, database-backed state with Neon PostgreSQL, Google Drive read-only OAuth, and Vitest test suites.',
    problem: 'Fragmented lead management and lack of structured follow-up scheduling for sales pipelines.',
    architecture: 'Next.js App Router -> Prisma ORM -> Neon PostgreSQL -> Google Drive OAuth -> Vercel.',
    metric: 'Live Deployed CRM',
    tags: ['Next.js', 'React', 'Prisma', 'Neon PostgreSQL', 'Zod', 'Google OAuth', 'Vitest'],
    githubUrl: 'https://github.com/ARULKINT/rowdesk',
    demoUrl: 'https://crm-fx2.vercel.app/',
    isPriority: true,
    priorityTag: 'PRIORITY_01',
    demoCredentials: {
      id: 'admin',
      pass: 'Admin@1234'
    },
    codeSnippet: {
      filename: 'lead_route.ts',
      runtime: 'NEXT.JS API ROUTE',
      code: `import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const LeadSchema = z.object({
  clientName: z.string().min(2),
  contactEmail: z.string().email(),
  followUpDate: z.string()
});

export async function POST(req: Request) {
  const body = await req.json();
  const data = LeadSchema.parse(body);
  
  const newLead = await prisma.lead.create({
    data: {
      name: data.clientName,
      email: data.contactEmail,
      scheduledAt: new Date(data.followUpDate)
    }
  });
  return Response.json(newLead);
}`
    },
    deepDive: {
      overview: 'Rowdesk provides a robust workflow platform with database persistence via Prisma & Neon PostgreSQL. Includes full validation pipelines using Zod, automated Vitest suites, and instant admin login credentials (ID: admin, Pass: Admin@1234).',
      keyDecisions: [
        'Provided instant demo login access: ID: admin | Password: Admin@1234.',
        'Integrated Google Drive OAuth for seamless document reference attachment.',
        'Deployed serverless Postgres on Neon with instant connection pooling.'
      ],
      interactiveType: 'api-request'
    }
  },
  {
    id: 'forge-and-flint',
    number: '07',
    categoryTag: 'SOFTWARE_APPS',
    filterCategory: 'applications',
    badge: 'Founder Initiative',
    status: 'STATUS: WEBSITE_LIVE',
    title: 'Forge & Flint — Software Solutions Initiative',
    description: 'Software solutions initiative focused on practical business software, including CRM, billing, inventory, and digital solutions for small and growing enterprises.',
    problem: 'Small businesses struggling with fragmented digital tools and complex enterprise pricing.',
    architecture: 'React Frontend -> Vite Build -> Express API -> PostgreSQL Database.',
    metric: 'Live Digital Initiative',
    tags: ['React', 'Vite', 'Express', 'PostgreSQL', 'Node.js'],
    githubUrl: 'https://github.com/ARULKINT/forge-flint-website',
    demoUrl: 'https://forgeandflint.in/',
    isPriority: true,
    priorityTag: 'PRIORITY_01',
    deepDive: {
      overview: 'Founded Forge & Flint to architect modern, intuitive web applications for regional business workflows. Designed responsive user interfaces and scalable Express microservices.',
      keyDecisions: [
        'Established modular component design systems in React for rapid client customization.',
        'Built REST APIs in Express with clean route controllers and PostgreSQL database integration.',
        'Deployed production web presence at forgeandflint.in.'
      ],
      interactiveType: 'api-request'
    }
  },
  {
    id: 'textile-crm',
    number: '08',
    categoryTag: 'FULL_STACK',
    filterCategory: 'fullstack',
    badge: 'NextAuth Security',
    status: 'STATUS: GITHUB_VERIFIED',
    title: 'Textile Retail CRM Prototype',
    description: 'CRM prototype tailored for textile retail management featuring customer billing history, inventory cataloging, and NextAuth role-based authentication.',
    problem: 'Textile retail stores requiring specialized inventory tracking for fabric variants and customer ledgers.',
    architecture: 'Next.js App Router -> Prisma ORM -> SQLite Database -> NextAuth.js.',
    metric: 'Role-Based Authentication',
    tags: ['Next.js', 'Prisma', 'SQLite', 'NextAuth', 'TypeScript'],
    githubUrl: 'https://github.com/ARULKINT/textile-crm',
    isPriority: true,
    priorityTag: 'PRIORITY_01',
    deepDive: {
      overview: 'Designed around retail textile business needs, providing secure multi-user role management (Manager, Billing Staff) via NextAuth.',
      keyDecisions: [
        'Implemented Prisma schema relations mapping fabric SKUs to sales receipts.',
        'Utilized NextAuth for secure session cookie management.',
        'Ensured lightweight deployment with SQLite file database support.'
      ],
      interactiveType: 'api-request'
    }
  },
  {
    id: 'pandian-hotel',
    number: '09',
    categoryTag: 'SOFTWARE_APPS',
    filterCategory: 'applications',
    badge: 'Netlify Live',
    status: 'STATUS: LIVE_VERIFIED',
    title: 'Pandian Hotel & Room Stay Booking App',
    description: 'Hotel booking web application featuring interactive room selection, reservation forms, and backend integration with Neon PostgreSQL.',
    problem: 'Manual hotel room booking resulting in double-booking conflicts and slow reservation confirmations.',
    architecture: 'JavaScript Browser App -> Express Backend -> Neon PostgreSQL -> Netlify Host.',
    metric: 'Deployed Hotel App',
    tags: ['JavaScript', 'Express', 'Neon PostgreSQL', 'Netlify', 'HTML/CSS'],
    githubUrl: 'https://github.com/ARULKINT/pandian-hotel-room-stay',
    demoUrl: 'https://eloquent-blancmange-9d37ea.netlify.app/',
    isPriority: true,
    priorityTag: 'PRIORITY_01',
    deepDive: {
      overview: 'Provides an intuitive booking interface for room availability queries, guest details submission, and backend state persistence.',
      keyDecisions: [
        'Integrated Neon PostgreSQL for cloud-hosted relational room reservation storage.',
        'Built responsive CSS booking widgets for mobile guest access.',
        'Deployed frontend application cleanly to Netlify CDN.'
      ],
      interactiveType: 'gps-telemetry'
    }
  },
  {
    id: 'portfolio-sdlc',
    number: '11',
    categoryTag: 'FULL_STACK',
    filterCategory: 'fullstack',
    badge: '19 SDLC Docs Built',
    status: 'STATUS: LIVE_PAGES',
    title: 'Personal Portfolio & SDLC Architecture Platform',
    description: 'Production developer portfolio & full SDLC documentation architecture covering 19 markdown technical specifications across planning, architecture, API schemas, test plans, security audits, and automated GitHub Pages CI/CD.',
    problem: 'Need for a high-performance, dark/light theme adaptable portfolio with complete software lifecycle documentation and live resume preview capabilities.',
    architecture: 'React 19 -> Vite -> TypeScript -> Tailwind CSS v4 -> GitHub Actions -> GitHub Pages.',
    metric: '19 SDLC Specs Completed',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'SDLC', 'GitHub Actions', 'GitHub Pages'],
    githubUrl: 'https://github.com/ARULKINT/portfolio_arul',
    demoUrl: 'https://ARULKINT.github.io/portfolio_arul/',
    isPriority: true,
    priorityTag: 'PRIORITY_01',
    codeSnippet: {
      filename: 'deploy.yml',
      runtime: 'GITHUB-ACTIONS [DEPLOY_PAGES]',
      code: `name: Deploy Portfolio to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages`
    },
    deepDive: {
      overview: 'Full SDLC documentation suite (Planning, SAD, API, Test Plan, Security) and clean React single-page interface with dual theme engines.',
      keyDecisions: [
        'Constructed 19 comprehensive SDLC markdown documents for complete project transparency.',
        'Engineered obsidian dark mode and high-contrast light mode state engines.',
        'Configured automated prebuild scripts bundling resume files into static production assets.'
      ],
      interactiveType: 'api-request'
    }
  },

  // --- SECONDARY / LAST PRIORITY SOFTWARE APPS ---
  {
    id: 'hello-mobiles-crm',
    number: '06',
    categoryTag: 'FULL_STACK',
    filterCategory: 'fullstack',
    badge: 'FastAPI Backend',
    status: 'STATUS: LIVE_VERIFIED',
    title: 'Hello Mobiles CRM & Repair Shop System',
    description: 'Shop operations MVP built with FastAPI and PostgreSQL handling customer records, mobile repair job tracking, billing, and customer loyalty workflows.',
    problem: 'Mobile repair shops lacking structured job status updates and paperless customer invoicing.',
    architecture: 'FastAPI (Python) -> PostgreSQL Database -> HTML5/CSS Frontend -> Vercel.',
    metric: 'Deployed Repair MVP',
    tags: ['FastAPI', 'Python', 'PostgreSQL', 'HTML', 'CSS', 'Vercel'],
    githubUrl: 'https://github.com/ARULKINT/hello-mobiles-crm',
    demoUrl: 'https://hello-mobiles-crm.vercel.app/',
    deepDive: {
      overview: 'A lightweight, ultra-fast CRM designed for mobile service centers to track repair tickets from diagnostic intake to final customer dispatch.',
      keyDecisions: [
        'Selected FastAPI for fast async request handling and automatic OpenAPI documentation.',
        'Structured relational tables for customer profiles, repair devices, and spare part usage.',
        'Deployed to Vercel with clean environment variable isolation.'
      ],
      interactiveType: 'api-request'
    }
  },
  {
    id: 'business-platform',
    number: '10',
    categoryTag: 'FULL_STACK',
    filterCategory: 'fullstack',
    badge: 'PWA & Redis',
    status: 'STATUS: PRE_LAUNCH',
    title: 'Multi-Tenant Business Management Platform',
    description: 'Multi-tenant enterprise platform covering billing, inventory, staff access, and offline-capable point-of-sale (POS) operations with PWA support.',
    problem: 'Multi-branch businesses losing POS capabilities during internet connectivity drops.',
    architecture: 'Fastify Backend -> React PWA Frontend -> PostgreSQL -> Redis Caching.',
    metric: 'Offline POS Capable',
    tags: ['Fastify', 'React', 'PostgreSQL', 'Redis', 'PWA', 'TypeScript'],
    githubUrl: 'https://github.com/ARULKINT/business-platform',
    deepDive: {
      overview: 'Architected with tenant isolation in PostgreSQL and Service Worker offline caching for uninterrupted point-of-sale operations.',
      keyDecisions: [
        'Selected Fastify framework for high-throughput HTTP benchmark speeds.',
        'Implemented Redis caching layer for quick multi-tenant inventory lookups.',
        'Integrated Progressive Web App (PWA) manifest for offline tablet installation.'
      ],
      interactiveType: 'api-request'
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming & Data',
    icon: 'code_blocks',
    skills: ['Python', 'SQL (PostgreSQL)', 'C++']
  },
  {
    title: 'Data Engineering & Cloud',
    icon: 'hub',
    skills: ['PySpark', 'Apache Spark', 'Apache Airflow', 'dbt', 'Kafka', 'Hadoop', 'Hive']
  },
  {
    title: 'Data Analytics & BI',
    icon: 'analytics',
    skills: ['Pandas & NumPy', 'Power BI', 'DAX', 'Microsoft Excel', 'Data Cleansing']
  },
  {
    title: 'Databases & Storage',
    icon: 'database',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Neon Postgres', 'Prisma ORM']
  },
  {
    title: 'Full-Stack Development',
    icon: 'devices',
    skills: ['JavaScript / TypeScript', 'React', 'Next.js', 'FastAPI', 'Node.js / Express', 'Fastify']
  },
  {
    title: 'Tools & DevOps',
    icon: 'terminal',
    skills: ['Docker', 'Git & GitHub', 'Linux Shell', 'GitHub Actions', 'Claude Code']
  }
];

export const DESIGN_SKILLS = ['Figma', 'HTML/CSS', 'Power BI / Metabase', 'Git Flow', 'REST APIs'];

export const SKILL_DETAILS: Record<string, SkillDetail> = {
  'PySpark': {
    name: 'PySpark / Apache Spark',
    category: 'Data Engineering',
    proficiency: 'Advanced',
    projects: ['Weather Data Engineering Pipeline', 'CommercePulse E-commerce Architecture'],
    context: 'Writing PySpark structured streaming pipelines, JDBC database ingestion, partitioning datasets by date/city, and executing Spark transformations.',
    sampleCode: 'spark.read.format("jdbc").option("url", "jdbc:postgresql://db:5432/weather").load()'
  },
  'Python': {
    name: 'Python',
    category: 'Programming',
    proficiency: 'Production Ready',
    projects: ['Weather Pipeline', 'CommercePulse', 'Uber Pipeline', 'Lead Funnel Analytics', 'FastAPI CRM'],
    context: 'Core programming language for ETL pipelines, API data extraction, data cleansing with Pandas, FastAPI backends, and automation scripts.',
    sampleCode: 'import pandas as pd\ndf = pd.read_json("weather_api.json")\nclean_df = df.dropna(subset=["temperature"])'
  },
  'SQL (PostgreSQL)': {
    name: 'SQL & PostgreSQL',
    category: 'Databases & Querying',
    proficiency: 'Production Ready',
    projects: ['Weather Pipeline', 'Uber Pipeline', 'Rowdesk CRM', 'Hello Mobiles CRM'],
    context: 'Complex SQL queries, window functions (ROW_NUMBER, LAG), relational star schema modeling, indexing, and Prisma database migrations.',
    sampleCode: 'SELECT rate_code, AVG(fare_amount) OVER(PARTITION BY rate_code) FROM fact_trips;'
  },
  'PostgreSQL': {
    name: 'PostgreSQL & Neon DB',
    category: 'Databases',
    proficiency: 'Production Ready',
    projects: ['Weather Pipeline', 'Rowdesk CRM', 'Pandian Hotel', 'Hello Mobiles'],
    context: 'Relational database administration, schema design, Prisma integration, connection pooling with Neon serverless Postgres, and SQL tuning.'
  },
  'React': {
    name: 'React & Next.js',
    category: 'Full-Stack Development',
    proficiency: 'Production Ready',
    projects: ['Rowdesk CRM', 'Forge & Flint', 'Textile CRM', 'Portfolio Application'],
    context: 'Building full-stack web applications with Next.js App Router, React 19, TypeScript, state management, and responsive Tailwind layouts.'
  },
  'Power BI': {
    name: 'Power BI & DAX',
    category: 'Data Analytics',
    proficiency: 'Advanced',
    projects: ['Lead Acquisition Funnel Analytics', 'CommercePulse', 'Uber Pipeline'],
    context: 'Constructing interactive executive dashboards, writing custom DAX measures, modeling star schemas, and visualizing sales funnel metrics.'
  }
};

export const EXPERIENCE: ExperienceItem = {
  id: 'asara',
  role: 'Junior Engineer Trainee',
  company: 'Asara Pvt Ltd',
  location: 'Bangalore, India',
  period: 'January 2022 – May 2023',
  summary: 'Worked in an industrial operations environment, supporting physical inventory management, manufacturing shift reporting, and cross-functional coordination with production, dispatch, and quality teams.',
  bullets: [
    'Supported operational inventory management and daily departmental reporting across manufacturing shifts.',
    'Maintained daily inventory records, audited physical-to-digital inventory variance, and highlighted discrepancies before batch closing.',
    'Coordinated directly between production leads, logistics dispatch, and quality assurance teams.',
    'Monitored live operational activities to prevent unplanned production interruptions through proactive tool and stock tracking.'
  ],
  competencies: [
    'Inventory Auditing',
    'Operations Reporting',
    'Production Coordination',
    'Quality Assurance Sync',
    'ERP Inventory Logs'
  ],
  shiftMetrics: [
    { label: 'Industrial Experience', value: '17 Months' },
    { label: 'Daily Operations Audit', value: 'Physical & Digital' },
    { label: 'Department Coordination', value: 'Production, Quality, Dispatch' },
    { label: 'Reporting Velocity', value: '100% Shift Compliance' }
  ]
};

export const ACADEMICS: AcademicItem[] = [
  {
    degreeType: 'DEGREE // B.TECH CSE',
    status: 'Completed',
    title: 'B.Tech in Computer Science and Engineering (Lateral Entry)',
    institution: 'Rajiv Gandhi College of Engineering and Technology, Pondicherry University',
    description: 'Specialized in computer science engineering, data structures, algorithms, database management systems, operating systems, software engineering, and data pipeline architectures.',
    coursework: ['Data Structures & Algorithms', 'Database Management Systems (DBMS)', 'Operating Systems', 'Computer Networks', 'Software Engineering'],
    period: '2023 – 2026'
  },
  {
    degreeType: 'DIPLOMA // MECHANICAL',
    status: 'Completed',
    title: 'Diploma in Mechanical Engineering',
    institution: 'Annai Velankanni Polytechnic College, Panruti',
    description: 'Foundation in industrial engineering, manufacturing processes, quality control, precision measurement, and operational workflows.',
    coursework: ['Manufacturing Process', 'Quality Control', 'Industrial Management', 'CAD & Mechanical Drafting'],
    period: '2018 – 2021'
  }
];

export const LEADERSHIP: LeadershipItem[] = [
  {
    title: 'College Student President',
    icon: 'account_balance',
    summary: 'Elected to lead the college student body. Coordinated campus initiatives, organized inter-college technical events, and served as the primary liaison to college leadership.',
    domain: '// Campus Leadership',
    fullNarrative: 'Represented student interests across engineering departments, chaired student advisory committees, and led major campus events.'
  },
  {
    title: 'Class Representative',
    icon: 'groups',
    summary: 'Serving as the primary communication bridge between academic faculty and the student cohort, resolving logistics, and facilitating study groups.',
    domain: '// Cohort Coordination',
    fullNarrative: 'Managed academic timetables, lab session coordination, and project submissions across 60+ classmates.'
  },
  {
    title: 'Design Team Leadership & Event Coordination',
    icon: 'brush',
    summary: 'Headed visual design and creative teams for university symposiums, producing branding collateral, event banners, and digital assets.',
    domain: '// Event Management',
    fullNarrative: 'Supervised student design teams to create visual branding, banners, and digital media for university tech fests.'
  },
  {
    title: 'Competitive Kabaddi Player',
    icon: 'sports_martial_arts',
    summary: 'Active athlete competing in regional Kabaddi tournaments. The sport demands quick tactical reaction time, physical discipline, and synchronized teamwork under intense pressure.',
    domain: '// Teamwork & Tactical Resilience',
    highlightTag: 'HIGH PRESSURE RESILIENCE',
    fullNarrative: 'Kabaddi requires split-second tactical awareness and defensive coordination, building deep mental resilience and teamwork.'
  }
];
