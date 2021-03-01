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
        MIDDLEWARE: 'http://192.168.0.25:3000/',
        DATA_SERVER: 'http://192.168.0.30:4000/db'
      }
    }]
  };