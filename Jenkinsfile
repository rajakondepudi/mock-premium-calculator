pipeline {
    agent any
    tools {
            nodejs '18.16.0'
          } 
    environment
        {
          registry = "rajakonde/nodejs-app"
          registryCredential = 'jenkinsdocker'
          dockerImage = ''
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
            steps
               {
                script 
                 {
                   dockerImage = docker.build registry + ("nodejs:$BUILD_NUMBER")
                 }
               }
          }
        stage('Publish Docker Image') 
           {
            steps
               {
                script 
                 {
                  docker.withRegistry( '', registryCredential )  
                     {
                        dockerImage.push()
                      }
                 }
               }
            }
    
    }
}
