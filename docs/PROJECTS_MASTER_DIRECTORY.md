# Master Projects Directory & Technical Specifications

> **Arul G — Portfolio Project Directory**  
> *Data Engineer · Data Analyst · Full-Stack Developer*  
> Repository Document Version: `1.0.0` | Last Updated: `October 2026`

---

## 📋 Executive Overview & Quick Access Index

| # | Project Name | Category | GitHub Repository | Live Application | Documentation (/docs) |
|---|---|---|---|---|---|
| **01** | CommercePulse — E-commerce Data Architecture | DATA_ENGINEERING | [ARULKINT/portfolio_arul](https://github.com/ARULKINT/portfolio_arul) | [Live Portfolio App](https://ARULKINT.github.io/portfolio_arul/) | [View /docs](https://github.com/ARULKINT/portfolio_arul/tree/main/docs) |
| **02** | Weather Data Engineering Pipeline | DATA_ENGINEERING | [ARULKINT/weather_data_eng](https://github.com/ARULKINT/weather_data_eng) | *Backend Data Pipeline* | [View /docs](https://github.com/ARULKINT/weather_data_eng/tree/main/docs) |
| **03** | Uber Data Engineering Pipeline | DATA_ENGINEERING | [ARULKINT/portfolio_arul](https://github.com/ARULKINT/portfolio_arul) | [Live Portfolio App](https://ARULKINT.github.io/portfolio_arul/) | [View /docs](https://github.com/ARULKINT/portfolio_arul/tree/main/docs) |
| **04** | Lead Acquisition & Employee Performance Analysis | DATA_ANALYTICS | [ARULKINT/sales-etl-pipeline_001](https://github.com/ARULKINT/sales-etl-pipeline_001) | *Power BI Workspace* | [View /docs](https://github.com/ARULKINT/sales-etl-pipeline_001/tree/main/docs) |
| **05** | Rowdesk — Internal Workflow & CRM Platform | FULL_STACK | [ARULKINT/rowdesk](https://github.com/ARULKINT/rowdesk) | [crm-fx2.vercel.app](https://crm-fx2.vercel.app/) *(ID: admin \| Pass: Admin@1234)* | [View /docs](https://github.com/ARULKINT/rowdesk/tree/master/docs) |
| **06** | Forge & Flint — Software Solutions Initiative | SOFTWARE_APPS | [ARULKINT/forge-flint-website](https://github.com/ARULKINT/forge-flint-website) | [forgeandflint.in](https://forgeandflint.in/) | [View /docs](https://github.com/ARULKINT/forge-flint-website/tree/main/docs) |
| **07** | Textile Retail CRM Prototype | FULL_STACK | [ARULKINT/textile-crm](https://github.com/ARULKINT/textile-crm) | *Local / Self-Hosted* | [View /docs](https://github.com/ARULKINT/textile-crm/tree/main/docs) |
| **08** | Pandian Hotel & Room Stay Booking App | SOFTWARE_APPS | [ARULKINT/pandian-hotel-room-stay](https://github.com/ARULKINT/pandian-hotel-room-stay) | [Netlify Live Booking](https://eloquent-blancmange-9d37ea.netlify.app/) | [View /docs](https://github.com/ARULKINT/pandian-hotel-room-stay/tree/main/docs) |
| **09** | Personal Portfolio & SDLC Architecture Platform | FULL_STACK | [ARULKINT/portfolio_arul](https://github.com/ARULKINT/portfolio_arul) | [ARULKINT.github.io](https://ARULKINT.github.io/portfolio_arul/) | [View /docs](https://github.com/ARULKINT/portfolio_arul/tree/main/docs) |
| **10** | Hello Mobiles CRM & Repair Shop System | FULL_STACK | [ARULKINT/hello-mobiles-crm](https://github.com/ARULKINT/hello-mobiles-crm) | [hello-mobiles-crm.vercel.app](https://hello-mobiles-crm.vercel.app/) | [View /docs](https://github.com/ARULKINT/hello-mobiles-crm/tree/main/docs) |
| **11** | Multi-Tenant Business Management Platform | FULL_STACK | [ARULKINT/business-platform](https://github.com/ARULKINT/business-platform) | *Pre-Launch Stage* | [View /docs](https://github.com/ARULKINT/business-platform/tree/main/docs) |

---

## 🛠️ Detailed Project Specifications & README Dossiers

---

### PROJ 01: CommercePulse — E-commerce Data Architecture

- **Category**: `DATA_ENGINEERING`
- **GitHub Repository**: [https://github.com/ARULKINT/portfolio_arul](https://github.com/ARULKINT/portfolio_arul)
- **Live Application**: [https://ARULKINT.github.io/portfolio_arul/](https://ARULKINT.github.io/portfolio_arul/)
- **Docs URL**: [https://github.com/ARULKINT/portfolio_arul/tree/main/docs](https://github.com/ARULKINT/portfolio_arul/tree/main/docs)
- **Tech Stack**: `Python` · `PySpark` · `PostgreSQL` · `Apache Airflow` · `Docker` · `GitHub Actions` · `Power BI`

#### 🎯 Problem Statement
High-frequency e-commerce transactions causing data quality drifts and unvalidated analytical metrics. Raw transaction streams required structured data pipelines and dimensional modeling for OLAP analytics.

#### 🏗️ Architecture & Key Implementation
- **Pipeline Architecture**: `Python & PySpark ETL` -> `PostgreSQL Data Warehouse` -> `Apache Airflow DAGs` -> `Metabase / Power BI`.
- Complete dimensional data warehouse model (`Fact Orders`, `Dim Customer`, `Dim Product`, `Dim Date`) designed to process high-volume e-commerce orders.
- Designed idempotent Airflow DAG tasks to prevent duplicate transaction entries on automated pipeline retries.
- Integrated automated GitHub Actions CI/CD workflows for dbt transformations and SQL schema validations.

#### 💻 Sample Source Code (Airflow DAG)
```python
from airflow import DAG
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
    validate_orders >> transform_dim
```

---

### PROJ 02: Weather Data Engineering Pipeline

- **Category**: `DATA_ENGINEERING`
- **GitHub Repository**: [https://github.com/ARULKINT/weather_data_eng](https://github.com/ARULKINT/weather_data_eng)
- **Live Application**: *Backend Data Pipeline*
- **Docs URL**: [https://github.com/ARULKINT/weather_data_eng/tree/main/docs](https://github.com/ARULKINT/weather_data_eng/tree/main/docs)
- **Tech Stack**: `Python` · `PySpark` · `PostgreSQL` · `Docker` · `OpenWeather API` · `JDBC`

#### 🎯 Problem Statement
Raw API weather data across multiple regions required automated, reliable ETL pipelines for historical trend analysis and spatial SQL queries.

#### 🏗️ Architecture & Key Implementation
- **Pipeline Architecture**: `Python API Ingestion` -> `PySpark Transformations` -> `JDBC PostgreSQL Storage` -> `Docker Containerization`.
- Collects live weather parameters (temperature, humidity, pressure, wind velocity) for 7 Indian cities.
- Utilizes PySpark for schema validation, data cleansing, and writing structured relational tables into PostgreSQL via JDBC.
- Fully containerized PostgreSQL database and PySpark driver dependencies using Docker Compose.

#### 💻 Sample Source Code (PySpark OpenWeather Ingestion)
```python
import requests
from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("WeatherPipeline") \
    .config("spark.jars", "/drivers/postgresql-42.6.0.jar") \
    .getOrCreate()

def fetch_weather(city):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}"
    return requests.get(url).json()

# PySpark JDBC Write to PostgreSQL
weather_df.write \
    .format("jdbc") \
    .option("url", "jdbc:postgresql://postgres_db:5432/weather_db") \
    .option("dbtable", "city_weather_logs") \
    .option("user", "postgres") \
    .option("password", "secret") \
    .mode("append") \
    .save()
```

---

### PROJ 03: Uber Data Engineering Pipeline

- **Category**: `DATA_ENGINEERING`
- **GitHub Repository**: [https://github.com/ARULKINT/portfolio_arul](https://github.com/ARULKINT/portfolio_arul)
- **Live Application**: [https://ARULKINT.github.io/portfolio_arul/](https://ARULKINT.github.io/portfolio_arul/)
- **Docs URL**: [https://github.com/ARULKINT/portfolio_arul/tree/main/docs](https://github.com/ARULKINT/portfolio_arul/tree/main/docs)
- **Tech Stack**: `Python` · `Pandas` · `PostgreSQL` · `Airflow` · `dbt` · `Power BI` · `Docker`

#### 🎯 Problem Statement
Unstructured raw trip logs lacking analytical granularity for driver yield calculation, surge fare breakdown, and pickup density mapping.

#### 🏗️ Architecture & Key Implementation
- **Pipeline Architecture**: `Python Pandas/PySpark` -> `Star Schema PostgreSQL` -> `Airflow & dbt` -> `Power BI Dashboards`.
- Modeled over 100,000 trip records into normalized dimension tables (`Vendor`, `Rate Code`, `Pickup Location`, `Dropoff Location`, `Payment Type`) and a central `Fact Trip` table.
- Organized dbt transformations for automated data cleansing and schema documentation.
- Created optimized SQL window functions for hourly surge demand analytics and driver revenue reporting.

#### 📊 Analytical Query & Metrics
```sql
SELECT r.rate_code_name, 
       ROUND(AVG(f.fare_amount)::numeric, 2) AS avg_fare,
       COUNT(f.trip_id) AS total_trips
FROM fact_trips f
JOIN dim_rate_code r ON f.rate_code_id = r.rate_code_id
GROUP BY r.rate_code_name ORDER BY avg_fare DESC;
```

---

### PROJ 04: Lead Acquisition & Employee Performance Analysis

- **Category**: `DATA_ANALYTICS`
- **GitHub Repository**: [https://github.com/ARULKINT/sales-etl-pipeline_001](https://github.com/ARULKINT/sales-etl-pipeline_001)
- **Live Application**: *Power BI Workspace (qasq.pbix)*
- **Docs URL**: [https://github.com/ARULKINT/sales-etl-pipeline_001/tree/main/docs](https://github.com/ARULKINT/sales-etl-pipeline_001/tree/main/docs)
- **Tech Stack**: `Python` · `Power BI` · `DAX` · `PostgreSQL` · `ETL Data Cleaning` · `Star Schema` · `Outlier Audit`

#### 🎯 Problem Statement
High lead drop-off at the demo stage (46.11% loss) and a 3.2x performance gap between top (`SNR501MG` at 24.47%) and bottom (`SNR503MG` at 12.24%) sales manager teams requiring automated ETL, outlier rule enforcement, and DAX metric benchmarking.

#### 🏗️ Architecture & Key Implementation
- **Pipeline Architecture**: `Raw CSV Ingestion` -> `Python Automated ETL & Outliers Handler` -> `Star Schema PostgreSQL Data Model` -> `15 DAX Measures` -> `Power BI Dashboard Workspace`.
- Analyzed 360 unique leads across 4 weekly cycles, 4 Senior Sales Managers, 16 Junior Sales Managers, and 2,192 phone interactions.
- Built an automated Python ETL script to sanitize age anomalies (e.g. ages 211, 116) and cap demo watched % at 100%.
- Authored 15 custom DAX measures for dynamic funnel stage conversion and call success rates.
- Identified top drop-off bottlenecks: Price sensitivity ("Can't afford" = 95 mentions) and preference for offline classes (91 mentions).

#### 📊 Analytical Query & Key DAX Metrics
```sql
SELECT lead_gen_source,
       COUNT(lead_id) AS total_leads,
       COUNT(CASE WHEN lead_stage = 'conversion' THEN 1 END) AS converted_leads,
       ROUND((COUNT(CASE WHEN lead_stage = 'conversion' THEN 1 END)::numeric / COUNT(lead_id)) * 100, 2) AS conv_rate_pct
FROM leads_summary_view
GROUP BY lead_gen_source
ORDER BY conv_rate_pct DESC;
```

---

### PROJ 05: Rowdesk — Internal Workflow & CRM Platform

- **Category**: `FULL_STACK`
- **GitHub Repository**: [https://github.com/ARULKINT/rowdesk](https://github.com/ARULKINT/rowdesk)
- **Live Application**: [https://crm-fx2.vercel.app/](https://crm-fx2.vercel.app/)
- **Demo Credentials**: ID: `admin` | Password: `Admin@1234`
- **Docs URL**: [https://github.com/ARULKINT/rowdesk/tree/master/docs](https://github.com/ARULKINT/rowdesk/tree/master/docs)
- **Tech Stack**: `Next.js` · `React` · `Prisma ORM` · `Neon PostgreSQL` · `Zod` · `Google OAuth` · `Vitest`

#### 🎯 Problem Statement
Fragmented lead management and lack of structured follow-up scheduling for sales pipelines.

#### 🏗️ Architecture & Key Implementation
- **App Architecture**: `Next.js App Router` -> `Prisma ORM` -> `Neon PostgreSQL` -> `Google Drive OAuth` -> `Vercel Deployment`.
- Deployed CRM application featuring structured follow-up workflows, Zod input validation, database-backed state with Neon PostgreSQL, Google Drive read-only OAuth, and Vitest test suites.
- Provided instant admin demo login access (`admin` / `Admin@1234`).
- Integrated serverless Postgres on Neon with connection pooling for rapid API response times.

#### 💻 Sample API Route Code (Next.js & Zod)
```typescript
import { prisma } from '@/lib/prisma';
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
}
```

---

### PROJ 06: Forge & Flint — Software Solutions Initiative

- **Category**: `SOFTWARE_APPS`
- **GitHub Repository**: [https://github.com/ARULKINT/forge-flint-website](https://github.com/ARULKINT/forge-flint-website)
- **Live Application**: [https://forgeandflint.in/](https://forgeandflint.in/)
- **Docs URL**: [https://github.com/ARULKINT/forge-flint-website/tree/main/docs](https://github.com/ARULKINT/forge-flint-website/tree/main/docs)
- **Tech Stack**: `React` · `Vite` · `Express` · `PostgreSQL` · `Node.js`

#### 🎯 Problem Statement
Small and growing enterprises struggling with fragmented digital tools, complex enterprise pricing, and non-intuitive management software.

#### 🏗️ Architecture & Key Implementation
- **App Architecture**: `React Frontend` -> `Vite Build` -> `Express API Microservices` -> `PostgreSQL Database`.
- Software solutions initiative focused on practical business software, including CRM, billing, inventory, and digital solutions.
- Established modular component design systems in React for rapid client customization.
- Built REST APIs in Express with clean route controllers and database persistence. Deployed live web presence at `forgeandflint.in`.

---

### PROJ 07: Textile Retail CRM Prototype

- **Category**: `FULL_STACK`
- **GitHub Repository**: [https://github.com/ARULKINT/textile-crm](https://github.com/ARULKINT/textile-crm)
- **Live Application**: *Local / Self-Hosted Prototype*
- **Docs URL**: [https://github.com/ARULKINT/textile-crm/tree/main/docs](https://github.com/ARULKINT/textile-crm/tree/main/docs)
- **Tech Stack**: `Next.js` · `Prisma` · `SQLite` · `NextAuth.js` · `TypeScript`

#### 🎯 Problem Statement
Textile retail stores requiring specialized inventory tracking for fabric variants, customer purchase history, and role-restricted billing access.

#### 🏗️ Architecture & Key Implementation
- **App Architecture**: `Next.js App Router` -> `Prisma ORM` -> `SQLite Database` -> `NextAuth.js`.
- Prototype tailored for textile retail management featuring customer billing history, inventory cataloging, and NextAuth role-based authentication.
- Implemented Prisma schema relations mapping fabric SKUs to sales receipts.
- Utilized NextAuth for secure session cookie management and role enforcement (Manager vs Billing Staff).

---

### PROJ 08: Pandian Hotel & Room Stay Booking App

- **Category**: `SOFTWARE_APPS`
- **GitHub Repository**: [https://github.com/ARULKINT/pandian-hotel-room-stay](https://github.com/ARULKINT/pandian-hotel-room-stay)
- **Live Application**: [https://eloquent-blancmange-9d37ea.netlify.app/](https://eloquent-blancmange-9d37ea.netlify.app/)
- **Docs URL**: [https://github.com/ARULKINT/pandian-hotel-room-stay/tree/main/docs](https://github.com/ARULKINT/pandian-hotel-room-stay/tree/main/docs)
- **Tech Stack**: `JavaScript` · `Express` · `Neon PostgreSQL` · `Netlify` · `HTML/CSS`

#### 🎯 Problem Statement
Manual hotel room booking resulting in double-booking conflicts and slow reservation confirmations for guests.

#### 🏗️ Architecture & Key Implementation
- **App Architecture**: `JavaScript Web App` -> `Express Backend API` -> `Neon PostgreSQL` -> `Netlify Host`.
- Hotel booking web application featuring interactive room selection, reservation forms, and backend integration with Neon PostgreSQL.
- Built responsive CSS booking widgets for mobile guest access.
- Deployed frontend application cleanly to Netlify CDN.

---

### PROJ 09: Personal Portfolio & SDLC Architecture Platform

- **Category**: `FULL_STACK`
- **GitHub Repository**: [https://github.com/ARULKINT/portfolio_arul](https://github.com/ARULKINT/portfolio_arul)
- **Live Application**: [https://ARULKINT.github.io/portfolio_arul/](https://ARULKINT.github.io/portfolio_arul/)
- **Docs URL**: [https://github.com/ARULKINT/portfolio_arul/tree/main/docs](https://github.com/ARULKINT/portfolio_arul/tree/main/docs)
- **Tech Stack**: `React 19` · `TypeScript` · `Vite` · `Tailwind CSS v4` · `Motion v12` · `GitHub Actions` · `GitHub Pages`

#### 🎯 Problem Statement
Need for a high-performance, dark/light theme adaptable developer portfolio with complete software lifecycle documentation (SDLC) and live resume preview capabilities.

#### 🏗️ Architecture & Key Implementation
- **App Architecture**: `React 19` -> `Vite` -> `TypeScript` -> `Tailwind CSS v4` -> `GitHub Actions` -> `GitHub Pages`.
- Production developer portfolio & full SDLC documentation architecture covering 19 markdown technical specifications across planning, architecture, API schemas, test plans, security audits, and automated GitHub Pages CI/CD.
- Engineered obsidian dark mode and high-contrast light mode state engines.
- Configured automated prebuild scripts bundling resume files into static production assets.

#### 💻 Sample GitHub Actions Workflow (`deploy.yml`)
```yaml
name: Deploy Portfolio to GitHub Pages
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
          branch: gh-pages
```

---

### PROJ 10: Hello Mobiles CRM & Repair Shop System

- **Category**: `FULL_STACK`
- **GitHub Repository**: [https://github.com/ARULKINT/hello-mobiles-crm](https://github.com/ARULKINT/hello-mobiles-crm)
- **Live Application**: [https://hello-mobiles-crm.vercel.app/](https://hello-mobiles-crm.vercel.app/)
- **Docs URL**: [https://github.com/ARULKINT/hello-mobiles-crm/tree/main/docs](https://github.com/ARULKINT/hello-mobiles-crm/tree/main/docs)
- **Tech Stack**: `FastAPI` · `Python` · `PostgreSQL` · `HTML` · `CSS` · `Vercel`

#### 🎯 Problem Statement
Mobile repair shops lacking structured job status updates, repair ticket logging, and paperless customer invoicing.

#### 🏗️ Architecture & Key Implementation
- **App Architecture**: `FastAPI (Python)` -> `PostgreSQL Database` -> `HTML5/CSS Frontend` -> `Vercel Deployment`.
- Shop operations MVP built with FastAPI and PostgreSQL handling customer records, mobile repair job tracking, billing, and customer loyalty workflows.
- Selected FastAPI for fast async request handling and automatic OpenAPI documentation.
- Deployed to Vercel with clean environment variable isolation.

---

### PROJ 11: Multi-Tenant Business Management Platform

- **Category**: `FULL_STACK`
- **GitHub Repository**: [https://github.com/ARULKINT/business-platform](https://github.com/ARULKINT/business-platform)
- **Live Application**: *Pre-Launch Stage*
- **Docs URL**: [https://github.com/ARULKINT/business-platform/tree/main/docs](https://github.com/ARULKINT/business-platform/tree/main/docs)
- **Tech Stack**: `Fastify` · `React` · `PostgreSQL` · `Redis` · `PWA` · `TypeScript`

#### 🎯 Problem Statement
Multi-branch businesses losing point-of-sale (POS) capabilities during internet connectivity drops or database latency spikes.

#### 🏗️ Architecture & Key Implementation
- **App Architecture**: `Fastify Backend` -> `React PWA Frontend` -> `PostgreSQL` -> `Redis Caching`.
- Multi-tenant enterprise platform covering billing, inventory, staff access, and offline-capable point-of-sale (POS) operations with PWA support.
- Architected with tenant isolation in PostgreSQL and Service Worker offline caching for uninterrupted point-of-sale operations.
- Implemented Redis caching layer for quick multi-tenant inventory lookups.
