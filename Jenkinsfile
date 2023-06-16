pipeline {
    agent any
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'jenkins', url: 'https://github.com/rajakondepudi/mock-premium-calculator.git'
            }
        }
    stage('Build') {
            steps {
                script {
                    // Install dependencies
                    sh 'npm install'
                    
                    // Build the code
                    sh 'npm run build'
                }
            }
        }
        
        
    }
}
