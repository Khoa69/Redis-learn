const express = require('express');
const client = require('./models/init.redis');
const { exists, incrby ,get,set, run, disconnect } = require('./models/model.redis');
const app = express();

app.get('/order',async(req,res)=>{

    const time = new Date().getTime();

    console.log("Time request:::",time);

    const IventoryNum =10;

    const keyName = 'iPhone14';

    const amount =1;

    const getKey = await exists(keyName);

    if(!getKey){
        await set(keyName,0);
    }

    let amountSold =await get(keyName);

    if (+amountSold+amount > IventoryNum){
        console.log("Not enough amount");
        return res.json({
            status:"error",
            msg:'Not enough',
            time
        })
    }

    amountSold = await incrby(keyName,amount);
    console.log("After sold:", amountSold);

    if (+amountSold> IventoryNum){
        await set("amountOver",amountSold-IventoryNum);
    }
    return res.json({
        status:"success",
        msg:'Ok',
        time
    })
})

app.listen(3000,()=>{
    console.log("The server running at http://localhost:3000 is listening on");
})