pipeline {
    agent any


    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Xanarey/EverGrow-Bank-UI.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('SCP to Yandex Cloud') {
            steps {
                sh 'ssh engend@51.250.90.24 "mkdir -p ~/evergrow-bank-ui"'
                // Копируем Dockerfile
                sh 'scp Dockerfile engend@51.250.90.24:evergrow-bank-ui'
                // Копируем Jenkinsfile (если он нужен на сервере)
                sh 'scp Jenkinsfile engend@51.250.90.24:evergrow-bank-ui'
                // Копируем конфигурационные файлы
                sh 'scp default.conf engend@51.250.90.24:evergrow-bank-ui'
                // Копируем package.json и package-lock.json
                sh 'scp package*.json engend@51.250.90.24:evergrow-bank-ui'
                // И любые другие файлы, которые вам нужно скопировать
            }
        }

        stage('Deploy to Yandex Cloud') {
            steps {
                sh 'ssh engend@51.250.90.24 "docker-compose -f ~/EverGrowFinance/docker-compose.yml up -d frontend"'
            }
        }

    post {
        always {
            cleanWs()
        }
    }
}
