pipeline {
    agent any
    tools {
        nodejs 'NOdeJS-18.16.0'
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
