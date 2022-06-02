const express = require('express');
const app = express();
const redis = require('redis');
const subscribe = redis.createClient();
(async () => {
    await subscribe.connect();
})();

subscribe.pSubscribe("__keyevent@0__:expired");
subscribe.on("pmessage",(pattern,channel,message) => {
    console.log(message);
})

app.listen(3001,()=>{
    console.log("The server running at http://localhost:3001 is listening on");
})