const express = require("express");
const adminRouter = express.Router();
const admin = require("../middleware/admin_middleware");
const {ProductModel} = require("./models/prouduct_model");



adminRouter.post('/admin/add-product', admin, async (req, res) => {

    try {
        const { name, quantity, description, category, price, images } = req.body;

        let product = new ProductModel({
            name,
            description,
            images,
            quantity,
            price,
            category
        });

        product = await product.save();
        res.json(product)

    } catch (e) {
        res.status(500).json({ msg: e.message });
    }



});


adminRouter.get("/admin/get-product", admin, async (req, res) => {
    try {
        const product = await ProductModel.find({});
        res.json(product);

    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
})
//delete single product
adminRouter.post("/admin/delete-product", admin, async (req, res) => {
    try {
        const { id } = req.body;
        let product = await ProductModel.findByIdAndDelete(id);

        res.json(product);

    } catch (e) {
        res.status(500).json({ msg: e.message })
    }
})

// adminRouter.get("/admin/get-products", admin, async (req, res) => {
//     try {
//       const products = await Product.find({});
//       res.json(products);
//     } catch (e) {
//       res.status(500).json({ error: e.message });
//     }
//   });

module.exports = adminRouter;