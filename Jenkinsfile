pipeline {
    agent any
    tools {
            nodejs '18.16.0'
          } 
    environment 
         {
           imageName = 'gcr.io/	compact-cursor-389906/nodejs'
           imageTag = "latest"
           gcrCredentials = 'compact-cursor'
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
                   docker.build(imageName, "-t ${imageName}:${imageTag} .")
                 }
               }
          }
        stage('Push Docker Image to GCR') 
           {
            steps 
               {
                script 
                   {
                      withCredentials([file(credentialsId: gcrCredentials, variable: 'GCR_KEY')]) 
                       {
                        sh "gcloud auth activate-service-account --key-file=${GCR_KEY}"
                       }
                        sh "docker push ${imageName}:${imageTag}"
                    }
                }
           }  
    }

}
