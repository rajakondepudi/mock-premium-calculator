pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git(branch: 'main', url: 'https://github.com/rajakondepudi/mock-premium-calculator.git', credentialsId: 'Raja@5112')
      }
    }

  }
}