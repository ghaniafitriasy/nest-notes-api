# Simple REST API with NestJS - Typescript

#Description
This project is a simple REST API built using NestJS.
It includes basic authentication using JWT and a Notes feature
to demonstrate CRUD operations with a SQL database.

#Tech Stack
- Node.js
- NestJS
- TypeScript
- SQL Database (PostgreSQL)
- JWT Authentication
- bcrypt

#Project Structure
This project follows NestJS standard modular architecture.
Each feature is separated into its own module.
- Controller: handles HTTP requests and responses
- Service: contains business logic
- Module: connects controller and service

#Authentication Flow
1. Client sends login request with username and password
2. Controller forwards request to service
3. Service validates user and password using bcrypt
4. If valid, JWT token is generated
5. Token is returned to client
6. Client uses token for authenticated requests (GET, POST, DELETE)

#API Documentation
API documentation is provided using Postman.
The Postman collection file can be found in the repository.
file >>> postman_collection.json

#Testing
Basic end-to-end testing was performed using Postman.
Examples:
- POST /auth/login → 201 Created → returns JWT token
- GET /notes without token → 401 Unauthorized
- GET /notes with valid token → 200 OK

#Project Pattern Explanation
This project uses a modular architecture pattern provided by NestJS.

Each feature is separated into its own module to improve readability,
maintainability, and scalability.

Business logic is placed inside services, while controllers only handle
HTTP requests and responses.

This pattern makes the code easier to test and easier to extend
when adding new features.
