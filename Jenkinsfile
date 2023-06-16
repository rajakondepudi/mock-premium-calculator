pipeline {
    agent any

    stages {
        stage('Checkout') 
           {
            steps {
                     git credentialsId: 'jenkins' , git branch: 'main', url: 'https://github.com/your-username/your-repo.git'
                  }
           }
         }
       }
