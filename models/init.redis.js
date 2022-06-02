const redis = require('redis');
const client = redis.createClient({
    url: 'redis://127.0.0.1:6379', 
legacyMode: true });
(async () => {
    await client.connect();
})();
module.exports = client;