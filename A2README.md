# DSO101 Assignment 2: Jenkins CI/CD Pipeline

## Student Details

**Name:** Ashis Rai  
**Student ID:** 02240334  
**Module:** DSO101  
**Assignment:** Assignment 2 - Continuous Integration and Continuous Deployment  
**Project:** To-Do List Application  

---

## Project Repository

GitHub Repository:  
https://github.com/AshisRai503/AshisRai_02240334_DSO101_A1

---

## Project Overview

This assignment focuses on creating a Jenkins CI/CD pipeline for the To-Do List application developed in Assignment 1. The application uses a React frontend and a Node.js/Express backend.

The Jenkins pipeline automates the following stages:

1. Checkout source code from GitHub
2. Install dependencies for backend and frontend
3. Build backend and frontend
4. Run unit tests using Jest
5. Generate JUnit test reports
6. Build Docker images
7. Push Docker images to Docker Hub

---

## Tools and Technologies Used

- Jenkins
- GitHub
- Node.js
- npm
- Jest
- Jest JUnit
- Docker
- Docker Hub
- React
- Node.js/Express

---

## Jenkins Setup

Jenkins was installed and accessed locally using:

```text
http://localhost:8080
```

The following Jenkins plugins were installed:

- NodeJS Plugin
- Pipeline
- GitHub Integration Plugin
- Docker Pipeline

Node.js was configured in Jenkins under:

```text
Manage Jenkins → Tools → NodeJS installations
```

The NodeJS installation name used was:

```text
NodeJS
```

---

## Credentials Configuration

Two credentials were added in Jenkins.

### GitHub Credential

Used for checking out the source code from GitHub.

```text
ID: github-pat
Type: Username with password
Username: AshisRai503
```

### Docker Hub Credential

Used for logging in to Docker Hub and pushing Docker images.

```text
ID: docker-hub-creds
Type: Username with password
Username: ash5zero3
```

> Note: Actual GitHub and Docker Hub tokens are not included in this README for security reasons.

---

## Jenkins Pipeline Stages

The Jenkinsfile was created in the root of the GitHub repository.

### 1. Checkout Stage

This stage checks out the source code from the GitHub repository.

### 2. Install Dependencies Stage

This stage installs npm dependencies for both backend and frontend.

```text
todo-app/backend
todo-app/frontend
```

### 3. Build Stage

This stage runs the build command for both backend and frontend.

Backend build:

```bash
npm run build
```

Frontend build:

```bash
npm run build
```

### 4. Test Stage

This stage runs Jest unit tests for the backend.

```bash
npm test
```

The test command generates a JUnit report file:

```text
junit.xml
```

Jenkins uses this file to display test results under the Jenkins Test Results page.

### 5. Docker Build Stage

This stage builds Docker images for both backend and frontend.

Docker images:

```text
ash5zero3/dso101-a2-backend:latest
ash5zero3/dso101-a2-frontend:latest
```

### 6. Docker Push Stage

This stage logs in to Docker Hub using Jenkins credentials and pushes both images to Docker Hub.

---

## Unit Testing

A simple backend unit test was added using Jest.

Test file:

```text
todo-app/backend/__tests__/validateTask.test.js
```

Utility file:

```text
todo-app/backend/utils/validateTask.js
```

The test checks whether a task title is valid or invalid.

Test result:

```text
3 tests passed
0 failures
```

---

## Docker Hub Images

Backend Docker image:

```text
https://hub.docker.com/r/ash5zero3/dso101-a2-backend
```

Frontend Docker image:

```text
https://hub.docker.com/r/ash5zero3/dso101-a2-frontend
```

---

## Challenges Faced

During the assignment, I faced a few issues:

1. Some Jenkins plugins initially failed to install because of connection timeout errors.
2. The first Jenkins build failed during the Docker Push stage because Docker login failed inside Jenkins.
3. The Docker login issue was fixed by updating the Jenkinsfile Docker login command.
4. A generated `junit.xml` file was accidentally pushed to GitHub, so it was removed from Git tracking and added to `.gitignore`.

---

## Screenshots Included in Report

The following screenshots were taken as evidence:

1. Jenkins running on localhost
![Jenkins](screenshots/17.png)

2. Required Jenkins plugins installed
![Plugin installed](screenshots/18.png)
![Plugin installed](screenshots/19.png)
![Plugin installed](screenshots/20.png)
![Plugin installed](screenshots/21.png)

3. NodeJS configured in Jenkins
![NodeJS Config](screenshots/22.png)

4. GitHub credentials added in Jenkins
![Github credentials](screenshots/23.png)

5. Docker Hub credentials added in Jenkins
![Docker Hub credentials](screenshots/24.png)

6. Backend Jest installation
![Jest installation](screenshots/25.png)

7. Backend unit tests passing locally
![Jest test](screenshots/27.png)

8. JUnit XML file generated
![File verification](screenshots/288.png)

9. Frontend build successful
![Frontend build](screenshots/30.png)

10. Backend Docker image build successful
![Backend Image](screenshots/31.png)


11. Frontend Docker image build successful
![Frontend Image](screenshots/32.png)

12. Jenkinsfile created
```
pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        BACKEND_IMAGE = 'ash5zero3/dso101-a2-backend'
        FRONTEND_IMAGE = 'ash5zero3/dso101-a2-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-pat',
                    url: 'https://github.com/AshisRai503/AshisRai_02240334_DSO101_A1.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('todo-app/backend') {
                    bat 'npm install'
                }

                dir('todo-app/frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('todo-app/backend') {
                    bat 'npm run build'
                }

                dir('todo-app/frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                dir('todo-app/backend') {
                    bat 'npm test'
                }
            }

            post {
                always {
                    junit 'todo-app/backend/junit.xml'
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t %BACKEND_IMAGE%:latest ./todo-app/backend'
                bat 'docker build -t %FRONTEND_IMAGE%:latest ./todo-app/frontend'
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                    bat 'docker push %BACKEND_IMAGE%:latest'
                    bat 'docker push %FRONTEND_IMAGE%:latest'
                    bat 'docker logout'
                }
            }
        }
    }
}
```
13. Jenkins pipeline job configuration
![pipline config](screenshots/33.png)
![pipline config](screenshots/34.png)
![pipline config](screenshots/35.png)
![pipline config](screenshots/36.png)

14. Jenkins failed build showing Docker login issue
![Error](screenshots/37.png)
![Error](screenshots/38.png)
![Error](screenshots/39.png)

15. Successful Jenkins pipeline execution
![Success](screenshots/40.png)

16. Jenkins console output showing `Finished: SUCCESS`
![output: success](screenshots/41.png)

17. Jenkins test results showing all tests passed
![test results](screenshots/42.png)

18. Docker Hub images pushed successfully
![Docker hub image](screenshots/44.png)

19. GitHub repository showing Jenkinsfile
![github](screenshots/45.png)


---

## Final Result

The Jenkins pipeline completed successfully and automated the build, test, and Docker deployment process for the To-Do List application.

Successful pipeline stages:

```text
Checkout ✅
Install Dependencies ✅
Build ✅
Test ✅
Docker Build ✅
Docker Push ✅
```

---

## Conclusion

In this assignment, I successfully configured a Jenkins CI/CD pipeline for my To-Do List application. The pipeline automatically checks out code from GitHub, installs dependencies, builds the backend and frontend, runs unit tests, generates Jenkins test reports, builds Docker images, and pushes the images to Docker Hub.

This assignment helped me understand the complete CI/CD workflow and how Jenkins can be used to automate software build, test, and deployment processes.
