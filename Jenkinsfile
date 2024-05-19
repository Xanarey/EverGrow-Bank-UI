pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                                    url: 'https://github.com/Xanarey/EverGrow-Bank-UI.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Deploy to Yandex Cloud') {
            steps {
            sh 'ssh ever-admin@84.201.138.119 "mkdir -p ~/evergrow-bank-ui"'
            sh 'scp Dockerfile ever-admin@84.201.138.119:~/evergrow-bank-ui'
            sh 'scp Jenkinsfile ever-admin@84.201.138.119:~/evergrow-bank-ui'
            sh 'scp default.conf ever-admin@84.201.138.119:~/evergrow-bank-ui'
            sh 'scp package*.json ever-admin@84.201.138.119:~/evergrow-bank-ui'

            sh 'scp -r build/* ever-admin@84.201.138.119:~/evergrow-bank-ui'
            sh 'ssh ever-admin@84.201.138.119 "docker-compose -f ~/docker-compose.yml up -d frontend"'

            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}