const express = require('express');
const { addDelayEventOrder } = require('./services/order.service');
const app = express();

app.use(express.json());

app.get('/order',async(req, res) => {
    try {
        const {userId,order} = req.body;
        console.log("test");
        await addDelayEventOrder({orderId:1,delay:5})
        return res.json({
            status: "success",
        })
    }catch(err) {

    }
})

app.listen(3000,()=>{
    console.log("The server running at http://localhost:3000 is listening on");
})