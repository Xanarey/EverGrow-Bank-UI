pipeline {
    agent any

    tools {
        nodejs 'my_nodejs'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Xanarey/EverGrow-Bank-UI.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'REACT_APP_API_URL=http://51.250.90.24 npm run build'
            }
        }

        stage('Deploy to Yandex Cloud') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'evergrow-server',
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'build/**/*',
                                    removePrefix: 'build',
                                    remoteDirectory: 'evergrow-bank-ui',
                                    execCommand: 'docker-compose -f /home/engend/EverGrowFinance/docker-compose.yml down && docker-compose -f /home/engend/EverGrowFinance/docker-compose.yml up -d'
                                ),
                                sshTransfer(
                                    sourceFiles: '.env.production',
                                    remoteDirectory: 'evergrow-bank-ui'
                                ),
                                sshTransfer(
                                    sourceFiles: 'package.json',
                                    remoteDirectory: 'evergrow-bank-ui'
                                ),
                                sshTransfer(
                                    sourceFiles: 'Dockerfile',
                                    remoteDirectory: 'evergrow-bank-ui'
                                ),
                                sshTransfer(
                                    sourceFiles: 'default.conf',
                                    remoteDirectory: 'evergrow-bank-ui'
                                )
                            ]
                        )
                    ]
                )
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
