# CampusConnect

### A Backend-Heavy Campus Management & Collaboration Platform Built with Spring Boot

CampusConnect is a **full-stack campus management and collaboration platform** designed to provide students and mentors with a centralized system for managing users, sessions, registrations, notifications, messaging, and other campus interactions.

The project is intentionally **backend-heavy**, with the core application architecture, business logic, authentication, authorization, database layer, and REST APIs implemented using **Java and Spring Boot**.

A React-based frontend is currently being developed and will consume the REST APIs exposed by the backend.

> **Project Status:** Backend actively developed • React frontend in progress

---

## 📌 Overview

CampusConnect was built to explore how a real-world backend system can be designed around multiple entities, relationships, authentication flows, role-based authorization, and business operations.

Rather than treating the project as a simple CRUD application, the focus has been on designing a structured backend with clear separation between:

```text
Client
   ↓
REST API
   ↓
Controller Layer
   ↓
Service Layer
   ↓
Repository Layer
   ↓
MySQL Database
```

The backend is responsible for handling the application's core business logic while exposing RESTful APIs that can be consumed by the React frontend.

---

# 🎯 Problem

College environments often have information distributed across multiple platforms:

* Events and mentoring sessions
* Student registrations
* Communication
* Notifications
* User profiles
* Academic/community interactions

CampusConnect attempts to bring these interactions into a unified platform.

The project also serves as an engineering exercise in building a **secure, modular and extensible backend application** rather than only focusing on the user interface.

---

# 🏗️ Architecture

The application follows a layered backend architecture.

```text
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │   (In Development)  │
                    └──────────┬──────────┘
                               │
                               │ HTTP / REST
                               ▼
                    ┌─────────────────────┐
                    │   Spring Boot API   │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
       ┌────────────────┐            ┌────────────────┐
       │  Controllers   │            │ Authentication │
       │                │            │  & Security    │
       └───────┬────────┘            └────────────────┘
               │
               ▼
       ┌────────────────┐
       │    Services    │
       │ Business Logic │
       └───────┬────────┘
               │
               ▼
       ┌────────────────┐
       │  Repositories  │
       │   Spring Data  │
       │      JPA       │
       └───────┬────────┘
               │
               ▼
       ┌────────────────┐
       │     MySQL      │
       │    Database    │
       └────────────────┘
```

### Why this architecture?

The backend is separated into independent layers so that responsibilities remain isolated.

**Controllers**

Handle HTTP requests and responses.

**Services**

Contain application-specific business logic and validation.

**Repositories**

Abstract database operations using Spring Data JPA.

**Entities**

Represent persistent data and relationships in the database.

**Security**

Handles authentication, authorization and protected API access.

This separation makes the application easier to maintain, test and extend.

---

# 🚀 Core Features

## 🔐 Authentication & Authorization

CampusConnect uses Spring Security to protect backend resources.

The authentication system is designed around:

* User authentication
* Password encoding
* JWT-based authentication
* Role-based authorization
* Protected API endpoints
* AuthenticationManager integration

The backend distinguishes between different user roles and ensures that privileged operations cannot simply be accessed by any authenticated user.

---

## 👤 User Management

The backend provides a centralized user model that can be used across the platform.

Users can be associated with:

* Roles
* Sessions
* Registrations
* Messages
* Notifications
* Authentication sessions

This creates a common identity layer for the rest of the application.

---

# 📅 Session Management

One of the core backend modules is the **Session Management System**.

Mentors can create sessions containing information such as:

```text
Session
├── ID
├── Title
├── Description
├── Session Time
├── Start Time
├── Mentor
└── Registrations
```

The backend provides APIs for:

* Creating sessions
* Retrieving all sessions
* Retrieving an individual session
* Deleting sessions
* Registering users for sessions

Example API structure:

```text
POST   /api/sessions
GET    /api/sessions
GET    /api/sessions/{id}
DELETE /api/sessions/{id}
POST   /api/sessions/{id}/register
```

Business rules are enforced inside the service layer.

For example, session creation verifies that the requesting user has the appropriate mentor role before allowing the operation.

---

# 💬 Messaging

CampusConnect includes backend support for communication between users.

The messaging domain is designed around persistent message records and can be consumed by the frontend through REST APIs.

This provides the foundation for building features such as:

* User-to-user messaging
* Conversation history
* Message retrieval
* Communication between students and mentors

---

# 🔔 Notifications

The backend also contains a notification system for delivering application-level updates to users.

Notifications can be associated with user actions and other platform events.

This creates a foundation for future features such as:

