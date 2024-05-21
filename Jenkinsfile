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
            sh "sed -i '' 's/http:\\/\\/localhost/http:\\/\\/158.160.154.130/g' .env.production"

            sh 'ssh -i /Users/engend/Desktop/keys/edKey ever-cloud@158.160.154.130 "mkdir -p ~/evergrow-bank-ui"'
            sh 'scp -i /Users/engend/Desktop/keys/edKey Dockerfile ever-cloud@158.160.154.130:~/evergrow-bank-ui'
            sh 'scp -i /Users/engend/Desktop/keys/edKey .env.production ever-cloud@158.160.154.130:~/evergrow-bank-ui'
            sh 'scp -i /Users/engend/Desktop/keys/edKey Jenkinsfile ever-cloud@158.160.154.130:~/evergrow-bank-ui'
            sh 'scp -i /Users/engend/Desktop/keys/edKey default.conf ever-cloud@158.160.154.130:~/evergrow-bank-ui'
            sh 'scp -i /Users/engend/Desktop/keys/edKey package*.json ever-cloud@158.160.154.130:~/evergrow-bank-ui'
            sh 'scp -i /Users/engend/Desktop/keys/edKey -r public ever-cloud@158.160.154.130:~/evergrow-bank-ui'
            sh 'scp -i /Users/engend/Desktop/keys/edKey -r src ever-cloud@158.160.154.130:~/evergrow-bank-ui'

            sh 'scp -i /Users/engend/Desktop/keys/edKey -r build/* ever-cloud@158.160.154.130:~/evergrow-bank-ui'
            sh 'ssh -i /Users/engend/Desktop/keys/edKey ever-cloud@158.160.154.130 "docker-compose -f ~/docker-compose.yml up -d --build frontend"'


            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}