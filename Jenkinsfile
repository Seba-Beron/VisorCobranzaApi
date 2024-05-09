pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                bat 'npm install'
                bat 'node --version'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                bat 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