* Session registration notifications
* New messages
* Mentor updates
* System announcements

---

# 🗄️ Database Design

CampusConnect uses **MySQL** as the relational database.

The application uses **Spring Data JPA / Hibernate** for persistence and object-relational mapping.

The current backend contains important domain tables including:

```text
users
sessions
messages
notifications
files
```

Relationships between entities are represented using JPA mappings.

For example:

```text
                 ┌──────────────┐
                 │     User     │
                 └──────┬───────┘
                        │
             ┌──────────┼──────────┐
             │          │          │
             ▼          ▼          ▼
        ┌─────────┐ ┌─────────┐ ┌─────────────┐
        │ Session │ │ Message │ │Notification │
        └─────────┘ └─────────┘ └─────────────┘
```

This relational design allows the system to maintain consistent relationships between users and application resources.

---

# 🧱 Backend Structure

The project follows a modular Spring Boot structure.

```text
CampusConnect/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── ...
│       │
│       └── resources/
│           └── application.properties
│
├── pom.xml
└── README.md
```

Conceptually, the backend is organized around:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Entity
    ↓
MySQL
```

This structure prevents business logic from being tightly coupled to HTTP controllers or database implementation details.

---

# 🔧 Technology Stack

## Backend

| Technology      | Purpose                        |
| --------------- | ------------------------------ |
| Java            | Primary backend language       |
| Spring Boot     | Backend application framework  |
| Spring MVC      | REST API development           |
| Spring Security | Authentication & authorization |
| Spring Data JPA | Persistence layer              |
| Hibernate       | ORM                            |
| MySQL           | Relational database            |
| Maven           | Dependency management          |

## Frontend

| Technology | Purpose                 |
| ---------- | ----------------------- |
| React      | Frontend application    |
| JavaScript | Client-side development |
| REST APIs  | Backend communication   |

> The React frontend is currently under active development. The backend APIs and core business logic are being developed independently so that the frontend can consume them as a client.

---

# 🔒 Security Architecture

Security is an important part of the project rather than an afterthought.

The backend uses Spring Security together with JWT-based authentication.

The high-level authentication flow is:

```text
User
 │
 │ Login Credentials
 ▼
┌─────────────────────┐
│ Authentication API  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Authentication      │
│ Manager             │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ User Repository     │
└──────────┬──────────┘
           │
           ▼
      Credentials
           │
           ▼
┌─────────────────────┐
│ JWT Generation      │
└──────────┬──────────┘
           │
           ▼
        JWT Token
           │
           ▼
      Client / React
```

Subsequent requests can use the token to access protected resources.

This allows the backend to remain stateless at the API authentication layer while still enforcing authorization rules.

---

# 🧠 Engineering Decisions

## Layered Architecture

Instead of putting all logic inside controllers, the application separates:

```text
HTTP concerns
     ↓
Controller

Business concerns
     ↓
Service

Persistence concerns
     ↓
Repository

Data representation
     ↓
Entity
```

This makes individual components easier to modify without affecting unrelated parts of the application.

---

## DTO-Based API Design

Request-specific objects such as `SessionRequest` are used instead of directly exposing persistence entities for every API operation.

For example:

```text
Client Request
      ↓
SessionRequest DTO
      ↓
SessionService
      ↓
Session Entity
      ↓
SessionRepository
      ↓
MySQL
```

This provides a cleaner boundary between the API layer and the persistence layer.

---

# 📡 REST API Design

The backend is designed around RESTful resources.

Examples include:

```text
/api/users
/api/sessions
/api/messages
/api/notifications
```

HTTP methods are used according to the operation being performed:

```text
GET       → Retrieve resources
POST      → Create resources / perform actions
PUT/PATCH → Update resources
DELETE    → Remove resources
```

This allows the React frontend to remain independent from the internal implementation of the backend.

---

# 🖥️ Frontend Integration

The React frontend is currently being developed on top of the existing backend APIs.

The intended architecture is:

```text
                 CampusConnect
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
   React Frontend          Spring Boot Backend
          │                       │
          │       REST API        │
          └───────────────────────┘
                      │
                      ▼
                    MySQL
```

The frontend will eventually provide interfaces for:

* Authentication
* User profiles
* Sessions
* Session registration
* Messaging
* Notifications
* Other campus features

The backend is being developed first to establish the core domain model and API contracts before completing the UI layer.

---

# 📈 Scalability Considerations

Although CampusConnect is currently a personal project, its architecture is designed with scalability concepts in mind.

Potential future improvements include:

### Caching

Introduce Redis for frequently accessed resources.

```text
Client
  ↓
