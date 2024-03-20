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

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Yandex Cloud') {
            steps {
                sh 'ssh engend@51.250.90.24 "mkdir -p ~/evergrow-bank-ui"'
                sh "sed -i '' 's/http:\\/\\/localhost/http:\\/\\/51.250.90.24/g' .env.production"

                sh "scp /Users/engend/IdeaProjects/evergrow-bank-ui/public/index.html engend@51.250.90.24:~/evergrow-bank-ui/build/"


                sh 'scp .env.production engend@51.250.90.24:~/evergrow-bank-ui'
                sh 'scp package.json engend@51.250.90.24:~/evergrow-bank-ui'
                sh 'scp Dockerfile engend@51.250.90.24:~/evergrow-bank-ui'
                sh 'scp default.conf engend@51.250.90.24:~/evergrow-bank-ui'

                // Проверяем, что директория build/ не пуста перед копированием
                script {
                    def isBuildNotEmpty = sh(script: 'ls -A build/', returnStatus: true) == 0
                    if (isBuildNotEmpty) {
                        sh 'scp -r build/ engend@51.250.90.24:~/evergrow-bank-ui'
                    } else {
                        echo "Директория build/ пуста или не существует"
                    }
                }

                sh 'ssh engend@51.250.90.24 "docker-compose -f /home/engend/EverGrowFinance/docker-compose.yml down && docker-compose -f /home/engend/EverGrowFinance/docker-compose.yml up -d"'
            }

        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
