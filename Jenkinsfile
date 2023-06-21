pipeline {
    agent any
    tools {
            nodejs '18.16.0'
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
                credentials = 'gcrkey'
               }
    
               
            steps
               {
                script 
                 {
                   app = docker.build("gcr.io/${registry}/nodejs:latest")

                 }
               }
          }
        stage('Push Image To GCR') 
           {
                environment 
               {
                registry = 'compact-cursor-389906'
                credentials = 'gcrkey'
               }
              steps 
                 {
                   script 
                     {
                         withCredentials(credentialsId: credentials, url: 'https://gcr.io') 
                         {
                            docker.withRegistry('https://gcr.io', 'credentials')
                         {
                            app.push("${registry}/nodejs:latest")
                          }
                         }
            
                     }
                 }
           }
    }

}
