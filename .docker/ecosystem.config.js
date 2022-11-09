module.exports = {
  apps: [
    {
      name: 'server',
      cwd: 'server',
      script: 'server.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        PORT: 5001,
        NODE_ENV: 'production',
      },
      error_file: '/var/log/pm2/server-error.log',
      out_file: '/var/log/pm2/server-out.log',
      combine_logs: true,
    },
  ],
}
