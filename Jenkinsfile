pipeline {
    agent any
    tools {
        nodejs '18.16.0'
          } 
    
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'jenkins', url: 'https://github.com/rajakondepudi/mock-premium-calculator.git'
            }
        }
        stage('Build') {
            steps {
                    sh 'npm install'
                    sh 'npm install jest --save-dev'
                   }
                  }
                
        stage('Test') {
            steps {
                     sh 'npm ci'
                     sh 'npm run test'
                    }
                }
        
        
        
    }
}
