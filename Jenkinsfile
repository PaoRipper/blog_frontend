node {
    stage('Checkout') {
        // Checkout your code from version control
        // For example, if you use git:
        git url: 'https://github.com/PaoRipper/blog_frontend.git'
    }

    stage('Install dependencies') {
        // Install dependencies using npm
        // For example:
        sh 'npm install'
    }

    stage('Deploy') {
        // Deploy the app to Vercel
        // For example:
        withCredentials([string(credentialsId: 'vercel-token', variable: 'VERCEL_TOKEN')]) {
            sh 'vercel --token $VERCEL_TOKEN --prod'
        }
    }
}
