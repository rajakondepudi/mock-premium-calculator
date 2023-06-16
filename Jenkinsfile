pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                 git branch: 'main', git credentialsId: 'jenkins', url: 'https://github.com/rajakondepudi/mock-premium-calculator.git'
            }
        }
        
        
    }
}
