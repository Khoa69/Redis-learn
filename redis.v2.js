const express = require('express');
const { exists, incrby ,get,set, run, disconnect, setnx } = require('./models/model.redis');
const app = express();

app.get('/order',async(req,res)=>{

    const time = new Date().getTime();

    console.log("Time request:::",time);

    const IventoryNum =10;

    const keyName = 'iPhone14';

    const amount =1;

    const getKey = await exists(keyName);

    if(!getKey){
        await setnx(keyName,0);
    }

    let amountSold =await get(keyName);
    amountSold = await incrby(keyName,amount);
    
    if (+amountSold > IventoryNum){
        console.log("Not enough amount");
        return res.json({
            status:"error",
            msg:'Not enough',
            time
        })
    }

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