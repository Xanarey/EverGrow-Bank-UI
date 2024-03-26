pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'evergrow-bank-ui'
        VM_USER = 'engend'
        VM_HOST = '51.250.90.24'
        DEPLOY_PATH = '~'
    }

    tools {
        nodejs 'my_nodejs'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Xanarey/EverGrow-Bank-UI.git'
            }
        }

        stage('Build Docker Image') {
                    steps {
                        script {
                            sh '/bin/sh -c "docker build -t evergrow-bank-ui ."'
                        }
                    }
                }

        stage('Show PATH') {
            steps {
                script {
                    sh 'echo $PATH'
                }
            }
        }

        stage('Deploy to Yandex Cloud') {
            steps {
                sh "scp -o StrictHostKeyChecking=no ${DOCKER_IMAGE_NAME}.tar.gz ${VM_USER}@${VM_HOST}:${DEPLOY_PATH}"
                sh "scp -o StrictHostKeyChecking=no docker-compose.yml ${VM_USER}@${VM_HOST}:${DEPLOY_PATH}"

                // Разворачиваем приложение на сервере
                sh """
                    ssh -o StrictHostKeyChecking=no ${VM_USER}@${VM_HOST} '
                        cd ${DEPLOY_PATH} && \
                        gunzip -c ${DOCKER_IMAGE_NAME}.tar.gz | docker load && \
                        docker-compose up -d --build frontend
                    '
                """
            }
        }
    }

    post {
        always {
            // Очистка рабочего пространства после завершения пайплайна
            cleanWs()
        }
    }
}
