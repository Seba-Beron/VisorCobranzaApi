pipeline {
    agent {
        docker { image 'node:latest' }
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'node --version'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
