# DSO101 Assignment 1 - Continuous Integration and Continuous Deployment

## Student Details

**Name:** Ashis Rai  
**Student ID:** 02240334  
**Course:** DSO101 - Continuous Integration and Continuous Deployment  
**Assignment:** Assignment 1  
**GitHub Repository:** AshisRai_02240334_DSO101_A1  
**Docker Hub Username:** ash5zero3  

---

## Project Overview

This project is a simple full-stack To-Do List web application created for DSO101 Assignment 1. The main purpose of the assignment is to practice building a full-stack application, containerizing it using Docker, pushing Docker images to Docker Hub, deploying the application on Render, and setting up automated deployment using Render Blueprint.

The application allows users to:

- Add tasks
- View saved tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed

The project contains three main parts:

1. **Step 0:** Build a simple full-stack To-Do application locally.
2. **Part A:** Build Docker images, push them to Docker Hub, and manually deploy them on Render.
3. **Part B:** Set up automated deployment using Render Blueprint and GitHub.

---

## Technology Stack

### Frontend

- React
- Vite
- Axios
- CSS

### Backend

- Node.js
- Express.js
- PostgreSQL
- dotenv
- cors
- pg

### DevOps / Deployment

- Docker
- Docker Hub
- Render
- Render Blueprint
- GitHub

---

## Folder Structure

```text
AshisRai_02240334_DSO101_A1/
│
├── todo-app/
│   ├── backend/
│   │   ├── Dockerfile
│   │   ├── .dockerignore
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── server.js
│   │   └── .env
│   │
│   └── frontend/
│       ├── Dockerfile
│       ├── .dockerignore
│       ├── package.json
│       ├── package-lock.json
│       ├── index.html
│       ├── src/
│       │   ├── App.jsx
│       │   ├── App.css
│       │   └── index.css
│       └── .env
│
├── render.yaml
├── .gitignore
└── README.md

### Step 0

**1.Draft** 

---

