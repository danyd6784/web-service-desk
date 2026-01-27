# Web-Based Service Desk Application
A containerized, backend-oriented incident tracking system


### About
A containerized, web-based service desk application focused on incident tracking and lifecycle management. The initial scope centers on core incident CRUD operations, with an emphasis on clean API design, data modeling, and production-style architecture.

This project uses Docker Compose to orchestrate an Apache-based frontend, a Node/Express REST API, and a PostgreSQL database. This separation mirrors common production deployments by isolating request handling, application logic, and data storage into independent services.


### Use Case
This project recreates common service desk workflows used by IT professionals to track, manage, and document incidents. Based on four years of experience working in IT, the design prioritizes reducing repetitive documentation work while maintaining clear and auditable ticket histories.

A future enhancement may include an AI-assisted drafting feature to help generate initial ticket descriptions from short prompts and historical data. Any AI functionality will be implemented as a human-in-the-loop assistive tool rather than an automated decision-maker.


### Installation
This project is under active development. Installation instructions will be provided once the initial Docker Compose infrastructure and core API are in place.


### Milestones
#### Phase 1 — Core System
- [X] Project initialized
- [ ] Docker Compose infrastructure defined
- [ ] PostgreSQL schema established
- [ ] RESTful CRUD incident endpoints implemented
- [ ] Basic Angular UI for incident management

#### Phase 2 — Knowledge Base & UX
- [ ] Knowledge base schema defined
- [ ] In-browser rich text editing support

#### Phase 3 — AI Assistance (Exploratory)
- [ ] Research AI-assisted text generation approaches
- [ ] Prototype ticket description drafting
- [ ] Evaluate output quality and failure cases
- [ ] Integrate as an optional, human-reviewed feature


### Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Apache Web Server
- Docker & Docker Compose
- Angular (frontend)


### Design Decisions & Tradeoffs
- Apache is used as a reverse proxy and static file server to separate request handling from application logic.
- The backend API is implemented using Node.js and Express to emphasize clarity and maintainability over framework complexity.
- PostgreSQL was selected for its relational integrity and suitability for structured incident data.
- Docker Compose is used to ensure consistent local development and reproducible environments.
