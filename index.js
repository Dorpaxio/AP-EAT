const app = require('./app');
const config = require('./config');
const fs = require('fs');
const https = require('https');

if (process.env.PRODUCTION) {
    const {domain} = config;
    const privateKey = fs.readFileSync(`/etc/letsencrypt/live/${domain}/privkey.pem`, 'utf8');
    const certificate = fs.readFileSync(`/etc/letsencrypt/live/${domain}/cert.pem`, 'utf8');
    const ca = fs.readFileSync(`/etc/letsencrypt/live/${domain}/chain.pem`, 'utf8');
    https.createServer({
        key: privateKey,
        cert: certificate,
        ca: ca
    }, app).listen(config.port, function () {
        console.log(`API is now listening on port ${config.port}.`);
    });
} else {
    app.listen(config.port, function () {
        console.log(`API is now listening in development mode on port ${config.port}.`);
    });
}

process.on('SIGINT', function () {
    console.log(`Exiting API.`);
    process.exit();
});
