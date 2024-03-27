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
                sh '/bin/sh -c npm install'
                sh '/bin/sh -c npm run build'
            }
        }

        stage('Deploy to Yandex Cloud') {
            steps {
            sh 'ssh engend@51.250.90.24 "mkdir -p ~/evergrow-bank-ui"'
            sh 'scp Dockerfile engend@51.250.90.24:~/evergrow-bank-ui'
            sh 'scp Jenkinsfile engend@51.250.90.24:~/evergrow-bank-ui'
            sh 'scp default.conf engend@51.250.90.24:~/evergrow-bank-ui'
            sh 'scp package*.json engend@51.250.90.24:~/evergrow-bank-ui'
            // Дополнительно копируем собранные файлы в директорию фронтенда
            sh 'scp -r build/* engend@51.250.90.24:~/evergrow-bank-ui'
            sh 'ssh engend@51.250.90.24 "docker-compose -f ~/EverGrowFinance/docker-compose.yml up -d frontend"'

            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}