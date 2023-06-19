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
                    // Clean npm cache
                    sh 'npm cache clean --force'
                
                    // Clean node_modules directory
                    sh 'rm -rf node_modules'
                
                    // Install npm dependencies
                    sh 'npm install'
                   }
                  }
                
        stage('Test') {
            steps {
                     sh 'npm ci'
                     sh 'npm run test'
                    }
                }
        stage('SonarQube analysis') 
        {
          steps 
            {
                  scannerHome = tool 'sonar'
                  withSonarQubeEnv('sonarjenkins')
                  sh "${scannerHome}/bin/sonar-scanner"
                }
            
    
        }  
        }
}
