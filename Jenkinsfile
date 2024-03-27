pipeline {
    agent any

    environment {
        // Здесь могут быть указаны переменные окружения, если они вам нужны
    }

    stages {
        stage('Checkout') {
            steps {
                // Получаем код из репозитория GitHub
                git 'https://github.com/Xanarey/EverGrow-Bank-UI.git'
            }
        }

        stage('Build') {
            steps {
                // Устанавливаем зависимости и собираем проект
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Deploy to Yandex Cloud') {
            steps {
                // Замените 'your_remote_directory' на путь, где должен быть размещен проект на сервере
                // Пример: sh 'scp -r build/ username@51.250.90.24:~/your_remote_directory'

                // Замените 'your_nginx_container_name' на имя контейнера nginx в вашем docker-compose.yml
                // Эта команда перезапустит контейнер nginx с новой версией фронта
                sh 'ssh username@51.250.90.24 "docker-compose -f ~/path_to_your_compose_file/docker-compose.yml up -d frontend"'
            }
        }
    }

    post {
        always {
            // Удаляем рабочий каталог после сборки
            cleanWs()
        }
    }
}
