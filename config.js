const config = {
    dbUrl: process.env.DB_URL || 'mongodb://localhost/cinemundo',
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost',
    publicRoute: process.env.PUBLIC_ROUTE || '/app',
    filesRoute: process.env.FILES_ROUTE || 'files',
    privateKey: process.env.SECRET_KEY_JWT_API
};

module.exports = config;