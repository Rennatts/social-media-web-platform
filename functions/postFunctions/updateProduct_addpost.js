const Post = require('./../../schema/post');
const Products = require('./../../schema/products');
require('dotenv').config();

module.exports = async(req, res, next) => {

    const brandinput = req.body.brand;
    const producnametinput = req.body.productname;

    const rate = req.body.rating;

    console.log("rate", rate);

    const products = await Products.find()
    .populate("brand", "_id brandname url")
    .select("_id productname category description created likes url key rating numReviews")
    .sort({ created: -1})


    const findproductwithsameproduct = products.filter(
    (product) => 
    String(product.brand.brandname).toLowerCase().split(" ").join("") ===
    String(brandinput).toLowerCase().split(" ").join("") &&
    String(product.productname).toLowerCase().split(" ").join("") ===
    String(producnametinput).toLowerCase().split(" ").join("")
    );

    if(!findproductwithsameproduct) res.json("Product not yet registered");

    try{
        if(findproductwithsameproduct){
            console.log(findproductwithsameproduct);
            const productrate = findproductwithsameproduct[0].rating;
            const productnum = findproductwithsameproduct[0].numReviews;

            console.log("productrate", productrate);

            console.log("productnum", product);
        
            findproductwithsameproduct[0].rating = parseInt(rate + productrate);
            findproductwithsameproduct[0].numReviews = parseInt(productnum + 1);
        
            findproductwithsameproduct[0].save(); 
            console.log("done")
        }

    }catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }


};