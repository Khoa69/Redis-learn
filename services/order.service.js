const redis = require('redis');
const client = redis.createClient({
    url: 'redis://127.0.0.1:6379', 
legacyMode: true });
(async () => {
    await client.connect();
})();
const addDelayEventOrder = ({orderId, delay })=>{
    console.log(orderId);
    return new Promise((resolve, reject) =>{
        client.set(orderId,"Cancel order", "EX", delay,(err, res) =>{
            if(err) return reject(err);
            resolve(res);
        })
    })
}
module.exports ={
    addDelayEventOrder
}