const mongoose = require('mongoose');
const ratingSchema = require('./rating_model');
const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,

    },
    description: {
        type: String,
        required: true,
        trim: true,
    },

    category: {
        type: String,
        required: true,
    },



    price: {
        type: Number,
        required: true,
    },


    images: [
        {
            type: String,
            required: true,
            trim: true,
        }
    ],
    quantity: {
        type: Number,
        required: true,


    },


    ratings: [ratingSchema]
















})

const ProductModel = mongoose.model("Product", productSchema);
module.exports = { ProductModel, productSchema };