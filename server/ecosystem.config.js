module.exports = {
    apps : [{
      name: 'Server',
      script: './index.js',
      // log: 'process.log', 
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development',
        DATA_SERVER: 'http://localhost:4000/db'
      }
    }]
  };