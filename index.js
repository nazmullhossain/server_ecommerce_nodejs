//creating an api

const express = require('express');
const mongoose=require("mongoose");
const authRouter=require("./routes/auth_routes");
const adminRouter = require('./routes/admin_route');
const productRouter = require('./routes/product_catagory_route');
const userRouter = require('./routes/user_route');
const DB="mongodb+srv://nazmulldata:165257As$@cluster0.xshgf8l.mongodb.net/?retryWrites=true&w=majority"

const PORT= process.env.PORT | 3001;
const app = express();
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter)
//connection 

mongoose.connect(DB).then(()=>{
    console.log("Connection Sucessful");
}).catch((e)=>{
console.log(`connectio faild ${e}`);
})
app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Connected at port ${PORT}`);
})


// const array = [5, 3, 1, 4, 2];

// // Sorting the array in ascending order
// array.sort();
// console.log(array); // Output: [1, 2, 3, 4, 5]

// // Sorting the array in descending order
// array.sort((a, b) => a-a);
// console.log(array); // 