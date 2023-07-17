const Product = require('../models/product');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs-extra');
module.exports.home = (req, res) => {

    return res.render('adminPannel', {
        title: "Admin"
    })
}

module.exports.renderAddProduct = async (req, res) => {

    try{
       
    
    return res.render('addProduct', {
        title: "Admin",
       
    })
    }catch(err){
        res.send(err)
    }
    
}

module.exports.addProduct = async(req, res) => {

    let {productName,price,qty,category,description} = req.body

    try{
        if(!productName || !price || !qty || !category || !description){
            return res.send('Required field Missing')
        }
    
        productName = productName.toLowerCase()
        category = category.toLowerCase()
    
        
    
        const imageFile = req.file;
        const result = await cloudinary.uploader.upload(imageFile.path);
        console.log(result.secure_url);
    
        const product = new Product({
            productName,
            price,
            qty,
            category,
            description,
            image: result.secure_url
        });
    
        await product.save()
        const folderPath = 'public/images/products';
        await fs.emptyDir(folderPath);
        req.flash('success','product Added'); 
        return res.redirect('back')
    }catch(err){
        console.log(err);
        return res.redirect('back')
    }


};

module.exports.renderInventory=async(req,res)=>{
    const product = await Product.find({})
    return res.render('inventory',{
        title: "Inventory",
        product
       
    })
}

// Assuming you have imported the Product model appropriately

// Import the Product model at the beginning of your file (if not already done)
// const Product = require('../models/Product');

module.exports.delete = async (req, res) => {
    try {
      const { productId } = req.params;
  
      // Use Mongoose's findByIdAndDelete method to delete the product by its ID
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        // If the product doesn't exist, send an error response
        return res.status(404).send("Product not found.");
      }
  
      // Product successfully deleted, you can handle the response accordingly
      req.flash('success','product Deleted');
      return res.redirect('back')
    } catch (error) {
      // Handle any errors that might occur during the database operation
      return res.status(500).send("Error deleting the product: " + error.message);
    }
  };
  