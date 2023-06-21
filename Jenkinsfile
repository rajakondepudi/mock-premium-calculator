pipeline {
    agent any
    tools {
            nodejs '18.16.0'
          } 
    environment
        {
          DOCKERHUB_CREDENTIALS = credentials('jenkinsdocker')
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
                   sh 'docker build -t nodejs:$BUILD_NUMBER .'
                 }
               }
          }
        stage('Publish Docker Image') 
           {
            steps
               {
                script 
                 {
                   //docker login
                   sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                   //push image
                   sh 'docker push nodejs:$BUILD_NUMBER'
                 }
               }
          }
        
    }
      post
    {
        always
        {
            sh 'docker logout'
        }
    }

}
