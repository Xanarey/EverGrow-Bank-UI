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
            sh 'ssh engend@84.201.138.119 "mkdir -p ~/evergrow-bank-ui"'
            sh 'scp Dockerfile engend@84.201.138.119:~/evergrow-bank-ui'
            sh 'scp Jenkinsfile engend@84.201.138.119:~/evergrow-bank-ui'
            sh 'scp default.conf engend@84.201.138.119:~/evergrow-bank-ui'
            sh 'scp package*.json engend@84.201.138.119:~/evergrow-bank-ui'

            sh 'scp -r build/* engend@84.201.138.119:~/evergrow-bank-ui'
            sh 'ssh engend@84.201.138.119 "docker-compose -f ~/docker-compose.yml up -d frontend"'

            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}