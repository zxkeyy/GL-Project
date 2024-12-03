# GL-Project

# Development environment Setup Guide
## Step 1: Install Prerequisites

Ensure the following are installed on your system:
1. **Docker**:
   - Follow the installation instructions for [Docker](https://docs.docker.com/get-docker/).
   - Ensure Docker Compose is installed as well (it’s bundled with Docker Desktop for Windows and macOS, but may need separate installation on Linux).
2. **Git**:
   - Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) if it’s not already installed.
## Step 2: Clone the Repository
Clone the project repository to your local machine:
```
git clone https://github.com/zxkeyy/GL-Project.git
cd GL-Project
```
Ensure you're on the development branch by running
```
git checkout development
```

## step 3: Create your own branch to work in
Create a new branch off the development branch to add your features in before merging
```
git checkout -b <name-of-your-branch>
```
After creating the branch, push it to the remote repository:
```
git push origin <name-of-your-branch>
```
## Step 4: Set Up the Backend .env File
The backend has a `.env` file that is not included in the repository for security reasons. You’ll need to create it manually. In the `backend/dz_delivery` directory.

An example file is located at `backend/dz_delivery/.env.example`. Copy it to create your own `.env` file:
```
cp backend/dz_delivery/.env.example backend/dz_delivery/.env
```
***Be sure to add your local environment variables as necessary.***

## Step 5: Build and Start the Containers
In the root of the project directory (where the docker-compose.yml is), run the following command to build and start all services:
```
docker-compose up --build # The '--build' flag rebuilds images if necessary
```
This will:
- Build the backend and frontend images using their respective Dockerfiles.
- Start the backend (Django), frontend (Vite React), and database (Postgres) containers.
- Expose the following ports:
   - Backend: http://localhost:8000
   - Frontend: http://localhost:5173
   - Database: localhost:5432

## Step 6: Run Migrations
Once the containers are up, run Django migrations to set up the database schema. Open a terminal, navigate to the backend container and run migrations using:
```
docker-compose exec backend bash
python manage.py migrate
```
This will create the necessary tables in the PostgreSQL database.

## Step 7: Access the Development Environment
- Frontend: Open a browser and go to http://localhost:5173. If everything worked correctly you should see the React app running.
- Backend: Go to http://localhost:8000 to access the Django API.

## Step 8: Development Workflow
To start the development environment open a terminal in the GL-Project/ root folder and run:
```
docker-compose up
```
While working on the project, any changes made to the code in the `./backend/dz_delivery` and `./frontend/dz_delivery` directories will automatically be reflected in the containers because of the volumes configuration in `docker-compose.yml`.

Once done, stop the containers by running:
```
docker-compose down
```
This stops and removes the containers but keeps the data in volumes intact.

## Troubleshooting
- **Docker not starting containers properly:** Check logs with `docker-compose logs` and look for error messages.
- **Port conflicts:** If 8000 or 5432 are already in use by other services on your machine, update the ports section in docker-compose.yml to use different port numbers.
