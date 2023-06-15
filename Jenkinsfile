pipeline {
  agent any
  
  stages {
    stage('Checkout') {
      steps {
        // Checkout code from GitHub repository
        git branch: 'main', url: 'https://github.com/rajakondepudi/mock-premium-calculator.git'
      }
    }
    
    // Additional stages for build, test, deploy, etc.
  }
}
