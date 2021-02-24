module.exports = {
    apps : [{
      name: 'Middleware',
      script: './index.js',
      // log: 'process.log', 
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development',
        IMG_SERVER: 'http://localhost:6000',
        LOAD_BALANCER: 'http://localhost'
      }
    }]
  };