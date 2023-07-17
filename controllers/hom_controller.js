const Product = require('../models/product');

module.exports.home = async (req, res) => {
    try {
        const allProduct=await Product.find({})
        
        res.render('home', {
            title: 'Home',
            allProduct,
        });
    } catch (err) {
        console.log(err);
    }
};




module.exports.info = async (req, res) => {

    try{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    const catProduct=await Product.find({category:product.category}).limit(5)

    // console.log(product);

    return res.render('info', {
        title: 'Product Details',
        product: product,
        catProduct,
    });
    }catch(err){
        res.send(err)
    }
    


};

exports.searchProduct = async (req, res) => {
    console.log("ooo");
  try {
    const { search } = req.body;
    const regex = new RegExp(search, 'i');

    // Find products that match the search query
    const products = await Product.find({
      $or: [
        { productName: regex },
        { category: regex },
        { description: regex }
      ]
    });

    res.render('search-results', { 
        title:"search",
        products });
  } catch (error) {
    console.error('Error searching for products:', error);
    res.status(500).send('Internal Server Error');
  }
};