Spring Boot
  ↓
Redis Cache
  ↓
MySQL
```

### Pagination

Large datasets such as messages, sessions and notifications can be paginated rather than returned in a single response.

### Database Indexing

Frequently queried fields can be indexed to reduce database lookup time.

### Asynchronous Processing

Notification and other background operations can eventually be moved to asynchronous workers.

### Microservices

If the application grows significantly, independent domains such as authentication, messaging and notifications could be separated into dedicated services.

The current monolithic Spring Boot architecture provides a simpler foundation while keeping these future options open.

---

# 🧪 Testing & Development

The project is being developed with backend correctness and API behavior as primary concerns.

Testing can be performed at multiple levels:

```text
Unit Tests
    ↓
Service Layer

Integration Tests
    ↓
Repository + Database

API Tests
    ↓
REST Endpoints
```

Tools such as Postman can also be used during development to validate API requests and responses independently of the frontend.

---

# ⚙️ Local Setup

## Prerequisites

Make sure the following are installed:

* Java
* Maven
* MySQL
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/Tachhen/CampusConnect.git
cd CampusConnect
```

---

## 2. Create the Database

Create a MySQL database:

```sql
CREATE DATABASE campusconnect;
```

---

## 3. Configure the Database

Update the application's database configuration in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/campusconnect
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

> Do not commit real database credentials or secrets to GitHub.

---

## 4. Run the Backend

Using Maven:

```bash
./mvnw spring-boot:run
```

or:

```bash
mvn spring-boot:run
```

The backend will run on:

```text
http://localhost:8080
```

---

# 🔄 Development Roadmap

### Backend

* [x] Spring Boot backend
* [x] MySQL integration
* [x] JPA/Hibernate persistence
* [x] User domain
* [x] Authentication infrastructure
* [x] JWT-based security
* [x] Role-based authorization
* [x] Session management
* [x] Session registration
* [x] Messaging infrastructure
* [x] Notification infrastructure
* [ ] Expand API coverage
* [ ] Automated backend testing
* [ ] API documentation
* [ ] Production deployment

### Frontend

* [x] React project initialization
* [x] Backend API integration started
* [ ] Authentication UI
* [ ] User dashboard
* [ ] Session management UI
* [ ] Session registration UI
* [ ] Messaging interface
* [ ] Notification interface
* [ ] Responsive design
* [ ] Complete frontend-backend integration

### Future

* [ ] Redis caching
* [ ] Pagination and optimized queries
* [ ] Rate limiting
* [ ] Docker deployment
* [ ] CI/CD pipeline
* [ ] Cloud deployment
* [ ] Monitoring and logging
* [ ] Horizontal scaling

---

# 📊 What This Project Demonstrates

CampusConnect demonstrates practical experience with:

```text
Java
│
├── Object-Oriented Programming
├── Collections
├── Exception Handling
└── Backend Application Development

Spring Boot
│
├── REST APIs
├── Dependency Injection
├── Spring MVC
├── Spring Security
└── Spring Data JPA

Database
│
├── MySQL
├── Relational Modeling
├── Entity Relationships
└── ORM / Hibernate

System Design
│
├── Layered Architecture
├── API Design
├── Authentication Architecture
├── Separation of Concerns
└── Scalability Considerations

Frontend
│
├── React
├── REST API Integration
└── Component-Based UI
```

---

# 💡 Why I Built CampusConnect

I wanted to build something beyond a collection of isolated CRUD APIs.

The project gave me an opportunity to work through problems that appear in real backend systems:

* How should entities be modeled?
* How should business logic be separated from controllers?
* How should users be authenticated?
* How should roles and permissions be enforced?
* How should multiple entities be related?
* How should a frontend communicate with the backend?
* How can an application be structured so that it can evolve later?

The current focus is therefore deliberately **backend-heavy**, with the React frontend being built on top of the existing backend architecture.

---

# 🚧 Current Status

CampusConnect is an **actively evolving project**.

The backend is the primary completed component and contains the core application architecture, database integration, authentication/security infrastructure, business logic and REST APIs.

The **React frontend is currently under development** and is being integrated with the backend APIs.

The goal is to eventually deliver a complete full-stack platform while maintaining a strong backend architecture underneath the UI.

---

# 👨‍💻 Author

**Tenzing Gyalpo Tamang**

B.Tech — Information Technology
IIEST Shibpur | 2026

GitHub: [Tachhen](https://github.com/Tachhen)

---

# 📜 License

This project is available under the MIT License.
