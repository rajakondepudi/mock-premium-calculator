pipeline {
    agent any
    
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'jenkins', url: 'https://github.com/rajakondepudi/mock-premium-calculator.git'
            }
        }
        stage('Build') {
            steps {
                    sh 'npm install'
                   }
                  }
        stage('Test') {
            steps {
                     sh 'npm test'
                    }
                }
        
        
        
    }
}
