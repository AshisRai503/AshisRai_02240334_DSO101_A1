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
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                    bat 'docker push %BACKEND_IMAGE%:latest'
                    bat 'docker push %FRONTEND_IMAGE%:latest'
                    bat 'docker logout'
                }
            }
        }
    }
}