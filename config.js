module.exports = {
  domain: process.env.APEAT_DOMAIN || '',
  port: process.env.APEAT_PORT || 29321,
  database: process.env.APEAT_DATABASE || 'apeat',
  jwt_secret: process.env.APEAT_JWT_SECRET || 's3cr3t',
  db_host: process.env.APEAT_DB_HOST || 'localhost'
};
