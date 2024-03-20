pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Xanarey/EverGrow-Bank-UI.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Yandex Cloud') {
            steps {
                // Изменение переменных среды для продакшена
                sh "sed -i '' 's/http:\\/\\/localhost/http:\\/\\/51.250.90.24/g' .env.production"
                // Копирование файлов на сервер
                sh 'scp .env.production engend@51.250.90.24:~/evergrow-bank-ui'
                sh 'scp Dockerfile engend@51.250.90.24:~/evergrow-bank-ui'
                sh 'scp default.conf engend@51.250.90.24:~/evergrow-bank-ui'
                sh 'scp -r build/ engend@51.250.90.24:~/evergrow-bank-ui'
                // Перезапуск контейнера с фронтендом, если он у вас есть
                sh 'ssh engend@51.250.90.24 "docker-compose -f ~/evergrow-bank-ui/docker-compose.yml down && docker-compose -f ~/evergrow-bank-ui/docker-compose.yml up -d"'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
