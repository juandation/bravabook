# Bravabook - Apartment Booking System

A booking system built with Vue.js, Node.js, Express, and MongoDB with Docker support for the IronHack fullstack course

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development without Docker)

## Quick Start with Docker (Recommended)

1.  Clone the repository.
2.  Create a `.env` file from the `.env.example` and fill in the variables if needed (defaults are provided).
3.  Run the application:
    ```bash
    npm run docker:up
    ```
4.  Access the application:
    - Frontend: http://localhost:5173
    - Backend API: http://localhost:5001

## Database Seeding

To populate the database with sample apartment data, run the following command while the Docker containers are running:

```bash
docker compose exec api npm run db:seed
```

## Development

### Without Docker

1.  Install dependencies:

    ```bash
    npm install
    ```

2.  Start the development servers:
    ```bash
    # This will run both the backend and frontend servers concurrently
    npm run dev
    ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=password
MONGO_DATABASE=bravabook
```

## Available Scripts

- `npm run dev`: Run both frontend and backend servers concurrently for local development.
- `npm run build`: Build the Vue.js application for production.
- `npm run preview`: Preview the production build locally.
- `npm run docker:up`: Start the Docker containers in detached mode and build images if they don't exist.
- `npm run docker:down`: Stop and remove the Docker containers.
- `npm run db:seed`: Seed the database with sample data (must be run inside the `api` container).

## Project Structure

- `/src` - Frontend Vue.js application
- `/server` - Backend Express server
- `/models` - Mongoose models for the database
