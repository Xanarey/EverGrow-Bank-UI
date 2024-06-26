pipeline {
    agent any

    environment {
        SERVER_IP = '158.160.167.75'
        REMOTE_PATH = '~'
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        DOCKER_FILE = 'Dockerfile'
        P_KEY = '/Users/engend/Desktop/keys/edKey'
        USER = 'ever-cloud'
        FOLDER = '~/evergrow-bank-ui'
    }

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
                script {
                    sh """
                        ssh -v -i ${P_KEY} ${USER}@${SERVER_IP} "mkdir -p ${FOLDER}"
                        scp -i ${P_KEY} Dockerfile ${USER}@${SERVER_IP}:${FOLDER}
                        scp -i ${P_KEY} .env.production ${USER}@${SERVER_IP}:${FOLDER}
                        scp -i ${P_KEY} Jenkinsfile ${USER}@${SERVER_IP}:${FOLDER}
                        scp -i ${P_KEY} default.conf ${USER}@${SERVER_IP}:${FOLDER}
                        scp -i ${P_KEY} package*.json ${USER}@${SERVER_IP}:${FOLDER}
                        scp -i ${P_KEY} -r public ${USER}@${SERVER_IP}:${FOLDER}
                        scp -i ${P_KEY} -r src ${USER}@${SERVER_IP}:${FOLDER}

                        scp -i ${P_KEY} -r build/* ${USER}@${SERVER_IP}:${FOLDER}
                        ssh -i ${P_KEY} ${USER}@${SERVER_IP} "docker-compose -f ${REMOTE_PATH}/docker-compose.yml up -d --build frontend"
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
