pipeline {
    agent any
    tools {
            nodejs '18.16.0'
          } 
    environment 
               {
                credentialsId = 'compact-cursor'
               }
    
    stages {
        stage('Checkout') 
           {
            steps 
               {
                git branch: 'main', credentialsId: 'jenkins', url: 'https://github.com/rajakondepudi/mock-premium-calculator.git'
               }
           }
        stage('Test') 
           {
            steps 
               {
                  sh 'npm ci'
                  sh 'npm run test'
               }
            }
        stage('SonarQube Scan') 
           {
            environment 
               {
                SONAR_SCANNER_HOME = tool 'sonar'
               }
            steps 
               {
                // Run SonarQube analysis
                sh "${env.SONAR_SCANNER_HOME}/bin/sonar-scanner"
               }
           }
        stage('Build') 
           {
               
            steps
               { 
                   // Clean npm cache
                   sh 'npm cache clean --force'
                
                    // Clean node_modules directory
                    sh 'rm -rf node_modules'
                
                    // Install npm dependencies
                    sh 'npm install'
                }
            
           }
        stage('Build Docker Image') 
           {
                environment 
               {
                registry = 'compact-cursor-389906'
               }
            steps
               {
                script 
                 {
                   app = docker.build("registry/nodejs:latest")

                 }
               }
          }
        stage('Push Image To GCR') 
           {
              steps 
                 {
                   script 
                     {
                       docker.withRegistry('https://gcr.io', 'gcr:credentialsId') {
                       dockerImage.push()
                     }
                 }
            }
           
        
           
    }

}
