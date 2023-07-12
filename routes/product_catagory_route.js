
//this product catagory search by catagory


const express = require('express');
const productRouter = express.Router();

const auth = require("../middleware/auth_midlle");
const {ProductModel} = require('./models/prouduct_model');

productRouter.get("/api/products", auth, async (req, res) => {
  try {

    console.log(req.query.category)
    const product = await ProductModel.find({ category: req.query.category });
    res.json(product);
  } catch (e) {
    res.status(500).json({ msg: e.message })
  }
});

productRouter.get("/api/products/search/:name", auth, async (req, res) => {
  try {
    const products = await ProductModel.find({
      name: { $regex: req.params.name, $options: "i" },
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


//rating bar 

productRouter.post("/api/rate-product", auth, async (req, res) => {
try{
  const {id,rating}=req.body;

  let product= await ProductModel.findById(id);


  for(let i=0; i<product.ratings.length; i++){
    if(product.ratings[i].userId==req.user){
      product.ratings.splice(i,1);
      break;
    }
  }

  const ratingSchema={
    userId: req.user,
    rating
  };
  product.ratings.push(ratingSchema);
  product=await product.save();


  res.json(product);





}catch(e){
res.status(500).json({error: e.message});
}






});










// productRouter.get("/api/products/search/:name",auth, async(req,res)=>{
//     try{

//         console.log(req.query.category)
// const product=await ProductModel.find({
//     name: { $regex: req.params.name, $opitons: "i"}
// });
// res.json(product);
//     }catch(e){
//         res.status(500).json({msg: e.message})
//     }
// });


//deals of day
productRouter.get("/api/deals-of-day", auth, async (req,res)=>{
  try{

let products= await ProductModel.find({});
products=products.sort((a,b)=>{
  let aSum=0;
  let bSum=0;

  for (let i=0; i<a.ratings.length; i++){
    aSum += a.ratings[i].rating;
  }

  for (let i=0; i<a.ratings.length; i++){
    bSum += b.ratings[i].rating;
  }
  return aSum < bSum ? 1 : -1;

});
res.json(products[0])


  }catch(e){
    res.status(500).json({error: e.message});
  }
})


module.exports = productRouter;